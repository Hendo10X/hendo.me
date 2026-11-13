import Link from "next/link";
import Circled from "../components/circled";

type Project = {
  name: string;
  description: string;
  url: string | null;
  wip?: boolean;
};

const groups: { label: string; items: Project[] }[] = [
  {
    label: "Tools & infrastructure",
    items: [
      {
        name: "Mithril",
        description:
          "The payments plumbing every Nigerian fintech plugs into. One interface over every bank provider.",
        url: null,
        wip: true,
      },
      {
        name: "Recurr",
        description: "Developer-first subscription billing for the crypto economy.",
        url: "https://github.com/Hendo10X/recurr",
        wip: true,
      },
      {
        name: "Kai",
        description: "Local-first, voice-powered desktop automation.",
        url: "https://github.com/Hendo10X/kai",
        wip: true,
      },
      {
        name: "Pocketstrip",
        description:
          "Drop-in billing for SaaS: subscriptions and recurring payments with minimal setup.",
        url: "https://github.com/Hendo10X/pocketstrip",
      },
      {
        name: "Skrip",
        description:
          "A headless CMS made of plain markdown files. Drop them in a folder, get a JSON API back.",
        url: "https://www.skrip.space",
      },
      {
        name: "Airbag",
        description:
          "An execution-orchestration layer for JS/TS: replaces try/catch/finally with one declarative wrapper.",
        url: "https://airbag-sigma.vercel.app/",
      },
      {
        name: "Nanogo",
        description:
          "A lightweight Go web framework built from scratch: routing, middleware, JSON, extension points.",
        url: "https://github.com/Hendo10X/nanogo",
      },
      {
        name: "Nocki",
        description: "A CLI process orchestrator purpose-built for local development.",
        url: "https://github.com/Hendo10X/nocki",
      },
      {
        name: "Ghostki",
        description:
          "An offline CLI that mints burner crypto wallets and injects them straight into your .env.",
        url: "https://github.com/Hendo10X/ghostki",
      },
      {
        name: "Morphbadges",
        description:
          "A state-based UI component system where one badge animates between its states.",
        url: "https://morphbadges-landing.vercel.app/",
      },
      {
        name: "UnitCMS",
        description: "A content and configuration backend for mobile apps.",
        url: "https://unitcms.vercel.app",
      },
      {
        name: "Zodfather",
        description:
          "Paste JSON, build a schema visually, and render it as Zod and more. Nothing leaves your machine.",
        url: "https://zodfather.space",
      },
      {
        name: "Loamy",
        description:
          "Turn one brand color into a full design system, exported as CSS variables, Tailwind config, or JSON.",
        url: "https://loamy-one.vercel.app",
      },
      {
        name: "Kanopee",
        description:
          "Nested comment threads for React, Svelte, and Vue in three lines of code.",
        url: "https://kanopee-core.vercel.app",
      },
      {
        name: "Synxdown",
        description:
          "A lightweight npm package for markdown and HTML syntax highlighting.",
        url: "https://www.npmjs.com/package/synxdown",
      },
      {
        name: "gsap-skills",
        description: "A GSAP animation skill for AI coding assistants.",
        url: "https://github.com/Hendo10X/gsap-skills",
      },
    ],
  },
  {
    label: "Apps & products",
    items: [
      {
        name: "Crowdline",
        description:
          "Embeddable widgets that put live prediction-market data right next to a publisher's story.",
        url: "https://crowdline-iota.vercel.app/",
      },
      {
        name: "Quist",
        description: "A search engine for AI-solved problems.",
        url: "https://quist-web.vercel.app/",
      },
      {
        name: "Nepawatch",
        description:
          "Real-time power-outage tracking for Nigerian communities. No sign-up, no WhatsApp group.",
        url: "https://nepawatch-five.vercel.app",
      },
      {
        name: "Dispochat",
        description:
          "Disposable chat rooms that self-destruct after five minutes. No accounts, no logs, no trace.",
        url: "https://dispochat.vercel.app/",
      },
      {
        name: "Tento",
        description: "A personal taste profile. Rank your top 10 of anything and share it.",
        url: "https://tento-one.vercel.app/",
      },
      {
        name: "Zipdrop",
        description:
          "A utility that ends the hunt for postal codes and messy address formats.",
        url: "https://zipdrop-app.vercel.app/",
      },
      {
        name: "Bitstall",
        description: "A decentralized, local-first marketplace for Bitchat.",
        url: "https://github.com/Hendo10X/bitstall",
      },
      {
        name: "Flapstack",
        description: "A pastebin alternative with AI features.",
        url: "https://github.com/Hendo10X/flapstack",
      },
      {
        name: "Flipghost",
        description:
          "Draw frame-by-frame animations in the browser: a digital flipbook with onion-skinning and GIF export.",
        url: "https://github.com/Hendo10X/flipghost",
      },
      {
        name: "Fleent",
        description: "An AI all-purpose to-do app designed for people with ADHD.",
        url: "https://fleent.vercel.app",
      },
      {
        name: "Flint",
        description: "The mobile app for Fleent.",
        url: "https://github.com/Hendo10X/flint",
      },
      {
        name: "Waveroom",
        description: "A place to talk and chat about music, and the stats behind it.",
        url: "https://waveroom.vercel.app",
      },
      {
        name: "Jockify",
        description: "An AI-powered music remix assistant.",
        url: "https://jockify.vercel.app",
      },
      {
        name: "Mostlilkeyto",
        description: "A voting app for who is most likely to do something.",
        url: "https://mostlilkeyto.vercel.app",
      },
      {
        name: "Yardage",
        description: "A marketplace for students to sell their used things.",
        url: "https://github.com/Hendo10X/Yardage",
      },
      {
        name: "Cloutpass",
        description:
          "A scaffold for influence-as-a-service, built with Farcaster in mind.",
        url: "https://github.com/Hendo10X/cloutpass",
      },
      {
        name: "Rogue",
        description: "A social-media account marketplace and growth platform.",
        url: "https://github.com/Hendo10X/rogue",
      },
      {
        name: "Yapwithhendo",
        description: "An earlier version of my blog, built with Marble.",
        url: "https://yapwithhendo.vercel.app",
      },
    ],
  },
  {
    label: "Design & play",
    items: [
      {
        name: "Nuel",
        description:
          "An artist portfolio I used as a playground for animation: blur, carousels, page transitions.",
        url: "https://nuel-alpha.vercel.app/",
      },
      {
        name: "Teenageheads",
        description: "A love letter to the Teen Titans era of design.",
        url: "https://teenageheads.vercel.app/",
      },
      {
        name: "Adadelish",
        description: "A template design site built with GSAP and Motion.",
        url: "https://adadelish.vercel.app",
      },
    ],
  },
  {
    label: "Data & physics",
    items: [
      {
        name: "FIFdrift",
        description: "An ML tool that detects shifts in FIFA playstyle over time.",
        url: "https://github.com/Hendo10X/FIFdrift",
      },
      {
        name: "WPT Simulation",
        description:
          "A Python study of wireless power-transfer efficiency against distance, frequency, and misalignment.",
        url: "https://github.com/Hendo10X/WPT-simulation",
      },
    ],
  },
  {
    label: "Client & commissioned",
    items: [
      {
        name: "DMPartners",
        description:
          "A site for a commercial and investment advisory firm at the intersection of sports and African markets.",
        url: "https://dmp-hendo10x.vercel.app",
      },
      {
        name: "Solo",
        description: "A website for a talent-hunt firm.",
        url: "https://solo-weld.vercel.app",
      },
    ],
  },
  {
    label: "Games",
    items: [
      {
        name: "Glyph",
        description: "A shape-shifting physics platformer built in Godot 4.",
        url: "https://github.com/Hendo10X/glyph",
      },
      {
        name: "Ninja",
        description:
          "A minimalist top-down action game: fast combat, ragdolls, bullet time. Godot 4.",
        url: "https://github.com/Hendo10X/ninja",
      },
      {
        name: "Milo",
        description: "A 2D arcade stacking game in Godot 4: stack blocks, save the dog.",
        url: "https://github.com/Hendo10X/milo",
      },
    ],
  },
];

export default function WorksPage() {
  return (
    <>
      <header>
        <h1>Works</h1>
        <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>
          Things I&apos;ve built, shipped, or am still tinkering with.
        </p>
      </header>

      {groups.map((group) => (
        <section className="section" key={group.label}>
          <p className="section-label">{group.label}</p>
          <div className="works">
            {group.items.map((p) => (
              <div className="work" key={p.name}>
                <div className="work-head">
                  {p.url ? (
                    <Link
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-name">
                      {p.name}
                    </Link>
                  ) : (
                    <span className="work-name">{p.name}</span>
                  )}
                  {p.wip && <Circled>wip</Circled>}
                </div>
                <p className="work-desc">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
