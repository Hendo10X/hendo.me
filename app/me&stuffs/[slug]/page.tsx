import { notFound } from "next/navigation";
import ToolsIUse from "../components/ToolsIUse";
import Books from "../components/Books";
import Gallery from "../components/Gallery";

interface SlugPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;

  // Map slugs to components
  const componentMap: { [key: string]: React.ComponentType } = {
    "tools-i-use": ToolsIUse,
    "books-i-read-recommended": Books,
    "gallery-of-my-stuffs": Gallery,
  };

  const Component = componentMap[slug];

  if (!Component) {
    notFound();
  }

  return <Component />;
}
