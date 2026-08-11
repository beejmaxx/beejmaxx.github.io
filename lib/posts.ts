export type Post = {
  slug: string;
  title: string;
  date: string;
  displayDate: string;
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;
};

const postSources = import.meta.glob<string>("../content/posts/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

function parseFrontmatter(source: string) {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error("Every post needs a frontmatter block.");

  const values: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
  }

  return { values, content: match[2].trim() };
}

function estimateReadingTime(content: string) {
  const minutes = Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 220));
  return `${minutes} min read`;
}

export function getPostSlugs() {
  return Object.keys(postSources).map((file) => file.split("/").pop()!.replace(/\.md$/, ""));
}

export function getPostBySlug(slug: string): Post {
  const source = postSources[`../content/posts/${slug}.md`];
  if (!source) throw new Error(`Unknown post: ${slug}`);
  const { values, content } = parseFrontmatter(source);
  const date = values.date;

  return {
    slug,
    title: values.title,
    date,
    displayDate: new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`)),
    excerpt: values.excerpt,
    tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    readingTime: estimateReadingTime(content),
    content,
  };
}

export function getAllPosts() {
  return getPostSlugs().map(getPostBySlug).sort((a, b) => b.date.localeCompare(a.date));
}
