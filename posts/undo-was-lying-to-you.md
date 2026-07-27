---
title: undo was lying to you
date: July 15, 2026
---

Ctrl+Z is the second thing anyone does in a drawing tool. The first is draw a line they do not like.

So undo had worked in Flipghost from early on, and we did not think about it much. Then you would delete a frame, press Ctrl+Z to get it back, and watch a stroke disappear from a different frame instead.

The frame stayed deleted.

## The shape of the bug

Delete frame 7. Press Ctrl+Z. Frame 7 does not come back — but the last stroke you drew on frame 6 quietly vanishes.

The interesting part is not that delete had no undo. It is that Ctrl+Z did something anyway. It did not shrug, or beep, or no-op. It confidently reached into a frame you were not looking at and removed work you had not asked it to remove. A missing feature announces itself. This just lied.

## Why we built it that way

Per-frame history was not an accident. It was an argument, and at the time we thought it was a good one. Our own docs made it in as many words:

> History is kept per frame. Undo on frame 4 only ever affects frame 4, so stepping back to fix something on an earlier frame will not unpick the work you did after it.

That is a real property, and it comes from watching people actually use a flipbook. Animating is not linear. You draw frame 1, jump to frame 12 to block out where the arm lands, come back to 4, hop to 8, fix 12 again. If undo walked backwards through everything in wall-clock order, then hopping back to frame 4 to fix one line and pressing Ctrl+Z twice could rip out the work you did on frame 12 twenty minutes ago.

Per-frame history made that impossible. Every frame carried its own little stack:

```typescript
histories: Record<string, { past: FrameJSON[]; future: FrameJSON[] }>;
```

Frame id in, undo stack out. Undo on frame 4 could not touch frame 9 because it could not see frame 9. The isolation was the point.

## What it could not see

Look at that type for a second and the problem is sitting right there in the first line.

The history was indexed by frame. Which means it could store anything that happened inside a frame, and nothing that happened to the set of frames. Adding a frame, duplicating one, dragging one along the timeline, deleting one — none of it was recordable, because the thing being changed was the index itself.

And delete was the worst of them, because delete did not merely fail to record. Delete removed the frame, and removed that frame's history along with it, since the entry was keyed by an id that no longer existed. Then it moved the selection to a neighbouring frame, because you have to be looking at something.

Now press Ctrl+Z. Undo asks for the history of the current frame. The current frame is the neighbour. The neighbour has a perfectly good stack of its own strokes. Undo pops one.

Every individual piece did exactly what it said it did. The delete deleted. The cleanup cleaned up. The selection moved somewhere sensible. The undo undid. Composed together, they produced a confident wrong answer, which is the most expensive kind.

## The honest version

We had not built a broken undo. We had built a working stroke-history and put the word "undo" on it.

Nobody sitting at a canvas thinks _I would like to revert the stroke buffer of the currently selected frame_. They think _I would like the last thing I did to not have happened_. The last thing they did was delete a frame. The gap between those two sentences is the entire bug, and no amount of care inside the per-frame model would have closed it, because the model could not express the sentence the user was thinking.

## The fix, and why it cost less than we expected

One stack for the whole document. Every entry is the entire state:

```typescript
past: Array<{ frames: Frame[]; currentId: string }>;
```

Draw a stroke, push. Delete a frame, push. Reorder, push. Undo pops one and puts it back.

The obvious objection is memory. Snapshotting the whole document on every stroke sounds ruinous: a 200-frame animation where each frame carries a base64 PNG thumbnail, copied wholesale, fifty times over? That is hundreds of megabytes of nonsense.

Except we never copy it. The store was already immutable, because that is what React wants. Every mutation already rebuilt the array and reused every frame object it did not touch:

```typescript
frames: s.frames.map((f) =>
    f.id === s.currentId ? { ...f, json, dataUrl } : f,
);
```

One new frame object. One hundred and ninety-nine pointers to exactly the objects that were there before. So a snapshot is an array of two hundred pointers — a couple of kilobytes — and the frames inside it are the same frames the live state is using. The only genuinely new bytes in a history step are the one frame that actually changed.

This is the part worth taking away, and it is not really about undo: the immutability you adopted to keep React honest silently pays for a feature you had not written yet. Structural sharing is not an optimisation you bolt on. It is a thing you either already have or do not.

## The leak we were not looking for

Then we did the arithmetic on the model we were deleting.

Fifty steps of history. Per frame. Pruned only when a frame was deleted. So a 200-frame animation that you had drawn on a bit could sit on ten thousand history entries, each holding a full copy of a frame's stroke JSON, and nothing anywhere bounded it except how many frames you had drawn on. The cap felt safe because it was written as `50`. It was $50 \times \text{however long your animation is}$.

The document-level stack is fifty. Total. Across everything. And because the entries share their frames with the live state, fifty steps costs about fifty changed frames' worth of data.

We went in to fix a correctness bug and came out using less memory. That is not a brag — it is just what tends to happen when a data model stops arguing with the thing it is modelling. The per-frame map was paying, in memory, for a fiction.

## Where undo puts you

Restoring the frames turns out not to be enough.

Draw on frame 2. Navigate to frame 40. Press Ctrl+Z. If undo only restores the frame list, the right thing happens — your stroke on frame 2 is gone — and you see absolutely nothing, because you are looking at frame 40. You press it again. And again. You are now three edits deep into a part of your animation you cannot see.

So the snapshot carries the selection too, and undo puts you back on the frame where the edit happened. Undo a delete and you land on the frame that just reappeared, in its old position, with its drawing intact.

The trade is that undo can now move you around, which is a genuine cost — you can be reading frame 40 and get teleported. We took it anyway. An edit you cannot see is indistinguishable from a bug, and we had just finished fixing a bug that was exactly that.

## What it still does not cover

The title, the frame rate, and the canvas size. Those are settings rather than edits — you did not do them so much as choose them, and if you want the old value you can simply choose it again. Putting them in the undo stack would mean Ctrl+Z sometimes changes your frame rate, which is a new small lie to replace the old large one.

## The thing we would tell ourselves

Per-frame history was not a bad implementation of undo. It was a good implementation of something else, wearing undo's name, and it held up for as long as nobody asked it a question outside its vocabulary. The day someone deleted a frame and reached for Ctrl+Z, it did not fail — it answered anyway.

We would rather it had beeped.
