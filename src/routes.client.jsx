import { lazy } from 'react'

/**
 * Each page is its own JS chunk, so the home page no longer downloads the
 * code for every other page.
 */
const loaders = {
  '/': () => import('./pages/HomePage'),
  '/about': () => import('./pages/AboutPage'),
  '/services': () => import('./pages/ServicesPage'),
  '/billing-software': () => import('./pages/BillingSoftwarePage'),
  '/ecommerce-software': () => import('./pages/EcommerceSoftwarePage'),
  '/portfolio': () => import('./pages/PortfolioPage'),
  '/contact': () => import('./pages/ContactPage'),
}

const loaded = {}

function lazyPage(path) {
  const Lazy = lazy(loaders[path])
  // Once the chunk is in memory, render it directly instead of through
  // Suspense, so the first paint never flashes an empty page.
  return function Page(props) {
    const Mod = loaded[path]
    return Mod ? <Mod {...props} /> : <Lazy {...props} />
  }
}

export const clientPages = Object.fromEntries(
  Object.keys(loaders).map((path) => [path, lazyPage(path)]),
)

/** Load the chunk for the URL the visitor landed on before React mounts. */
export function preloadCurrentPage(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  const load = loaders[clean] || loaders['/']
  const path = loaders[clean] ? clean : '/'
  return load()
    .then((mod) => { loaded[path] = mod.default })
    .catch(() => {})
}
