import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const clientRoot = new URL("../dist/client/", import.meta.url);

async function readPage(path) {
  return readFile(new URL(path, clientRoot), "utf8");
}

test("exports the portfolio and every public index", async () => {
  const paths = [
    "index.html", "work.html", "books.html", "library.html", "notes.html",
    "about.html", "case-studies.html", "blog.html", "work-map.html",
  ];
  const pages = await Promise.all(paths.map(readPage));
  const [home, work, books, library, notes, about, cases, blogAlias, workAlias] = pages;

  assert.match(home, /making hidden systems inspectable/i);
  assert.match(home, /Depthfield/);
  assert.match(home, /01 \/ flagship system/i);
  assert.match(home, /start with Aikido/i);
  assert.match(home, /systems with receipts/i);
  assert.match(work, /same obsession/i);
  assert.match(work, /Polymarket MCP/);
  assert.match(books, /Async Rust Guidebook/);
  assert.match(books, /Platform Integrity/);
  assert.match(books, /Building Dependable Data Systems/);
  assert.match(books, /Distributed Systems Guidebook/);
  assert.match(books, /href="\/books\/platform-integrity"/);
  assert.doesNotMatch(books, /Rust API Field Guide/);
  assert.match(library, /Rust API Design Guidebook/);
  assert.match(library, /Platform Integrity/);
  assert.doesNotMatch(home, /href="\/attempts"/);
  assert.doesNotMatch(home, /href="\/(?:notes|blog|archive)"/);
  assert.match(notes, /price anchor for every column/i);
  assert.match(about, /Ruby, Rails/i);
  assert.match(cases, /engineering records/i);
  assert.match(cases, /The Predicate Sweep/);
  assert.match(blogAlias, /price anchor for every column/i);
  assert.match(workAlias, /same obsession/i);

  for (const page of pages) {
    assert.match(page, /Choose site treatment/);
    assert.match(page, />bijan</);
  }
});

test("publishes a dedicated Platform Integrity one-pager", async () => {
  const page = await readPage("books/platform-integrity.html");
  assert.match(page, /Most platforms start with the wrong question/);
  assert.match(page, /A field guide for decisions that detectors cannot make/);
  assert.match(page, /Read the public draft/);
  assert.match(page, /Discuss the work/);
  assert.match(page, /NIST risk and identity frameworks/);
  assert.match(page, /https:\/\/beejmaxx\.github\.io\/platform-integrity\//);
});

test("publishes one real note and keeps old drafts out", async () => {
  const note = await readPage("blog/why-depth-history-needs-price-anchors.html");
  assert.match(note, /History should be immutable/);
  assert.match(note, /coordinate system/i);
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

  assert.match(cases, /four subsystem dossiers/i);
  assert.match(cases, /One Account, One Truth/);
  assert.match(account, /OneAccountState/);
  assert.match(account, /the close can lie/i);
  assert.match(convergence, /2× position overshoot/i);
  assert.match(convergence, /practice position reaches −150/i);
  assert.match(evidence, /126 out-of-sample trading days/i);
  assert.match(evidence, /canonical_authoritative/);
  assert.match(hub, /One project, several truth boundaries/i);
  assert.match(hub, /Choose site treatment/i);
  assert.match(hub, /href="\/archive"/i);
  assert.match(architecture, /Choose site treatment/i);
  assert.match(architecture, /href="\/notes"/i);
  assert.doesNotMatch(`${account}${convergence}${evidence}`, /\[\[visual:/);
});

test("exports discovery files, data, and public artifacts", async () => {
  const [robots, sitemap, feed, packet] = await Promise.all([
    readPage("robots.txt"), readPage("sitemap.xml"), readPage("feed.xml"), readPage("projects.json"),
  ]);
  assert.match(robots, /Sitemap: https:\/\/beejmaxx\.github\.io\/sitemap\.xml/);
  assert.match(sitemap, /beejmaxx\.github\.io\/books/);
  assert.match(sitemap, /beejmaxx\.github\.io\/books\/platform-integrity/);
  assert.doesNotMatch(sitemap, /\/(?:blog|notes|attempts|archive)/);
  assert.match(feed, /Why a depth heatmap needs a price anchor/);
  assert.equal(JSON.parse(packet).projects.length, 16);
  for (const asset of [
    ".nojekyll", "og.jpg", "resume.pdf", "engine-sim/index.html", "aikido/index.html",
    "aikido/architecture.html", "case-studies/marketplace-integrity.html",
    "assets/screenshots/depthfield-live.png", "assets/screenshots/trading-fleet-dashboard.png",
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
