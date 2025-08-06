export default function Projects() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-xs sm:max-w-2xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Welcome to Projects
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Here are some of the projects I&apos;ve worked on
            </p>
          </header>

          <div className="text-foreground font-inter font-light leading-relaxed text-sm md:text-base">
            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Current Projects
            </h2>

            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2 text-foreground">
                Waveroom
              </h3>
              <p className="mb-2">
                A modern web application for audio collaboration and sharing.
              </p>
              <p className="text-muted-foreground text-sm">
                Tech: React, Next.js, TypeScript
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2 text-foreground">
                Personal Portfolio
              </h3>
              <p className="mb-2">
                This website - built with Next.js and Tailwind CSS.
              </p>
              <p className="text-muted-foreground text-sm">
                Tech: Next.js, TypeScript, Tailwind CSS
              </p>
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Past Projects
            </h2>

            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2 text-foreground">
                E-commerce Platform
              </h3>
              <p className="mb-2">
                A full-stack e-commerce solution with payment integration.
              </p>
              <p className="text-muted-foreground text-sm">
                Tech: React, Node.js, MongoDB
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-md font-semibold mb-2 text-foreground">
                Task Management App
              </h3>
              <p className="mb-2">
                A collaborative task management application with real-time
                updates.
              </p>
              <p className="text-muted-foreground text-sm">
                Tech: React, Firebase, Material-UI
              </p>
            </div>

            <h2 className="text-lg font-semibold mt-6 mb-3 text-foreground">
              Open Source
            </h2>
            <p className="mb-4">
              I actively contribute to open source projects and believe in
              giving back to the developer community. You can find my
              contributions on GitHub.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
