import fs from "fs";
import path from "path";

export interface Post {
  slug: string;
  title: string;
  content: string;
  date?: string;
  readingTime?: string;
}

export function parseMarkdown(markdown: string): {
  title: string;
  content: string;
  date?: string;
  readingTime?: string;
} {
  const lines = markdown.split("\n");
  let title = "";
  let content = "";
  let date = "";
  let readingTime = "";
  let inCodeBlock = false;
  let codeBlockLang = "";
  let inList = false;
  let inFrontmatter = false;
  let frontmatterEnded = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle frontmatter
    if (line.startsWith("---") && !inFrontmatter) {
      inFrontmatter = true;
      continue;
    } else if (line.startsWith("---") && inFrontmatter) {
      inFrontmatter = false;
      frontmatterEnded = true;
      continue;
    }

    if (inFrontmatter) {
      if (line.startsWith("title:")) {
        title = line.substring(6).trim();
      } else if (line.startsWith("date:")) {
        date = line.substring(5).trim();
      } else if (
        line.startsWith("reading time:") ||
        line.startsWith("minute read:")
      ) {
        readingTime = line.substring(line.indexOf(":") + 1).trim();
      }
      continue;
    }

    // Extract title from first h1 if no frontmatter title
    if (line.startsWith("# ") && !title && frontmatterEnded) {
      title = line.substring(2);
      continue;
    }

    // Extract date from italicized line at the end if no frontmatter date
    if (
      !date &&
      ((line.startsWith("*") && line.endsWith("*")) ||
        (line.startsWith("_") && line.endsWith("_"))) &&
      (i === lines.length - 1 ||
        (i === lines.length - 2 && lines[lines.length - 1].trim() === ""))
    ) {
      date = line.substring(1, line.length - 1);
      continue;
    }

    // Handle code blocks
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLang = line.substring(3).trim();
        content += `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${codeBlockLang}">`;
      } else {
        inCodeBlock = false;
        content += "</code></pre>";
      }
      continue;
    }

    if (inCodeBlock) {
      content += line + "\n";
      continue;
    }

    // Handle lists
    if (line.startsWith("- ")) {
      if (!inList) {
        content += '<ul class="list-disc list-inside my-4 space-y-2 ml-4">';
        inList = true;
      }
      const listItem = line.substring(2);
      // Process the list item content for bold, italic, etc.
      const processedItem = listItem
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        .replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
        );
      content += `<li class="text-foreground">${processedItem}</li>`;
      continue;
    } else if (inList && line.trim() !== "") {
      // End list if we encounter a non-list item
      content += "</ul>";
      inList = false;
    }

    // Convert markdown to HTML
    let htmlLine = line;

    // Headers
    if (line.startsWith("## ")) {
      htmlLine = `<h2 class="text-2xl font-bold mt-8 mb-4 text-foreground">${line.substring(
        3
      )}</h2>`;
    } else if (line.startsWith("### ")) {
      htmlLine = `<h3 class="text-xl font-semibold mt-6 mb-3 text-foreground">${line.substring(
        4
      )}</h3>`;
    } else if (line.startsWith("#### ")) {
      htmlLine = `<h4 class="text-lg font-semibold mt-4 mb-2 text-foreground">${line.substring(
        5
      )}</h4>`;
    }

    // Bold text
    htmlLine = htmlLine.replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="font-bold">$1</strong>'
    );

    // Italic text
    htmlLine = htmlLine.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

    // Inline code
    htmlLine = htmlLine.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
    );

    // Links
    htmlLine = htmlLine.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline underline-offset-2">$1</a>'
    );

    // Horizontal rule
    if (line.startsWith("---")) {
      htmlLine = '<hr class="my-8 border-gray-300 dark:border-gray-600">';
    }

    // Paragraphs
    if (line.trim() === "") {
      if (i > 0 && lines[i - 1].trim() !== "") {
        htmlLine = '</p><p class="mb-4 leading-relaxed">';
      } else {
        htmlLine = "";
      }
    } else if (i === 0 || (i > 0 && lines[i - 1].trim() === "")) {
      htmlLine = `<p class="mb-4 leading-relaxed">${htmlLine}`;
    }

    if (htmlLine !== "") {
      content += htmlLine + "\n";
    }
  }

  // Close any open tags
  if (inList) {
    content += "</ul>";
  }
  if (content.startsWith("<p")) {
    content += "</p>";
  }

  return { title, content, date, readingTime };
}

export function getPost(slug: string): Post | null {
  try {
    const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { title, content, date, readingTime } = parseMarkdown(fileContent);

    return {
      slug,
      title,
      content,
      date,
      readingTime,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  try {
    const postsDir = path.join(process.cwd(), "posts");
    const files = fs.readdirSync(postsDir);
    const posts: Post[] = [];

    for (const file of files) {
      if (file.endsWith(".md")) {
        const slug = file.replace(".md", "");
        const post = getPost(slug);
        if (post) {
          posts.push(post);
        }
      }
    }

    return posts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  } catch {
    return [];
  }
}
