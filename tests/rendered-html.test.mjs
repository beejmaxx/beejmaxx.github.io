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

  assert.match(home, /Four projects, each interesting for a different reason/);
  assert.match(home, /Depthfield/);
  assert.match(home, /Polymarket MCP/);
  assert.match(home, /Field manual/);
  assert.match(home, /Rust API Field Guide/);
  assert.match(home, /Problem-first/);
  assert.match(archive, /126(?:<!-- -->)? public/i);
  assert.match(blog, /No posts published yet/);
  assert.match(about, /engineer/i);
  assert.match(caseStudies, /Selected systems/);
});

test("keeps unpublished drafts out of the export and preserves public assets", async () => {
  await assert.rejects(access(new URL("blog/the-things-that-didnt-ship-belong-here.html", clientRoot)));
  await access(new URL(".nojekyll", clientRoot));
  await access(new URL("og.png", clientRoot));
  await access(new URL("resume.pdf", clientRoot));
  await access(new URL("engine-sim/index.html", clientRoot));
  await access(new URL("aikido/index.html", clientRoot));
  await access(new URL("aikido/architecture.html", clientRoot));
  await access(new URL("case-studies/marketplace-integrity.html", clientRoot));
  await access(new URL("assets/screenshots/trading-fleet-dashboard.png", clientRoot));
  const caseStudy = await readPage("case-studies/operations-workstation.html");
  assert.match(caseStudy, /Real-Time Operations Workstation/);
});

test("exports independent homepage concepts", async () => {
  const [index, personalWeb, hybrid, projectLed, notebook, technicalIndex] = await Promise.all([
    readPage("concepts.html"),
    readPage("concepts/personal-web.html"),
    readPage("concepts/hybrid.html"),
    readPage("concepts/project-led.html"),
    readPage("concepts/notebook.html"),
    readPage("concepts/technical-index.html"),
  ]);

  assert.match(index, /Homepage concepts/);
  assert.match(personalWeb, /Things that didn’t work/);
  assert.match(personalWeb, /0 posts published/);
  assert.match(personalWeb, /Field manual/);
  assert.match(personalWeb, /Use ← → keys/);
  assert.match(hybrid, /The rest of the work stays visible/);
  assert.match(projectLed, /I build market systems/);
  assert.match(notebook, /working notebook/);
  assert.match(technicalIndex, /FEATURED SYSTEMS/);
});
