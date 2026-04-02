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
    name: "TEENAGEHEADS",
    description:
      "Teenageheads is a project heavily inspired by the Teen Titans — the looks, the characters, the energy. A love letter to that era of design.",
    url: "https://teenageheads.vercel.app/",
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
                  className="font-dm-sans font-bold text-sm text-foreground hover:underline underline-offset-4">
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
            <p className="font-karla text-sm text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
