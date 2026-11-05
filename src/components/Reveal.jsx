import { useEffect, useRef } from 'react'

export default function Reveal({ children, className, delay = 0, immediate = false }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node || immediate) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const top = node.getBoundingClientRect().top
    if (top < window.innerHeight * 0.9) return undefined

    node.classList.add('reveal--pending')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        node.classList.add('is-in')
        observer.disconnect()
      },
      { threshold: 0.14, rootMargin: '0px 0px -6% 0px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [immediate])

  return (
    <div
      ref={ref}
      className={['reveal', immediate ? 'is-in' : '', className].filter(Boolean).join(' ')}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
