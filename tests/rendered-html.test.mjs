import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const clientRoot = new URL("../dist/client/", import.meta.url);

async function readPage(path) {
  return readFile(new URL(path, clientRoot), "utf8");
}

test("exports the portfolio and all primary routes", async () => {
  const [home, archive, blog, about, caseStudies, workMap] = await Promise.all([
    readPage("index.html"),
    readPage("archive.html"),
    readPage("blog.html"),
    readPage("about.html"),
    readPage("case-studies.html"),
    readPage("work-map.html"),
  ]);

  assert.match(home, /Four projects, each interesting for a different reason/);
  assert.match(home, /Depthfield/);
  assert.match(workMap, /Polymarket MCP/);
  assert.match(home, /Rust API Field Guide/);
  assert.match(home, /problem-first/);
  assert.match(archive, /the unfiltered pile/i);
  assert.match(blog, /nothing here yet/i);
  assert.match(about, /engineer/i);
  assert.match(caseStudies, /systems/);
  assert.match(workMap, /stuff/);
  assert.match(workMap, /same obsession, different project/);
  for (const page of [home, archive, blog, about, caseStudies, workMap]) {
    assert.match(page, /Saved across pages/);
    assert.match(page, /Arctic/);
  }
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
  assert.match(personalWeb, /Saved across pages/);
  assert.match(hybrid, /The rest of the work stays visible/);
  assert.match(projectLed, /I build market systems/);
  assert.match(notebook, /working notebook/);
  assert.match(technicalIndex, /FEATURED SYSTEMS/);
});
