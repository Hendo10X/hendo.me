import ScrambleHover from "@/components/ui/scramble-hover";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-dvw h-[calc(100dvh-41px)] flex flex-row items-center justify-center">
      <div className="flex flex-col w-full gap-4 px-4 max-w-xs sm:w-80 wrap-balance">
        <div className="font-inter text-sm md:text-base">
          Hello World, I am Hendo. Software developer and Interface designer and
          sometimes I love tinkering with Game development.
        </div>
        <div className="wrap-balance font-inter text-sm md:text-base">
          I write clean and scalable and, design conscious software.
        </div>
        <div className="wrap-balance font-inter text-sm md:text-base">
          I'm currently building{" "}
          <Link href="/" className="hover:underline">
            Waveroom
          </Link>
        </div>
      </div>
    </div>
  );
}
