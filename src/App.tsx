import { memo, useCallback, useState } from 'react';
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

const MemoHeader = memo(Header);
const MemoHero = memo(Hero);
const MemoSelectedWork = memo(SelectedWork);
const MemoServicesSection = memo(ServicesSection);
const MemoAboutStackSection = memo(AboutStackSection);
const MemoContactCta = memo(ContactCta);
const MemoFooter = memo(Footer);

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleCloseProject = useCallback(() => setSelectedProject(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#f5f5f5] text-[#111111] antialiased">
        <MemoHeader />
        <main>
          <MemoHero />
          <MemoSelectedWork onSelectProject={setSelectedProject} />
          <MemoServicesSection />
          <MemoAboutStackSection />
          <MemoContactCta />
        </main>
        <MemoFooter />
        <ProjectModal
          project={selectedProject}
          onClose={handleCloseProject}
        />
      </div>
    </MotionConfig>
  );
}
