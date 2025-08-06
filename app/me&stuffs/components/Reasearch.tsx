export default function Research() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Research Papers
            </h1>
            <p className="text-foreground text-sm md:text-base font-light max-w-2xl">
              My first ever thesis on the topic of{" "}
              <span className="font-dm-mono">
                &quot;The development and construction of DC electromagnet with
                a variable output and display for the investigation of the
                corrosion of the materials&quot;
              </span>
            </p>
          </header>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-foreground text-sm md:text-base font-light max-w-2xl">
                The thesis is a research paper that explores the development and
                construction of a DC electromagnet with a variable output and
                display for the investigation of the corrosion of the materials.
              </p>
              <p className="text-foreground text-sm md:text-base font-light max-w-2xl">
                It was handled by the Department of Physics{" "}
                <span className="font-dm-mono"> @FUTO</span> by 4 students and 1
                professor. More information soon as I await its approval and
                publication.
              </p>
              <p className="text-foreground text-sm md:text-base font-bold max-w-2xl">
                Ciao!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
