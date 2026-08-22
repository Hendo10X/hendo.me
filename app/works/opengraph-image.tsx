import { renderOG, size, contentType } from "@/app/og/render";

export { size, contentType };
export const alt = "Works — Henderson Dike-Benard";

export default function Image() {
  return renderOG({
    title: "Works",
    subtitle: "Projects, experiments, and tools I've built.",
  });
}
