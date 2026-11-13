import { getPost } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Link from "next/link";

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
    <article>
      <p style={{ marginBottom: 28, fontSize: 14 }}>
        <Link href="/posts" className="muted" style={{ textDecoration: "none" }}>
          &larr; Writing
        </Link>
      </p>

      <header className="article-head">
        <h1>{post.title}</h1>
        {post.date && (
          <p className="meta">
            {post.date}
            {post.readingTime ? ` · ${post.readingTime}` : ""}
          </p>
        )}
      </header>

      <div
        className="prose"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
