"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProjectsPreview(){
  const sample = [
    { slug:'wifi-repeater', title:'WiFi Repeater', excerpt:'Extends wireless coverage using embedded control.' },
    { slug:'wearable-oscilloscope', title:'Wearable Oscilloscope', excerpt:'Portable signal visualization concept.' },
    { slug:'career-booster', title:'Career Booster', excerpt:'Learning & productivity companion project.' }
  ];
  return (
    <section id="projects" className="max-w-7xl mx-auto px-4">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Featured Projects</h2>
        <Link href="/projects" className="text-accent-blue text-sm hover:underline">View all</Link>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {sample.map((p,i)=> (
          <motion.article
            key={p.slug}
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true, margin:'-80px'}}
            transition={{duration:.55, delay:i*0.05}}
            className="rounded-xl border border-slate-200/60 dark:border-slate-700/60 p-5 bg-white/60 dark:bg-slate-900/60 backdrop-blur hover:border-accent-blue/60 transition-colors"
          >
            <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{p.excerpt}</p>
            <Link href={`/projects/${p.slug}`} className="text-accent-blue text-sm font-medium hover:underline">Read more →</Link>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
