import React from 'react';
import Link from 'next/link';
import { allProjects } from '../../lib/projects';

export const metadata = { title: 'Projects | Om Oberoi' };

export default function ProjectsPage(){
  const projects = allProjects();
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-10">Projects</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map(p => (
          <article key={p.slug} className="p-5 rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
            <h2 className="font-semibold text-lg mb-2">{p.title}</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{p.excerpt}</p>
            <Link href={`/projects/${p.slug}`} className="text-accent-blue text-sm font-medium hover:underline">Read more →</Link>
          </article>
        ))}
      </div>
    </div>
  );
}
