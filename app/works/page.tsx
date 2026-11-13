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
