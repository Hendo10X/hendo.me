---
title: A stroke is not a line
date: July 15, 2026
---

Pick up a stylus, open most drawing tools in a browser, and press harder.

Nothing happens.

Not not much. Nothing. The line you are drawing is exactly as wide as it was, and it will stay exactly that wide for its entire length, no matter what you do with your hand. Every animator who has ever picked up a real pencil notices this in about four seconds, and it is the single fastest way to make a drawing tool feel fake.

The reason is not that pressure is hard to read. It is that the line was never a line.

## One width, for the whole life of the stroke

Flipghost's canvas runs on Fabric, and Fabric's built-in `PencilBrush` does the obvious sensible thing: it collects your pointer positions and emits a `Path` with a `strokeWidth`.

Singular. One number. For the entire path.

That is not Fabric being lazy — it is inherited from the model underneath. A stroked path, in SVG and in Canvas alike, has a stroke width. The width is a property of the whole path, not of any position along it. There is no syntax for "3px here, tapering to 0.5px by the end", because the stroke is applied to the geometry uniformly, as a single operation, after the fact.

So pressure has nowhere to go. You can sample it beautifully — sixty readings a second, perfectly accurate — and then you arrive at the API and there is one slot for width and you have to put one number in it. Everything you measured collapses to an average.

## The tempting fix, and why it is worse

The first idea everyone has, ourselves included: chop the stroke into segments. Every few points, start a new path with its own `strokeWidth`. Enough segments and you have a variable-width line.

It works, in the sense that a photograph of it looks right. Living with it is another matter. You get seams where segments butt together, and every seam is a place where a semi-transparent brush double-darkens because two paths overlap. You get one canvas object per segment, so a single flick of the wrist becomes forty objects for the renderer to track, for the serialiser to write out, and for undo to carry around. And the joins fight you: each segment gets its own round caps, so the outline pulses subtly wider at every junction, which reads as a lumpy line rather than a tapered one.

You are essentially trying to fake a shape out of many lines. So draw the shape.

## Draw the outline, not the path

This is the reframe the whole brush hangs on, and it is worth saying slowly.

When you drag a real brush across real paper, the mark it leaves is not a line. It is a region — a long thin blob, fat where you leaned in, narrow where you lifted, tapered at both ends. We describe it as a line out of habit, but what is actually on the paper is a filled shape with a silhouette.

So compute that silhouette directly. `perfect-freehand` takes your sampled points, each carrying its own pressure, and returns the outline of the resulting mark: a closed polygon that traces all the way up one side of the stroke and back down the other, bulging where pressure was high and pinching where it was low.

Then fill it. No stroke at all:

```typescript
const path = new Path(data, {
    fill: this.color,
    stroke: null,
    strokeWidth: 0,
});
```

That is the punchline of the entire feature. The brush that finally has a variable stroke width is the one with `strokeWidth: 0`. There is no stroke anywhere in it. It is a filled shape that happens to be long and thin, and its width varies for the same reason a puddle's width varies: because that is the shape it is.

Smoothing falls out of the same pass for free, incidentally. Once you are computing a silhouette rather than connecting dots, "smooth the line" and "shape the outline" are the same operation, which is why there is no separate smoothing step anywhere in the code.

## Your hardware is lying about pressure

Now the awkward part. Having built a brush that can express pressure, we went to read some, and found that most devices do not have any.

The web exposes `PointerEvent.pressure`, a number from 0 to 1, and it is honest exactly once: when the pointer is a pen. Otherwise:

- A mouse reports 0.5. Always. Constantly. While any button is held, the pressure is 0.5, because the spec has to return something and half seems fair.
- A touchscreen frequently reports 0, or a flat 1, depending on the device and the browser. Some report a real value from the contact patch. Most do not.

So a naive `size = pressure * width` gives every mouse user a line of precisely one constant width — we would have travelled a long way to reimplement the problem we started with — and gives some touch users a stroke of width zero, which is worse, because it is invisible.

The rule ends up being explicit about who to trust:

```typescript
function readsPressure(e: TPointerEvent) {
    return (e as PointerEvent).pointerType === "pen";
}
```

Only a pen. If it is a pen and it reports something above zero, use it. Otherwise fall back to a flat 0.5 and hand the problem to `perfect-freehand`'s `simulatePressure`, which infers pressure from velocity instead: fast strokes come out thin, slow strokes come out fat.

That sounds like a consolation prize and it is not. It is close to what a real brush does — drag a loaded brush quickly and it lays down less ink, precisely because it has less time to. A mouse user gets a line that thins on the fast confident sweeps and thickens through the slow careful curves, which is a decent likeness of intent even though the hardware told us nothing. The device is deciding per stroke, on pointer-down, which world it is in.

## The whole silhouette, every single frame

One more thing worth knowing, because it violates an instinct.

A fixed-width line is append-only. New point, new segment, draw it, done. Never touch what is already there.

A pressure stroke is not. Its outline is not a running total — a point you add now can still reshape the tail behind it, because streamline pulls the rendered stroke toward the pointer path with a lag, and the ends taper relative to where the stroke finishes. The silhouette is a function of the whole point list, so if the list changes, the whole silhouette changes.

So every pointer move throws the outline away and rebuilds it from all the points collected so far, then fills it onto the top canvas layer. Which sounds ruinous, and simply is not: a stroke is a few hundred points at most, the maths is arithmetic, and it comfortably finishes inside a frame. The expensive-sounding thing was cheap, and the clever incremental thing we did not write would have been wrong.

The last point of the stroke gets one extra flag — `last: true` — which is how `perfect-freehand` knows to close off the tail properly rather than leaving it mid-taper as though your hand were still moving.

## What did not change

The new brush fires the same `path:created` event the old one did. The canvas wiring did not need to know about any of this, undo did not need to know, and paths drawn by the old brush still render exactly as they always did, because they are still perfectly valid stroked paths.

That was deliberate, and it is the part we would do the same way again. The interesting change was one class deep. Everything above it kept its assumptions, including the assumption that what it is storing is a line.

Which it is not. It never was.
