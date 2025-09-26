import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ContactCta(){
  return (
    <section className="max-w-5xl mx-auto px-4 text-center py-24">
      <motion.h2 initial={{opacity:0, y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.6}} className="text-4xl font-bold mb-6">Get In Touch</motion.h2>
      <motion.p initial={{opacity:0, y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.55, delay:.1}} className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">Ready to collaborate? Let’s talk about your next project or explore ideas together.</motion.p>
      <motion.div initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.55, delay:.18}}>
        <Link href="/contact" className="inline-flex items-center px-8 py-4 rounded-full bg-accent-blue text-white font-semibold shadow hover:shadow-lg transition-transform hover:scale-105">Contact Me →</Link>
      </motion.div>
    </section>
  );
}
