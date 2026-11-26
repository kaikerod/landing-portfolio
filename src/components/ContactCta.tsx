import { motion } from 'motion/react';
import { ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { SITE_META, SOCIAL_LINKS } from '../data/portfolio';
import type { SocialLink } from '../data/portfolio';

export function ContactCta() {
  const secondaryLinks = SOCIAL_LINKS.filter(
    (link: SocialLink) => link.id === 'linkedin' || link.id === 'github',
  );

  return (
    <section
      id="contato"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-[#f5f5f5] pt-28 pb-24 [contain:layout_style_paint] md:pt-36 md:pb-32"
    >
      {/* Subtle Top Editorial Fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/[0.06] via-black/[0.02] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 h-72 w-[min(92vw,760px)] -translate-x-1/2 transform-gpu rounded-full bg-white/70 blur-3xl will-change-transform"
      />

      <div className="relative z-10 mx-auto max-w-[960px] px-6 text-center md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Availability Pill Badge */}
          <div className="inline-flex items-center gap-2.5 rounded-full border border-neutral-900/10 bg-white px-4 py-1.5 text-xs font-medium text-[#111111] shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:text-[13px]">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#22c55e] opacity-75 will-change-transform motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
            </span>
            <span>{SITE_META.availabilityText}</span>
          </div>

          {/* Giant Display Heading */}
          <h2
            id="contact-heading"
            className="mt-7 text-[clamp(2.25rem,6vw,4.5rem)] font-bold uppercase leading-[1.04] tracking-[-0.035em] text-[#111111]"
          >
            HAVE A PROJECT IN MIND?
          </h2>

          {/* Concise 2-Line Subtitle */}
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-[#5c5c5c] sm:text-base">
            Together, we can craft clear web applications, dependable APIs, and thoughtful software.
            Let&apos;s collaborate to bring your next product or tech idea to life.
          </p>

          {/* Primary + Secondary CTA Row */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${SITE_META.email}`}
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#181818] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_28px_rgba(0,0,0,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5]"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            {secondaryLinks.map((link) => {
              const Icon = link.id === 'linkedin' ? Linkedin : Github;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="group inline-flex items-center gap-2 rounded-full border border-neutral-900/12 bg-white px-5 py-3.5 text-sm font-medium text-[#111111] transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-900/30 hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5]"
                >
                  <Icon className="h-4 w-4 stroke-[1.75] text-[#111111]/75 transition-colors group-hover:text-[#111111]" />
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 stroke-[1.75] text-[#5c5c5c] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#111111]" />
                </a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
