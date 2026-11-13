import { renderOG, size, contentType } from "@/app/og/render";

export { size, contentType };
export const alt = "Writing — Henderson Dike-Benard";

export default function Image() {
  return renderOG({
    title: "Writing",
    subtitle: "Notes on building, design, and ideas worth chasing.",
  });
}
