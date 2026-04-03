import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-prose">
      <h1 className="text-2xl font-bold font-dm-sans mb-6">
        Henderson Dike-Benard
      </h1>
      <div className="flex flex-col gap-4 text-muted-foreground dark:text-foreground font-karla text-sm leading-relaxed">
        <p>I&apos;m interested in building things and understanding how they work.</p>
        <p>
          My background is in physics, which trained me to think about systems
          from first principles. Most of my work now sits somewhere between
          engineering, design, and product building. I like creating tools and
          software that are simple, useful, and thoughtfully engineered.
        </p>
        <p>
          I&apos;m especially drawn to the process of turning ideas into real things.
          Sometimes that means writing code, sometimes designing interfaces, and
          sometimes experimenting with strange technical ideas just to see what
          happens.
        </p>
        <p>
          Right now I&apos;m focused on building tools that reduce friction — things
          that feel obvious in hindsight but didn&apos;t exist yet. Most of what I
          ship is small and specific rather than big and general.
        </p>
        <p>
          This site is a place where I collect some of the things I&apos;ve worked
          on and some of the things I&apos;ve been thinking about.
        </p>
      </div>

      <div className="mt-10">
        <h2 className="font-dm-sans font-bold text-sm text-foreground mb-3">
          INTERESTS
        </h2>
        <div className="flex flex-col gap-4 text-muted-foreground dark:text-foreground font-karla text-sm leading-relaxed">
          <p>
            Outside of building products, I spend a lot of time reading. My
            interests drift between science, technology, philosophy, and the
            occasional obscure subject that seems interesting enough to chase
            for a while.
          </p>
          <p>
            In my spare time, I enjoy finding new music and scrolling through
            Pinterest for inspiration across photography, design, urban art, and
            cats. I&apos;m also a huge fan of football, Sudoku, mental maths,
            and talking about philosophy — big stoicism guy, for what it&apos;s
            worth.
          </p>
          <p>
            You can find me on{" "}
            <Link
              href="https://x.com/boihendo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
              X
            </Link>
            ,{" "}
            <Link
              href="https://github.com/Hendo10X"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
              GitHub
            </Link>
            , or reach me via{" "}
            <Link
              href="mailto:hendersondike@gmail.com"
              className="text-foreground underline underline-offset-4 hover:text-muted-foreground transition-colors">
              email
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
