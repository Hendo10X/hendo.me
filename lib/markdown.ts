import fs from "fs";
import path from "path";

export interface Post {
  slug: string;
  title: string;
  content: string;
  date?: string;
}

export function parseMarkdown(markdown: string): {
  title: string;
  content: string;
  date?: string;
} {
  const lines = markdown.split("\n");
  let title = "";
  let content = "";
  let date = "";
  let inCodeBlock = false;
  let codeBlockLang = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Extract title from first h1
    if (line.startsWith("# ") && !title) {
      title = line.substring(2);
      continue;
    }

    // Extract date from italicized line at the end
    if (
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
        content += `<pre><code class="language-${codeBlockLang}">`;
      } else {
        inCodeBlock = false;
        content += "</code></pre>\n";
      }
      continue;
    }

    if (inCodeBlock) {
      content += line + "\n";
      continue;
    }

    // Convert markdown to HTML
    let htmlLine = line;

    // Headers
    if (line.startsWith("## ")) {
      htmlLine = `<h2>${line.substring(3)}</h2>`;
    } else if (line.startsWith("### ")) {
      htmlLine = `<h3>${line.substring(4)}</h3>`;
    }

    // Bold text
    htmlLine = htmlLine.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Italic text
    htmlLine = htmlLine.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Links
    htmlLine = htmlLine.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" class="text-blue-600 hover:underline">$1</a>'
    );

    // Lists
    if (line.startsWith("- ")) {
      htmlLine = `<li>${line.substring(2)}</li>`;
      if (i === 0 || !lines[i - 1].startsWith("- ")) {
        htmlLine = "<ul>" + htmlLine;
      }
      if (i === lines.length - 1 || !lines[i + 1].startsWith("- ")) {
        htmlLine = htmlLine + "</ul>";
      }
    }

    // Horizontal rule
    if (line.startsWith("---")) {
      htmlLine = '<hr class="my-6 border-gray-300 dark:border-gray-600">';
    }

    // Empty lines become paragraph breaks
    if (line.trim() === "") {
      htmlLine = "<br>";
    }

    content += htmlLine + "\n";
  }

  return { title, content, date };
}

export function getPost(slug: string): Post | null {
  try {
    const filePath = path.join(process.cwd(), "posts", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { title, content, date } = parseMarkdown(fileContent);

    return {
      slug,
      title,
      content,
      date,
    };
  } catch (error) {
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
  } catch (error) {
    return [];
  }
}
