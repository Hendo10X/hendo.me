import { getPost } from "@/lib/markdown";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center w-full gap-16 px-4 py-16">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto px-4 py-8">
        <article className="font-inter">
          <header className="mb-8">
            <h1 className="text-xl md:text-2xl font-bold mb-4 text-foreground">
              {post.title}
            </h1>
            <div className="flex items-center gap-2 mb-6">
              {post.date && (
                <p className="text-muted-foreground text-sm md:text-base">
                  {post.date}
                </p>
              )}
            </div>
          </header>

          <div
            className="text-foreground font-inter font-light leading-relaxed text-sm md:text-base"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
