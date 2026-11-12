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
      el.classList.toggle('is-water', Boolean(node.closest('.footer, .navbar__inner, .navbar__mobile, .tech-orbit')))
      el.classList.toggle('is-hover', Boolean(hovering) && !labelled)
      el.classList.toggle('is-label', Boolean(labelled))
      if (labelled) label.textContent = labelled.getAttribute('data-cursor')
    }

    const onDown = () => el.classList.add('is-down')
    const onUp = () => el.classList.remove('is-down')
    const onLeave = () => { shown = false; el.classList.remove('is-visible') }

    window.addEventListener('touchstart', onLeave, { passive: true })
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      html.classList.remove('has-cursor')
      window.removeEventListener('touchstart', onLeave)
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [root])
}

function useTouchCursor(root) {
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    const el = root.current
    if (!el) return undefined

    const ring = el.querySelector('.touch__ring')
    const dot = el.querySelector('.touch__dot')
    const glow = el.querySelector('.touch__glow')
    const label = el.querySelector('.touch__label')
    const target = { x: 0, y: 0 }
    const ringPos = { x: 0, y: 0 }
    let frame = 0
    let hideTimer = 0
    let touching = false
    let lastTrail = 0

    const place = (node, x, y) => { node.style.transform = `translate3d(${x}px, ${y}px, 0)` }

    const tick = () => {
      const ease = still.matches ? 1 : 0.3
      ringPos.x += (target.x - ringPos.x) * ease
      ringPos.y += (target.y - ringPos.y) * ease
      place(dot, target.x, target.y)
      place(ring, ringPos.x, ringPos.y)
      place(glow, ringPos.x, ringPos.y)
      const settled = Math.abs(target.x - ringPos.x) + Math.abs(target.y - ringPos.y) < 0.5
      frame = touching || !settled ? requestAnimationFrame(tick) : 0
    }

    const run = () => { if (!frame) frame = requestAnimationFrame(tick) }

    const inspect = (x, y) => {
      const node = document.elementFromPoint(x, y)
      const labelled = node?.closest('[data-cursor]')
      const hovering = !labelled && node?.closest(INTERACTIVE)
      el.classList.toggle('is-label', Boolean(labelled))
      el.classList.toggle('is-hover', Boolean(hovering))
      el.classList.toggle('is-water', Boolean(node?.closest('.footer, .navbar__inner, .navbar__mobile, .tech-orbit')))
      if (labelled) label.textContent = labelled.getAttribute('data-cursor')
    }

    const ripple = (x, y) => {
      if (still.matches) return
      const wave = document.createElement('span')
      wave.className = 'touch__ripple'
      wave.style.left = `${x}px`
      wave.style.top = `${y}px`
      el.appendChild(wave)
      wave.addEventListener('animationend', () => wave.remove(), { once: true })
    }

    const trail = (x, y) => {
      const now = performance.now()
      if (still.matches || now - lastTrail < 45) return
      lastTrail = now
      const bead = document.createElement('span')
      bead.className = 'touch__trail'
      bead.style.left = `${x}px`
      bead.style.top = `${y}px`
      el.appendChild(bead)
      bead.addEventListener('animationend', () => bead.remove(), { once: true })
    }

    const onStart = (event) => {
      const touch = event.touches[0]
      if (!touch) return
      touching = true
      clearTimeout(hideTimer)
      target.x = ringPos.x = touch.clientX
      target.y = ringPos.y = touch.clientY
      inspect(touch.clientX, touch.clientY)
      el.classList.add('is-on')
      ripple(touch.clientX, touch.clientY)
      run()
    }

    const onMove = (event) => {
      const touch = event.touches[0]
      if (!touch) return
      target.x = touch.clientX
      target.y = touch.clientY
      trail(touch.clientX, touch.clientY)
      run()
    }

    const onEnd = (event) => {
      if (event.touches.length) return
      touching = false
      clearTimeout(hideTimer)
      hideTimer = setTimeout(() => el.classList.remove('is-on', 'is-label', 'is-hover'), 650)
    }

    window.addEventListener('touchstart', onStart, { passive: true })
    window.addEventListener('touchmove', onMove, { passive: true })
    window.addEventListener('touchend', onEnd, { passive: true })
    window.addEventListener('touchcancel', onEnd, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(hideTimer)
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
      window.removeEventListener('touchcancel', onEnd)
    }
  }, [root])
}

export default function CursorTracker() {
  const cursorRef = useRef(null)
  const touchRef = useRef(null)
  useFinePointer(cursorRef)
  useTouchCursor(touchRef)

  return (
    <>
      <div ref={cursorRef} className="cursor" aria-hidden="true">
        <span className="cursor__glow" />
        <span className="cursor__ring"><span className="cursor__label" /></span>
        <span className="cursor__dot" />
      </div>
      <div ref={touchRef} className="touch" aria-hidden="true">
        <span className="touch__glow" />
        <span className="touch__ring"><span className="touch__label" /></span>
        <span className="touch__dot" />
      </div>
    </>
  )
}
