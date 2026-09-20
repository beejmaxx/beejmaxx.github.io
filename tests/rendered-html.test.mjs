import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const clientRoot = new URL("../dist/client/", import.meta.url);

async function readPage(path) {
  return readFile(new URL(path, clientRoot), "utf8");
}

test("exports the blog and every public index", async () => {
  const paths = [
    "index.html", "work.html", "books.html", "library.html", "notes.html",
    "about.html", "case-studies.html", "blog.html", "work-map.html",
  ];
  const pages = await Promise.all(paths.map(readPage));
  const [home, work, books, library, notes, about, cases, blogAlias, workAlias] = pages;

  assert.match(home, /Bijan Pourriahi/i);
  assert.match(home, /Selected systems/i);
  assert.match(home, /Depthfield/i);
  assert.match(home, /tinygrad Contributor Field Guide/i);
  assert.match(home, /href="\/blog"[^>]*>blog</i);
  assert.match(work, /systems with receipts/i);
  assert.match(work, /Polymarket MCP/);
  assert.match(books, /Async Rust Guidebook/);
  assert.match(books, /Platform Integrity/);
  assert.match(books, /Computer Science from First Principles/);
  assert.match(books, /Electronic Markets from First Principles/);
  assert.match(books, /href="\/books\/platform-integrity"/);
  assert.doesNotMatch(books, /Rust API Field Guide/);
  assert.match(library, /Rust API Design Guidebook/);
  assert.match(library, /Platform Integrity/);
  assert.doesNotMatch(home, /href="\/attempts"/);
  assert.doesNotMatch(home, /href="\/(?:notes|archive)"/);
  assert.match(notes, />Posts</i);
  assert.match(about, /Ruby, Rails/i);
  assert.match(cases, /engineering records/i);
  assert.match(cases, /The Predicate Sweep/);
  assert.match(cases, /tinygrad Contributor Field Guide/);
  assert.match(blogAlias, />Posts</i);
  assert.doesNotMatch(blogAlias, /href="\/blog\/[^"]+"/i);
  assert.match(workAlias, /systems with receipts/i);

  for (const page of [blogAlias, notes]) assert.match(page, /bijan&#x27;s notes/i);
  assert.match(blogAlias, /href="\/blog">Posts</i);
  for (const page of [home, work, books, library, about, cases, workAlias]) assert.match(page, />bijan</i);
});

test("publishes a dedicated Platform Integrity one-pager", async () => {
  const page = await readPage("books/platform-integrity.html");
  assert.match(page, /Platforms often begin with the wrong question/);
  assert.match(page, /Engineering detection, decisions, and enforcement/);
  assert.match(page, /read the public draft/i);
  assert.match(page, /source/i);
  assert.match(page, /NIST risk and identity frameworks/);
  assert.match(page, /https:\/\/beejmaxx\.github\.io\/platform-integrity\//);
});

test("publishes a current, source-linked tinygrad contributor guide", async () => {
  const page = await readPage("case-studies/tinygrad-contributor-guide.html");
  assert.match(page, /September 21, 2026/);
  assert.match(page, /v0\.14\.0/);
  assert.match(page, /8ad8f73/);
  assert.match(page, /Python 3\.11 or newer/);
  assert.match(page, /UOp compute graph/);
  assert.match(page, /Agent-authored code should not be submitted unchanged/);
  assert.match(page, /fails before the fix and passes after it/);
  assert.match(page, /github\.com\/tinygrad\/tinygrad\/blob\/8ad8f738755c3ab157d356aedd5d5c108aa1a642\/README\.md/);
});

test("publishes no posts until Bijan writes one", async () => {
  await assert.rejects(access(new URL("blog/why-depth-history-needs-price-anchors.html", clientRoot)));
  await assert.rejects(access(new URL("blog/complex-systems-begin-with-core-abstractions.html", clientRoot)));
  await assert.rejects(access(new URL("blog/the-things-that-didnt-ship-belong-here.html", clientRoot)));
});

test("publishes the predicate sweep as a specific evidence-backed dossier", async () => {
  const study = await readPage("case-studies/predicate-sweep.html");
  assert.match(study, /85,968,659,700/);
  assert.match(study, /757,000 bars/);
  assert.match(study, /24 GB/);
  assert.match(study, /1–2 GB/);
  assert.match(study, /Pair-support graph/i);
  assert.match(study, /500 resamples using 20-trading-day blocks/i);
  assert.match(study, /controlled benchmark/i);
  assert.match(study, /predicate-sweep-og\.jpg/);
});

test("publishes the Aikido subsystem dossier series with its evidence visuals", async () => {
  const [cases, account, convergence, evidence, hub, architecture] = await Promise.all([
    readPage("case-studies.html"),
    readPage("case-studies/one-account-truth.html"),
    readPage("case-studies/converge-dont-command.html"),
    readPage("case-studies/results-allowed-to-count.html"),
    readPage("aikido/index.html"),
    readPage("aikido/architecture.html"),
  ]);

  assert.match(cases, /Four detailed studies/i);
  assert.match(cases, /One Account, One Truth/);
  assert.match(account, /OneAccountState/);
  assert.match(account, /the close can lie/i);
  assert.match(convergence, /2× position overshoot/i);
  assert.match(convergence, /practice position reaches −150/i);
  assert.match(evidence, /126 out-of-sample trading days/i);
  assert.match(evidence, /canonical_authoritative/);
  assert.match(hub, /From question to verdict/i);
  assert.match(hub, /Follow the truth boundaries/i);
  assert.equal(hub.match(/data-stage-link/g)?.length, 6);
  assert.equal(hub.match(/data-stage-panel/g)?.length, 6);
  assert.doesNotMatch(hub, /data-stage-panel[^>]*hidden/i);
  assert.match(hub, /Retrying a delta command into a doubled position/i);
  assert.match(hub, /scalar score outrunning its evidence/i);
  assert.match(hub, /Aikido \/ subsystem dossiers/i);
  assert.match(hub, /href="\/books"/i);
  assert.doesNotMatch(hub, /href="\/archive"/i);
  assert.match(architecture, /Aikido/i);
  assert.match(architecture, /href="\/case-studies"/i);
  assert.doesNotMatch(architecture, /href="\/notes"/i);
  assert.doesNotMatch(`${account}${convergence}${evidence}`, /\[\[visual:/);
});

test("exports discovery files, data, and public artifacts", async () => {
  const [robots, sitemap, feed, packet] = await Promise.all([
    readPage("robots.txt"), readPage("sitemap.xml"), readPage("feed.xml"), readPage("projects.json"),
  ]);
  assert.match(robots, /Sitemap: https:\/\/beejmaxx\.github\.io\/sitemap\.xml/);
  assert.match(sitemap, /beejmaxx\.github\.io\/books/);
  assert.match(sitemap, /beejmaxx\.github\.io\/books\/platform-integrity/);
  assert.match(sitemap, /beejmaxx\.github\.io\/blog</);
  assert.match(sitemap, /beejmaxx\.github\.io\/case-studies\/tinygrad-contributor-guide/);
  assert.doesNotMatch(sitemap, /\/blog\/(?:complex-systems-begin-with-core-abstractions|why-depth-history-needs-price-anchors)/);
  assert.doesNotMatch(sitemap, /\/(?:notes|attempts|archive)/);
  assert.doesNotMatch(feed, /<entry>/);
  assert.equal(JSON.parse(packet).projects.length, 19);
  for (const asset of [
    ".nojekyll", "og.jpg", "resume.pdf", "engine-sim/index.html", "aikido/index.html",
    "aikido/architecture.html", "aikido/system-map.js", "case-studies/marketplace-integrity.html",
    "assets/screenshots/depthfield-live.png", "assets/screenshots/strategy-explorer.png",
  ]) await access(new URL(asset, clientRoot));
});

test("removes known broken and duplicate public surfaces", async () => {
  const htmlFiles = ["index.html", "work.html", "about.html", "case-studies.html"];
  for (const path of htmlFiles) {
    const page = await readPage(path);
    assert.doesNotMatch(page, /fanpilot\.app\/research-engine|apollo-knowledgebase|github\.com\/beejmaxx\/aikido(?:["/])/);
  }
  for (const oldPage of [
    "attempts.html",
    "archive.html",
    "case-studies/full-stack-operations-workstation.html",
    "case-studies/hedge-fund-trading-infrastructure.html",
    "case-studies/quantbox-research-platform.html",
  ]) await assert.rejects(access(new URL(oldPage, clientRoot)));
});

test("keeps alternate homepage concepts private from search", async () => {
  for (const path of [
    "concepts.html", "concepts/personal-web.html", "concepts/hybrid.html",
    "concepts/project-led.html", "concepts/notebook.html", "concepts/technical-index.html",
  ]) {
    const page = await readPage(path);
    assert.match(page, /noindex/);
  }
});
