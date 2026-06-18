import { useEffect } from 'react'

export default function use3dTilt(ref, options = {}) {
  const { max = 12, perspective = 1000, scale = 1.03, speed = 400 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const xc = (x / rect.width) - 0.5
      const yc = 0.5 - (y / rect.height)

      const tiltX = (yc * max).toFixed(2)
      const tiltY = (xc * max).toFixed(2)

      el.style.transform = `perspective(${perspective}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale}, ${scale}, ${scale})`
      el.style.transition = 'transform 0.08s ease-out'
    }

    const handleMouseLeave = () => {
      el.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`
      el.style.transition = `transform ${speed}ms cubic-bezier(0.25, 1, 0.5, 1)`
    }

    el.addEventListener('mousemove', handleMouseMove)
    el.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      el.removeEventListener('mousemove', handleMouseMove)
      el.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [ref, max, perspective, scale, speed])
}
