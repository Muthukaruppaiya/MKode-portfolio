import { useEffect } from 'react'

const DEFAULTS = {
  title: 'Gypsy Coder | Official Website – Billing Software & Web Developer in Periyakulam, Theni',
  description:
    'Gypsy Coder is a software studio in Periyakulam, Theni. We build billing software, websites, apps, digital marketing, Power BI reports, and GPS with software. Official site: gypsycoder.in. Call +91 63831 42368.',
  path: '/',
}

function setMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

export default function usePageMeta({ title, description, path } = {}) {
  useEffect(() => {
    const nextTitle = title || DEFAULTS.title
    const nextDescription = description || DEFAULTS.description
    const nextPath = path || DEFAULTS.path
    const url = `https://gypsycoder.in${nextPath === '/' ? '/' : nextPath}`

    document.title = nextTitle

    setMeta('name', 'description', nextDescription)
    setMeta('property', 'og:title', nextTitle)
    setMeta('property', 'og:description', nextDescription)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', nextTitle)
    setMeta('name', 'twitter:description', nextDescription)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, path])
}
