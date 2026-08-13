import type { Metadata } from "next";
import { PersonalSiteShell } from "@/components/PersonalSiteShell";
import { ProjectArchive } from "@/components/ProjectArchive";
import { projects } from "@/lib/projects";
import styles from "./archive.module.css";

export const metadata: Metadata = {
  title: "Everything",
  description: "All public repositories by bijan.",
};

export default function ArchivePage() {
  const originals = projects.filter((project) => !project.fork).length;
  const forks = projects.length - originals;

  return (
    <PersonalSiteShell section="everything" footerNote="end of pile">
      <main className={styles.page}>
        <section className={styles.hero}>
          <p className={styles.overline}>the unfiltered pile</p>
          <h1><span>{projects.length}</span><br />repositories.</h1>
          <div className={styles.tally}>
            <p><strong>{originals}</strong> mine</p>
            <p><strong>{forks}</strong> forks</p>
            <p><strong>2010—now</strong> more or less</p>
          </div>
          <p className={styles.deck}>
            {projects.length} public repositories. Finished things, dead things, forks, utilities,
            tests, bad names, and projects I’ve forgotten.
          </p>
        </section>

        <section className={styles.archive} id="repos" aria-label="All repositories">
          <div className={styles.archiveHeading}>
            <span>name / note / language / year</span>
            <a href="/work-map">want the organized version? →</a>
          </div>
          <ProjectArchive projects={projects} />
        </section>
      </main>
    </PersonalSiteShell>
  );
}
