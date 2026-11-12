import { useEffect, useRef, useState } from 'react'
import { useAdaptiveColor } from '../context/AdaptiveColorContext'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const trailRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const { accent } = useAdaptiveColor()
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) {
      setEnabled(false)
      document.body.classList.remove('has-custom-cursor')
      return
    }
    document.body.classList.add('has-custom-cursor')
    return () => document.body.classList.remove('has-custom-cursor')
  }, [])

  useEffect(() => {
    if (!enabled) return

    let rafId
    const tick = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`
      }
      if (trailRef.current) {
        const midX = (pos.current.x + ringPos.current.x) / 2
        const midY = (pos.current.y + ringPos.current.y) / 2
        trailRef.current.style.transform = `translate3d(${midX}px, ${midY}px, 0)`
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const interactiveSelector = 'a, button, [role="button"], .cursor-hover, input, textarea, select, .portfolio-card, .service-card'

    const onOver = (e) => {
      if (e.target.closest(interactiveSelector)) setHovering(true)
    }
    const onOut = (e) => {
      if (e.target.closest(interactiveSelector)) setHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [enabled])

  if (!enabled) return null

  const stateClass = [
    visible ? 'is-visible' : '',
    hovering ? 'is-hover' : '',
    clicking ? 'is-click' : '',
  ].filter(Boolean).join(' ')

  return (
    <div className={`custom-cursor ${stateClass}`} aria-hidden="true">
      <div
        ref={trailRef}
        className="custom-cursor__trail"
        style={{ background: accent.glow }}
      />
      <div
        ref={ringRef}
        className="custom-cursor__ring"
        style={{ borderColor: accent.primary, boxShadow: `0 0 24px ${accent.glow}` }}
      />
      <div
        ref={dotRef}
        className="custom-cursor__dot"
        style={{ background: accent.primary, boxShadow: `0 0 16px ${accent.glow}` }}
      />
    </div>
  )
}
