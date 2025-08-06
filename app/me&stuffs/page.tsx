import Link from "next/link";

export default function MeAndStuffsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-sm sm:max-w-2xl mx-auto px-4 py-8">
        <header className="mb-4">
          <h1 className="text-md md:text-lg font-bold mb-4 font-inter">
            Me and my stuffs
          </h1>
        </header>
        <div className="divide-y divide-border">
          <div className="py-2">
            <Link
              href="/me&stuffs/tools-i-use"
              className="text-sm md:text-base font-inter">
              Tools I use
            </Link>
          </div>
          <div className="py-2">
            <Link
              href="/me&stuffs/books-i-read-recommended"
              className="text-sm md:text-base font-inter">
              Books I read recommended
            </Link>
          </div>
          <div className="py-2">
            <Link
              href="/me&stuffs/music-i-listen-to"
              className="text-sm md:text-base font-inter">
              Music I listen to
            </Link>
          </div>
          <div className="py-2">
            <Link
              href="/me&stuffs/gallery-of-my-stuffs"
              className="text-sm md:text-base font-inter">
              Gallery of my stuffs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
