import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";

function linkFor(id) {
  const attributes = new Map([["href", `#${id}`]]);
  const listeners = new Map();
  return {
    dataset: {},
    focused: false,
    addEventListener(type, listener) { listeners.set(type, listener); },
    click() {
      let prevented = false;
      listeners.get("click")({ preventDefault() { prevented = true; } });
      return prevented;
    },
    focus() { this.focused = true; },
    getAttribute(name) { return attributes.get(name) ?? null; },
    removeAttribute(name) { attributes.delete(name); },
    setAttribute(name, value) { attributes.set(name, String(value)); },
    value(name) { return attributes.get(name); },
  };
}

test("enhances the Aikido stage index without requiring global key handlers", async () => {
  const ids = ["stage-market", "stage-research", "stage-frozen", "stage-policy", "stage-runtime", "stage-evaluation"];
  const links = ids.map(linkFor);
  const panels = ids.map((id) => ({ id, hidden: false }));
  const map = {
    dataset: {},
    querySelectorAll(selector) {
      if (selector === "[data-stage-link]") return links;
      if (selector === "[data-stage-panel]") return panels;
      return [];
    },
  };
  let replacedHash = null;
  const source = await readFile(new URL("../public/aikido/system-map.js", import.meta.url), "utf8");
  assert.doesNotMatch(source, /keydown|Arrow(?:Left|Right)/);

  vm.runInNewContext(source, {
    document: { querySelectorAll: () => [map] },
    window: {
      location: { hash: "#stage-runtime" },
      history: { replaceState(_state, _title, hash) { replacedHash = hash; } },
    },
  });

  assert.equal(map.dataset.enhanced, "true");
  assert.equal(panels.find((panel) => panel.id === "stage-runtime").hidden, false);
  assert.equal(panels.filter((panel) => !panel.hidden).length, 1);
  assert.equal(links[4].value("aria-current"), "step");
  assert.equal(links[4].value("aria-expanded"), "true");
  assert.equal(links[4].value("aria-controls"), "stage-runtime");

  assert.equal(links[1].click(), true);
  assert.equal(replacedHash, "#stage-research");
  assert.equal(panels.find((panel) => panel.id === "stage-research").hidden, false);
  assert.equal(panels.filter((panel) => !panel.hidden).length, 1);
  assert.equal(links[1].value("aria-current"), "step");
});
