// A word or two wrapped in a hand-drawn ballpoint oval, in Caveat:
// the way you'd circle something in the margin with a pen.
export default function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span className="circled">
      <span>{children}</span>
      <svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <path d="M10 23 C7 11 29 4 52 5 C77 6 96 12 94 22 C92 33 70 38 47 36 C23 35 4 30 8 18 C10 12 19 8 31 7" />
      </svg>
    </span>
  );
}
