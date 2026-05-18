---
title: Building Zodfather
date: April 25, 2026
---

A single-pane technical writeup on how I built [Zodfather](https://zodfather.space) — a browser tool that converts raw JSON into TypeScript Zod schemas, lets you build schemas visually, and renders the same schema six different ways. Nothing leaves your machine; everything happens client-side.

This article walks the architecture from the inside out: the intermediate representation, the inference pipeline, schema generation, the multi-view system, and the choices that made the editor feel sharp rather than busy.

## The problem

If you write a TypeScript backend that talks to anything — Stripe, GitHub, your own gateway, a webhook — you spend a non-trivial slice of your week typing this:

```ts
const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  joinedAt: z.string().datetime(),
  age: z.number().int().positive(),
  isMember: z.boolean(),
  // …forty more fields the docs only show as JSON
})
```

It's never the interesting part. You stare at a sample payload, mentally walk every key, decide which refinements you need, and type it out. Once. Then again next week for the next endpoint. The information is already in the JSON — the shape, the formats, which fields are nullable. Pulling it out by hand is busywork.

So Zodfather treats a JSON sample as the spec. Paste it, click any refinements you want on top of the defaults, copy the result.

But "paste and copy" is the import path. A schema is also a *thing you compose*, and once it exists as a structured value in memory, there's no reason it can only be displayed one way. So Zodfather also does two harder things: it lets you **build** a schema visually with no JSON at all, and it **renders the same schema in six different views**.

## The intermediate representation

Everything in Zodfather is one tree. That decision is what makes the rest of the app cheap.

```ts
// lib/schema/types.ts
export type SchemaKind =
  | "string"
  | "number"
  | "boolean"
  | "null"
  | "unknown"
  | "object"
  | "array"

export type SchemaNode = {
  id: string
  path: string
  key: string
  kind: SchemaKind
  optional: boolean
  nullable: boolean
  refinements: Refinement[]
  children?: SchemaNode[]   // object
  item?: SchemaNode         // array
}
```

A `SchemaNode` is a self-similar value: a `kind`, optional metadata, and either `children` (for objects), `item` (for arrays), or nothing (for primitives). Refinements like `.email()` or `.min(3)` are a small typed union stored on each primitive node.

This shape collapses a few things that other tools split into separate codepaths:

- "I parsed some JSON" and "I built a schema in the UI" both yield a `SchemaNode`.
- "Render the Zod code" and "render a tree diagram" both walk a `SchemaNode`.
- "Toggle nullable" and "rename a field" both produce a new `SchemaNode` via the same pure mutator.

The rest of the architecture is downhill from here.

## Inference: JSON in, IR out

The parser does three jobs: detect primitive types, unify array shapes, and pick smart default refinements.

```ts
// lib/schema/infer.ts
export function inferSchema(value: unknown, key = "", path = ""): SchemaNode {
  if (Array.isArray(value)) {
    const itemSchemas = value.slice(0, 50).map((v, i) =>
      inferSchema(v, "", `${path}[${i}]`)
    )
    const item = itemSchemas.length
      ? mergeNodes(itemSchemas, `${path}[]`)
      : makeUnknownNode("", `${path}[]`)
    return { /* kind: "array", item, … */ }
  }
  // …object branch
  // …primitive branch, with autoRefinements(value)
}
```

The interesting bit is **shape unification** for arrays. JSON tells you a field is an array, but it doesn't tell you whether the array is homogeneous. So I sample up to 50 elements, recursively infer each, and merge.

The merge has three rules:

- **Mixed kinds collapse to `unknown`**, with one exception: `null` mixed with anything else is treated as nullability on the other type.
- **Objects union their keys**, and any key that didn't appear in *every* sample is marked `optional`. This is what makes the output schema honest about partial data.
- **Refinements intersect**. If every string in the array matches `.uuid()`, the merged item gets `.uuid()`. If only some do, the chip is left off.

Refinement detection itself is tiny regex over each sampled value:

```ts
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const UUID_RE  = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const ISO_RE   = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/
```

This is intentionally conservative — it picks refinements I'm confident about and leaves the rest. You can always click more refinements on. You shouldn't have to click them off.

## Generation: IR out, Zod in

Generation is a straight tree walk that emits a string. The recursive pair:

```ts
// lib/schema/generate.ts
function nodeToCode(node, indent, opts) {
  const inner = innerCode(node, indent, opts)
  let suffix = ""
  if (node.kind === "object" && opts.strict && node.children?.length) {
    suffix += ".strict()"
  }
  if (node.refinements.length) {
    suffix += node.refinements.map(refinementToCode).join("")
  }
  if (node.nullable) suffix += ".nullable()"
  if (node.optional) suffix += ".optional()"
  return inner + suffix
}

function innerCode(node, indent, opts) {
  switch (node.kind) {
    case "string": return "z.string()"
    case "number": return "z.number()"
    case "array":  return `z.array(${nodeToCode(node.item, indent, opts)})`
    case "object": {
      const pad = "  ".repeat(indent + 1)
      const lines = node.children.map(c =>
        `${pad}${safeKey(c.key)}: ${nodeToCode(c, indent + 1, opts)},`
      )
      return `z.object({\n${lines.join("\n")}\n${"  ".repeat(indent)}})`
    }
    // …
  }
}
```

There are two things I care about here, and neither is the Zod method names:

- **`safeKey()` quotes any key that isn't a valid JS identifier.** Real-world JSON keys include `2fa_enabled`, `http.method`, `kebab-case-key`. Emitting unquoted keys for those would compile to broken code and break the user's day.
- **Suffix order is fixed**: refinements first, then `.nullable()`, then `.optional()`. Zod cares about the order — `.nullable().optional()` ≠ `.optional().nullable()` in inferred types — and getting it wrong silently changes the meaning. So the generator is the only place that emits suffixes, and the order is hardcoded.

Other generators (TypeScript types, JSON Schema) use the same tree walk with different leaf strings. The `.strict()` flag, the schema name, the export style — all configuration on the same function.

## Six views, one tree

The schema pane is a tab switcher with six modes. Every mode renders from the same `SchemaNode`.

```ts
// components/convert/schema-tree-pane.tsx
switch (view) {
  case "tree":       return <TreeView root={root} editable={editable} … />
  case "hierarchy":  return <HierarchyView root={root} />
  case "mindmap":    return <MindMapView root={root} />
  case "table":      return <TableView root={root} />
  case "jsonSchema": return <CodeView code={jsonSchemaCode} lang="json" />
  case "typescript": return <CodeView code={typescriptCode} lang="typescript" />
}
```

The interesting ones:

- **Tree** — the clickable editor view. The only view that's editable. Refinement chips, rename-in-place, type pickers, add/remove buttons. Everything else is read-only.
- **Hierarchy** — a vertical org-chart layout. Each composite node is a card; children sit underneath connected by SVG paths. Reads like a system diagram.
- **Mindmap** — radial layout. The root sits at the center; depth-1 children fan out around it; deeper nodes branch off their parents. Useful when an object has a lot of top-level keys and you want them all at once.
- **Table** — flattened key/type/refinement table. Good for paste-into-Notion documentation, and for grokking large flat payloads at a glance.

`lib/schema/views/flatten.ts` and `layout.ts` do the math that turns a `SchemaNode` into x/y positions for hierarchy and mindmap. Both are pure — they take a tree, return an array of `{ node, x, y, parent }` items, and the React components do nothing but read those.

This is the highest-leverage bit of the architecture: **adding a seventh view costs almost nothing.** Want ER-diagram boxes? D2-style? An animated flow? Write the layout function, write the component, register the tab.

The transition between views animates with Motion's `AnimatePresence mode="wait"` so a view fades out before the next fades in — clean enough that you actually feel like you're spinning the same object, not loading different ones.

## The builder: mutating the tree

Build mode is the editor running with no JSON pane and a writable tree. Every interaction is a typed action against the reducer:

```ts
type Action =
  | { type: "add-child";   parentId: string; kind: SchemaKind }
  | { type: "remove-node"; id: string }
  | { type: "rename-key";  id: string; key: string }
  | { type: "change-kind"; id: string; kind: SchemaKind }
  | { type: "toggle-optional"; id: string }
  | { type: "toggle-refinement"; id: string; refinement: Refinement }
  // …
```

The mutators (`lib/schema/mutate.ts`) are pure and share-by-reference. The key helper is `mapTree`:

```ts
export function mapTree(node, fn) {
  const mapped = fn(node)
  if (mapped.kind === "object" && mapped.children) {
    const next = mapped.children.map(c => mapTree(c, fn))
    const changed = next.some((c, i) => c !== mapped.children![i])
    if (changed) return { ...mapped, children: next }
    return mapped
  }
  if (mapped.kind === "array" && mapped.item) {
    const item = mapTree(mapped.item, fn)
    if (item !== mapped.item) return { ...mapped, item }
    return mapped
  }
  return mapped
}
```

Because untouched subtrees keep their previous identity, React reconciliation skips them. A 200-field payload with one renamed leaf re-renders one row, not 200. No memoization needed.

`changeKind` is the only action that destroys data: switching a field from `object` to `string` drops children and refinements rather than smuggling them under a hidden flag. It's a clean break. The user is asking for a different field; we give them one.

A nice side effect: because the import-mode tree and the build-mode tree are the same value, you can switch mid-session. Import a Stripe charge, flip to build, add three custom metadata fields, copy the schema. The JSON pane simply hides; the tree persists.

## State model and persistence

One `useReducer`, one tree, one piece of `localStorage`.

```ts
const STORAGE_KEY = "zodfather:draft:v2"

useEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    raw: state.raw, name: state.name, strict: state.strict, mode: state.mode,
  }))
}, [state.raw, state.name, state.strict, state.mode])
```

I don't persist the parsed tree — I persist the inputs that produce it. Reload, re-parse, you're where you left off. It also means schema changes (new refinements, generator bug fixes) flow through to your old draft without a migration step.

The version suffix on the storage key (`v2`) is the only migration tool. Bump it when the input contract changes, accept the cost of one wiped draft.

## UI choices

The visual language is one decision applied everywhere: **make everything small, make everything monospaced, leave room around things.** Once you commit, the whole app reads like an editor instead of a marketing page.

A few specific patterns that punched above their weight:

- **Shiki** for code rendering. One singleton, one theme (`github-light`), client-side `codeToHtml`. The Zod output pane, the JSON schema view, the TypeScript view, and the example cards all read from the same highlighter. I dropped dark mode because the single-theme aesthetic is cleaner and removed an entire dependency.
- **Motion** for everything stateful. Mode switch uses `layoutId` so the active pill slides between Import and Build. Tree rows expand/collapse with a `height: auto` animation. View transitions cross-fade. None of it is decorative — it's all communicating change.
- **Hugeicons** for icons. Strict 11–13 px sizing everywhere keeps icons from competing with the text.
- **Progressive blur** for sticky headers. Stacked `backdrop-blur` layers, each masked with a vertical gradient. Content scrolls behind in a real frosted-glass way rather than hard-cutting at the header edge.
- **Mobile guard**. The editor is three columns of dense controls. I tried to make it work on phones and gave up — it's a bad version of itself at 375px. So a `MobileGuard` wraps the entire layout and shows a centered "Open on desktop" card under `xl`. Better than shipping a degraded experience.

I also wrote 28 curated examples (`lib/examples.ts`) across Auth, Payments, DevOps, Social, Commerce, Media, Data, AI, Productivity, Infra, and Content. They serve double duty: a real-world tour for new users, and my regression suite. If the OpenAI completion example stops generating a clean schema, I know the inference changed.

## Use cases

**Onboarding a new API.** Paste a sample response, copy the schema, drop it into your client. Five seconds versus five minutes.

**Validating webhook payloads.** Real webhook samples are messy — optional fields, mixed shapes, ISO timestamps masquerading as strings. The array-shape unification was built for this; it tells you, accurately, which fields are sometimes missing.

**Documenting an internal type.** Switch to the Table view. Screenshot it. It looks like documentation because it *is* documentation, with no extra work.

**Drafting a new endpoint.** Start in Build mode. Add fields. Decide types as you go. Copy the schema, drop it in your Hono route, write the handler.

**Migrating from JSON Schema or OpenAPI fragments.** Import the payload, switch to the JSON Schema view, paste back. Same shape, Draft-07 vocabulary.

**Teaching Zod.** Show the JSON, show the generated code side by side, click refinements off and on. The connection is visible.

## What I deliberately left out

- **Sharable URLs.** Encoding the tree into a URL hash is doable; I've held off because every user I've watched copies the code into a file within seconds of loading the page. Persisting locally was higher value.
- **Cmd-K palette.** Adds complexity in exchange for one keystroke. Maybe later.
- **Server-side anything.** No accounts, no telemetry, no remote rendering. The entire app is static — `/`, `/convert`, `/examples`. The build output is four prerendered HTML files plus client bundles.
- **A "convert from TypeScript types" path.** Tempting. Out of scope until I'm confident the JSON path is mature.

## Stack

- **Next.js 16** (App Router, Turbopack). Three static routes. No server components doing real work — everything that matters runs in the browser.
- **Tailwind v4** with a small custom token set. No component library underneath; raw HTML elements styled with utilities.
- **Motion** (the successor to Framer Motion).
- **Shiki** for syntax highlighting.
- **Zod** itself — used in the generated code, not in the app code.
- **Bun** for the package manager, dev server, and lockfile.

The bundle is small because the architecture is small. One IR, one reducer, six views all reading from the same value. Every feature added has cost, and the cheapness of adding things only stays cheap if the center holds.

That's the whole project.
