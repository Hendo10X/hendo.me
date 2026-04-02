"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const links = [
    { href: "/", label: "Home" },
    { href: "/works", label: "Works" },
    { href: "/posts", label: "Blog" },
  ];

  return (
    <aside className="md:w-44 md:shrink-0 md:h-full">
      {/* Mobile: horizontal top bar */}
      <nav className="flex flex-row md:flex-col gap-6 md:gap-2 py-6 md:pt-16 md:pb-0 md:px-10">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-karla transition-colors ${
                isActive ? "text-foreground font-medium" : "text-muted-foreground"
              }`}>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="fixed bottom-4 right-4 z-50">
        <Button
          className="w-4 h-4 rounded-full cursor-pointer bg-gray-400 dark:bg-yellow-400/90 p-0 hover:bg-gray-500 dark:hover:bg-yellow-400/90"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
      </div>
    </aside>
  );
}
