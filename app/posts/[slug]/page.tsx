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
    <div className="max-w-prose">
      <article>
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-3 font-dm-sans text-foreground">
            {post.title}
          </h1>
          {post.date && (
            <p className="text-muted-foreground text-sm font-karla">{post.date}</p>
          )}
        </header>

        <div
          className="prose font-karla font-light leading-relaxed text-sm overflow-visible"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
