import { renderOG, size, contentType } from "@/app/og/render";

export { size, contentType };
export const alt = "Henderson Dike-Benard — Portfolio";

export default function Image() {
  return renderOG({
    title: "Henderson Dike-Benard",
    subtitle: "Building simple, useful, thoughtfully engineered tools.",
    titleSize: 76,
  });
}
