/**
 * Build step 3 of 3 (see package.json "build").
 *
 * Renders every route to real HTML with React so Google and link previews
 * see the full page — headings, text and internal links — without running
 * JavaScript. Each page also gets its own <title>, description, canonical,
 * Open Graph/Twitter tags, WebPage + BreadcrumbList schema, and the CSS for
 * its code-split chunk. Writes sitemap.xml and 404.html too.
 */
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const manifest = JSON.parse(fs.readFileSync(path.join(dist, '.vite', 'manifest.json'), 'utf8'))
const { render, PAGE_META, SITE_URL, canonicalUrl } = await import(
  pathToFileURL(path.join(ssrDir, 'entry-server.js')).href
)

const PAGE_FILES = {
  '/': 'src/pages/HomePage.jsx',
  '/about': 'src/pages/AboutPage.jsx',
  '/services': 'src/pages/ServicesPage.jsx',
  '/billing-software': 'src/pages/BillingSoftwarePage.jsx',
  '/ecommerce-software': 'src/pages/EcommerceSoftwarePage.jsx',
  '/portfolio': 'src/pages/PortfolioPage.jsx',
  '/contact': 'src/pages/ContactPage.jsx',
}

const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')

function setTag(html, pattern, replacement, label) {
  const found = typeof pattern === 'string' ? html.includes(pattern) : pattern.test(html)
  if (!found) throw new Error(`prerender: could not find ${label} in index.html`)
  // Function form so "$" in page text is never treated as a replace pattern.
  return html.replace(pattern, () => replacement)
}

/** CSS + JS a page chunk needs, minus what index.html already loads. */
function chunkAssets(entryKey) {
  const entryCss = new Set(manifest['index.html']?.css || [])
  const css = new Set()
  const js = new Set()
  const seen = new Set()
  const walk = (key) => {
    if (seen.has(key) || !manifest[key]) return
    seen.add(key)
    const chunk = manifest[key]
    if (key !== 'index.html') js.add(chunk.file)
    for (const c of chunk.css || []) if (!entryCss.has(c)) css.add(c)
    for (const imp of chunk.imports || []) if (imp !== 'index.html') walk(imp)
  }
  walk(entryKey)
  return { css: [...css], js: [...js] }
}

function pageSchema(page) {
  const url = canonicalUrl(page.path)
  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: page.title,
      description: page.description,
      inLanguage: 'en',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#business` },
      primaryImageOfPage: `${SITE_URL}/brand/og-share.png`,
    },
  ]
  if (page.path !== '/') {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: page.name, item: url },
      ],
    })
    graph[0].breadcrumb = { '@id': `${url}#breadcrumb` }
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}

function buildPage(page, { appHtml, noindex = false } = {}) {
  const url = canonicalUrl(page.path)
  const title = esc(page.title)
  const desc = esc(page.description)
  let out = template

  out = setTag(out, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title')
  out = setTag(out, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${desc}" />`, 'description')
  out = setTag(out, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  out = setTag(out, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, 'og:url')
  out = setTag(out, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`, 'og:title')
  out = setTag(out, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${desc}" />`, 'og:description')
  out = setTag(out, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`, 'twitter:title')
  out = setTag(out, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${desc}" />`, 'twitter:description')

  if (noindex) {
    out = setTag(out, /<meta name="robots" content="[^"]*" \/>/, '<meta name="robots" content="noindex, follow" />', 'robots')
    out = out.replace(/\s*<meta name="googlebot" content="[^"]*" \/>/, '')
    out = out.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '')
  }

  const head = []
  const file = PAGE_FILES[page.path]
  if (file) {
    const { css, js } = chunkAssets(file)
    for (const c of css) head.push(`<link rel="stylesheet" crossorigin href="/${c}">`)
    for (const j of js) head.push(`<link rel="modulepreload" crossorigin href="/${j}">`)
  }
  if (!noindex) head.push(`<script type="application/ld+json">${pageSchema(page)}</script>`)
  out = out.replace('</head>', `    ${head.join('\n    ')}\n  </head>`)

  out = setTag(out, '<!--app-html-->', appHtml, 'root marker')
  return out
}

for (const page of PAGE_META) {
  const html = buildPage(page, { appHtml: render(page.path) })
  if (page.path === '/') {
    fs.writeFileSync(path.join(dist, 'index.html'), html)
  } else {
    const dir = page.path.slice(1)
    fs.mkdirSync(path.join(dist, dir), { recursive: true })
    fs.writeFileSync(path.join(dist, dir, 'index.html'), html)
    fs.writeFileSync(path.join(dist, `${dir}.html`), html)
  }
  console.log(`prerendered ${page.path}`)
}

// 404 page: real content with links back into the site, never indexed.
const notFound = {
  path: '/404',
  name: 'Not found',
  title: 'Page not found | Gypsy Coder',
  description: 'This page does not exist. Go to the Gypsy Coder home page, services or contact page.',
}
const links = PAGE_META.map((p) => `<li><a href="${p.path}">${esc(p.name)}</a></li>`).join('')
fs.writeFileSync(
  path.join(dist, '404.html'),
  buildPage(notFound, {
    noindex: true,
    appHtml: `<main style="max-width:640px;margin:80px auto;padding:0 24px;font-family:system-ui,sans-serif"><h1>Page not found</h1><p>This page does not exist. Try one of these:</p><ul>${links}</ul></main>`,
  }),
)
console.log('wrote 404.html')

// sitemap.xml generated from the same page list, so it can never drift.
const today = new Date().toISOString().slice(0, 10)
const urls = PAGE_META.map((p) => `  <url>
    <loc>${canonicalUrl(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.path === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p.path === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
)
console.log('wrote sitemap.xml')

fs.rmSync(ssrDir, { recursive: true, force: true })
fs.rmSync(path.join(dist, '.vite'), { recursive: true, force: true })
