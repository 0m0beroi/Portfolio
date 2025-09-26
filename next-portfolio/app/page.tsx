import React from 'react';
import Hero from '../components/Hero';
import ProjectsPreview from '../components/ProjectsPreview';
import SkillsServices from '../components/SkillsServices';
import ContactCta from '../components/ContactCta';

export default function HomePage(){
  return (
    <div className="space-y-32">
      <Hero />
      <ProjectsPreview />
      <SkillsServices />
      <ContactCta />
    </div>
  );
}
