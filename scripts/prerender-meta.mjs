import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const indexPath = path.join(dist, 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')

const pages = [
  {
    dir: 'about',
    heading: 'A Coimbatore studio built for remote clients',
    title: 'About Gypsy Coder | Custom Software Company in Coimbatore',
    description:
      'Gypsy Coder is a Coimbatore software studio led by Muthukaruppaiya. Hire Indian developers for billing, ecommerce, apps and dashboards — delivered on the agreed date.',
    path: '/about',
  },
  {
    dir: 'services',
    heading: 'Software services with clear scope and USD pricing',
    title: 'Software Development Services & Pricing (USD) | Gypsy Coder',
    description:
      'Software services for shops and growing brands: billing, ecommerce, apps, Power BI and GPS tracking. Clear scope, USD starting prices, agreed delivery dates. Hire Indian developers who ship on time.',
    path: '/services',
  },
  {
    dir: 'billing-software',
    heading: 'Billing software that keeps invoices and payments clear',
    title: 'Billing Software Development (GST & UPI) | Gypsy Coder',
    description:
      'Custom billing software for shops and service firms. GST invoices, paid/unpaid tracking, UPI support and clear USD plan tiers. Request a demo.',
    path: '/billing-software',
  },
  {
    dir: 'ecommerce-software',
    heading: 'Ecommerce stores with catalogue, checkout and payments',
    title: 'Ecommerce Website Development | Gypsy Coder',
    description:
      'Custom ecommerce stores with catalogue, cart, checkout, UPI/card payments and multi-currency options. Clear USD starting plans. Request a demo.',
    path: '/ecommerce-software',
  },
  {
    dir: 'portfolio',
    heading: 'Work that shipped on an agreed date',
    title: 'Portfolio & Case Studies | Gypsy Coder',
    description:
      'Case studies and live projects from Gypsy Coder: billing systems, ecommerce stores and business websites. See the problem, build and result.',
    path: '/portfolio',
  },
  {
    dir: 'contact',
    heading: 'Get a free quote within 24 hours',
    title: 'Get a Free Quote | Contact Gypsy Coder',
    description:
      'Contact Gypsy Coder for billing software, ecommerce and custom development. WhatsApp, email or book a 15-minute call. Reply within 24 hours (IST). Based in Coimbatore, clients worldwide.',
    path: '/contact',
  },
]

function inject(page) {
  const url = `https://gypsycoders.in${page.path}`
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
  out = out.replace(/\{\s*"@type": "WebPage",\s*"@id": "https:\/\/gypsycoder\.in\/#webpage",[\s\S]*?\},\s*(?=\{\s*"@type": "ItemList")/, '')
  out = out.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${page.description}" />`,
  )
  out = out.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
  )
  out = out.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
  )
  out = out.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${page.title}" />`,
  )
  out = out.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${page.description}" />`,
  )
  out = out.replace(
    /<h1 data-prerender="h1">[\s\S]*?<\/h1>/,
    `<h1 data-prerender="h1">${page.heading}</h1>`,
  )
  out = out.replace(
    /<p data-prerender="lead">[\s\S]*?<\/p>/,
    `<p data-prerender="lead">${page.description}</p>`,
  )
  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': 'https://gypsycoders.in/#website' },
        about: { '@id': 'https://gypsycoders.in/#business' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Gypsy Coder', item: 'https://gypsycoders.in/' },
          { '@type': 'ListItem', position: 2, name: page.heading, item: url },
        ],
      },
    ],
  }
  out = out.replace(
    '</head>',
    `    <script type="application/ld+json">${JSON.stringify(pageSchema)}</script>\n  </head>`,
  )
  return out
}

for (const page of pages) {
  const next = inject(page)
  const dir = path.join(dist, page.dir)
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, 'index.html'), next)
  fs.writeFileSync(path.join(dist, `${page.dir}.html`), next)
  console.log(`prerendered ${page.path}`)
}
