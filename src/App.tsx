import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import type { Project } from './data/portfolio';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { ServicesSection } from './components/ServicesSection';
import { AboutStackSection } from './components/AboutStackSection';
import { ContactCta } from './components/ContactCta';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#f5f5f5] text-[#111111] antialiased">
        <Header />
        <main>
          <Hero />
          <SelectedWork onSelectProject={setSelectedProject} />
          <ServicesSection />
          <AboutStackSection />
          <ContactCta />
        </main>
        <Footer />
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
