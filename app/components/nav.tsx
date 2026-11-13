"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
  { href: "/posts", label: "Writing" },
];

export default function Nav() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="masthead">
      <Link href="/" className="brand">
        Henderson Dike
      </Link>
      <nav className="nav">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={isActive(l.href) ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
        <button
          type="button"
          className="dot"
          aria-label="Toggle theme"
          onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          suppressHydrationWarning>
          {mounted ? "" : ""}
        </button>
      </nav>
    </header>
  );
}
