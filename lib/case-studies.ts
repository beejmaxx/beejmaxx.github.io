export type CaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  index: string;
  tags: string[];
  image: string;
  content: string;
};

const caseStudySources = import.meta.glob<string>("../content/case-studies/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

const listedCaseStudySlugs = new Set([
  "predicate-sweep",
  "one-account-truth",
  "converge-dont-command",
  "results-allowed-to-count",
  "agent-supervisor",
  "operations-workstation",
]);

function parseFrontmatter(source: string) {
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(source);
  if (!match) throw new Error("Every case study needs a frontmatter block.");
  const values: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    values[line.slice(0, separator).trim()] = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
  }
  return { values, content: match[2].trim() };
}

export function getCaseStudySlugs() {
  return Object.keys(caseStudySources).map((file) => file.split("/").pop()!.replace(/\.md$/, ""));
}

export function getCaseStudyBySlug(slug: string): CaseStudy {
  const source = caseStudySources[`../content/case-studies/${slug}.md`];
  if (!source) throw new Error(`Unknown case study: ${slug}`);
  const { values, content } = parseFrontmatter(source);
  return {
    slug,
    title: values.title,
    subtitle: values.subtitle,
    index: values.index,
    tags: values.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
    image: values.image ?? "",
    content,
  };
}

export function getAllCaseStudies() {
  return getCaseStudySlugs().map(getCaseStudyBySlug).sort((a, b) => a.index.localeCompare(b.index));
}

export function getListedCaseStudies() {
  return getAllCaseStudies().filter((study) => listedCaseStudySlugs.has(study.slug));
}
