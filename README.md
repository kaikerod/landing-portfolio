# Landing Portfolio

## Português

Portfólio pessoal de **Kaike Rodrigues** construído com **Vite**, **React**, **TypeScript**, **Tailwind CSS v4**, **Motion (Framer Motion)** e **Lucide React**, seguindo uma direção editorial minimalista com alto contraste tipográfico, retrato com efeito spotlight colorido, grade interativa de projetos com modal de detalhes, acordeão de serviços e seção escura de stack.

### Stack

- **Build & Dev**: Vite + TypeScript
- **UI & Estilos**: React + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animações**: `motion` (`motion/react` com suporte a `prefers-reduced-motion`)
- **Ícones**: `lucide-react`
- **Gerenciador de pacotes**: `pnpm`

### Estrutura

- `index.html`: entrada Vite (fontes Google, favicon e metadados SEO/OG).
- `src/main.tsx` e `src/App.tsx`: inicialização React e composição principal.
- `src/index.css`: Tailwind CSS v4, tokens editoriais e utilitários tipográficos.
- `src/data/portfolio.ts`: dados tipados de projetos, serviços, stack e contatos.
- `src/components/`: componentes das seções (`Header`, `Hero`, `SelectedWork`, `ProjectModal`, `ServicesSection`, `AboutStackSection`, `ContactCta`, `Footer`).
- `public/img/`: retrato recortado (`portrait.png`), `favicon.svg` e os 8 SVGs dos projetos.

### Como executar

```bash
pnpm install
pnpm dev
```

Para validar tipagem e gerar o build de produção (`dist/`, pronto para deploy na Vercel ou Netlify):

```bash
pnpm exec tsc --noEmit
pnpm build
pnpm preview
```

---

## English

Personal portfolio for **Kaike Rodrigues** built with **Vite**, **React**, **TypeScript**, **Tailwind CSS v4**, **Motion (Framer Motion)**, and **Lucide React**, featuring an editorial minimalist layout, color-spotlight portrait hero, filterable project grid with detail modal, interactive services accordion, and a high-contrast dark stack section.

### Stack

- **Build & Dev**: Vite + TypeScript
- **UI & Styling**: React + Tailwind CSS v4 (`@tailwindcss/vite`)
- **Motion**: `motion` (`motion/react` with `prefers-reduced-motion` support)
- **Icons**: `lucide-react`
- **Package Manager**: `pnpm`

### Structure

- `index.html`: Vite entry point (Google Fonts, favicon, and SEO/OG meta tags).
- `src/main.tsx` & `src/App.tsx`: React root and top-level layout composition.
- `src/index.css`: Tailwind CSS v4 setup, editorial theme tokens, and display typography helpers.
- `src/data/portfolio.ts`: Typed portfolio data for projects, services, stack items, and social links.
- `src/components/`: Section and modal components (`Header`, `Hero`, `SelectedWork`, `ProjectModal`, `ServicesSection`, `AboutStackSection`, `ContactCta`, `Footer`).
- `public/img/`: Hero cutout portrait (`portrait.png`), `favicon.svg`, and 8 redesigned project SVGs.

### How to run

```bash
pnpm install
pnpm dev
```

To typecheck and build for production (`dist/`, ready for Vercel or Netlify):

```bash
pnpm exec tsc --noEmit
pnpm build
pnpm preview
```
