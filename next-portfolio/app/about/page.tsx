import type { Metadata } from 'next';
import { motion } from 'framer-motion';
import { LightboxImage } from '../../components/Lightbox';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me, my skills, services, and approach to building performant, accessible web experiences.'
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 }
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-12">
      <header className="space-y-4">
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 rounded-full overflow-hidden ring-2 ring-accent-blue/40 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile.jpg" alt="Profile portrait" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 space-y-4">
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight"
          >
            About Me
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-lg text-muted-foreground"
          >
            I build fast, accessible interfaces with a focus on user experience, performance budgets, and maintainable design systems.
          </motion.p>
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <motion.h2 {...fadeUp} transition={{ delay: 0.05 }} className="text-2xl font-semibold">Philosophy</motion.h2>
        <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="leading-relaxed text-muted-foreground">
          Crafting on the web means balancing aesthetics, speed, and clarity. I believe in progressive enhancement, defensive design, and small composable components that scale. Every interaction should feel purposeful and never get in a user&apos;s way—especially under constrained networks or devices with reduced motion preferences.
        </motion.p>
      </section>

      <section className="grid gap-8 md:grid-cols-2">
        <motion.div {...fadeUp} transition={{ delay: 0.05 }} className="space-y-4">
          <h3 className="text-xl font-semibold">Core Skills</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>TypeScript / JavaScript (ESNext)</li>
            <li>React & Next.js (App Router)</li>
            <li>Performance optimization & Web Vitals</li>
            <li>Accessibility (WCAG, ARIA authoring)</li>
            <li>CSS architecture / Tailwind / Design tokens</li>
            <li>Framer Motion & nuanced micro-interactions</li>
            <li>API design & edge/serverless patterns</li>
            <li>Caching, CDN strategy, and build pipelines</li>
          </ul>
        </motion.div>
        <motion.div {...fadeUp} transition={{ delay: 0.1 }} className="space-y-4">
          <h3 className="text-xl font-semibold">Tooling / Platforms</h3>
          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
            <li>Vite, Turbopack, Webpack</li>
            <li>PostCSS, Tailwind, CSS Modules</li>
            <li>Node.js (serverless & traditional)</li>
            <li>Edge runtimes (Vercel / Netlify)</li>
            <li>Docker for reproducible environments</li>
            <li>GitHub Actions CI/CD workflows</li>
            <li>Monitoring & observability basics</li>
          </ul>
        </motion.div>
      </section>

      <section className="space-y-6">
        <motion.h2 {...fadeUp} transition={{ delay: 0.05 }} className="text-2xl font-semibold">Approach</motion.h2>
        <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="leading-relaxed text-muted-foreground">
          I start with constraints: performance budgets, accessibility baselines, and content hierarchy. Then I iterate outward—layering motion that respects user preferences, and color systems that adapt across light, dark, and contrast modes. I document decisions so future contributors have clarity, not guesswork.
        </motion.p>
      </section>

      <section className="space-y-6">
        <motion.h2 {...fadeUp} transition={{ delay: 0.05 }} className="text-2xl font-semibold">What I&apos;m Focusing On</motion.h2>
        <motion.ul {...fadeUp} transition={{ delay: 0.1 }} className="list-disc pl-5 space-y-2 text-muted-foreground text-sm">
          <li>Refining a flexible theming system (dim / contrast modes)</li>
            <li>Declarative animation primitives with motion safety</li>
            <li>Better content pipelines (MDX + image optimization)</li>
            <li>Edge-rendered dynamic content with fine-grained caching</li>
        </motion.ul>
      </section>

      <section className="space-y-4">
        <motion.h2 {...fadeUp} transition={{ delay: 0.05 }} className="text-2xl font-semibold">Availability</motion.h2>
        <motion.p {...fadeUp} transition={{ delay: 0.1 }} className="leading-relaxed text-muted-foreground">
          Open to collaborating on products that value accessibility, craft, and long-term maintainability over hacks. If that resonates, reach out via the contact form.
        </motion.p>
      </section>
    </div>
  );
}
