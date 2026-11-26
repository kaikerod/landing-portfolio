import { useState } from 'react';
import type { KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio';
import type { Project, ProjectCategory } from '../data/portfolio';

type FilterOption = 'All' | ProjectCategory;

const FILTER_OPTIONS: FilterOption[] = ['All', 'Full-Stack', 'Frontend', 'Python'];

export function SelectedWork({
  onSelectProject,
}: {
  onSelectProject: (project: Project) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [showAll, setShowAll] = useState(false);

  const featuredCount = PROJECTS.filter((project) => project.featured).length;
  const totalCount = PROJECTS.length;

  const visibleProjects =
    activeFilter === 'All'
      ? showAll
        ? PROJECTS
        : PROJECTS.filter((project) => project.featured)
      : PROJECTS.filter((project) => project.category === activeFilter);

  const handleToggleAll = () => {
    if (activeFilter !== 'All') {
      setActiveFilter('All');
      setShowAll(true);
      return;
    }
    setShowAll((prev) => !prev);
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    project: Project,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelectProject(project);
    }
  };

  const toggleButtonLabel =
    activeFilter === 'All' && showAll
      ? `Show Featured (${String(featuredCount).padStart(2, '0')})`
      : `View All Work (${String(totalCount).padStart(2, '0')})`;

  return (
    <section
      id="projetos"
      className="relative bg-[#f5f5f5] py-20 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Centered heading over huge faint watermark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-center py-4 text-center sm:py-8"
        >
          <span
            aria-hidden="true"
            className="font-display pointer-events-none select-none font-extrabold uppercase leading-none tracking-[0.06em] text-neutral-900/[0.045]"
            style={{ fontSize: 'clamp(3.6rem, 13vw, 10.5rem)' }}
          >
            PORTFOLIO
          </span>
          <h2 className="absolute text-2xl font-semibold tracking-[-0.025em] text-[#111111] sm:text-3xl md:text-[2.35rem]">
            /SELECTED WORK
          </h2>
        </motion.div>

        {/* Controls row: Category filters + View All toggle */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex flex-col gap-4 border-b border-neutral-900/[0.08] pb-4 sm:mt-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-5 sm:gap-7"
          >
            {FILTER_OPTIONS.map((category) => {
              const isActive = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveFilter(category)}
                  className={`relative cursor-pointer pb-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] ${
                    isActive
                      ? 'text-[#111111]'
                      : 'text-[#8a8a8a] hover:text-[#333333]'
                  }`}
                >
                  <span>{category}</span>
                  {isActive ? (
                    <motion.span
                      layoutId="selected-work-active-tab"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                      className="absolute inset-x-0 -bottom-[1px] h-[2px] rounded-full bg-[#111111]"
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleToggleAll}
            className="group inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-neutral-900/10 bg-white px-4 py-2 text-xs font-medium text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.03)] transition-all duration-200 hover:border-neutral-900/25 hover:bg-[#181818] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] sm:self-auto sm:text-[13px]"
          >
            <span>{toggleButtonLabel}</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </motion.div>

        {/* 2-column project grid */}
        <motion.div
          layout
          className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 md:grid-cols-2 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 22, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                  transition: { duration: 0.18, delay: 0 },
                }}
                transition={{
                  duration: 0.4,
                  delay: Math.min(index * 0.05, 0.2),
                  ease: [0.22, 1, 0.36, 1],
                }}
                role="button"
                tabIndex={0}
                aria-label={`Open case study for ${project.title}`}
                onClick={() => onSelectProject(project)}
                onKeyDown={(event) => handleCardKeyDown(event, project)}
                className="group relative flex cursor-pointer flex-col rounded-2xl border border-neutral-900/[0.07] bg-white p-2.5 shadow-[0_1px_3px_rgba(17,17,17,0.03)] transition-all duration-300 hover:border-neutral-900/15 hover:shadow-[0_22px_50px_-24px_rgba(17,17,17,0.16)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] sm:p-3"
              >
                {/* 16/10 preview image frame */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#efefef]">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.shortDescription}`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.035]"
                  />
                  <span className="absolute top-3 left-3 inline-flex items-center rounded-md border border-neutral-900/[0.06] bg-white/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#111111] shadow-xs backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>

                {/* Card footer */}
                <div className="flex flex-1 flex-col justify-between px-2.5 pt-4 pb-2">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-semibold tracking-[-0.02em] text-[#111111] sm:text-[1.22rem]">
                        {project.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-transparent text-[#8a8a8a] transition-all duration-200 group-hover:border-neutral-900/10 group-hover:bg-[#f5f5f5] group-hover:text-[#111111]"
                      >
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#666666] sm:text-[13.5px]">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-neutral-900/[0.05] bg-[#f5f5f5] px-2.5 py-1 text-[11px] font-medium text-[#4a4a4a]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
