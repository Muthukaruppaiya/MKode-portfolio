import fs from 'node:fs'
import path from 'node:path'

const dist = path.resolve('dist')
const indexPath = path.join(dist, 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')

const pages = [
  {
    dir: 'about',
    title: 'About Gypsy Coder | Software Studio in Periyakulam, Theni',
    description:
      'About Gypsy Coder — the software studio of Muthukaruppaiya in Periyakulam, Theni. We build billing software, websites, and apps remotely and deliver on time.',
    path: '/about',
  },
  {
    dir: 'services',
    title: 'Services | Billing Software, Websites & Apps – Gypsy Coder',
    description:
      'Gypsy Coder services: billing software, websites, online shops, mobile apps, digital marketing, Power BI reports, GPS with software, cloud, and automation for Periyakulam, Theni, and beyond.',
    path: '/services',
  },
  {
    dir: 'portfolio',
    title: 'Portfolio | Live Sites & Projects – Gypsy Coder',
    description:
      'Gypsy Coder portfolio — live websites and software projects for shops and brands in Periyakulam, Theni, and beyond. See work shipped on time.',
    path: '/portfolio',
  },
  {
    dir: 'contact',
    title: 'Contact Gypsy Coder | Get a Price in Periyakulam, Theni',
    description:
      'Contact Gypsy Coder for billing software, websites, apps, digital marketing, Power BI, or GPS with software. Call or WhatsApp +91 63831 42368. Based in Periyakulam, Theni.',
    path: '/contact',
  },
]

function inject(page) {
  const url = `https://gypsycoder.in${page.path}`
  let out = html
  out = out.replace(/<title>[\s\S]*?<\/title>/, `<title>${page.title}</title>`)
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
