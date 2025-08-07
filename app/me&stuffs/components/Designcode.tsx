import Link from "next/link";
import data from "@/app/data/data.json";

export default function Designcode() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Designs and Code
            </h1>
            <p className="text-foreground text-sm md:text-base font-light max-w-2xl underline mb-4">
              Code
            </p>
          </header>
          <div className="flex flex-col gap-6 max-w-2xl">
            {data.map((project, index) => (
              <div
                key={index}
                className="border-b border-muted-foreground pb-2">
                <div className="flex flex-row items-center gap-2 mb-2">
                  <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline font-medium">
                    {project.name}
                  </Link>
                  <span className="text-xs text-muted-foreground px-1 py-1 bg-muted rounded">
                    {project.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm md:text-base font-light mb-2">
                  {project.description}
                </p>
              </div>
            ))}
            <div className="flex flex-row gap-2">
              <Link
                href="https://github.com/Hendo10X"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground text-sm md:text-base font-light hover:underline">
                More projects on GitHub
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-6 max-w-2xl mt-12">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-foreground text-sm md:text-base font-light max-w-2xl underline mb-4 ">
                  Designs
                </p>
                <div className="flex flex-row gap-2">
                  <p className="text-muted-foreground text-sm md:text-base font-light">
                    still curating.. chill
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
