import Link from "next/link";

const projects = [
    {
        name: "MITHRIL",
        description:
            "Mithril is the plumbing layer that every Nigerian fintech plugs into, so they never have to think about which bank provider to use, what happens when one breaks, or how to translate between all of them.",
        url: null,
        status: "WIP",
    },
    {
        name: "CROWDLINE",
        description:
            "Crowdline turns prediction market data into embeddable widgets that publishers drop into their articles — so readers see what thousands of people are actually betting on, right next to the story they're already reading.",
        url: "https://crowdline-iota.vercel.app/",
        status: null,
    },
    {
        name: "AIRBAG",
        description:
            'Airbag is an "Execution Orchestration Layer" for JavaScript/TypeScript. It replaces manual try/catch/finally blocks with a declarative wrapper. It handles the lifecycle of any asynchronous function: Loading state, Error catching, Success feedback, Retries, and Timeouts.',
        url: "https://airbag-sigma.vercel.app/",
        status: null,
    },
    {
        name: "SKRIP",
        description:
            "Skrip is a lightweight headless CMS that uses plain markdown files as structured content. Drop files in a folder, get a clean JSON API back. No database, no dashboard.",
        url: "https://www.skrip.space",
        status: null,
    },
    {
        name: "TENTO",
        description:
            "Tento is a personal taste profile where you rank your top 10 of anything and share it with the world",
        url: "https://tento-one.vercel.app/",
        status: null,
    },
    {
        name: "DISPOCHAT",
        description:
            "DispoChat is a disposable chat app where you share a 6-letter room code with a friend and have 5 minutes to talk before the conversation self-destructs permanently. No accounts, no logs, no trace — when the timer dies, it never happened.",
        url: "https://dispochat.vercel.app/",
        status: null,
    },
    {
        name: "ZIPDROP",
        description:
            "ZipDrop is a smart digital utility designed to end the frustration of hunting for elusive postal codes and messy address formats.",
        url: "https://zipdrop-app.vercel.app/",
        status: null,
    },
    {
        name: "NUEL",
        description:
            "Nuel is a simple artist portfolio I built as a mock for one of my classmates from secondary school. I used it as a playground to explore animations — blur effects, carousel loops, page transitions, and Combo usage.",
        url: "https://nuel-alpha.vercel.app/",
        status: null,
    },
    {
        name: "NEPAWATCH",
        description:
            "Nepawatch is a real-time power outage tracking app for Nigerian communities. It lets anyone instantly check whether their area currently has electricity — no sign-up, no WhatsApp group to join, no asking around.",
        url: "https://nepawatch-five.vercel.app",
        status: null,
    },
    {
        name: "TEENAGEHEADS",
        description:
            "Teenageheads is a project heavily inspired by the Teen Titans — the looks, the characters, the energy. A love letter to that era of design.",
        url: "https://teenageheads.vercel.app/",
        status: null,
    },
    {
        name: "QUIST",
        description: "The search engine for AI-solved problems.",
        url: "https://quist-web.vercel.app/",
        status: null,
    },
    {
        name: "GHOSTKI",
        description:
            "Ghostki is a lightning-fast, offline terminal tool that instantly generates secure burner crypto wallets and automatically injects them directly into your project's .env files for seamless local testing. Generate new key Run in the terminal.",
        url: "https://github.com/Hendo10X/ghostki",
        status: null,
    },
    {
        name: "MORPHBADGES",
        description:
            "Morphbadges is a dynamic state-based UI component system where a single badge smoothly transforms into different states.",
        url: "hhttps://morphbadges-landing.vercel.app/",
        status: null,
    },
    {
        name: "NANOGO",
        description:
            "A lightweight Go web framework built from scratch with support for routing, middleware, JSON handling, and extension points.",
        url: "https://github.com/Hendo10X/nanogo",
        status: null,
    },
    {
        name: "KAI",
        description: "Local-first, voice-powered desktop automation.",
        url: "https://github.com/Hendo10X/kai",
        status: " WIP",
    },
    {
        name: "RECURR",
        description:
            "Recurr is a developer-first subscription billing infrastructure for the crypto economy.",
        url: "https://github.com/Hendo10X/recurr",
        status: "WIP",
    },
    {
        name: "NOCKI",
        description:
            "Nocki is a CLI tool and process orchestrator purpose-built for local development.",
        url: "https://github.com/Hendo10X/nocki",
        status: null,
    },
    {
        name: "FLAPSTACK",
        description: "A pastebin alternative with AI features.",
        url: "https://github.com/Hendo10X/flapstack",
        status: null,
    },
    {
        name: "BITSTALL",
        description: "A decentralized, local-first marketplace for Bitchat.",
        url: "https://github.com/Hendo10X/bitstall",
        status: null,
    },
    {
        name: "POCKETSTRIP",
        description:
            "Pocketstrip is an opinionated billing platform that helps developers add subscriptions and recurring payments to their saas products with minimal setup.",
        url: "https://github.com/Hendo10X/pocketstrip",
        status: null,
    },
    {
        name: "FLIPGHOST",
        description:
            "a web app where artists and animators draw frame-by-frame animations directly in their browser, like a digital flipbook. It features a simple timeline, onion skinning, and export to GIF or video.",
        url: "https://github.com/Hendo10X/flipghost",
        status: null,
    },
];

export default function WorksPage() {
    return (
        <div className="max-w-prose">
            <h1 className="text-2xl font-bold font-dm-sans mb-8">Works</h1>
            <div className="flex flex-col gap-8">
                {projects.map((project) => (
                    <div key={project.name}>
                        <div className="flex flex-row items-center gap-2 mb-2">
                            {project.url ? (
                                <Link
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-dm-sans font-bold text-sm text-foreground hover:underline underline-offset-4"
                                >
                                    {project.name}
                                </Link>
                            ) : (
                                <span className="font-dm-sans font-bold text-sm text-foreground">
                                    {project.name}
                                </span>
                            )}
                            {project.status === "WIP" && (
                                <span className="text-xs border border-pink-500 text-pink-500 px-2 py-0.5 rounded-full">
                                    WIP
                                </span>
                            )}
                        </div>
                        <p className="font-karla text-sm text-muted-foreground dark:text-foreground leading-relaxed">
                            {project.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
