import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const clientRoot = new URL("../dist/client/", import.meta.url);

async function readPage(path) {
  return readFile(new URL(path, clientRoot), "utf8");
}

test("exports the portfolio and all primary routes", async () => {
  const [home, archive, blog, about, caseStudies] = await Promise.all([
    readPage("index.html"),
    readPage("archive.html"),
    readPage("blog.html"),
    readPage("about.html"),
    readPage("case-studies.html"),
  ]);

  assert.match(home, /Building software/);
  assert.match(home, /The whole messy archive/);
  assert.match(archive, /126(?:<!-- -->)? repositories/i);
  assert.match(blog, /Thinking/);
  assert.match(about, /Engineer/);
  assert.match(caseStudies, /Work that had/);
});

test("exports every seeded Markdown post and GitHub Pages marker", async () => {
  const manifesto = await readPage("blog/the-things-that-didnt-ship-belong-here.html");
  assert.match(manifesto, /The things that didn/);
  assert.match(manifesto, /stop throwing away the evidence/i);
  await access(new URL(".nojekyll", clientRoot));
  await access(new URL("og.png", clientRoot));
  await access(new URL("resume.pdf", clientRoot));
  await access(new URL("engine-sim/index.html", clientRoot));
  await access(new URL("assets/screenshots/trading-fleet-dashboard.png", clientRoot));
  const caseStudy = await readPage("case-studies/operations-workstation.html");
  assert.match(caseStudy, /Real-Time Operations Workstation/);
});
