'use client';
import React from 'react';
import { useTheme } from 'next-themes';

const modes = ['light','dark','system','dim','contrast'] as const;

declare global { interface Window { __contrastMode?: boolean; __dimMode?: boolean; } }

export default function ThemeToggle(){
  const { theme, setTheme, systemTheme } = useTheme();
  const effective = theme === 'system' ? systemTheme : theme;

  // Ensure dim/contrast also benefit from dark mode styles by adding/removing 'dark' class.
  React.useEffect(()=>{
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    if (effective === 'dim' || effective === 'contrast') {
      root.classList.add('dark');
    } else if (effective === 'light') {
      root.classList.remove('dark');
    } else if (effective === 'dark') {
      root.classList.add('dark');
    }
  }, [effective]);

  const handleSet = (m: typeof modes[number]) => {
    if (m === 'dim' || m === 'contrast') {
      // store custom value in localStorage manually since next-themes treats unknown as raw
      setTheme(m as any);
      return;
    }
    setTheme(m);
  };

  return (
    <div className="flex items-center gap-2">
      {modes.map(m => (
        <button
          key={m}
          onClick={()=> handleSet(m)}
          className={`px-2 py-1 rounded text-xs border capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-accent-blue/60 ${theme===m ? 'bg-accent-blue text-white border-accent-blue' : 'border-slate-300 dark:border-slate-600 hover:border-accent-blue'}`}
          aria-pressed={theme===m}
        >{m}</button>
      ))}
    </div>
  );
}
