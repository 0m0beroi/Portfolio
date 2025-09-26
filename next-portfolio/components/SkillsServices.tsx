import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  { name:'Circuit Design', level:90 },
  { name:'Embedded Systems', level:85 },
  { name:'Web Development', level:80 },
  { name:'Data Structures & Algorithms', level:75 }
];

const services = [
  { title:'Web Designing', desc:'Modern, responsive and user-focused interfaces.' },
  { title:'Project Development', desc:'From concept to deployment across hardware & software.' },
  { title:'Tutoring', desc:'Guidance in electronics, programming, and web dev.' }
];

export default function SkillsServices(){
  return (
    <section id="skills" className="max-w-7xl mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold mb-8">Technical Skills</h2>
          <div className="space-y-6">
            {skills.map((s,i)=> (
              <motion.div key={s.name} initial={{opacity:0, y:12}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:.45, delay:i*0.04}}>
                <div className="flex justify-between text-sm font-medium mb-1">
                  <span>{s.name}</span>
                  <span className="text-accent-blue">{s.level}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full bg-accent-blue/90 dark:bg-accent-blue" style={{width:`${s.level}%`}} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-8">Services Offered</h2>
          <div className="space-y-6">
            {services.map((srv,i)=>(
              <motion.div key={srv.title} initial={{opacity:0, y:12}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.45, delay:i*0.05}} className="p-6 rounded-xl border border-slate-200/60 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur">
                <h3 className="font-semibold text-lg mb-2">{srv.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{srv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
