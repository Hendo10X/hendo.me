"use client";
import { Button } from "@/components/ui/button";
import ScrambleHover from "@/components/ui/scramble-hover";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
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

  return (
    <div className="sticky top-0 z-50 flex flex-row justify-between px-6 py-2 bg-background">
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-4">
          <Link
            href="/"
            className="text-muted-foreground cursor-pointer font-inter text-sm md:text-base">
            <ScrambleHover text="boihendo" />
          </Link>
        </div>
      </div>
      <div className="flex flex-row gap-4 items-center text-foreground">
        <div className="flex flex-row gap-4">
          <Link
            href="/posts"
            className="cursor-pointer hover:underline font-inter text-sm md:text-base">
            <ScrambleHover text="Post" />
          </Link>
          <Link
            href="mailto:hendersondike@gmail.com"
            className="cursor-pointer hover:underline font-inter text-sm md:text-base">
            <ScrambleHover text="Email" />
          </Link>
          <Link
            href="/me&stuffs"
            className="cursor-pointer hover:underline font-inter text-sm md:text-base">
            <ScrambleHover text="Me & stuffs" />
          </Link>
    
        </div>

        <div className="fixed bottom-4 right-4 z-50">
          <Button
            className="w-4 h-4 rounded-full cursor-pointer bg-gray-400 dark:bg-yellow-400/90 p-0 hover:bg-gray-500 dark:hover:bg-yellow-400/90"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </div>
      </div>
    </div>
  );
}
