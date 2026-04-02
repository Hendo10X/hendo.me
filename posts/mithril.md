---
title: Why I'm Building Mithril
date: April 02, 2026
---

In Tolkien's world, mithril is the metal that does the impossible quietly. It's lighter than silk, harder than steel, and the dwarves nearly destroyed an entire mountain trying to mine more of it. Bilbo's mithril shirt looked like a plain silver vest — nobody gave it a second thought until a cave troll drove a spear through it and Frodo didn't die. The whole point of mithril is that it sits underneath everything. It doesn't draw attention to itself. It just holds.

That's the exact mental image I had when I started building this thing.

**The actual problem**

If you've ever tried to build a fintech product in Nigeria, you know the situation. You pick a bank provider — let's say Provider A — you spend a few weeks integrating their API, handle all their quirks, write all the edge cases, and ship. Then one Tuesday morning, Provider A goes down. Not a brief outage. Down. Your support inbox is on fire, transactions are failing silently, and your users are losing trust in a product that is actually working fine — it's just standing on a foundation that crumbled.

So you add Provider B as a fallback. Now you're maintaining two integrations. Two different APIs, two different error formats, two different authentication flows, two different ideas of what a "successful transaction" even looks like. Then Provider B raises their fees, and suddenly you need Provider C. Now you have three integrations, and every new feature you build has to account for all three.

This is just the normal state of building fintech in Nigeria.

Every startup is solving this exact same plumbing problem on their own. The talented engineers at these companies are spending real, expensive engineering hours reimplementing the same fallback logic, the same provider translation layer, the same retry mechanisms — from scratch — over and over again. It's not interesting work. It's not differentiated. It's just the tax you pay for operating in an environment where the infrastructure is fragmented.

That tax shouldn't exist.

**What Mithril actually does**

Mithril is a single integration layer that sits between a fintech product and every bank provider in Nigeria. You plug into Mithril once. You get a unified API that speaks one language regardless of what's running underneath. When Provider A goes down, Mithril routes to Provider B automatically. When Provider B's fees spike, you switch the routing logic from one place. When a new provider enters the market, Mithril adds them — and every product plugged into Mithril gets access without touching their own code.

The individual fintechs never have to think about which bank is up, which is down, or how to translate between their different data formats. They just build their actual product.

That's the mithril shirt. Invisible, unassuming, and the thing that keeps everything alive when it gets hit.

**Why I specifically care about this**

I'm a physics graduate. I spent years studying systems — how they behave, how they fail, how you model the underlying rules instead of the surface behaviour. The Nigerian fintech space, from where I'm standing, has a very obvious underlying rule that nobody has cleanly abstracted yet: the payment infrastructure is fragmented and unstable, and every product layer above it is paying a complexity tax that compounds over time.

I also just find it genuinely frustrating to watch good engineers burn time on solved problems. The fallback logic for a payment provider is a solved problem. The translation between two bank APIs is a solved problem. The only reason it keeps getting rebuilt is that there's no shared layer to build it on.

Mithril is that layer.

It's not a flashy product. It doesn't have a slick consumer interface or a viral growth loop. It's plumbing. But the best infrastructure is always boring from the outside — it's only interesting when you trace how many things depend on it.

Deep in the mines of Moria, the dwarves dug too greedily and too deep chasing mithril. I'm not suggesting Nigerian fintech infrastructure is as dramatic as that. But the principle holds — the most valuable material is often the one buried underneath everything else, the one you only notice when it's gone.

I'm building Mithril because I think that layer should exist, and it doesn't yet.

So I'm making it.
