export default function Research() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Research Papers
            </h1>
            <p className="text-muted-foreground text-sm md:text-base font-light max-w-2xl">
              My first ever thesis on the topic of{" "}
              <span className="uppercase font-dm-mono">
                "The development and construction of DC electromagnet with a
                variable output and display for the investigation of the
                corrosion of the materials"
              </span>
            </p>
          </header>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-sm md:text-base font-light max-w-2xl">
                The thesis is a research paper that explores the development and
                construction of a DC electromagnet with a variable output and
                display for the investigation of the corrosion of the materials.
              </p>
              <p className="text-muted-foreground text-sm md:text-base font-light max-w-2xl">
                it was handled by the department of physics by 4 students and 1
                professor.
              </p>
              <p className="text-muted-foreground text-sm md:text-base font-light max-w-2xl">
                more information soon as i await its approval and publication.
              </p>
              <p className="text-muted-foreground text-sm md:text-base font-bold max-w-2xl">
                ciao!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
