import data from '../data/projects.json';

export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  stack: string[];
  status: string;
  image?: string;
  content: string;
}

export function allProjects(): Project[] { return data as Project[]; }
export function getProject(slug: string): Project | undefined { return allProjects().find(p => p.slug === slug); }
