import { useEffect } from 'react'

export default function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return undefined

    const coarse = window.matchMedia('(pointer: coarse)').matches
    // Touch devices keep native momentum; CSS + react-scroll handle anchors.
    if (coarse) return undefined

    let target = window.scrollY
    let current = window.scrollY
    let frame = 0
    let gliding = false
    let fadeTimer = 0

    const root = document.documentElement
    const limit = () => Math.max(0, root.scrollHeight - window.innerHeight)

    const setFading = (on) => {
      root.classList.toggle('is-scroll-fading', on)
      window.clearTimeout(fadeTimer)
      if (on) {
        fadeTimer = window.setTimeout(() => {
          root.classList.remove('is-scroll-fading')
        }, 220)
      }
    }

    const step = () => {
      // Soft ease — lower = silkier glide
      current += (target - current) * 0.065
      if (Math.abs(target - current) < 0.35) {
        current = target
        gliding = false
        frame = 0
        window.scrollTo(0, current)
        setFading(false)
        return
      }
      window.scrollTo(0, current)
      frame = requestAnimationFrame(step)
    }

    const onWheel = (event) => {
      if (event.ctrlKey) return
      const nested = event.target.closest?.('.chat__thread, textarea, select, .navbar__mobile')
      if (nested && nested.scrollHeight > nested.clientHeight + 2) return

      event.preventDefault()
      const delta = event.deltaMode === 1 ? event.deltaY * 16 : event.deltaY
      if (!gliding) {
        current = window.scrollY
        target = window.scrollY
        gliding = true
      }
      // Slight dampening for a faded, less abrupt travel
      target = Math.min(limit(), Math.max(0, target + delta * 0.92))
      setFading(true)
      if (!frame) frame = requestAnimationFrame(step)
    }

    const onScroll = () => {
      if (gliding) return
      current = window.scrollY
      target = window.scrollY
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('scroll', onScroll)
      window.clearTimeout(fadeTimer)
      root.classList.remove('is-scroll-fading')
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
