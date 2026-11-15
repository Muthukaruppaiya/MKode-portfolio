import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const indexPath = path.join(dist, 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')

const pages = [
  {
    dir: 'about',
    heading: 'About Gypsy Coder',
    title: 'About Gypsy Coder',
    description:
      'Gypsy Coder is the software studio of Muthukaruppaiya in Periyakulam, Theni. You talk to the person who writes the code, and the delivery date is agreed up front.',
    path: '/about',
  },
  {
    dir: 'services',
    heading: 'Services',
    title: 'Services | Gypsy Coder',
    description:
      'Billing software, ecommerce shops, websites, apps, digital marketing, Power BI, and GPS with software from Gypsy Coder.',
    path: '/services',
  },
  {
    dir: 'billing-software',
    heading: 'Billing software for shops',
    title: 'Billing Software | Gypsy Coder',
    description:
      'GST billing software for shops in Periyakulam and Theni. Invoices, paid and unpaid lists, and a simple report, built around how you already bill.',
    path: '/billing-software',
  },
  {
    dir: 'ecommerce-software',
    heading: 'Ecommerce software and online shops',
    title: 'Ecommerce Software | Gypsy Coder',
    description:
      'Ecommerce software and online shops from Gypsy Coder. Products, cart, checkout, and order status, linked to the payment method you already use.',
    path: '/ecommerce-software',
  },
  {
    dir: 'portfolio',
    heading: 'Portfolio',
    title: 'Portfolio | Gypsy Coder',
    description:
      'Live websites and software shipped by Gypsy Coder for shops and brands in Periyakulam, Theni, and beyond.',
    path: '/portfolio',
  },
  {
    dir: 'contact',
    heading: 'Contact Gypsy Coder',
    title: 'Contact Gypsy Coder',
    description:
      'Call or WhatsApp Gypsy Coder on +91 63831 42368 for a price and a delivery date. Based in Periyakulam, Theni.',
    path: '/contact',
  },
]

function inject(page) {
  const url = `https://gypsycoders.in${page.path}`
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
  // The home WebPage node would claim this URL is the home page.
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
  // Root HTML enables cleanUrls (/about) with serve -s
  fs.writeFileSync(path.join(dist, `${page.dir}.html`), next)
  console.log(`prerendered ${page.path}`)
}
