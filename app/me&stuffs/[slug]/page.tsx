import { notFound } from "next/navigation";
import ToolsIUse from "../components/ToolsIUse";
import BooksIReadRecommended from "../components/Books";
import Projects from "../components/Projects";

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
    "books-i-read-recommended": BooksIReadRecommended,
    projects: Projects,
  };

  const Component = componentMap[slug];

  if (!Component) {
    notFound();
  }

  return <Component />;
}
