import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";
import Circled from "./components/circled";

function ddmm(date?: string) {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return `${String(d.getDate()).padStart(2, "0")}/${String(
    d.getMonth() + 1
  ).padStart(2, "0")}`;
}

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <>
      <header style={{ marginBottom: 28 }}>
        <p style={{ fontWeight: 500, letterSpacing: "-0.01em" }}>
          Henderson Dike&#8209;Benard
        </p>
        <p className="muted" style={{ marginTop: 4, fontSize: 14 }}>
          Updated November 2026
        </p>
      </header>

      <div className="lead">
        <p>I&apos;m interested in building things and understanding how they work.</p>
        <p>
          My background is in physics, which trained me to think about systems
          from first principles. Most of my work now sits somewhere between
          engineering, design, and product. I like making tools that are
          simple, useful, and thoughtfully engineered.
        </p>
        <p>
          I&apos;m drawn to turning ideas into real things. Sometimes that means
          writing code, sometimes designing interfaces, and sometimes chasing a
          strange technical idea just to see what happens. Most of what I ship is
          small and specific rather than big and general.
        </p>
        <p>
          Lately that&apos;s meant building things like{" "}
          <Link href="/works">Mithril</Link>, <Link href="/works">Skrip</Link>,
          and <Link href="/works">Airbag</Link>, plus a long tail of
          smaller tools and experiments.
        </p>
        <p>
          Outside of building, I read widely: science, technology,
          philosophy, the occasional obscure rabbit hole. Big football, Sudoku,
          mental-maths and stoicism guy, for what it&apos;s worth.
        </p>
        <p>
          You can find me on{" "}
          <Link href="https://x.com/boihendo" target="_blank" rel="noopener noreferrer">
            X
          </Link>{" "}
          and{" "}
          <Link href="https://github.com/Hendo10X" target="_blank" rel="noopener noreferrer">
            GitHub
          </Link>
          , or reach me via{" "}
          <Link href="mailto:hendersondike@gmail.com">email</Link>.
        </p>
      </div>

      <section className="section">
        <p className="section-label">Writing</p>
        <ul className="index">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <span className="yr">
                {post.date ? new Date(post.date).getFullYear() : ""}
              </span>
              <span className="title-row">
                <Link href={`/posts/${post.slug}`} className="title">
                  {post.title}
                </Link>
                {i === 0 && <Circled>new</Circled>}
              </span>
              <span className="date">{ddmm(post.date)}</span>
            </li>
          ))}
        </ul>
        <p style={{ marginTop: 16, fontSize: 14 }}>
          <Link href="/posts" className="muted" style={{ textDecoration: "none" }}>
            All writing &rarr;
          </Link>
        </p>
      </section>
    </>
  );
}
