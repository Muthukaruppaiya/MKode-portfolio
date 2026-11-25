/**
 * Single source of truth for every route's SEO data.
 * Used by the pages at runtime (usePageMeta) and by scripts/prerender.mjs at
 * build time, so the static HTML Google crawls always matches the live page.
 *
 * `name` is the short label we want Google to use for the sitelink
 * (e.g. "About", "Services") — keep it short and keep it the first words
 * of `title` so Google has no reason to rewrite it.
 */
export const SITE_URL = 'https://gypsycoders.in'

export const PAGE_META = [
  {
    path: '/',
    name: 'Home',
    title: 'Gypsy Coder: Custom Software Development Company',
    description:
      'Hire Gypsy Coder for billing software development, ecommerce website development, mobile apps, Power BI dashboards and GPS tracking. Custom software company in India serving USA, UK, UAE, Singapore and Australia. Delivered on the date we agree.',
  },
  {
    path: '/services',
    name: 'Services',
    title: 'Services & Pricing (USD) | Gypsy Coder',
    description:
      'Software services for shops and growing brands: billing, ecommerce, apps, Power BI and GPS tracking. Clear scope, USD starting prices, agreed delivery dates.',
  },
  {
    path: '/billing-software',
    name: 'Billing Software',
    title: 'Billing Software Development (GST & UPI) | Gypsy Coder',
    description:
      'Custom billing software for shops and service firms. GST invoices, paid/unpaid tracking, UPI support and clear USD plan tiers. Request a demo.',
  },
  {
    path: '/ecommerce-software',
    name: 'Ecommerce Software',
    title: 'Ecommerce Website Development | Gypsy Coder',
    description:
      'Custom ecommerce stores with catalogue, cart, checkout, UPI/card payments and multi-currency options. Clear USD starting plans. Request a demo.',
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    title: 'Portfolio & Case Studies | Gypsy Coder',
    description:
      'Case studies and live projects from Gypsy Coder: billing systems, ecommerce stores and business websites. See the problem, the build and the result.',
  },
  {
    path: '/about',
    name: 'About',
    title: 'About Gypsy Coder | Software Company in Coimbatore',
    description:
      'Gypsy Coder is a Coimbatore software studio led by Muthukaruppaiya. Hire Indian developers for billing, ecommerce, apps and dashboards — delivered on the agreed date.',
  },
  {
    path: '/contact',
    name: 'Contact',
    title: 'Contact Gypsy Coder | Get a Free Quote',
    description:
      'Contact Gypsy Coder for billing software, ecommerce and custom development. WhatsApp, email or book a 15-minute call. Reply within 24 hours (IST).',
  },
]

export const pageMeta = (path) => PAGE_META.find((p) => p.path === path) || PAGE_META[0]

export const canonicalUrl = (path) => `${SITE_URL}${path === '/' ? '/' : path}`
