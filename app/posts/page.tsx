import { getAllPosts } from "@/lib/markdown";
import Link from "next/link";
import Circled from "../components/circled";

function ddmm(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}`;
}

function year(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  return isNaN(d.getTime()) ? "" : String(d.getFullYear());
}

export default function PostsPage() {
  const posts = getAllPosts();
  let lastYear = "";

  return (
    <>
      <header>
        <h1>Writing</h1>
        <p className="muted" style={{ marginTop: 6, fontSize: 14 }}>
          Notes on building, design, and ideas worth chasing.
        </p>
      </header>

      <div className="section">
        {posts.length === 0 ? (
          <p className="muted">No posts yet.</p>
        ) : (
          <ul className="index">
            {posts.map((post, i) => {
              const y = year(post.date);
              const showYear = y !== lastYear;
              lastYear = y;
              return (
                <li key={post.slug}>
                  <span className="yr">{showYear ? y : ""}</span>
                  <span className="title-row">
                    <Link href={`/posts/${post.slug}`} className="title">
                      {post.title}
                    </Link>
                    {i === 0 && <Circled>new</Circled>}
                  </span>
                  <span className="date">{ddmm(post.date)}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
