import type { Metadata } from "next";
import { SiteShell } from "@/components/SiteShell";
import { WorkExplorer } from "@/components/WorkExplorer";
import { trails, work, workForTrail } from "@/lib/work";
import styles from "./work.module.css";

export const metadata: Metadata = { title:"work",description:"A map of instruments, evidence systems, books, and collections by bijan.",alternates:{canonical:"/work"},openGraph:{title:"work — bijan",description:"Same obsession, different project.",url:"/work"} };

export default function WorkPage(){return <SiteShell current="work"><main className="page" id="main"><section className="pageHero"><p className="eyebrow">curated work / projects can overlap</p><h1>same obsession,<br/><em>different project.</em></h1><p className="deck">This is the organized version. The archive is the raw public record.</p></section><section className={styles.trails}>{trails.map(trail=><article className="panel" id={trail.id} key={trail.id}><header><span>{trail.number}</span><div><h2>{trail.title}</h2><p>{trail.description}</p></div></header><ol>{workForTrail(trail.id).map(item=><li key={item.id}><span>{item.status}</span><h3>{item.title}</h3><p>{item.thesis}</p><div>{item.demo&&<a href={item.demo}>open ↗</a>}{item.caseStudy&&<a href={item.caseStudy}>dossier ↗</a>}<a href={item.source}>source ↗</a></div></li>)}</ol></article>)}</section><WorkExplorer items={work}/></main></SiteShell>}
