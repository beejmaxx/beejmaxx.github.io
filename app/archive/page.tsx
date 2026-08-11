import type { Metadata } from "next";
import { ProjectArchive } from "@/components/ProjectArchive";
import { SimpleFooter, SiteHeader } from "@/components/SiteHeader";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Repository Archive",
  description: "Every public Bijan Pourriahi repository: original work, experiments, forks, utilities, and old ideas.",
};

export default function ArchivePage() {
  const originals = projects.filter((project) => !project.fork).length;
  const forks = projects.length - originals;

  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <section className="page-hero wrap">
          <p className="eyebrow">GitHub archive</p>
          <h1>{projects.length} public<br /><span className="serif">repositories.</span></h1>
          <p className="page-deck">
            {originals} original projects and {forks} forks from 2010 to now, including experiments,
            utilities, old ideas, and unfinished work.
          </p>
        </section>
        <section className="wrap">
          <ProjectArchive projects={projects} />
        </section>
      </main>
      <SimpleFooter />
    </>
  );
}
