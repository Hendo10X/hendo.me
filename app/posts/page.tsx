import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="w-full max-w-md sm:max-w-2xl mx-auto px-4 py-8">
        <header className="mb-4">
          <h1 className="text-md md:text-lg font-bold mb-4 font-inter">blog</h1>
        </header>
        <div className="divide-y divide-border">
          {posts.length === 0 ? (
            <p className="text-muted-foreground font-inter">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="py-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                  <Link
                    href={`/posts/${post.slug}`}
                    className="text-sm md:text-base font-inter transition-colors">
                    {post.title}
                  </Link>
                  <div className="flex items-center gap-2 sm:justify-end">
                    {post.date && (
                      <span className="text-muted-foreground text-xs md:text-sm font-inter whitespace-nowrap">
                        {post.date}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
