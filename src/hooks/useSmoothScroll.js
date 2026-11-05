import { useEffect } from 'react'

export default function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarse = window.matchMedia('(pointer: coarse)').matches
    if (reduce || coarse) return

    let target = window.scrollY
    let current = window.scrollY
    let frame = 0
    let gliding = false

    const limit = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight)

    const step = () => {
      current += (target - current) * 0.085
      if (Math.abs(target - current) < 0.5) {
        current = target
        gliding = false
        frame = 0
        window.scrollTo(0, current)
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
      target = Math.min(limit(), Math.max(0, target + delta))
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
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])
}
