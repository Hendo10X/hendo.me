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
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="prose prose-lg dark:prose-invert max-w-none">
          <header className="mb-8">
            <h1 className="text-lg font-bold mb-2 font-inter">{post.title}</h1>
            {post.date && (
              <p className="text-muted-foreground text-xs font-inter">
                {post.date}
              </p>
            )}
          </header>

          <div
            className="font-inter text-sm md:text-base leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  );
}
