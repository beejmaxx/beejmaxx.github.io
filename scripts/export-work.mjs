import { writeFile } from "node:fs/promises";
import { work } from "../lib/work.ts";

const packet = {
  updated: "2026-08-14",
  description: "Curated public work by bijan. The raw GitHub snapshot lives in content/projects.json.",
  projects: work,
};

await writeFile(new URL("../public/projects.json", import.meta.url), `${JSON.stringify(packet, null, 2)}\n`);
console.log(`Exported ${work.length} curated projects to public/projects.json`);
