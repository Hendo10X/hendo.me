import { renderOG, size, contentType } from "@/app/og/render";

export { size, contentType };
export const alt = "Blog — Henderson Dike-Benard";

export default function Image() {
  return renderOG({
    title: "Blog",
    subtitle: "Notes on building, design, and ideas worth chasing.",
  });
}
