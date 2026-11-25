# Gypsy Coder — gypsycoders.in

Marketing site for Gypsy Coder, a custom software studio in Coimbatore.
React 18 + Vite 5 + React Router.

## Commands

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build into dist/
npm run preview   # serve dist/ locally
```

## How the build works

`npm run build` runs three steps:

1. `vite build` — the browser bundle. Each page is its own code-split chunk.
2. `vite build --ssr src/entry-server.jsx` — a Node build used only at build time.
3. `node scripts/prerender.mjs` — renders every route to full HTML, so search
   engines see the real content and links without running JavaScript. It also
   writes each page's title, description, canonical URL, social tags and
   schema, plus `sitemap.xml` and `404.html`.

## Adding or changing a page

All page SEO data lives in `src/data/pageMeta.js` (title, description, and
the short `name` used for Google sitelinks and breadcrumbs). To add a page:

1. Create the component in `src/pages/`.
2. Add an entry to `PAGE_META` in `src/data/pageMeta.js`.
3. Register it in `src/routes.client.jsx`, `src/entry-server.jsx` and
   `PAGE_FILES` in `scripts/prerender.mjs`.

The sitemap updates itself from `PAGE_META`.

## Contact form

The form posts to Web3Forms when `WEB3FORMS_KEY` is set in
`src/data/siteContent.js` (mail goes to the address the key was created
with). With no key it falls back to FormSubmit, which mails `COMPANY.email`.
If sending fails, the visitor is offered a pre-filled email and WhatsApp.

## Deploying

Upload `dist/` to the server, then apply `deploy/gypsy-coder.nginx`
(redirects http/www/`.html`/trailing-slash URLs to one canonical address and
serves a real 404).
