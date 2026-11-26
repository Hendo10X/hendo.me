---
title: i built a code editor, nobody asked
date: November 26, 2026
---

Every developer reaches a point where they look at their editor and think, "I can do this better." Most of them have the good sense to close the laptop and go and eat. I did not close the laptop.

So now there is h3nd0. It is a small, fast code editor. Tauri and Rust underneath, SolidJS and CodeMirror on top. It has tabs, splits, a file tree, search, a terminal, language servers, and AI agents that are not allowed to touch your files without permission. That last part is the whole point, and I will get to it.

I wrote a lesson for every step. Thirteen of them. Here is what they taught me, minus the parts where I stared at the ceiling.

## an editor is mostly not editing

I thought the hard part would be the text. It is not. CodeMirror handles text beautifully and asks for nothing in return.

The hard part is everything around the text. Which tab is open. Which pane has focus. What happens when you close the last tab in a split. What happens when you open thirty tabs in one pane and the row just... stops, and you cannot scroll to the one you need. (That happened. Your mouse wheel scrolls up and down, a tab row goes left and right, and somebody has to translate. That somebody was me.)

{{the text was the easy part}}

The fix for most of it was the same: keep the layout as one plain tree of data, never change it in place, and let every feature be a small function that takes the old tree and returns a new one. Once I did that, splits, pinning and closing stopped fighting each other.

## rust will tell you the truth to your face

Rust does not do "it works on my machine." It does "this will break on your machine, and here is the line." At first that feels rude. Then you notice your bugs have stopped arriving at 2am, because Rust collected them at compile time.

The lesson that stayed with me: the frontend is not trusted. The webview asks, Rust decides. If the frontend says "read this file," Rust checks that the file is inside the folder you opened. If it is not, the answer is no. No negotiation, no "but I'm the frontend."

## files are not as simple as they look

Saving a file sounds like one line of code. It is several:

- Write to a temporary file first, then swap it in, so a crash halfway through does not leave you with half a file.
- Remember whether the file used Windows line endings or Unix ones, and keep them. Nobody wants a 400-line diff because you saved a file.
- Know that JavaScript counts string positions in UTF-16 and Rust counts them in bytes. These two numbers are not the same, and an emoji in a search result will make sure you find out.

## protocols are just people agreeing on manners

Language servers speak JSON-RPC, and every message comes with a `Content-Length` header so you know where it ends. AI agents speak almost the same language through ACP, the Agent Client Protocol, except their messages end at a newline. Same family, different table manners. I wrote one JSON-RPC client and taught it both.

## the agent part

This is why h3nd0 exists. When an agent like Claude wants to change a file, h3nd0 does not let it write to disk. The write becomes a proposal. You see a diff. You click Accept or Reject. The agent knocks; you open the door.

Building it taught me a few humbling things:

- **Counting changed lines is hard.** My first diff counter said a one-line change was a four-line change. It was counting characters across line breaks. Fixed now. Mostly by being less clever.
- **"Nothing happened" is a real bug report.** I ran a task and got silence. The agent had started *before* I logged in, kept that old process running, and kept politely replying "Not logged in" into the void. Now a failed run shuts the process down, so the next one starts fresh.
- **API keys do not belong in files.** h3nd0 keeps them in the operating system's credential store. The UI can save a key and delete a key, but it cannot read one back. Not even to show you. Especially not to show you.

## things the computer taught me personally

- My C: drive is full. Everything lives on D: now. Rust, npm caches, the agent adapter, my hopes.
- Claude will not run inside Claude. Fair enough. I would not either.
- A loading spinner is a personality decision. I went from pulsing dots to an atom to a square that turns into a circle. The square stays.

## so, was it worth it

I now understand my tools in a way I did not before. Every time VS Code opens a file, I know roughly how many small decisions just happened, and I respect it more. I also still use h3nd0, which is the only review that counts.

Would I tell you to build your own editor? Yes. Not because the world needs another one. It does not. But you will never again look at a tab bar and think "how hard can it be."

It is hard. Now I know.
