export type ProjectCategory = 'Full-Stack' | 'Frontend' | 'Python';

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  featured: boolean;
  shortDescription: string;
  fullDescription: string;
  image: string;
  tags: string[];
  focus: string;
  githubUrl?: string;
  liveUrl?: string;
  isPrivate?: boolean;
  buildHighlights?: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  previewImage: string;
  previewLabel: string;
}

export interface StackItem {
  id: string;
  title: string;
  role: string;
  projectsLabel: string;
  previewImage: string;
  previewCaption: string;
}

export interface SocialLink {
  id: 'github' | 'linkedin' | 'email';
  label: string;
  href: string;
  external: boolean;
}

export const SITE_META: {
  firstName: string;
  lastName: string;
  fullName: string;
  role: string;
  availabilityText: string;
  heroBio: string;
  aboutLead: string;
  aboutBody: string;
  email: string;
  portraitSrc: string;
  statsSummary: string;
} = {
  firstName: 'KAIKE',
  lastName: 'RODRIGUES',
  fullName: 'Kaike Rodrigues',
  role: 'Product-Minded Developer',
  availabilityText: 'Available for New Project',
  heroBio:
    'Building clean web interfaces, full-stack operational tools, and scalable APIs with React, Next.js, TypeScript, Node.js, FastAPI, and PostgreSQL.',
  aboutLead: 'Transforming ideas into purposeful, well-crafted code.',
  aboutBody:
    'I am a developer who builds production-minded tools and personal projects across the stack — from Next.js and React interfaces to Node/Express, FastAPI, PostgreSQL/Prisma, and Dockerized workflows. Each project is an opportunity to solve real operational problems, ship cleanly, and sharpen the craft.',
  email: 'contato.kaikevinicius@gmail.com',
  portraitSrc: '/img/portrait.png',
  statsSummary: '11 Projects · 5+ Core Techs · ∞ Curiosity',
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/kaikerod',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/kaike-rodrigues/',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:contato.kaikevinicius@gmail.com',
    external: false,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'parserly',
    slug: 'parserly',
    title: 'Parserly',
    category: 'Full-Stack',
    featured: true,
    shortDescription:
      'ATS resume analyzer that extracts text from PDF or DOCX files, scores compatibility from 0 to 100 with AI, and returns prioritized recommendations.',
    fullDescription:
      'Parserly is an end-to-end ATS resume analysis platform built for job seekers who want actionable feedback before applying. It parses uploaded PDF and DOCX resumes on the backend, evaluates alignment against job descriptions via OpenRouter AI pipelines, generates a 0–100 compatibility score with prioritized edits, and integrates Mercado Pago checkout for premium analyses.',
    image: '/img/parserly-card.svg',
    tags: ['Next.js', 'FastAPI', 'OpenRouter', 'Mercado Pago'],
    focus: 'AI Document Analysis & SaaS Checkout',
    githubUrl: 'https://github.com/kaikerod/Parserly',
    liveUrl: 'https://www.parserly.com.br/',
  },
  {
    id: 'partsync',
    slug: 'partsync',
    title: 'PartSync',
    category: 'Full-Stack',
    featured: true,
    shortDescription:
      'Spare part request and logistics workflow tool for device repair shops, pairing a dark glassmorphism UI with a hybrid SQLite and Neon PostgreSQL backend.',
    fullDescription:
      'PartSync is an internal spare-part requisition and logistics tracker built for device repair shops working with factory-original Samsung Galaxy components (AMOLED displays, batteries, and charging connectors). Deployed internally for shop workflows, it combines a Dark Mode glassmorphism interface with real-time formatted Request Spec Sheets, 1-click clipboard copy, urgency levels with pulsing alerts, smart autocomplete, KPI tracking, searchable status history, bulk status updates, local technician settings, and CSV export.',
    image: '/img/partsync-card.svg',
    tags: ['JavaScript', 'Vite', 'SQLite / Neon', 'Vercel API'],
    focus: 'Repair Shop Logistics & Hybrid Persistence',
    githubUrl: 'https://github.com/kaikerod/PartSync',
    buildHighlights: [
      'Hybrid zero-config database layer using native Node.js v22 SQLite (node:sqlite) locally and Neon PostgreSQL (@neondatabase/serverless) via Vercel Serverless Functions (api/) in production with an auto-initialized schema.',
      'Real-time Request Spec Sheet builder with smart component autocomplete, urgency levels (Low, Medium, and Urgent with pulsing indicator), and 1-click formatted copy.',
      'Operations dashboard built with ES6 JavaScript, Vite, HTML5/CSS3, and Lucide Icons featuring live KPI totals (Total, Pending, Ordered, Delivered), searchable history with status notes, bulk status updates, local technician settings, and CSV export.',
    ],
  },
  {
    id: 'repario',
    slug: 'repario',
    title: 'Repar.io',
    category: 'Full-Stack',
    featured: true,
    shortDescription:
      'Personal repair bench scheduling and Service Order (O.S.) manager with real-time overlap detection, daily load forecasting, and pending O.S. queues.',
    fullDescription:
      'Repar.io is an internal bench scheduling and Service Order (O.S.) management app designed for repair technicians. Deployed privately for daily bench operations, it prevents schedule collisions through real-time overlap detection with amber conflict highlights and 1-click auto-adjust to the next free slot, pairs an interactive monthly calendar showing daily estimated repair load with a chronological daily agenda, tracks external ERP O.S. numbers, and keeps unscheduled orders organized in a dedicated pending queue.',
    image: '/img/repario-card.svg',
    tags: ['Next.js 16', 'TypeScript', 'Prisma', 'Tailwind CSS'],
    focus: 'Bench Scheduling & Service Order Workflow',
    githubUrl: 'https://github.com/kaikerod/Repar.io',
    buildHighlights: [
      'Built on Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Lucide React, and date-fns with SQLite and Prisma ORM persistence.',
      'Real-time bench overlap detection engine with amber conflict highlights and 1-click auto-adjust to the next available time slot.',
      'Interactive monthly calendar computing daily estimated repair load alongside duration quick presets, chronological daily agenda, and external ERP O.S. number tracking.',
      'Dedicated unscheduled pending O.S. queue with violet counters, smart reminders, instant search across O.S., client, device, and defect, and 1-click status transitions (Pending Schedule → Scheduled → On Bench → Done → Delivered / Canceled).',
    ],
  },
  {
    id: 'smart-divi',
    slug: 'smart-divi',
    title: 'Smart Divi',
    category: 'Full-Stack',
    featured: true,
    isPrivate: true,
    shortDescription:
      'Private full-stack platform for a Samsung repair center covering photo-backed intake, public O.S. tracking, PDF quote approvals, RBAC staff panel, and product showcase.',
    fullDescription:
      'Smart Divi is a private full-stack web application built for a Samsung technical repair center. Customers open repair requests with photo attachments, track progress publicly via email/CPF or token links, review technician-issued PDF quotes, and approve or decline repairs in full or partially. Internally, attendants enforce a strict 1-to-1 request-to-O.S. linking rule, technicians update lifecycle statuses and send quotes, and staff manage an informational public product and promotions showcase under LGPD-compliant data handling.',
    image: '/img/smartdivi-card.svg',
    tags: ['React 19', 'Express 5', 'Prisma', 'PostgreSQL', 'Docker'],
    focus: 'Private Case Study · Repair Center Platform',
    buildHighlights: [
      'Monorepo Architecture: Structured into packages/frontend (React 19, TypeScript, Vite, Tailwind CSS, React Router) and packages/backend (Node.js, TypeScript, Express 5, Prisma ORM) for clear separation of concerns.',
      'Relational Integrity & State Machine: PostgreSQL 16 models enforce the 1-to-1 request-to-O.S. linking rule, strict state-machine transitions across the repair lifecycle, and an immutable status/audit history.',
      'Security, RBAC & LGPD: Built with bcrypt password hashing, JWT authentication, role-based access control for internal staff panels, and LGPD-compliant customer tracking via email/CPF or token link.',
      'Quotes & Public Showcase: Supports photo-backed intake, technician PDF quote delivery, client full/partial approval or rejection workflows, and an internally managed product and promotions showcase.',
      'Containerized Delivery: Packaged end-to-end with Docker Compose and Nginx reverse-proxy routing for consistent, isolated production deployments.',
    ],
  },
  {
    id: 'docaudit',
    slug: 'docaudit',
    title: 'DocAudit',
    category: 'Full-Stack',
    featured: false,
    shortDescription:
      'Internal web app for automated analysis of fiscal and financial documents with AI field extraction, anomaly rules, and a full audit trail.',
    fullDescription:
      'DocAudit streamlines the verification of fiscal and financial TXT records through an automated processing pipeline. Uploaded files are parsed into structured fields using OpenRouter models, checked against deterministic anomaly rules, and persisted in PostgreSQL with a traceable audit log so reviewers can spot discrepancies quickly.',
    image: '/img/docaudit-card.svg',
    tags: ['FastAPI', 'OpenRouter', 'PostgreSQL'],
    focus: 'Automated Fiscal Auditing & Data Integrity',
    githubUrl: 'https://github.com/kaikerod/Doc-Audit',
    liveUrl: 'https://doc-audit-ecru.vercel.app/',
  },
  {
    id: 'sales-dash',
    slug: 'sales-dash',
    title: 'Sales Dash',
    category: 'Full-Stack',
    featured: false,
    shortDescription:
      'Sales dashboard with real-time KPI cards, interactive Chart.js views, and CRUD workflows powered by FastAPI and PostgreSQL.',
    fullDescription:
      'Sales Dash combines a responsive analytics interface with a FastAPI and PostgreSQL backend to track revenue, order volume, and product performance in real time. Users can create, edit, and filter sales records while KPI summaries and interactive Chart.js visualizations stay synchronized.',
    image: '/img/vendas-card.svg',
    tags: ['FastAPI', 'PostgreSQL', 'Chart.js'],
    focus: 'Real-Time KPI Analytics & CRUD Workflows',
    githubUrl: 'https://github.com/kaikerod/Sales-Dash',
    liveUrl: 'https://sales-dashboard-prod.netlify.app/',
  },
  {
    id: 'credit-card-simulator',
    slug: 'credit-card-simulator',
    title: 'Credit Card Simulator',
    category: 'Python',
    featured: false,
    shortDescription:
      'Terminal-based credit card management simulation with a colorful, structured interface for category purchases, statements, and limit rules.',
    fullDescription:
      'Built in Python with the Rich library, Credit Card Simulator brings clean visual hierarchy to the command line. It models realistic credit card operations including categorized purchases, itemized monthly statements, available balance tracking, and automated credit-limit increase rules.',
    image: '/img/cartao-app-card.svg',
    tags: ['Python', 'Rich', 'Terminal'],
    focus: 'Interactive Terminal UX & Business Logic',
    githubUrl:
      'https://github.com/kaikerod/projetos-pessoais/tree/main/cart%C3%A3o-app',
  },
  {
    id: 'spider-slider',
    slug: 'spider-slider',
    title: 'Spider-Slider',
    category: 'Frontend',
    featured: false,
    shortDescription:
      'Interactive character carousel with animated image swaps, themed panels, and concise context for each version.',
    fullDescription:
      'Spider-Slider is a front-end interaction study focused on smooth visual transitions and keyboard-friendly browsing. Each slide dynamically updates character artwork, color accents, and editorial context panels using vanilla JavaScript, semantic HTML5, and custom CSS transitions.',
    image: '/img/spider-slider-card.svg',
    tags: ['HTML5', 'CSS3', 'JavaScript'],
    focus: 'Interactive Carousel Motion & DOM State',
    githubUrl:
      'https://github.com/kaikerod/projetos-pessoais/tree/main/projeto-slider',
    liveUrl: 'https://amazing-hummingbird.netlify.app/',
  },
  {
    id: 'coffee-morning-set',
    slug: 'coffee-morning-set',
    title: 'Coffee Morning Set',
    category: 'Frontend',
    featured: false,
    shortDescription:
      'Product landing card for a coffee and cookies morning set, focused on image balance, price hierarchy, and compact purchase flow.',
    fullDescription:
      'Coffee Morning Set explores e-commerce card composition and typographic restraint. The layout pairs editorial product framing with crisp price hierarchy, tactile hover feedback, and a focused call-to-action built purely with semantic HTML5, modern CSS3, and Google Fonts.',
    image: '/img/coffe-card.svg',
    tags: ['HTML5', 'CSS3', 'Google Fonts'],
    focus: 'Product Card Hierarchy & Visual Balance',
    githubUrl: 'https://github.com/kaikerod/projetos-pessoais/tree/main/coffe',
    liveUrl: 'https://cookielanding.netlify.app/',
  },
  {
    id: 'apple-clone',
    slug: 'apple-clone',
    title: 'Apple Clone',
    category: 'Frontend',
    featured: false,
    shortDescription:
      'Simplified clone of the Apple storefront interface focusing on clean grid layout, characteristic typography, and iPhone 14 showcase sections.',
    fullDescription:
      'Apple Clone recreates the minimalist rhythm of Apple product showcases with meticulous attention to whitespace, typographic scale, and responsive section grids. Built in clean HTML5 and CSS3 to study high-contrast product storytelling across desktop and mobile viewports.',
    image: '/img/apple-clone-card.svg',
    tags: ['HTML5', 'CSS3', 'Roboto'],
    focus: 'Editorial Product Layout & Typography',
    githubUrl:
      'https://github.com/kaikerod/projetos-pessoais/tree/main/site-apple',
    liveUrl: 'https://clone-iphone14.netlify.app/',
  },
  {
    id: 'minimalist-login',
    slug: 'minimalist-login',
    title: 'Minimalist Login',
    category: 'Frontend',
    featured: false,
    shortDescription:
      'Responsive login screen with a focused form layout, icon-supported fields, and mobile-friendly spacing.',
    fullDescription:
      'Minimalist Login is a clean authentication UI component crafted for effortless usability on any screen size. It emphasizes crisp input affordances, subtle Boxicons iconography, accessible focus rings, and balanced mobile spacing without framework overhead.',
    image: '/img/login-card.svg',
    tags: ['HTML5', 'CSS3', 'Boxicons'],
    focus: 'Authentication Form UX & Responsiveness',
    githubUrl:
      'https://github.com/kaikerod/projetos-pessoais/tree/main/login-minimalista',
    liveUrl: 'https://login-minimalist.netlify.app/',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'full-stack-web',
    title: 'FULL-STACK WEB',
    description:
      'End-to-end web applications connecting responsive React and Next.js front-ends, resilient APIs, and relational databases into cohesive products.',
    highlights: ['Next.js & React', 'TypeScript', 'PostgreSQL & Prisma', 'Payment Flows'],
    previewImage: '/img/parserly-card.svg',
    previewLabel: 'Parserly — ATS Resume Analyzer',
  },
  {
    id: 'apis-architecture',
    title: 'APIS & ARCHITECTURE',
    description:
      'Structured Node.js, Express, and FastAPI backends with strict state machines, JWT/RBAC security, immutable audit trails, and containerized delivery.',
    highlights: ['Express 5 & FastAPI', 'PostgreSQL & Prisma', 'JWT & RBAC', 'Docker & Nginx'],
    previewImage: '/img/smartdivi-card.svg',
    previewLabel: 'Smart Divi — Repair Center Platform',
  },
  {
    id: 'operational-tools',
    title: 'OPERATIONAL TOOLS',
    description:
      'Purpose-built scheduling, logistics, and service-order interfaces that prevent workflow bottlenecks with real-time validation and clear daily visibility.',
    highlights: ['Overlap Detection', 'Calendar & Queues', 'Hybrid SQLite / Neon', 'CSV & Spec Exports'],
    previewImage: '/img/repario-card.svg',
    previewLabel: 'Repar.io — Repair Bench Scheduler',
  },
  {
    id: 'frontend-ui',
    title: 'FRONTEND & UI',
    description:
      'Responsive, semantic interfaces focused on visual clarity, dark/light theme craft, crisp typography, and smooth motion across desktop and mobile.',
    highlights: ['React & TypeScript', 'Tailwind CSS', 'Dark Glassmorphism', 'Motion Design'],
    previewImage: '/img/partsync-card.svg',
    previewLabel: 'PartSync — Spare Parts Logistics UI',
  },
];

export const STACK_ITEMS: StackItem[] = [
  {
    id: 'react-nextjs',
    title: 'React 19 & Next.js',
    role: 'App Router platforms, scheduling interfaces & full-stack UIs',
    projectsLabel: 'Parserly · Repar.io · Smart Divi',
    previewImage: '/img/repario-card.svg',
    previewCaption: 'Repar.io — Next.js 16 Bench Scheduler',
  },
  {
    id: 'node-express-fastapi',
    title: 'Node.js, Express & FastAPI',
    role: 'REST APIs, RBAC state machines & AI pipelines',
    projectsLabel: 'Smart Divi · Parserly · DocAudit · Sales Dash',
    previewImage: '/img/smartdivi-card.svg',
    previewCaption: 'Smart Divi — Express 5 Monorepo',
  },
  {
    id: 'postgresql-prisma-sqlite',
    title: 'PostgreSQL, Prisma & SQLite',
    role: 'Relational schemas, audit logs & hybrid serverless storage',
    projectsLabel: 'Smart Divi · Repar.io · PartSync · Sales Dash',
    previewImage: '/img/partsync-card.svg',
    previewCaption: 'PartSync — Hybrid SQLite & Neon DB',
  },
  {
    id: 'docker-deployment',
    title: 'Docker, Nginx & Vercel',
    role: 'Containerized deployments & serverless API workflows',
    projectsLabel: 'Smart Divi · PartSync · Parserly',
    previewImage: '/img/parserly-card.svg',
    previewCaption: 'Parserly — Production Full-Stack SaaS',
  },
  {
    id: 'tailwind-html-css',
    title: 'Tailwind CSS, HTML5 & CSS3',
    role: 'Semantic layouts, responsive systems & editorial UI craft',
    projectsLabel: 'Apple Clone · Coffee · Login · Spider-Slider',
    previewImage: '/img/coffe-card.svg',
    previewCaption: 'Coffee Morning Set — Editorial CSS',
  },
];
