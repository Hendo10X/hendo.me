import ScrambleHover from "@/components/ui/scramble-hover";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-dvw h-[calc(100dvh-41px)] flex flex-row items-center justify-center">
      <div className="flex flex-col w-full gap-4 px-4 max-w-xs sm:w-80 wrap-balance">
        <div className="font-inter text-sm md:text-base">
          Hello World, I am Hendo. Software developer and Interface designer.
          Sometimes I love tinkering with Game development.
        </div>
        <div className="wrap-balance font-inter text-sm md:text-base">
          I write clean and scalable and, design conscious software.
        </div>
        <div className="wrap-balance font-inter text-sm md:text-base">
          I&apos;m currently building{" "}
          <Link
            href="https://github.com/Hendo10X/waveroom"
            className="underline text-grey-500">
            Waveroom
          </Link>
          <div className="flex flex-row gap-4 mt-4 font-inter  md:text-base text-muted-foreground ">
            <div className="flex flex-row gap-2 text-xs md:text-base">
              <Link
                href="https://github.com/Hendo10X"
                className="cursor-pointer hover:underline text-muted-foreground">
                <ScrambleHover text="GitHub" />
              </Link>
            </div>
            <div className="text-xs md:text-base">
              <Link
                href="https://www.threads.com/@boi_hendo"
                className="cursor-pointer hover:underline text-muted-foreground">
                <ScrambleHover text="Threads" />
              </Link>
            </div>
            <div className="flex flex-row gap-2 text-xs md:text-base">
              <Link
                href="https://x.com/boihendo"
                className="cursor-pointer hover:underline text-muted-foreground">
                <ScrambleHover text="X" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
