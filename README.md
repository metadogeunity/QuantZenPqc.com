# QuantZen™ — React Website (Tailwind CSS)

This is the QuantZen site as a React + Vite project, styled with
**Tailwind CSS v4** utility classes. The visual design is unchanged from
the original — same colors, type, spacing, and layout — but instead of a
hand-written CSS file, every component now uses Tailwind utility classes
directly, with the brand's colors and fonts wired up as Tailwind theme
tokens.

## Getting started

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview   # serve the production build locally
```

## How styling works now

- **Tailwind is wired in via `@tailwindcss/vite`** (see `vite.config.js`),
  so there's no separate Tailwind config file to maintain — it's all
  driven from CSS.
- **`src/styles/global.css`** imports Tailwind and defines an `@theme`
  block with the brand's design tokens — colors (`--color-ink`,
  `--color-blue`, `--color-teal`, etc.), fonts (`--font-disp`,
  `--font-body`, `--font-mono`), and a couple of custom values
  (`--container-wrap`, `--animate-fade`). These tokens generate matching
  Tailwind utilities automatically — e.g. `--color-blue` gives you
  `bg-blue`, `text-blue`, `border-blue`, etc.
- A **small handful of rules stay as plain CSS** in `global.css` because
  Tailwind utilities can't express them cleanly: the `::before`/`::after`
  pseudo-elements on the eyebrow label and the logo mark, the `::selection`
  style, and the `prefers-reduced-motion` override.
- Everything else — every card, button, section, grid, and form field —
  is styled with Tailwind utility classes directly in each component's
  JSX `className`.

If you want to re-theme the site, edit the `@theme` block at the top of
`src/styles/global.css` — changing `--color-blue` there updates every
`bg-blue` / `text-blue` / `border-blue` usage across the whole app.

## Project structure

```
src/
  main.jsx                 # entry point — mounts <App /> inside BrowserRouter
  App.jsx                  # route definitions (one route per page)
  styles/
    global.css               # Tailwind import + @theme tokens + the few
                              # rules that have to stay as raw CSS
  components/
    Layout.jsx                # Header + <Outlet /> + Footer, shared by every route
    Header.jsx                 # top nav, logo, mobile burger menu
    Footer.jsx                  # footer link columns + legal line
    PageMeta.jsx                 # sets document.title per page
    Wrap.jsx                      # centered max-width container (was `.wrap`)
    Section.jsx                    # bordered section spacing (was `.block` / `.tight`)
    Eyebrow.jsx                     # small uppercase label used above headings
    Card.jsx                         # generic card (icon + title + body) used everywhere
    Button.jsx                        # primary/ghost button, renders a route Link
    CtaBand.jsx                        # the gradient call-to-action banner
    ArchDiagram.jsx                     # "Application → QuantZen → Gateway → Backend" diagram
    FeatureRow.jsx                      # icon + heading + paragraph row (Security page)
    AttackScenarioStep.jsx              # one numbered step in the attack-scenario walkthrough
  data/
    navLinks.js                # nav route/label config, shared by Header + Footer
    useCases.js                 # the 9 use-case entries shown on the Use Cases page
  pages/
    Home.jsx
    Product.jsx
    Security.jsx
    UseCases.jsx
    Deployment.jsx
    Press.jsx
    About.jsx
    Contact.jsx
```

## Routes

| Path          | Page       |
|---------------|------------|
| `/`           | Home       |
| `/product`    | Product    |
| `/security`   | Security   |
| `/use-cases`  | Use Cases  |
| `/deployment` | Deployment |
| `/press`      | Press      |
| `/about`      | About      |
| `/contact`    | Contact    |

## Notes

- The contact form on `/contact` is wired to local component state only.
  Hook the `handleSubmit` function in `src/pages/Contact.jsx` up to your
  CRM, form backend, or email service to actually receive submissions.
- A few places use Tailwind's arbitrary-value syntax (e.g. `text-[15px]`,
  `max-[860px]:grid-cols-1`) to match the original design's exact pixel
  values and its 860px mobile breakpoint, which doesn't line up with
  Tailwind's default breakpoints.
- Routing uses `react-router-dom`. Deploying as static files on most hosts
  (Netlify, Vercel, GitHub Pages with a rewrite rule) needs a fallback
  rule that serves `index.html` for unknown paths so deep links like
  `/security` work on a hard refresh.
