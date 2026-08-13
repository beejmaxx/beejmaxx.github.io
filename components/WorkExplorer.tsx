"use client";

import { useState } from "react";
import type { WorkItem } from "@/lib/work";
import { obsessions } from "@/lib/work";
import styles from "./WorkExplorer.module.css";

export function WorkExplorer({ items }: { items: WorkItem[] }) {
  const [filter, setFilter] = useState("all");
  const visible = filter === "all" ? items : items.filter((item) => item.trails.includes(filter));
  return (
    <section className={styles.explorer} aria-labelledby="work-explorer-title">
      <header><div><p className="eyebrow">browse by recurring idea</p><h2 id="work-explorer-title">Things I keep doing.</h2></div><p>Choose a thread. Projects can appear in more than one because the same decisions keep returning in different material.</p></header>
      <div className={styles.filters} role="group" aria-label="Filter work by recurring idea">
        <button type="button" aria-pressed={filter === "all"} onClick={() => setFilter("all")}>everything <span>{items.length}</span></button>
        {obsessions.map((item) => <button type="button" key={item.id} aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label} <span>{items.filter((work) => work.trails.includes(item.id)).length}</span></button>)}
      </div>
      <div className={styles.list}>
        {visible.map((item,index) => (
          <article key={item.id}>
            <span>{String(index + 1).padStart(2,"0")}</span>
            <div><p>{item.kind} / {item.status}</p><h3>{item.title}</h3></div>
            <p>{item.thesis} {item.proof}</p>
            <div>{item.demo && <a href={item.demo}>open ↗</a>} {item.caseStudy && <a href={item.caseStudy}>dossier ↗</a>} <a href={item.source}>source ↗</a></div>
          </article>
        ))}
      </div>
    </section>
  );
}
