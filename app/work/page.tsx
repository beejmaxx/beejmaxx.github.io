import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { trails, workForTrail } from "@/lib/work";
import styles from "./work.module.css";

export const metadata: Metadata = { title:"work",description:"Selected agent infrastructure, execution systems, developer tools, and technical instruments by Bijan.",alternates:{canonical:"/work"},openGraph:{title:"work — bijan",description:"Selected agent infrastructure, execution systems, developer tools, and technical instruments.",url:"/work"} };

const visibleTrails = trails.filter((trail) => trail.id !== "library");

export default function WorkPage() {
  return (
    <SiteShell current="work">
      <main className="page" id="main">
        <header className="pageHero">
          <h1>Work</h1>
          <p className="deck">Agent infrastructure, execution systems, developer tools, and technical instruments. Some projects appear in more than one group.</p>
        </header>
        <div className={styles.groups}>
          {visibleTrails.map((trail) => (
            <section id={trail.id} key={trail.id}>
              <header><div><h2>{trail.title}</h2><p>{trail.description}</p></div><span>{trail.number}</span></header>
              <ul>
                {workForTrail(trail.id).filter((item) => item.kind !== "book" && item.kind !== "collection").map((item) => (
                  <li key={item.id}>
                    <div><h3>{item.title}</h3><p>{item.thesis}</p></div>
                    <span>{item.status}</span>
                    <nav aria-label={`${item.title} links`}>
                      {item.demo && <a href={item.demo}>open</a>}
                      {item.caseStudy && <a href={item.caseStudy}>case study</a>}
                      <a href={item.source}>source</a>
                    </nav>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
