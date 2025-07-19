import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-md font-bold mb-4 font-inter">Posts</h1>
          <p className="text-muted-foreground font-inter">
            my unsolicited and funny thoughts on everything!
          </p>
        </header>

        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-muted-foreground font-inter">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-border pb-3 last:border-b-0">
                <Link
                  href={`/posts/${post.slug}`}
                  className="block group hover:no-underline">
                  <h2 className="text-sm font-inter transition-colors">
                    {post.title}
                  </h2>
                  {post.date && (
                    <p className="text-muted-foreground text-xs font-inter">
                      {post.date}
                    </p>
                  )}
                </Link>
              </article>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
