import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-scroll'
import { MdArrowForward, MdLocationOn, MdOpenInNew } from 'react-icons/md'
import { clients } from '../data/clients'
import Reveal from './Reveal'
import './Clients.css'

const SPEED = 28
const RESUME_AFTER = 2500

function ClientTag({ client, copy }) {
  return (
    <a className="client-tag" href={client.url} target="_blank" rel="noreferrer" tabIndex={copy ? -1 : undefined} data-cursor="Visit">
      <span className="client-tag__hole" aria-hidden="true" />
      <span className="client-tag__logo" style={{ background: client.logoBg }}>
        <img src={client.logo} alt="" loading="lazy" />
      </span>
      <strong>{client.name}</strong>
      <span className="client-tag__trade">{client.trade}</span>
      <span className="client-tag__place"><MdLocationOn size={14} /> {client.place}</span>
      <span className="client-tag__domain">{client.domain} <MdOpenInNew size={14} /></span>
    </a>
  )
}

function NextTag({ copy }) {
  return (
    <Link to="contact" smooth offset={0} duration={650} className="client-tag client-tag--next" tabIndex={copy ? -1 : 0} data-cursor="Join">
      <span className="client-tag__hole" aria-hidden="true" />
      <span className="client-tag__logo client-tag__logo--empty" aria-hidden="true">+</span>
      <strong>Your brand</strong>
      <span className="client-tag__trade">Next on board</span>
      <span className="client-tag__domain">Save a seat <MdArrowForward size={14} /></span>
    </Link>
  )
}

function useDriftingRow(lineRef, copyRef, slots, setActive) {
  useEffect(() => {
    const line = lineRef.current
    const copy = copyRef.current
    if (!line || !copy) return undefined

    const mobile = window.matchMedia('(max-width: 720px)')
    const still = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let last = 0
    let pos = line.scrollLeft
    let visible = false
    let pausedUntil = 0
    let written = -1

    const loopWidth = () => copy.offsetLeft - line.firstElementChild.offsetLeft

    const wrap = () => {
      const width = loopWidth()
      if (width <= 0) return
      if (line.scrollLeft >= width) line.scrollLeft -= width
      else if (line.scrollLeft <= 0) line.scrollLeft += width
    }

    const tick = (now) => {
      frame = requestAnimationFrame(tick)
      const dt = last ? Math.min(now - last, 64) / 1000 : 0
      last = now
      if (!visible || !mobile.matches || still.matches || now < pausedUntil) return
      const width = loopWidth()
      if (width <= 0) return
      pos += SPEED * dt
      if (pos >= width) pos -= width
      line.scrollLeft = pos
      written = line.scrollLeft
    }

    const pause = () => { pausedUntil = performance.now() + RESUME_AFTER }

    const onScroll = () => {
      if (Math.abs(line.scrollLeft - written) > 1) {
        pause()
        wrap()
        pos = line.scrollLeft
        written = pos
      }
      const width = loopWidth()
      if (width > 0) setActive(Math.round(((line.scrollLeft % width) / width) * slots) % slots)
    }

    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(line)

    line.addEventListener('scroll', onScroll, { passive: true })
    line.addEventListener('pointerdown', pause)
    line.addEventListener('touchstart', pause, { passive: true })
    line.addEventListener('wheel', pause, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      line.removeEventListener('scroll', onScroll)
      line.removeEventListener('pointerdown', pause)
      line.removeEventListener('touchstart', pause)
      line.removeEventListener('wheel', pause)
    }
  }, [lineRef, copyRef, slots, setActive])
}

export default function Clients() {
  const lineRef = useRef(null)
  const copyRef = useRef(null)
  const [active, setActive] = useState(0)
  const slots = clients.length + 1

  useDriftingRow(lineRef, copyRef, slots, setActive)

  return (
    <section id="clients" className="clients">
      <div className="container">
        <Reveal className="clients__intro">
          <p className="kicker">Fellow travellers</p>
          <h2 className="section-title">Brands that <em>boarded</em> with us.</h2>
          <p className="section-desc">Real businesses, open for orders right now. Pick a tag to visit their site.</p>
        </Reveal>

        <div className="clients__line" ref={lineRef}>
          {clients.map((client, i) => (
            <Reveal key={client.name} className="clients__slot" delay={i * 0.08}>
              <ClientTag client={client} />
            </Reveal>
          ))}

          <Reveal className="clients__slot" delay={clients.length * 0.08}>
            <NextTag />
          </Reveal>

          {clients.map((client, i) => (
            <div
              key={`copy-${client.name}`}
              ref={i === 0 ? copyRef : undefined}
              className="clients__slot clients__slot--copy"
              aria-hidden="true"
            >
              <ClientTag client={client} copy />
            </div>
          ))}
          <div className="clients__slot clients__slot--copy" aria-hidden="true">
            <NextTag copy />
          </div>
        </div>

        <p className="clients__hint" aria-hidden="true">
          <span className="clients__dots">
            {Array.from({ length: slots }, (_, i) => <i key={i} className={i === active ? 'is-active' : ''} />)}
          </span>
          Swipe either way, or let them drift by
        </p>
      </div>
    </section>
  )
}
