"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/lib/projects";

type Filter = "all" | "original" | "fork";

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visibleProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) => {
      if (filter === "original" && project.fork) return false;
      if (filter === "fork" && !project.fork) return false;
      if (!normalized) return true;
      return [project.name, project.description, project.language].some((value) => value.toLowerCase().includes(normalized));
    });
  }, [filter, projects, query]);

  return (
    <>
      <div className="archive-tools" role="group" aria-label="Filter projects">
        {(["all", "original", "fork"] as Filter[]).map((value) => (
          <button
            className={filter === value ? "active" : ""}
            key={value}
            onClick={() => setFilter(value)}
            type="button"
            aria-pressed={filter === value}
          >
            {value === "all" ? "All" : value === "original" ? "Mine" : "Forks"}
          </button>
        ))}
        <span className="archive-count" aria-live="polite">{visibleProjects.length} shown</span>
        <input
          className="archive-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="find something…"
          aria-label="Search projects"
        />
      </div>

      <div className="archive-table">
        {visibleProjects.map((project, index) => (
          <a className="archive-row" href={project.url} target="_blank" rel="noreferrer" key={project.name}>
            <span className="archive-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="archive-name">{project.name}</span>
            <p className="archive-description">{project.description || "No description."}</p>
            <span className="archive-language">{project.fork ? `Fork · ${project.language}` : project.language}</span>
            <span className="archive-year">{project.created.slice(0, 4)} ↗</span>
          </a>
        ))}
        {visibleProjects.length === 0 && <p className="archive-empty">No matches.</p>}
      </div>
    </>
  );
}
