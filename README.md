# Portfólio — versão HTML / CSS / JS puro

Cópia estática e fiel do site em React (TanStack Start). Sem build necessário para rodar.

## Rodar

Abra `index.html` por um servidor local (os scripts são ES modules):

```bash
cd html_only
python3 -m http.server 8080
```

## Estrutura

- `index.html` — shell da página, SEO, JSON-LD, fontes.
- `css/styles.css` — CSS já compilado (Tailwind v4 + design system + animações).
- `src.css` — fonte do CSS. Se editar, recompile:
  `bunx @tailwindcss/cli -i src.css -o css/styles.css --minify`
- `js/data.js` — todo o conteúdo (perfil, experiências, stack, projetos) + dicionário PT/EN.
- `js/icons.js` — paths SVG dos logos (simple-icons) embutidos.
- `js/app.js` — renderização, tradução, scroll, parallax, timeline, cursor, loader, contadores.
- `assets/portrait.png` — retrato recortado usado no hero.
- `assets/clipo.png` — identidade visual do projeto Clipo.
- `assets/renan-mischiatti-cv-*.pdf` — currículos em português e inglês.

## O que foi convertido

Loader com progresso, grid editorial, cursor customizado, navbar com shrink + menu mobile,
indicador de seção com progresso, hero com entrada em blur/rise + parallax + máscara no retrato,
timeline com trilho desenhado pelo scroll e estados de foco, tech stack com hover/dim/nota,
projetos com parallax e scale, contadores animados, contato com texto vindo dos dois lados,
grain, `prefers-reduced-motion` e o toggle de idioma PT/EN.
