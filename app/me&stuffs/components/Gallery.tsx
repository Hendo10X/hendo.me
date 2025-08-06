import Image from "next/image";

const images = [
  "/Images/Comic1.jpg",
  "/Images/Comic2.jpg",
  "/Images/Comic3.jpg",
  "/Images/Comic4.jpg",
  "/Images/Comic5.jpg",
  "/Images/Comic6.jpg",
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              Gallery
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              A collection of my work and interests (majorly comicbooks and AI
              art :))
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="aspect-square relative overflow-hidden rounded-lg bg-muted">
                <Image
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  loading={index < 4 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
