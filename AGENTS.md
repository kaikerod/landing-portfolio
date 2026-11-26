# Repository Guidelines

## Project Structure & Module Organization
This repository is a personal portfolio built with **Vite**, **React**, **TypeScript**, **Tailwind CSS v4**, **Motion (Framer Motion)**, and **Lucide React**, managed with **pnpm**:

- `index.html`: Vite HTML entry point (SEO/OG meta tags, favicon `/img/favicon.svg`, Google Fonts `Plus Jakarta Sans` & `Inter`).
- `src/main.tsx`: React root mount.
- `src/App.tsx`: Top-level composition wrapped in `<MotionConfig reducedMotion="user">` and managing project detail modal state.
- `src/index.css`: Tailwind CSS v4 (`@tailwindcss/vite`) entry, editorial design tokens (`:root` / `@theme`), outline display typography helpers, watermark utilities, and `prefers-reduced-motion` safeguards.
- `src/data/portfolio.ts`: Typed content data (`SITE_META`, `SOCIAL_LINKS`, `PROJECTS`, `SERVICES`, `STACK_ITEMS`).
- `src/components/`: UI sections and modal (`Header`, `Hero`, `SelectedWork`, `ProjectModal`, `ServicesSection`, `AboutStackSection`, `ContactCta`, `Footer`).
- `public/img/`: Static visual assets (`favicon.svg`, `portrait.png`, and the 8 redesigned project mockup SVGs).

Keep content updates in `src/data/portfolio.ts`, presentation tokens in `src/index.css`, and section-specific UI/interactions inside `src/components/`.

## Build, Test, and Development Commands
Use `pnpm` from the repository root:

- `pnpm install`: Install project dependencies.
- `pnpm dev`: Start the local Vite development server with HMR.
- `pnpm exec tsc --noEmit`: Run strict TypeScript typechecking.
- `pnpm build`: Run TypeScript project build (`tsc -b`) and produce the deployable production bundle in `dist/` (ready for Vercel or Netlify).
- `pnpm preview`: Serve the production `dist/` build locally to verify output.

## Coding Style & Naming Conventions
- Use 2 spaces for indentation across TypeScript, TSX, CSS, and JSON files.
- Prefer semantic HTML landmarks (`header`, `main`, `section`, `footer`, `nav`), accessible ARIA attributes (`aria-pressed`, `aria-expanded`, `aria-controls`, `role="dialog"`, `aria-modal="true"`), and descriptive `alt` text.
- Use Tailwind CSS utilities combined with the editorial color tokens defined in `src/index.css` (`#f5f5f5` / `#fafafa` light surfaces, `#ffffff` cards, `#111111` ink, `#181818` / `#1c1c1c` dark contrast surfaces, `#22c55e` status indicator).
- Use `motion/react` for animations and always respect `prefers-reduced-motion`.

## Testing Guidelines
Validate changes with both automated type/build checks and browser verification:

- Run `pnpm exec tsc --noEmit` and `pnpm build` before shipping.
- Verify desktop (`1440px` / `1280px`) and mobile (`390px` / `375px`) layouts via `pnpm dev` or `pnpm preview`.
- Test mobile menu drawer, smooth anchor scrolling, Hero portrait color spotlight, project category filters + `View All Work`, project detail modal (`Esc` and `← Back`), `/SERVICE` accordion, and `/ABOUT & STACK` hover previews.
- Confirm `public/img/portrait.png`, all 8 SVG cards, and external links load cleanly.

## Commit & Pull Request Guidelines
Use concise, imperative commit messages (e.g., `Add project detail modal keyboard focus trap`).

Pull requests should include:

- a short summary of the change,
- affected files or sections,
- before/after screenshots for visual updates,
- typecheck, build, and manual browser/mobile verification notes.
