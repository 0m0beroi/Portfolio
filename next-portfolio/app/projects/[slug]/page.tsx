import React from 'react';
import { notFound } from 'next/navigation';
import { getProject, allProjects } from '../../../lib/projects';
import type { Metadata } from 'next';
import Link from 'next/link';
import fs from 'node:fs';
import path from 'node:path';
import { compileMDX } from 'next-mdx-remote/rsc'; // if not installed, adjust approach later

interface Params { slug: string }

export function generateStaticParams(){
  return allProjects().map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const project = getProject(params.slug);
  if(!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Projects | Om Oberoi`,
    description: project.excerpt
  };
}

async function getMDXContent(slug: string){
  const contentDir = path.join(process.cwd(),'next-portfolio','content','projects');
  const file = path.join(contentDir, `${slug}.mdx`);
  if (fs.existsSync(file)) {
    const source = fs.readFileSync(file,'utf8');
    const { content } = await compileMDX({ source });
    return content;
  }
  return null;
}

export default async function ProjectPage({ params }: { params: Params }){
  const project = getProject(params.slug);
  if(!project) return notFound();
  const mdx = await getMDXContent(params.slug);
  return (
    <article className="max-w-3xl mx-auto px-4 py-20 prose dark:prose-invert">
      <Link href="/projects" className="text-sm text-accent-blue no-underline">← Back to Projects</Link>
      <h1>{project.title}</h1>
      <p className="text-sm -mt-4 mb-6 text-slate-500 dark:text-slate-400">{project.excerpt}</p>
      {mdx ? mdx : <pre className="rounded bg-slate-900/80 text-slate-200 p-4 text-xs overflow-auto">{project.content}</pre>}
    </article>
  );
}
