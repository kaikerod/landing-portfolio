# Repository Guidelines

## Project Structure & Module Organization
This repository is a static portfolio site. The root contains the deployable files:

- `index.html`: page structure and portfolio content.
- `style.css`: global styles, design tokens, layout, and responsive rules.
- `script.js`: client-side interactions such as scroll reveal, mobile navigation, and smooth scrolling.
- `img/`: project screenshots and other image assets referenced by the page.
- `translate.py`: one-off Python utility used to replace localized text in `index.html`.

Keep related edits grouped by layer: content in `index.html`, behavior in `script.js`, and presentation in `style.css`.

## Build, Test, and Development Commands
No package manager or build step is configured. Use a simple local server to preview changes:

- `python -m http.server 8000` from the repository root starts a local server.
- Open `http://localhost:8000` to verify layout, links, and responsive behavior.
- `python translate.py` runs the text-replacement helper script. Review its hardcoded file path before using it on another machine.

## Coding Style & Naming Conventions
Use 2 spaces for HTML indentation and 2 spaces for nested CSS/JavaScript blocks to match the current files. Preserve the existing BEM-style class naming such as `header__nav`, `project-card__title`, and modifier forms like `bg-glow--purple`.

Prefer:

- semantic HTML sections and descriptive `alt` text,
- CSS custom properties in `:root` for colors, spacing, and transitions,
- small, focused DOM scripts with clear section comments.

Avoid introducing frameworks or build tooling unless the repository is being intentionally restructured.

## Testing Guidelines
There is no automated test suite yet. Validate changes manually in the browser:

- test desktop and mobile widths,
- confirm navigation, smooth scroll, and menu toggle behavior,
- verify images load from `img/` and external links open correctly.

If you add automated checks later, place them in a dedicated `tests/` folder and document the command here.

## Commit & Pull Request Guidelines
Git history is not available in this workspace, so no repository-specific commit convention could be inferred. Use concise, imperative commit messages such as `Add responsive spacing fix for project cards`.

Pull requests should include:

- a short summary of the change,
- affected files or sections,
- before/after screenshots for visual updates,
- manual verification notes for browser and mobile checks.
