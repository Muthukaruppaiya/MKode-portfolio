import { useEffect, useRef } from 'react'
import './CursorTracker.css'

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], label, summary'
const TEXT_INPUT = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]), textarea, select'

function useFinePointer(root) {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const el = root.current
    if (!el || !fine.matches) return undefined

    const dot = el.querySelector('.cursor__dot')
    const ring = el.querySelector('.cursor__ring')
    const label = el.querySelector('.cursor__label')
    const glow = el.querySelector('.cursor__glow')
    const html = document.documentElement

    const target = { x: innerWidth / 2, y: innerHeight / 2 }
    const ringPos = { ...target }
    const glowPos = { ...target }
    let frame = 0
    let shown = false

    html.classList.add('has-cursor')

    const place = (node, x, y) => { node.style.transform = `translate3d(${x}px, ${y}px, 0)` }

    const tick = () => {
      frame = requestAnimationFrame(tick)
      const ease = still.matches ? 1 : 0.2
      ringPos.x += (target.x - ringPos.x) * ease
      ringPos.y += (target.y - ringPos.y) * ease
      glowPos.x += (target.x - glowPos.x) * (still.matches ? 1 : 0.08)
      glowPos.y += (target.y - glowPos.y) * (still.matches ? 1 : 0.08)
      place(dot, target.x, target.y)
      place(ring, ringPos.x, ringPos.y)
      place(glow, glowPos.x, glowPos.y)
    }

    const onMove = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return
      target.x = event.clientX
      target.y = event.clientY
      if (!shown) {
        shown = true
        ringPos.x = glowPos.x = target.x
        ringPos.y = glowPos.y = target.y
        el.classList.add('is-visible')
      }
    }

    const onOver = (event) => {
      const node = event.target instanceof Element ? event.target : null
      if (!node) return
      const labelled = node.closest('[data-cursor]')
      const typing = node.closest(TEXT_INPUT)
      const hovering = !typing && node.closest(INTERACTIVE)
      el.classList.toggle('is-text', Boolean(typing))
      el.classList.toggle('is-water', Boolean(node.closest('.footer, .navbar__inner, .navbar__mobile')))
      el.classList.toggle('is-hover', Boolean(hovering) && !labelled)
      el.classList.toggle('is-label', Boolean(labelled))
      if (labelled) label.textContent = labelled.getAttribute('data-cursor')
    }

    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')
    const onLeave = () => { shown = false; el.classList.remove('is-visible') }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      html.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [root])
}

function useTouchTrail(root) {
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const el = root.current
    if (!el || !coarse.matches || still.matches) return undefined

    const glow = el.querySelector('.touch__glow')
    let fadeTimer = 0

    const ripple = (x, y) => {
      const ring = document.createElement('span')
      ring.className = 'touch__ripple'
      ring.style.left = `${x}px`
      ring.style.top = `${y}px`
      el.appendChild(ring)
      ring.addEventListener('animationend', () => ring.remove(), { once: true })
    }

    const follow = (x, y) => {
      glow.style.transform = `translate3d(${x}px, ${y}px, 0)`
      glow.classList.add('is-on')
      clearTimeout(fadeTimer)
      fadeTimer = setTimeout(() => glow.classList.remove('is-on'), 450)
    }

    const onDown = (event) => {
      if (event.pointerType === 'mouse') return
      ripple(event.clientX, event.clientY)
      follow(event.clientX, event.clientY)
    }

    const onMove = (event) => {
      const touch = event.touches[0]
      if (touch) follow(touch.clientX, touch.clientY)
    }

    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })

    return () => {
      clearTimeout(fadeTimer)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('touchmove', onMove)
    }
  }, [root])
}

export default function CursorTracker() {
  const cursorRef = useRef(null)
  const touchRef = useRef(null)
  useFinePointer(cursorRef)
  useTouchTrail(touchRef)

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <span className="cursor__glow" />
        <span className="cursor__ring"><span className="cursor__label" /></span>
        <span className="cursor__dot" />
      </div>
      <div ref={touchRef} className="touch" aria-hidden="true">
        <span className="touch__glow" />
      </div>
    </>
  )
}
