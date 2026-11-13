"use client";

import { useEffect, useState } from "react";

function lagosTime() {
  try {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Africa/Lagos",
    })
      .format(new Date())
      .replace(" ", "")
      .toLowerCase();
  } catch {
    return "";
  }
}

export default function Footer() {
  const [time, setTime] = useState("");
  useEffect(() => {
    setTime(lagosTime());
    const id = setInterval(() => setTime(lagosTime()), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="foot">
      <span suppressHydrationWarning>
        {time ? `${time} in Lagos, Nigeria` : "Lagos, Nigeria"}
      </span>
      {/* a little pen doodle — a wink */}
      <svg
        className="doodle"
        width="26"
        height="16"
        viewBox="0 0 26 16"
        aria-hidden="true">
        <path d="M3 5 C4 3 6 3 7 5" />
        <path d="M13 4 L13 7" />
        <path d="M19 5 C20 3 22 3 23 5" />
        <path d="M6 11 C10 14 16 14 20 10" />
      </svg>
    </footer>
  );
}
