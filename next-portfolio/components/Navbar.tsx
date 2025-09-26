import React from 'react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

export default function Navbar(){
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200/60 dark:border-slate-700/60">
      <nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">Om Oberoi</Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/projects" className="hover:text-accent-blue transition-colors">Projects</Link>
          <Link href="/about" className="hover:text-accent-blue transition-colors">About</Link>
          <Link href="/contact" className="hover:text-accent-blue transition-colors">Contact</Link>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
