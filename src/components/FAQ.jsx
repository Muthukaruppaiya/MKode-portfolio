import { useState } from 'react'
import Reveal from './Reveal'
import { FAQ as ITEMS } from '../data/siteContent'
import './HomeSections.css'

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="slide home-section">
      <div className="container home-faq">
        <Reveal className="home-section__intro">
          <p className="kicker">FAQ</p>
          <h2 className="section-title">Questions buyers usually ask.</h2>
          <p className="section-desc">
            Straight answers on remote work, pricing, ownership and how we start.
          </p>
        </Reveal>
        <div className="faq-list">
          {ITEMS.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} className={`faq-item ${isOpen ? 'is-open' : ''}`} delay={i * 0.03}>
                <button
                  type="button"
                  className="faq-item__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{item.q}</span>
                  <i aria-hidden="true">{isOpen ? '−' : '+'}</i>
                </button>
                {isOpen && <p className="faq-item__a">{item.a}</p>}
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
