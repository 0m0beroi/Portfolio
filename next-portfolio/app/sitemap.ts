import { MetadataRoute } from 'next';
import projects from '../data/projects.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const staticPages = ['', '/about', '/projects', '/contact'].map(path => ({
    url: base + path,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8
  }));

  const projectPages = (projects as any[]).map(p => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: new Date(p.updated || new Date().toISOString()),
    changeFrequency: 'yearly' as const,
    priority: 0.6
  }));

  return [...staticPages, ...projectPages];
}
