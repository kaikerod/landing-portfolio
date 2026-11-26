import { useRef, useState } from 'react';
import type { FocusEvent, PointerEvent } from 'react';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'motion/react';
import { SITE_META, STACK_ITEMS } from '../data/portfolio';
import type { StackItem } from '../data/portfolio';

export function AboutStackSection() {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [canFloatPreview, setCanFloatPreview] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const previewX = useSpring(rawX, { stiffness: 260, damping: 26, mass: 0.65 });
  const previewY = useSpring(rawY, { stiffness: 260, damping: 26, mass: 0.65 });

  const updatePointerPreview = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    const container = listRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const minX = rect.width * 0.44;
    const maxX = rect.width * 0.66;
    const relativeX = event.clientX - rect.left;
    const clampedX = Math.min(maxX, Math.max(minX, relativeX));
    const relativeY = event.clientY - rect.top;

    rawX.set(clampedX);
    rawY.set(relativeY);
  };

  const handleRowPointerEnter = (index: number, event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') return;
    setCanFloatPreview(true);
    setActiveIndex(index);
    updatePointerPreview(event);
  };

  const handleRowFocus = (index: number, event: FocusEvent<HTMLDivElement>) => {
    const container = listRef.current;
    if (!container) return;

    const listRect = container.getBoundingClientRect();
    const rowRect = event.currentTarget.getBoundingClientRect();

    setCanFloatPreview(true);
    setActiveIndex(index);
    rawX.set(listRect.width * 0.56);
    rawY.set(rowRect.top - listRect.top + rowRect.height / 2);
  };

  const handleListLeave = () => {
    setActiveIndex(null);
  };

  const activeItem: StackItem | null =
    activeIndex !== null ? STACK_ITEMS[activeIndex] ?? null : null;

  return (
    <section
      id="sobre"
      aria-labelledby="about-stack-heading"
      className="relative overflow-x-clip bg-[#1c1c1c] py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Header Row with Subtle Dark Watermark & Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end"
        >
          <div className="relative">
            <span
              aria-hidden="true"
              className="pointer-events-none block select-none font-extrabold uppercase leading-[0.84] tracking-[-0.04em] text-[clamp(4.25rem,11.5vw,8.75rem)] text-white/[0.04]"
            >
              ABOUT
            </span>
            <h2
              id="about-stack-heading"
              className="relative z-10 -mt-7 pl-1 text-2xl font-semibold tracking-[-0.03em] text-white sm:-mt-11 sm:text-3xl md:-mt-14 md:text-[2.15rem]"
            >
              /ABOUT &amp; STACK
            </h2>
          </div>

          <p className="text-sm font-normal tracking-tight text-white/60 md:pb-1 md:text-[15px]">
            {SITE_META.statsSummary}
          </p>
        </motion.div>

        {/* Concise Editorial Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 grid grid-cols-1 gap-5 md:mb-16 lg:grid-cols-12 lg:gap-10"
        >
          <p className="text-xl font-medium leading-[1.35] tracking-[-0.02em] text-white/95 sm:text-2xl lg:col-span-7 md:text-[1.6rem]">
            {SITE_META.aboutLead}
          </p>
          <p className="text-sm leading-relaxed text-white/60 md:text-[15px] lg:col-span-5 lg:pt-1">
            {SITE_META.aboutBody}
          </p>
        </motion.div>

        {/* Interactive Stack Rows */}
        <div
          ref={listRef}
          role="list"
          aria-label="Core technology stack"
          onPointerMove={updatePointerPreview}
          onPointerLeave={handleListLeave}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              setActiveIndex(null);
            }
          }}
          className="relative border-t border-white/10"
        >
          {STACK_ITEMS.map((item: StackItem, index: number) => {
            const isActive = activeIndex === index;
            const isDimmed = activeIndex !== null && activeIndex !== index;

            return (
              <motion.div
                key={item.id}
                role="listitem"
                tabIndex={0}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onPointerEnter={(event) => handleRowPointerEnter(index, event)}
                onFocus={(event) => handleRowFocus(index, event)}
                className={`group relative cursor-default border-b border-white/10 px-3 py-6 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 sm:px-4 md:py-7 ${
                  isActive
                    ? 'bg-white/[0.035] opacity-100'
                    : isDimmed
                      ? 'opacity-40'
                      : 'opacity-100'
                }`}
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center sm:gap-6">
                  <div className="min-w-0">
                    <h3
                      className={`text-lg font-medium tracking-[-0.015em] transition-colors duration-300 sm:text-xl ${
                        isActive ? 'text-white' : 'text-white/90'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`mt-1 text-sm transition-colors duration-300 ${
                        isActive ? 'text-white/75' : 'text-white/50'
                      }`}
                    >
                      {item.role}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 text-xs font-normal tracking-tight transition-colors duration-300 sm:text-right sm:text-sm ${
                      isActive ? 'text-white/95' : 'text-white/55'
                    }`}
                  >
                    {item.projectsLabel}
                  </span>
                </div>
              </motion.div>
            );
          })}

          {/* Desktop Tilted Floating Preview Card */}
          <motion.div
            aria-hidden="true"
            style={{ x: previewX, y: previewY }}
            className="pointer-events-none absolute top-0 left-0 z-30 hidden -translate-x-1/2 -translate-y-1/2 md:block"
          >
            <AnimatePresence>
              {canFloatPreview && activeItem && (
                <motion.div
                  key="stack-floating-card"
                  initial={{ opacity: 0, scale: 0.88, rotate: 9 }}
                  animate={{ opacity: 1, scale: 1, rotate: 4.5 }}
                  exit={{ opacity: 0, scale: 0.9, rotate: 7 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                  className="w-[260px] rounded-2xl bg-[#262626] p-1.5 shadow-[0_28px_65px_rgba(0,0,0,0.65)] ring-1 ring-white/15 lg:w-[290px]"
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeItem.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.16, ease: 'easeOut' }}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#161616]">
                        <img
                          src={activeItem.previewImage}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between px-2 pt-2 pb-1">
                        <span className="truncate text-[11px] font-medium tracking-tight text-white/90">
                          {activeItem.previewCaption}
                        </span>
                        <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
