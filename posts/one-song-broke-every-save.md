---
title: one song broke every save
date: November 21, 2026
---

Sound was the feature everyone asked for in Flipghost. A bouncing ball is nice. A bouncing ball that goes *boing* is a different thing entirely, and the first thing people did when audio shipped was drop a song under their animation.

Then they could not save it.

Not "it saved slowly". Not "it saved and lost the sound". The save button said *Retry save*, autosave quietly gave up, and the animation only existed in the tab you were looking at.

## The shape of the bug

Add a song. Draw a frame. The cloud icon spins, then turns red. Remove the song, and saving works again.

That last part is the whole clue. Nothing about the drawing had changed. Only the sound.

{{we were re-uploading the same song every 1.5 seconds}}

Here is what a clip looked like on the inside:

```typescript
interface AudioTrack {
  id: string
  name: string
  /** Data URL (base64) or Blob URL for audio playback */
  dataUrl: string
  startFrame: number
  offset: number
  trimDuration?: number
  volume: number
}
```

`dataUrl` was the entire file. Not a link to it. The file itself, base64-encoded, sitting inside the clip, sitting inside the project.

And a save sends the whole project. Autosave fires 1.5 seconds after you stop drawing, so every pause re-sent every song you had ever added.

## Why it broke where it broke

Flipghost runs on Vercel, and a Vercel function will not accept a request body over **4.5 MB**. It is not a setting you forgot. It is the wall.

The workshop let you add files up to 8 MB. Base64 makes a file about a third bigger. So an ordinary 4 MB song becomes a 5.3 MB string, and the save request that carries it is dead before it reaches the database.

It got worse with editing. Duplicate a clip and you get a copy of the clip, which means a copy of the file. Split a clip in two and both halves carry the whole song. A 1.5 MB sound effect, chopped into three pieces, was 6 MB of base64 in every save.

So it was not even "big files break saving". It was "editing sound breaks saving, eventually, depending on what you did".

## Why we built it that way

The data URL was not laziness. It was the shortest path to a feature that worked everywhere at once. An `<audio>` element plays a data URL. `fetch()` reads one, so the MP4 export could mix it in. The local copy of your work in IndexedDB stores it like any other string. One field, no server, no storage bucket, no upload step.

We even knew the bill was coming. The size limit had a comment above it:

> Audio rides inline in the project row as a base64 data URL on every save, so this caps the DB write size, not creativity. Lift it once audio moves to off-row object storage.

The plan was always to move it. We just found out where the edge was by walking off it.

## Store it once, point at it everywhere

The fix is the boring, correct one. A sound file is stored **once**, and clips hold a short reference to it instead of the file:

```
data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAA...   (megabytes)
asset:7f3c2a90-4b1e-4c55-9a0e-2d8f6b1c4e7a           (45 characters)
```

However many times you duplicate or cut a clip, every piece points at the same file. A save carries a few bytes for the sound, not a few megabytes.

The file still has to get to the server, and the upload hits the same 4.5 MB wall. So it goes up in pieces:

```typescript
/** Base64 characters per upload; a multiple of 4 so slices join cleanly. */
const CHUNK_CHARS = 3_400_000

for (let index = 0; index < total; index++) {
  const response = await fetch("/api/audio", {
    method: "POST",
    body: JSON.stringify({
      id,
      index,
      total,
      mime,
      data: base64.slice(index * CHUNK_CHARS, (index + 1) * CHUNK_CHARS),
    }),
  })
  id = (await response.json()).id
}
```

The "multiple of 4" matters more than it looks. Base64 encodes 3 bytes as 4 characters, so if you cut the string anywhere else, the pieces stop being valid base64 on their own and only make sense glued back together. Cutting on a multiple of 4 means the server can store each slice as it arrives, and the reader can join them back with a plain string concatenation.

The pieces land in one small table:

```typescript
export const audioChunks = pgTable("audio_chunks", {
  assetId: uuid("asset_id").notNull(),
  index: integer("chunk_index").notNull(),
  userId: text("user_id").notNull(),
  mime: varchar("mime", { length: 64 }).notNull(),
  total: integer("total").notNull(),
  data: text("data").notNull(),
}, (t) => [primaryKey({ columns: [t.assetId, t.index] })])
```

Yes, that is audio in Postgres. Object storage like S3 or R2 is the grown-up answer, and it is where this goes later. But one rule in this codebase is that the build must never depend on a secret being present, and a database was already there. A table was the smallest change that stopped people losing work this week.

## When the upload happens

You can use Flipghost without an account, and a scratch project never touches the server. So a new clip still starts life as a data URL, stored locally like before.

The swap happens on the first cloud save. Before the project goes up, any clip still holding a whole file gets uploaded, and the clips switch to their `asset:` reference:

```typescript
const refs = new Map<string, string>()
for (const src of new Set(pending.map((c) => c.dataUrl))) {
  refs.set(src, await uploadAudio(src))
}
```

The `Set` is the duplicate fix in one line. Three clips cut from one song are one upload, not three. Uploads are also remembered per file, so the next save does not even look at the sound again. Old projects that were saved with sound inside them still open, and their next save moves the sound out and shrinks them.

## Getting it back

Everything that plays or reads sound now asks one function for a URL it can use: the workshop's playback, the waveforms, the MP4 export and the public share page.

```typescript
export function resolveAudio(src: string): Promise<string>
```

A data URL comes straight back. An `asset:` reference is fetched in pieces, joined, turned into a `Blob` and handed back as an object URL, then cached so it is only ever fetched once. Clips are fetched as soon as a project opens, so by the time you press play the sound is already there.

Reading a sound back does not need you to be signed in. That was deliberate: when you share an animation, the people watching it need to hear it. The id is a random UUID that only ever appears inside a project, so nobody can go looking for your files. Writing, on the other hand, needs an account, and only the person who uploaded a file can add to it.

## While we were in there

Fixing saving meant touching every piece of sound code, so the sound UI got rebuilt too. The old one was a small popover on each clip, with everything crammed in.

Now there is a **Sound** drawer above the timeline. It lists every clip, and the one you pick gets a real editor: the whole file as a waveform, with a handle at each end to shorten it.

Trimming the start of a clip has one subtle rule. When you drag the start handle in, the sound that is left should not move. If a drum hit lands on frame 12, it should still land on frame 12 after you trim the silence before it. So trimming the start moves the clip's first frame by the same amount:

```typescript
startFrame: d.startFrame + Math.round((offset - d.offset) * fps)
```

**Join with next** turned out to mean two different things, depending on what you are joining. If you cut a clip in two and then join the halves, you want your one clip back, not two clips sitting next to each other. If you are joining two different sounds, you want the second to start exactly where the first ends. So join checks which one it is:

```typescript
const continues =
  next.dataUrl === a.dataUrl &&
  Math.abs(next.offset - (a.offset + lenA)) < 0.05
```

Same file and picking up where this one left off means it was a cut, so the halves merge back into one clip. Anything else slides over to butt up against it.

The last piece is timing. Loops, fades and trims have to sound the same in the workshop, on a shared link and in the exported MP4. The workshop and the share page now read from one shared timing helper, and the export builds the same rules into its ffmpeg filter (`atrim`, `afade`, `aloop`, `adelay`). Three places, one definition of "where is this clip at frame 40".

## The lesson I keep relearning

The bug was never the song. The song was fine. The bug was that the project had quietly become a place where whole files lived, and nothing told us until one of them was too big to carry.

If a value can be megabytes, it probably does not belong inside the thing you save every 1.5 seconds. Put it somewhere once, and point at it.

If your Flipghost project with music still will not save, tell me. I would rather hear about it than have you lose it.
