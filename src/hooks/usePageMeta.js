import { useEffect } from 'react'
import { canonicalUrl, pageMeta } from '../data/pageMeta'

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

/**
 * Keeps <title>, description, canonical and social tags in sync when the
 * visitor navigates client-side. The first load already has the right tags,
 * written into each page's HTML by scripts/prerender.mjs.
 */
export default function usePageMeta(meta = pageMeta('/')) {
  const { title, description, path } = meta

  useEffect(() => {
    const url = canonicalUrl(path)

    document.title = title
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)
  }, [title, description, path])
}
