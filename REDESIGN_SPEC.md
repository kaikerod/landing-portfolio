# Especificação de Redesign — Landing Portfolio

Documento gerado a partir do alinhamento de design para reformular o visual do portfólio de **Kaike Rodrigues** seguindo a estética editorial minimalista da referência escolhida.

---

## 1. Referência Visual & Direção Estética

- **Referência principal**: [Dribbble Video Reference](https://cdn.dribbble.com/userupload/46427696/file/large-ae0b459b38d00a093f067acd8526919a.mp4)
- **Conceito**: Minimalismo editorial suíço/contemporâneo, predominantemente em **tema claro** com alto contraste tipográfico, bordas sutis, marcas d'água tipográficas gigantes atrás dos cabeçalhos e uma **seção escura contrastante** para quebrar o ritmo visual.
- **Paleta sugerida (CSS custom properties em `:root`)**:
  - Superfície clara principal: `#f5f5f5` / `#fafafa`
  - Superfície de cards e controles: `#ffffff`
  - Superfície escura de contraste (botões primários, acordeão ativo, seção escura): `#181818` / `#1c1c1c`
  - Texto principal (claro): `#111111`
  - Texto secundário / muted: `#5c5c5c` / `#8a8a8a`
  - Bordas sutis: `rgba(17, 17, 17, 0.1)` (modo claro) e `rgba(255, 255, 255, 0.12)` (seção escura)
  - Indicador de status ativo: `#22c55e` (ponto verde pulsante no badge de disponibilidade)
- **Tipografia**:
  - Sans-serif geométrica limpa e expressiva para display e interface (ex.: `Plus Jakarta Sans` / `Inter`), substituindo a estética neon/condensed anterior.
  - Uso de contraste **outline (vazado)** vs. **solid (preenchido)** no nome principal do Hero e **marcas d'água gigantes** em baixa opacidade por trás dos títulos de seção (`/SELECTED WORK`, `/SERVICE`, `/ABOUT & STACK`).

---

## 2. Decisões Alinhadas

| Tópico | Decisão |
| --- | --- |
| **Estrutura das seções** | Adaptar toda a estrutura da referência ao conteúdo atual do portfólio: Header, Hero, `/SELECTED WORK`, `/SERVICE`, seção escura `/ABOUT & STACK`, CTA Final e Footer. |
| **Hero & Retrato** | Usar a foto real enviada pelo Kaike, recortando apenas o fundo (PNG transparente em `img/portrait.png`), exibida em P&B editorial por padrão com efeito **spotlight colorido no hover/cursor**. |
| **Layout de Projetos** | Substituir o carrossel horizontal por um **grid de 2 colunas** com filtros (`All`, `Full-Stack`, `Frontend`, `Python`). |
| **Exibição inicial do grid** | Mostrar os **4 projetos principais** em grid 2×2 por padrão, com o botão **`View All Work (08) ↗`** revelando todos os 8 projetos (os filtros sempre atuam sobre os 8 projetos). |
| **Detalhe de Projeto** | Ao clicar em qualquer card, abrir uma **view/modal de detalhe** no estilo da referência (`← Back`, tags, título + `/Categoria`, descrição completa, metadados de stack/foco, preview ampliado e botões `Live Demo ↗` / `GitHub`). |
| **Capas dos Projetos (SVGs)** | **Redesenhar os 8 SVGs** em `img/` com mockups editoriais limpos para harmonizar com o novo layout claro/minimalista. |
| **Seções `/SERVICE` e escura** | `/SERVICE` com acordeão interativo de **4 frentes técnicas**; seção escura como **`/ABOUT & STACK`** combinando bio editorial, métricas e linhas horizontais interativas da stack com preview flutuante no hover. |
| **Idioma & Copy** | Manter todo o site em **Inglês** (como no `index.html` atual e na referência), com o badge **`Available for New Project`** no Header e no CTA final, e os **3 canais atuais** (GitHub, LinkedIn e Email). |
| **Stack & Ferramentas** | Migrar para **Vite + React + TypeScript + Tailwind CSS**, com **Motion (Framer Motion)** para animações e **Lucide React** para ícones, gerenciado via **pnpm**. |
| **Deploy & Estrutura** | Alvo **Vercel ou Netlify** (build padrão `dist/` na raiz `/`). Migração limpa no mesmo repositório (`src/` + `public/img/`), removendo `style.css` e `script.js` legados (preservados no histórico Git) e atualizando `AGENTS.md` e `README.md`. |

---

## 3. Arquitetura Detalhada por Seção

### 3.1 Header (Sticky / Fixo)
- **Esquerda**: Badge `● Available for New Project` (ponto verde com pulso sutil).
- **Centro**: Navegação horizontal limpa com contadores sobrescritos/sutis:
  - `Work (08)` → `#projetos`
  - `Service (4)` → `#servicos`
  - `Stack (5)` → `#sobre`
  - `Contact` → `#contato`
- **Direita**: Botão pill escuro `Let's Talk ↗` → `#contato`.
- **Mobile**: Botão de menu hambúrguer minimalista abrindo drawer limpo com os mesmos links.

### 3.2 Hero (`#inicio`)
- **Título Display em largura total**:
  - `KAIKE` em estilo **outline** (traço escuro, fundo transparente)
  - `RODRIGUES` em estilo **solid** (preenchido preto `#111111`)
- **Centro (base do Hero)**:
  - Retrato recortado (`img/portrait.png`) subindo da borda inferior do Hero, sobreposto de forma editorial ao nome gigante.
  - Efeito interativo: imagem em P&B (`grayscale(100%)`) por padrão, com camada colorida revelada por máscara radial (`clip-path` / `mask-image`) acompanhando o cursor sobre a área do retrato (e transição suave em dispositivos touch/foco).
- **Inferior Esquerdo**:
  - Cargo/Headline: `Product-Minded Developer`
  - Bio curta (2 linhas) mantendo o tom atual de criação de interfaces, APIs e experimentos.
  - CTA primário: botão pill escuro `Let's collaborate ↗`.
- **Inferior Direito**:
  - Coluna vertical minimalista com links e ícones monocromáticos:
    - `GitHub` (`https://github.com/kaikerod`)
    - `LinkedIn` (`https://www.linkedin.com/in/kaike-rodrigues/`)
    - `Email` (`mailto:contato.kaikevinicius@gmail.com`)

### 3.3 `/SELECTED WORK` (`#projetos`)
- **Cabeçalho**: Marca d'água gigante `PORTFOLIO` ao fundo + título centralizado `/SELECTED WORK`.
- **Barra de Controles**:
  - Esquerda: Filtros de categoria (`All`, `Full-Stack`, `Frontend`, `Python`).
  - Direita: Botão toggle `View All Work (08) ↗` (alterna entre os 4 destaques iniciais e todos os 8 projetos quando `All` está selecionado).
- **Grid de Cards (2 colunas no desktop, 1 no mobile)**:
  - Thumbnail SVG redesenhada em proporção `16 / 10` com cantos arredondados e pill de categoria no canto superior esquerdo (`FULL-STACK`, `FRONTEND`, `PYTHON`).
  - Rodapé limpo com título do projeto e tags de tecnologias.
  - **Mapeamento dos 8 projetos atuais**:
    1. **Parserly** *(Destaque inicial #1)* — `Full-Stack` (`Next.js`, `FastAPI`, `OpenRouter`, `Mercado Pago`)
    2. **DocAudit** *(Destaque inicial #2)* — `Full-Stack` (`FastAPI`, `OpenRouter`, `PostgreSQL`)
    3. **Sales Dash** *(Destaque inicial #3)* — `Full-Stack` (`FastAPI`, `PostgreSQL`, `Chart.js`)
    4. **Credit Card Simulator** *(Destaque inicial #4)* — `Python` (`Python`, `Rich`, `Terminal`)
    5. **Spider-Slider** — `Frontend` (`HTML5`, `CSS3`, `JavaScript`)
    6. **Coffee Morning Set** — `Frontend` (`HTML5`, `CSS3`, `Google Fonts`)
    7. **Apple Clone** — `Frontend` (`HTML5`, `CSS3`, `Roboto`)
    8. **Minimalist Login** — `Frontend` (`HTML5`, `CSS3`, `Boxicons`)
- **View/Modal de Detalhe do Projeto**:
  - Acessível ao clicar em qualquer card (com fechamento por botão `← Back`, tecla `Escape` ou clique fora).
  - Estrutura inspirada nos frames finais da referência: barra superior com `← Back` e badge de disponibilidade; pills de tags; título grande + `/Categoria`; descrição completa; botões `Live Demo ↗` (quando houver demo) e `GitHub ↗`; coluna de metadados (Stack, Focus, Category); e visualização ampliada da imagem do projeto.

### 3.4 `/SERVICE` (`#servicos`)
- **Cabeçalho**: Marca d'água gigante `SERVICE` + título alinhado à esquerda `/SERVICE`.
- **Acordeão Interativo (4 linhas separadas por borda fina)**:
  1. `FULL-STACK WEB` — Aplicações ponta a ponta conectando front-end responsivo, APIs rápidas e banco de dados relacional.
  2. `APIS & BACKEND` — Serviços em Python e FastAPI com modelagem de dados em PostgreSQL, integrações de IA e pagamentos.
  3. `FRONTEND & UI` — Interfaces responsivas, semânticas e centradas em clareza visual com HTML5, CSS3, JavaScript e Next.js.
  4. `PYTHON & AUTOMATION` — Ferramentas de linha de comando, scripts de automação e utilitários interativos com Rich.
- **Comportamento**:
  - Estado fechado: fundo claro, título maiúsculo grande à esquerda e seta `↗` à direita.
  - Estado aberto (1 item ativo por vez): bloco escuro (`#1c1c1c`), texto branco, descrição curta, botão `×` à direita e **card de preview inclinado** exibindo um mockup de projeto relacionado àquela frente.

### 3.5 `/ABOUT & STACK` (`#sobre` — Seção Escura de Contraste)
- **Fundo**: Escuro (`#1c1c1c`) de ponta a ponta, criando o mesmo contraste marcante da seção `/EXPERIENCE` do vídeo.
- **Cabeçalho**: Marca d'água escura `ABOUT` + título `/ABOUT & STACK` à esquerda e resumo de métricas à direita (`08 Projects · 5+ Core Techs · ∞ Curiosity`).
- **Introdução Editorial**: Breve resumo do perfil do Kaike (baseado no texto atual de `About me`).
- **Lista Horizontal Interativa da Stack (5 linhas com hover + preview flutuante)**:
  1. **Python & FastAPI** — Backend APIs, AI pipelines & automation *(Projetos: Parserly, DocAudit, Sales Dash)*
  2. **JavaScript & Next.js** — Interactive interfaces & full-stack web apps *(Projetos: Parserly, Spider-Slider)*
  3. **HTML5 & CSS3** — Semantic layouts, responsive systems & UI craft *(Projetos: Apple Clone, Coffee, Login)*
  4. **PostgreSQL & Data** — Relational schemas, audit trails & KPI dashboards *(Projetos: DocAudit, Sales Dash)*
  5. **Rich & CLI Tools** — Terminal apps with structured UX *(Projeto: Credit Card Simulator)*
- **Comportamento no Hover**: Destaque suave da linha e exibição de um **mini card de preview inclinado** acompanhando o item/cursor (em desktop com ponteiro fino).

### 3.6 CTA Final & Footer (`#contato`)
- **CTA Final**:
  - Fundo claro com leve gradiente/transição no topo.
  - Badge centralizado `● Available for New Project`.
  - Título gigante centralizado: `HAVE A PROJECT IN MIND?`
  - Subtítulo curto convidando para conversa sobre projetos, ideias ou tecnologia.
  - Ação principal: botão pill escuro `Contact Me ↗` (`mailto:contato.kaikevinicius@gmail.com`) acompanhado de links rápidos para LinkedIn e GitHub.
- **Footer**:
  - Rodapé minimalista com linha divisória superior, copyright (`© 2026 Kaike Rodrigues`) e links sociais.

---

## 4. Assets Visuais

1. **Retrato do Hero (`img/portrait.png`)**:
   - Origem: foto enviada pelo usuário na conversa.
   - Tratamento: remoção limpa do fundo estampado mantendo 100% do rosto, iluminação e roupa originais; exportação em PNG com transparência para o recorte editorial no Hero.
2. **Capas SVG dos Projetos (`img/*-card.svg`)**:
   - Redesenhar os 8 arquivos existentes:
     - `img/parserly-card.svg`
     - `img/docaudit-card.svg`
     - `img/vendas-card.svg`
     - `img/cartao-app-card.svg`
     - `img/spider-slider-card.svg`
     - `img/coffe-card.svg`
     - `img/apple-clone-card.svg`
     - `img/login-card.svg`
   - Estilo: mockups de interface modernos e nítidos, sem os gradientes neon rosa/roxo do tema antigo, equilibrando superfícies neutras/escuras e acentos limpos para valorizar cada projeto dentro dos cards claros.

---

## 5. Interações, Animações & Acessibilidade

- **Scroll reveal suave** (via `IntersectionObserver`) para entrada de seções e cards.
- **Spotlight colorido no retrato do Hero** via eventos de ponteiro (`pointermove`) usando variáveis CSS (`--mx`, `--my`) para alta performance.
- **Filtros e expansão de projetos** sem recarregamento de página, atualizando contador e estados `aria-pressed`.
- **Acordeão `/SERVICE`** acessível via teclado (`button`, `aria-expanded`, `aria-controls`).
- **Modal de detalhe de projeto** acessível (`role="dialog"`, `aria-modal="true"`, retorno de foco ao fechar e fechamento por `Esc`).
- **Suporte integral a `prefers-reduced-motion: reduce`**: desabilita transições amplas, spotlight animado e efeitos de entrada quando solicitado pelo sistema.

---

## 6. Stack, Estrutura de Pastas & Checklist de Verificação

### 6.1 Stack Definida
- **Build & Dev**: Vite + TypeScript
- **UI**: React + Tailwind CSS (tokens de tema e utilitários)
- **Animações**: `motion` (Framer Motion) com respeito nativo a `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`)
- **Ícones**: `lucide-react`
- **Gerenciador de pacotes**: `pnpm`
- **Deploy**: Vercel ou Netlify (saída padrão `dist/` na raiz `/`)

### 6.2 Estrutura Proposta do Projeto
```text
landing-portfolio/
├── index.html                  # Entrada Vite (meta tags, fontes Google, favicon)
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
├── public/
│   └── img/
│       ├── favicon.svg
│       ├── portrait.png        # Retrato recortado do Hero
│       └── *-card.svg          # 8 capas SVG redesenhadas
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css               # Tailwind CSS + tokens de tema, tipografia e utilitários
│   ├── data/
│   │   └── portfolio.ts        # Dados tipados: projetos, serviços, stack e links sociais
│   └── components/
│       ├── Header.tsx          # Barra superior + menu mobile
│       ├── Hero.tsx            # Display outline/solid + retrato com spotlight colorido
│       ├── SelectedWork.tsx    # Grid 2 colunas, filtros animados e View All Work
│       ├── ProjectModal.tsx    # View/modal de detalhe do projeto (← Back)
│       ├── ServicesSection.tsx # Acordeão escuro com preview inclinado
│       ├── AboutStackSection.tsx # Seção escura com bio e lista interativa + hover card
│       ├── ContactCta.tsx      # CTA final "HAVE A PROJECT IN MIND?"
│       └── Footer.tsx          # Rodapé minimalista
├── AGENTS.md                   # Atualizado para refletir a nova stack e comandos pnpm
├── README.md                   # Atualizado com instruções Vite/pnpm
└── REDESIGN_SPEC.md
```

### 6.3 Checklist de Implementação & Verificação
- Remover arquivos legados da raiz (`style.css`, `script.js` e `img/` movido para `public/img/`).
- Validar build de produção (`pnpm build`) e tipagem TypeScript (`pnpm exec tsc --noEmit`) sem erros.
- Validar visualmente no navegador (`pnpm dev`):
  - Verificar desktop (`1440px` / `1280px`) e mobile (`390px` / `375px`).
  - Testar menu mobile, scroll suave, efeito spotlight no retrato, filtros animados + `View All Work`, modal de detalhe de projetos (`Esc` e `← Back`), acordeão `/SERVICE` e hover da seção escura `/ABOUT & STACK`.
  - Confirmar carregamento de `public/img/portrait.png`, todos os 8 SVGs e abertura correta dos links externos.
