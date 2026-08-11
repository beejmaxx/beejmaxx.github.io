import projectData from "@/content/projects.json";

export type Project = {
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  fork: boolean;
  archived: boolean;
  url: string;
  homepage: string;
  created: string;
  updated: string;
};

export const projects = projectData as Project[];
