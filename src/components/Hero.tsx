import { useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent, PointerEvent } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { SITE_META, SOCIAL_LINKS } from '../data/portfolio';
import type { SocialLink } from '../data/portfolio';

function SocialIcon({ id }: { id: SocialLink['id'] }) {
  if (id === 'github') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    );
  }

  if (id === 'linkedin') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 shrink-0"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }

  return <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />;
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);
  const [isSpotlightActive, setIsSpotlightActive] = useState(false);
  const [isTouchRevealed, setIsTouchRevealed] = useState(false);

  const updatePointerCoords = (event: PointerEvent<HTMLDivElement>) => {
    const el = portraitRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    el.style.setProperty('--mx', `${x.toFixed(1)}px`);
    el.style.setProperty('--my', `${y.toFixed(1)}px`);
  };

  const handlePointerEnter = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    updatePointerCoords(event);
    setIsSpotlightActive(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    updatePointerCoords(event);
    if (!isSpotlightActive) {
      setIsSpotlightActive(true);
    }
  };

  const handlePointerLeave = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'touch') {
      updatePointerCoords(event);
    }
    setIsSpotlightActive(false);
  };

  const handlePortraitClick = () => {
    setIsTouchRevealed((prev) => !prev);
  };

  const handlePortraitKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsTouchRevealed((prev) => !prev);
    }
  };

  const showFullColor = isTouchRevealed || (prefersReducedMotion && isSpotlightActive);
  const spotlightMask =
    'radial-gradient(circle 135px at var(--mx, 50%) var(--my, 42%), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.92) 52%, rgba(0, 0, 0, 0) 100%)';

  const spotlightLayerStyle: CSSProperties = {
    opacity: isSpotlightActive && !prefersReducedMotion ? 1 : 0,
    WebkitMaskImage: spotlightMask,
    maskImage: spotlightMask,
  };

  const fullColorLayerStyle: CSSProperties = {
    opacity: showFullColor ? 1 : 0,
  };

  return (
    <section
      id="inicio"
      className="relative overflow-hidden border-b border-neutral-900/[0.08] bg-[#f5f5f5] pt-6 sm:pt-8 lg:pt-10"
    >
      <div className="mx-auto flex max-w-[1320px] flex-col lg:min-h-[min(calc(100svh-4.5rem),860px)] lg:justify-end px-5 sm:px-8 lg:px-12">
        {/* Giant full-width editorial display name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-0 w-full select-none pt-1 sm:pt-2"
        >
          <h1
            className="flex w-full flex-nowrap items-baseline justify-center gap-[0.24em] whitespace-nowrap font-extrabold uppercase leading-[0.92] tracking-[-0.035em]"
            style={{ fontSize: 'clamp(2.15rem, 9.4vw, 8.5rem)' }}
          >
            <span className="text-display-outline">{SITE_META.firstName}</span>
            <span className="text-[#111111]">{SITE_META.lastName}</span>
          </h1>
        </motion.div>

        {/* Lower editorial stage: Left Bio/CTA, Center Cutout Portrait, Right Socials */}
        <div className="relative mt-6 flex flex-col gap-7 lg:-mt-9 lg:grid lg:grid-cols-[1fr_minmax(340px,480px)_1fr] lg:items-end lg:gap-6 xl:-mt-12 xl:grid-cols-[1fr_minmax(420px,560px)_1fr]">
          {/* Bottom-left: Role, Bio, Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 order-1 max-w-[300px] lg:order-1 lg:pb-12 xl:pb-16"
          >
            <p className="text-xl font-bold tracking-[-0.02em] text-[#111111] sm:text-[1.4rem]">
              {SITE_META.role}
            </p>
            <p className="mt-2.5 text-sm leading-relaxed text-[#5c5c5c]">
              {SITE_META.heroBio}
            </p>
            <div className="mt-6">
              <a
                href="#contato"
                className="group inline-flex items-center gap-2.5 rounded-full bg-[#181818] px-5 py-2.5 text-sm font-medium text-white shadow-[0_6px_18px_-8px_rgba(17,17,17,0.45)] transition-all duration-200 hover:bg-[#2c2c2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
              >
                <span>Let&apos;s collaborate</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </motion.div>

          {/* Center-bottom: Cutout Portrait with interactive radial color spotlight */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 order-3 flex w-full justify-center self-end lg:order-2"
          >
            <div
              ref={portraitRef}
              role="button"
              tabIndex={0}
              aria-pressed={isTouchRevealed}
              aria-label={`Interactive portrait of ${SITE_META.fullName}. Move pointer or press to toggle color spotlight.`}
              onPointerEnter={handlePointerEnter}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              onClick={handlePortraitClick}
              onKeyDown={handlePortraitKeyDown}
              className="group relative mx-auto w-full max-w-[320px] cursor-crosshair select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] sm:max-w-[390px] lg:max-w-[480px] xl:max-w-[560px]"
            >
              {/* Grayscale editorial base layer */}
              <img
                src={SITE_META.portraitSrc}
                alt={`${SITE_META.fullName} — ${SITE_META.role}`}
                className="pointer-events-none block h-auto max-h-[430px] w-full object-contain object-bottom grayscale contrast-[1.05] sm:max-h-[490px] lg:max-h-[580px] xl:max-h-[640px]"
              />

              {/* Radial color spotlight layer (mask stays attached during fade-out) */}
              {!prefersReducedMotion && (
                <img
                  src={SITE_META.portraitSrc}
                  alt=""
                  aria-hidden="true"
                  style={spotlightLayerStyle}
                  className="pointer-events-none absolute inset-0 block h-full w-full object-contain object-bottom transition-opacity duration-300 ease-out"
                />
              )}

              {/* Full-color reveal layer (click/tap toggle or reduced-motion hover) */}
              <img
                src={SITE_META.portraitSrc}
                alt=""
                aria-hidden="true"
                style={fullColorLayerStyle}
                className="pointer-events-none absolute inset-0 block h-full w-full object-contain object-bottom transition-opacity duration-300 ease-out"
              />
            </div>
          </motion.div>

          {/* Bottom-right: Vertical monochrome social links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-20 order-2 flex lg:order-3 lg:justify-end lg:pb-12 xl:pb-16"
          >
            <ul
              aria-label="Social profiles"
              className="flex flex-wrap items-center gap-x-5 gap-y-2.5 lg:flex-col lg:items-start lg:gap-y-3.5"
            >
              {SOCIAL_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="group inline-flex items-center gap-2.5 text-xs font-medium text-[#3f3f3f] transition-all duration-200 hover:translate-x-1 hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111] sm:text-[13px]"
                  >
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-neutral-900/10 bg-white/80 text-[#222222] transition-colors duration-200 group-hover:border-neutral-900/25 group-hover:bg-[#111111] group-hover:text-white">
                      <SocialIcon id={link.id} />
                    </span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
