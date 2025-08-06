"use client";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  VisualStudioCodeIcon,
  GitlabIcon,
  ComputerTerminal01Icon,
  FigmaIcon,
  ReactIcon,
  Typescript01Icon,
  TailwindcssIcon,
  SourceCodeSquareIcon,
  DatabaseIcon,
  ThreeDViewIcon,
  DocumentCodeIcon,
  NoteAddIcon,
  BinaryCodeIcon,
} from "@hugeicons/core-free-icons";

export default function ToolsIUse() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-2xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Tools I Use
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Here are the tools and technologies I use for development
            </p>
          </header>
          <div className="text-foreground font-inter font-light leading-relaxed text-sm md:text-base">
            <p>
              I mainly use TypeScript with React (Next.js) for frontend and I am
              learning Express for backend. My database tools are Supabase (or
              Neon) with Drizzle ORM or Prisma. For UI, I use Shadcn/UI and
              Tailwind CSS. I design with Figma and am exploring Spline for 3D.
            </p>
          </div>

          <div className="text-foreground font-inter font-light leading-relaxed text-sm md:text-base">
            <h2 className="text-md font-semibold mt-6 mb-3 text-muted-foreground">
              Development Tools
            </h2>
            <ol className="list-none list-inside my-4 space-y-2 ">
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={VisualStudioCodeIcon}
                  size={19}
                />
                VS Code - My primary code editor (Currently switched to Cursor)
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={GitlabIcon}
                  size={19}
                />
                Git - Version control
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={ComputerTerminal01Icon}
                  size={19}
                />
                Terminal - Command line interface (I use Warp.dev at times)
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={NoteAddIcon}
                  size={19}
                />
                Notepad - I use it to jot down thoughts, i don't fw notion and
                the likes
              </li>
            </ol>

            <h2 className="text-md font-semibold mt-6 mb-3 text-muted-foreground">
              Technologies
            </h2>
            <ol className="list-none list-inside my-4 space-y-2 ">
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={ReactIcon}
                  size={19}
                />
                React & Next.js - Frontend development
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={Typescript01Icon}
                  size={19}
                />
                TypeScript - Type safety
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={TailwindcssIcon}
                  size={19}
                />
                Tailwind CSS - Styling
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={SourceCodeSquareIcon}
                  size={19}
                />
                Node.js - Backend development
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={DatabaseIcon}
                  size={19}
                />
                Postgres-SQL - Database (I'm currently using Drizzle ORM)
              </li>
            </ol>

            <h2 className="text-md font-semibold mt-6 mb-3 text-muted-foreground">
              Design Tools
            </h2>
            <ol className="list-none list-inside my-4 space-y-2 ">
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={FigmaIcon}
                  size={19}
                />
                Figma - UI/UX design
              </li>

              <h2 className="text-md font-semibold mt-6 mb-3 text-muted-foreground">
                Currently Learning
              </h2>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={DatabaseIcon}
                  size={19}
                />
                MongoDB - Database for large scale projects
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={ThreeDViewIcon}
                  size={19}
                />
                Spline - 3D design for UI/UX and interactive design
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={DocumentCodeIcon}
                  size={19}
                />
                Express - Backend development for complex projects
              </li>
              <li className="text-foreground">
                <HugeiconsIcon
                  className="inline-flex mr-2"
                  icon={BinaryCodeIcon}
                  size={19}
                />
                Haskell - Functional programming language, just for the fun of
                computer science formalism
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
