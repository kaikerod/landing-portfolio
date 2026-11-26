import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PROJECTS, SERVICES, SITE_META, STACK_ITEMS } from '../data/portfolio';

interface NavItem {
  label: string;
  href: string;
  count?: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Work',
    href: '#projetos',
    count: String(PROJECTS.length).padStart(2, '0'),
  },
  {
    label: 'Service',
    href: '#servicos',
    count: String(SERVICES.length),
  },
  {
    label: 'Stack',
    href: '#sobre',
    count: String(STACK_ITEMS.length),
  },
  {
    label: 'Contact',
    href: '#contato',
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 12;
      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled;
        setScrolled(nextScrolled);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || mobileOpen
          ? 'border-neutral-900/[0.08] shadow-[0_1px_16px_rgba(17,17,17,0.04)]'
          : 'border-transparent'
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 transform-gpu [contain:paint] transition-[background-color] duration-300 ${
          scrolled || mobileOpen
            ? 'bg-[#f5f5f5]/90 backdrop-blur-md'
            : 'bg-[#f5f5f5]/75 backdrop-blur-xs'
        }`}
      />
      <div className="mx-auto flex h-[4.5rem] max-w-[1320px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        {/* Left: Availability status pill */}
        <a
          href="#inicio"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center gap-2.5 rounded-full border border-neutral-900/[0.08] bg-white/95 px-3.5 py-1.5 text-xs font-medium text-[#111111] shadow-[0_1px_2px_rgba(17,17,17,0.03)] transition-colors hover:border-neutral-900/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
        >
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22c55e] opacity-70 will-change-transform motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22c55e]" />
          </span>
          <span className="whitespace-nowrap tracking-[-0.01em]">
            {SITE_META.availabilityText}
          </span>
        </a>

        {/* Center: Editorial navigation */}
        <nav aria-label="Primary navigation" className="hidden md:block">
          <ul className="flex items-center gap-7 lg:gap-9">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative inline-flex items-baseline py-1 text-[13.5px] font-medium text-[#2a2a2a] transition-colors hover:text-[#111111] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#111111]"
                >
                  <span>{item.label}</span>
                  {item.count ? (
                    <sup className="ml-0.5 text-[10px] font-normal text-[#8a8a8a] transition-colors group-hover:text-[#555555]">
                      ({item.count})
                    </sup>
                  ) : null}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[#111111] transition-transform duration-200 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Primary dark CTA + Mobile toggle */}
        <div className="flex items-center gap-2.5">
          <a
            href="#contato"
            className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-[#181818] px-4 py-2 text-xs font-medium text-white shadow-[0_1px_2px_rgba(17,17,17,0.1)] transition-all duration-200 hover:bg-[#2c2c2c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          >
            <span>Let&apos;s Talk</span>
            <ArrowUpRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-900/10 bg-white text-[#111111] shadow-xs transition-colors hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] md:hidden"
          >
            {mobileOpen ? (
              <X className="h-4.5 w-4.5" aria-hidden="true" />
            ) : (
              <Menu className="h-4.5 w-4.5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-x-0 top-[4.5rem] bottom-0 z-30 bg-neutral-950/25 backdrop-blur-[2px] md:hidden"
              aria-hidden="true"
            />
            <motion.nav
              key="mobile-drawer"
              id="mobile-nav-drawer"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-40 border-t border-neutral-900/[0.08] bg-[#f8f8f8] px-5 pt-4 pb-6 shadow-lg md:hidden"
            >
              <ul className="flex flex-col divide-y divide-neutral-900/[0.07]">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between py-3.5 text-base font-medium text-[#111111] transition-colors hover:text-[#555555]"
                    >
                      <span className="inline-flex items-baseline">
                        {item.label}
                        {item.count ? (
                          <sup className="ml-1 text-xs font-normal text-[#8a8a8a]">
                            ({item.count})
                          </sup>
                        ) : null}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-[#8a8a8a]" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-5">
                <a
                  href="#contato"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#181818] px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2c2c2c]"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
