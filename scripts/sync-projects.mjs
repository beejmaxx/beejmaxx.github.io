import { execFileSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const response = execFileSync(
  "gh",
  ["api", "--method", "GET", "--paginate", "users/beejmaxx/repos?per_page=100&type=public&sort=updated"],
  { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 },
);

const repositories = response
  .trim()
  .split("\n")
  .flatMap((page) => JSON.parse(page))
  .map((repository) => ({
    name: repository.name,
    description: repository.description ?? "",
    language: repository.language ?? "—",
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    fork: repository.fork,
    archived: repository.archived,
    url: repository.html_url,
    homepage: repository.name === "aikido-systematic-trading" ? "" : (repository.homepage ?? ""),
    created: repository.created_at,
    updated: repository.updated_at,
  }))
  .sort((a, b) => b.updated.localeCompare(a.updated));

writeFileSync(resolve("content/projects.json"), `${JSON.stringify(repositories, null, 2)}\n`);
console.log(`Wrote ${repositories.length} public repositories.`);
