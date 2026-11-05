import { useEffect } from 'react'

export default function use3dTilt(ref, options = {}) {
  const { max = 8, perspective = 1000, scale = 1.02, speed = 500 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    const handleMouseMove = (event) => {
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = 0.5 - (event.clientY - rect.top) / rect.height
      el.style.transform = `perspective(${perspective}px) rotateX(${(y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`
      el.style.transition = 'transform 0.08s ease-out'
    }

    const handleMouseLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      el.style.transition = `transform ${speed}ms cubic-bezier(0.22, 1, 0.36, 1)`
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, max, perspective, scale, speed])
}
