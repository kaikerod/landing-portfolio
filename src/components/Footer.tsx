import { motion } from 'motion/react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { SITE_META, SOCIAL_LINKS } from '../data/portfolio';
import type { SocialLink } from '../data/portfolio';

function getSocialIcon(id: SocialLink['id']) {
  switch (id) {
    case 'github':
      return Github;
    case 'linkedin':
      return Linkedin;
    case 'email':
      return Mail;
  }
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="border-t border-neutral-900/10 bg-[#f5f5f5]"
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-5 px-5 py-8 sm:flex-row sm:px-8 md:py-9 lg:px-12">
        <p className="text-sm font-normal tracking-tight text-[#5c5c5c]">
          &copy; 2026 {SITE_META.fullName}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <nav aria-label="Social links" className="flex items-center gap-5">
            {SOCIAL_LINKS.map((link: SocialLink) => {
              const Icon = getSocialIcon(link.id);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#5c5c5c] transition-colors duration-200 hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5]"
                >
                  <Icon className="h-3.5 w-3.5 stroke-[1.75]" aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <span
            aria-hidden="true"
            className="hidden h-4 w-px bg-neutral-900/15 sm:block"
          />

          <a
            href="#inicio"
            aria-label="Back to top"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#5c5c5c] transition-colors duration-200 hover:text-[#111111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f5f5f5]"
          >
            <span>Top</span>
            <ArrowUp
              className="h-3.5 w-3.5 stroke-[2] transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
