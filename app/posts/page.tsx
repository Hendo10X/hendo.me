import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-prose">
      <h1 className="text-2xl font-bold mb-6 font-dm-sans">Blog</h1>
      <div className="divide-y divide-border">
        {posts.length === 0 ? (
          <p className="text-muted-foreground font-karla text-sm">No posts yet.</p>
        ) : (
          posts.map((post) => (
            <article key={post.slug} className="py-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-sm font-karla transition-colors hover:text-muted-foreground">
                  {post.title}
                </Link>
                {post.date && (
                  <span className="text-muted-foreground text-xs font-karla whitespace-nowrap">
                    {post.date}
                  </span>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
