import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { SITE_META } from '../data/portfolio';
import type { Project } from '../data/portfolio';

export function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const backButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!project) return;

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = window.setTimeout(() => {
      backButtonRef.current?.focus();
    }, 30);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          key="project-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-neutral-950/55 p-3 backdrop-blur-sm sm:p-6 md:p-8"
        >
          <motion.div
            key={project.id}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-[1040px] overflow-hidden rounded-[1.5rem] border border-neutral-900/10 bg-[#f7f7f7] text-[#111111] shadow-[0_32px_90px_-20px_rgba(0,0,0,0.35)] sm:rounded-[2rem]"
          >
            {/* Subtle editorial sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-br from-white/85 via-white/25 to-transparent"
            />

            <div className="relative z-10 p-5 sm:p-8 md:p-12">
              {/* Top bar: Back button + Availability pill */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  ref={backButtonRef}
                  type="button"
                  onClick={onClose}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-900/10 bg-white px-4 py-2 text-xs font-medium text-[#111111] shadow-xs transition-colors hover:bg-[#181818] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] sm:text-sm"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Back</span>
                </button>

                <div className="inline-flex items-center gap-2 rounded-full border border-neutral-900/[0.08] bg-white/95 px-3.5 py-1.5 text-[11px] font-medium text-[#111111] shadow-xs sm:text-xs">
                  <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-70 motion-reduce:animate-none" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
                  </span>
                  <span>{SITE_META.availabilityText}</span>
                </div>
              </div>

              {/* Project editorial header + right metadata column */}
              <div className="mt-8 grid grid-cols-1 items-start gap-8 sm:mt-11 lg:grid-cols-12 lg:gap-10">
                {/* Left: Tags, Title + Category, Full description, Action CTAs */}
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-neutral-900/[0.08] bg-white px-3 py-1 text-xs font-medium text-[#333333]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2
                      id="project-modal-title"
                      className="text-3xl font-bold tracking-[-0.03em] text-[#111111] sm:text-4xl md:text-5xl"
                    >
                      {project.title}
                    </h2>
                    <span className="text-base font-normal text-[#8a8a8a] sm:text-lg md:text-xl">
                      /{project.category}
                    </span>
                  </div>

                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#555555] sm:text-[15.5px]">
                    {project.fullDescription}
                  </p>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full bg-[#181818] px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-all duration-200 hover:bg-[#2c2c2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                      >
                        <span>Live Preview</span>
                        <ArrowUpRight
                          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </a>
                    ) : null}

                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-neutral-900/15 bg-white px-5 py-2.5 text-sm font-medium text-[#111111] shadow-xs transition-all duration-200 hover:border-neutral-900/35 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </div>
                </div>

                {/* Right: Metadata summary (Focus, Category, Stack) */}
                <dl className="flex flex-col gap-5 border-t border-neutral-900/[0.08] pt-6 sm:gap-6 lg:col-span-5 lg:border-t-0 lg:pt-2 lg:text-right">
                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a8a8a]">
                      Focus
                    </dt>
                    <dd className="mt-1 text-base font-medium text-[#111111] sm:text-lg">
                      {project.focus}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a8a8a]">
                      Category
                    </dt>
                    <dd className="mt-1 text-base font-medium text-[#111111] sm:text-lg">
                      {project.category}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8a8a8a]">
                      Stack
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-1.5 lg:justify-end">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-neutral-900/[0.07] bg-white px-2.5 py-1 text-xs font-medium text-[#3a3a3a]"
                        >
                          {tag}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Large rounded preview showcase */}
              <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-900/[0.08] bg-white p-2 shadow-[0_14px_40px_-20px_rgba(17,17,17,0.16)] sm:mt-12 sm:p-3">
                <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#efefef]">
                  <img
                    src={project.image}
                    alt={`${project.title} showcase preview`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
