import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { SERVICES } from '../data/portfolio';
import type { ServiceItem } from '../data/portfolio';

export function ServicesSection() {
  const [activeId, setActiveId] = useState<string | null>(SERVICES[0]?.id ?? null);

  const toggleService = (id: string) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section
      id="servicos"
      aria-labelledby="services-heading"
      className="relative bg-[#f5f5f5] py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        {/* Editorial Header with Watermark */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-12 md:mb-16"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none block select-none font-extrabold uppercase leading-[0.84] tracking-[-0.04em] text-[clamp(4.25rem,11.5vw,8.75rem)] text-neutral-900/[0.045]"
          >
            SERVICE
          </span>
          <h2
            id="services-heading"
            className="relative z-10 -mt-7 pl-1 text-2xl font-semibold tracking-[-0.03em] text-[#111111] sm:-mt-11 sm:text-3xl md:-mt-14 md:text-[2.15rem]"
          >
            /SERVICE
          </h2>
        </motion.div>

        {/* Interactive Service Accordion */}
        <div className="border-t border-neutral-900/10">
          {SERVICES.map((service: ServiceItem, index: number) => {
            const isOpen = activeId === service.id;
            const panelId = `service-panel-${service.id}`;
            const triggerId = `service-trigger-${service.id}`;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.32,
                  delay: Math.min(index * 0.03, 0.1),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`border-b border-neutral-900/10 transition-[padding,border-color] duration-300 ${
                  isOpen ? 'border-transparent py-3 md:py-4' : ''
                }`}
              >
                <div
                  className={`relative transition-colors duration-300 ${
                    isOpen
                      ? 'rounded-2xl bg-[#1c1c1c] text-white shadow-[0_24px_60px_rgba(0,0,0,0.14)]'
                      : 'rounded-xl bg-transparent text-[#111111] hover:bg-neutral-900/[0.03]'
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    id={triggerId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleService(service.id)}
                    className={`group flex w-full cursor-pointer items-center justify-between gap-6 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                      isOpen
                        ? 'px-6 pt-7 pb-3 focus-visible:ring-white/60 focus-visible:ring-offset-[#1c1c1c] md:px-10 md:pt-10 md:pb-4'
                        : 'px-2 py-7 focus-visible:ring-[#111111] focus-visible:ring-offset-[#f5f5f5] sm:px-4 md:py-8'
                    }`}
                  >
                    <span
                      className={`text-2xl font-medium uppercase leading-none tracking-[-0.025em] transition-colors duration-300 sm:text-3xl md:text-[2.25rem] ${
                        isOpen ? 'text-white md:max-w-[55%]' : 'text-[#111111]'
                      }`}
                    >
                      {service.title}
                    </span>

                    <span
                      aria-hidden="true"
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? 'bg-white/[0.06] text-white/80 group-hover:bg-white/15 group-hover:text-white'
                          : 'text-[#111111]/80 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#111111]'
                      }`}
                    >
                      {isOpen ? (
                        <X className="h-5 w-5 stroke-[1.75]" />
                      ) : (
                        <ArrowUpRight className="h-6 w-6 stroke-[1.75]" />
                      )}
                    </span>
                  </button>

                  {/* Expanded Content Panel */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        role="region"
                        aria-labelledby={triggerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pt-1 pb-8 md:px-10 md:pb-10">
                          <div className="max-w-lg md:max-w-[350px] lg:max-w-[490px]">
                            <p className="text-sm leading-relaxed text-white/70 md:text-[15px]">
                              {service.description}
                            </p>

                            {service.highlights.length > 0 && (
                              <ul
                                aria-label={`${service.title} highlights`}
                                className="mt-5 flex flex-wrap gap-2"
                              >
                                {service.highlights.map((highlight) => (
                                  <li
                                    key={highlight}
                                    className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-medium tracking-tight text-white/85"
                                  >
                                    {highlight}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>

                          {/* Mobile Contained Preview Card */}
                          <div className="mt-7 md:hidden">
                            <div className="mx-auto max-w-[320px] rotate-[1.5deg] rounded-2xl bg-white p-1.5 shadow-2xl ring-1 ring-black/10">
                              <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#f5f5f5]">
                                <img
                                  src={service.previewImage}
                                  alt={service.previewLabel}
                                  width={960}
                                  height={600}
                                  decoding="async"
                                  loading="lazy"
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex items-center justify-between px-2 pt-2 pb-1">
                                <span className="truncate text-[11px] font-medium tracking-tight text-[#111111]">
                                  {service.previewLabel}
                                </span>
                                <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Desktop Tilted Floating Preview Card (overflows cleanly above the dark card) */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        aria-hidden="true"
                        initial={{ opacity: 0, y: 18, scale: 0.92, rotate: 9 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 5 }}
                        exit={{ opacity: 0, y: 12, scale: 0.94, rotate: 8 }}
                        transition={{
                          type: 'spring',
                          stiffness: 290,
                          damping: 24,
                        }}
                        className="pointer-events-none absolute -top-7 right-20 z-20 hidden w-[235px] md:block lg:-top-9 lg:right-24 lg:w-[295px]"
                      >
                        <div className="rounded-2xl bg-white p-1.5 shadow-[0_24px_54px_rgba(0,0,0,0.42)] ring-1 ring-black/10">
                          <div className="aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#f5f5f5]">
                            <img
                              src={service.previewImage}
                              alt=""
                              width={960}
                              height={600}
                              decoding="async"
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex items-center justify-between px-2 pt-2 pb-1">
                            <span className="truncate text-[11px] font-medium tracking-tight text-[#111111]">
                              {service.previewLabel}
                            </span>
                            <span className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#22c55e]" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
