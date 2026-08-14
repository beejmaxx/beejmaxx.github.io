import type { Metadata } from "next";
import styles from "./concepts.module.css";
import { conceptLinks } from "./concept-data";

export const metadata: Metadata = { title: "Homepage concepts", robots: { index: false, follow: false } };

const descriptions: Record<string, string> = {
  "/": "The current working homepage.",
  "/concepts/site-system": "Three complete visual systems, each applied consistently to both the homepage and Aikido.",
  "/concepts/personal-web": "A warmer, personal-web direction inspired by independent technical blogs.",
  "/concepts/hybrid": "The current homepage structure with stronger project evidence and hierarchy.",
  "/concepts/project-led": "Large evidence, named projects, and a clear narrative.",
  "/concepts/notebook": "Work presented as a research log with decisions and status.",
  "/concepts/technical-index": "A dense, fast technical inventory for expert readers.",
};

export default function ConceptsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <p className={styles.kicker}>Unpublished working area</p>
        <h1>Homepage concepts</h1>
        <p className={styles.intro}>
          Several independent directions using the same body of work. The current homepage is still
          available for comparison, and none of these concepts changes it.
        </p>
        <div className={styles.grid}>
          {conceptLinks.map(([label, href], index) => (
            <a href={href} key={href}>
              <span>{String(index).padStart(2, "0")}</span>
              <strong>{label}</strong>
              <p>{descriptions[href]}</p>
              <i>Open →</i>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
