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
  githubUrl: string;
  liveUrl?: string;
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
    'Building clean web interfaces, FastAPI backends, and full-stack product experiments with precision and visual clarity.',
  aboutLead: 'Transforming ideas into purposeful, well-crafted code.',
  aboutBody:
    'I am a developer who builds personal projects to explore new tools, languages, and concepts — from Python CLI utilities and AI-powered FastAPI services to responsive web interfaces. Each project is an opportunity to solve real problems, ship cleanly, and sharpen the craft.',
  email: 'contato.kaikevinicius@gmail.com',
  portraitSrc: '/img/portrait.png',
  statsSummary: '08 Projects · 5+ Core Techs · ∞ Curiosity',
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
    id: 'docaudit',
    slug: 'docaudit',
    title: 'DocAudit',
    category: 'Full-Stack',
    featured: true,
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
    featured: true,
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
    featured: true,
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
      'End-to-end web applications connecting responsive front-ends, fast APIs, and relational databases into cohesive products.',
    highlights: ['Next.js & React', 'FastAPI Services', 'PostgreSQL', 'Payment Flows'],
    previewImage: '/img/parserly-card.svg',
    previewLabel: 'Parserly — ATS Resume Analyzer',
  },
  {
    id: 'apis-backend',
    title: 'APIS & BACKEND',
    description:
      'Python and FastAPI services with clean PostgreSQL data modeling, AI extraction pipelines, validation rules, and reliable integrations.',
    highlights: ['FastAPI & Pydantic', 'OpenRouter AI', 'Audit Trails', 'REST Architecture'],
    previewImage: '/img/docaudit-card.svg',
    previewLabel: 'DocAudit — Fiscal Audit Engine',
  },
  {
    id: 'frontend-ui',
    title: 'FRONTEND & UI',
    description:
      'Responsive, semantic interfaces focused on visual clarity, crisp typography, and smooth motion across desktop and mobile.',
    highlights: ['HTML5 & CSS3', 'TypeScript & React', 'Tailwind CSS', 'Motion Design'],
    previewImage: '/img/apple-clone-card.svg',
    previewLabel: 'Apple Clone — Editorial UI Study',
  },
  {
    id: 'python-automation',
    title: 'PYTHON & AUTOMATION',
    description:
      'Command-line tools, data processing scripts, and interactive terminal utilities designed for clarity and speed.',
    highlights: ['Python 3', 'Rich TUI', 'File Parsers', 'Workflow Scripts'],
    previewImage: '/img/cartao-app-card.svg',
    previewLabel: 'Credit Card Simulator — Rich CLI',
  },
];

export const STACK_ITEMS: StackItem[] = [
  {
    id: 'python-fastapi',
    title: 'Python & FastAPI',
    role: 'Backend APIs, AI pipelines & automation',
    projectsLabel: 'Parserly · DocAudit · Sales Dash',
    previewImage: '/img/docaudit-card.svg',
    previewCaption: 'DocAudit — FastAPI + AI Pipeline',
  },
  {
    id: 'javascript-nextjs',
    title: 'JavaScript & Next.js',
    role: 'Interactive interfaces & full-stack web apps',
    projectsLabel: 'Parserly · Spider-Slider',
    previewImage: '/img/parserly-card.svg',
    previewCaption: 'Parserly — Next.js Web App',
  },
  {
    id: 'html5-css3',
    title: 'HTML5 & CSS3',
    role: 'Semantic layouts, responsive systems & UI craft',
    projectsLabel: 'Apple Clone · Coffee · Login',
    previewImage: '/img/coffe-card.svg',
    previewCaption: 'Coffee Morning Set — Editorial CSS',
  },
  {
    id: 'postgresql-data',
    title: 'PostgreSQL & Data',
    role: 'Relational schemas, audit trails & KPI dashboards',
    projectsLabel: 'DocAudit · Sales Dash',
    previewImage: '/img/vendas-card.svg',
    previewCaption: 'Sales Dash — Real-Time KPI Views',
  },
  {
    id: 'rich-cli',
    title: 'Rich & CLI Tools',
    role: 'Terminal apps with structured UX',
    projectsLabel: 'Credit Card Simulator',
    previewImage: '/img/cartao-app-card.svg',
    previewCaption: 'Credit Card Simulator — Terminal UI',
  },
];
