export default function Books() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-xs sm:max-w-2xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Welcome to Books I Read & Recommended
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Here are some books I&apos;ve read and would recommend
            </p>
          </header>

          <div className="text-foreground font-inter font-light leading-relaxed text-sm md:text-base">
            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Programming & Development
            </h2>
            <ul className="list-disc list-inside my-4 space-y-2 ml-4">
              <li className="text-foreground">
                Clean Code by Robert C. Martin
              </li>
              <li className="text-foreground">
                The Pragmatic Programmer by Andrew Hunt & David Thomas
              </li>
              <li className="text-foreground">
                Design Patterns by Gang of Four
              </li>
              <li className="text-foreground">Refactoring by Martin Fowler</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Design & UX
            </h2>
            <ul className="list-disc list-inside my-4 space-y-2 ml-4">
              <li className="text-foreground">
                Don&apos;t Make Me Think by Steve Krug
              </li>
              <li className="text-foreground">
                The Design of Everyday Things by Don Norman
              </li>
              <li className="text-foreground">Hooked by Nir Eyal</li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Business & Productivity
            </h2>
            <ul className="list-disc list-inside my-4 space-y-2 ml-4">
              <li className="text-foreground">Atomic Habits by James Clear</li>
              <li className="text-foreground">Deep Work by Cal Newport</li>
              <li className="text-foreground">
                The 7 Habits of Highly Effective People by Stephen Covey
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Fiction & Literature
            </h2>
            <ul className="list-disc list-inside my-4 space-y-2 ml-4">
              <li className="text-foreground">The Alchemist by Paulo Coelho</li>
              <li className="text-foreground">1984 by George Orwell</li>
              <li className="text-foreground">
                Brave New World by Aldous Huxley
              </li>
            </ul>

            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Currently Reading
            </h2>
            <ul className="list-disc list-inside my-4 space-y-2 ml-4">
              <li className="text-foreground">
                The Psychology of Money by Morgan Housel
              </li>
              <li className="text-foreground">Zero to One by Peter Thiel</li>
            </ul>

            <p className="mt-6 text-muted-foreground">
              I&apos;m always looking for new book recommendations! Feel free to
              suggest your favorites.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
