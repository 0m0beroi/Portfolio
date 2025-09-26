"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useMotionPreferences } from '../lib/motion'; // TS should resolve .ts; if NodeNext complains, adjust tsconfig moduleResolution to 'bundler'

export default function Hero(){
  const { reduced, duration, disabled } = useMotionPreferences();
  const initial = disabled ? { opacity:1, y:0 } : { opacity:0, y:20 };
  const animate = { opacity:1, y:0 };
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute -top-10 -right-16 w-80 h-80 rounded-full bg-accent-blue/20 blur-3xl animate-float-slow" aria-hidden />
      <div className="absolute -bottom-12 -left-12 w-80 h-80 rounded-full bg-sky-400/20 blur-3xl animate-float-slow" aria-hidden />
      <div className="relative z-10 text-center max-w-3xl px-4">
        <motion.h1
          initial={initial}
          animate={animate}
          transition={{duration: duration(.65), ease:'easeOut'}}
          className="text-5xl md:text-7xl font-bold tracking-tight"
        >Om <span className="text-accent-blue">Oberoi</span></motion.h1>
        <motion.p
          initial={initial}
          animate={animate}
          transition={{duration: duration(.55), delay: disabled?0:.15, ease:'easeOut'}}
          className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-medium"
        >Electronics & Communication Engineer | Web Developer | Innovator</motion.p>
        <motion.div
          initial={initial}
          animate={animate}
          transition={{duration: duration(.55), delay: disabled?0:.3, ease:'easeOut'}}
          className="mt-10"
        >
          <a href="#projects" className="inline-flex items-center px-8 py-4 rounded-full bg-accent-blue text-white font-semibold shadow hover:shadow-lg transition-transform hover:scale-105">View My Work</a>
        </motion.div>
        {reduced && <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">Motion reduced (respecting system or manual preference).</p>}
      </div>
    </section>
  );
}
