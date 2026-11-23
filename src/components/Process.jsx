import { useState } from 'react'
import Reveal from './Reveal'
import { PROCESS } from '../data/siteContent'
import './HomeSections.css'

export default function Process() {
  const [active, setActive] = useState(null)

  return (
    <section id="process" className="slide home-section home-section--sand">
      <div className="container">
        <Reveal className="center home-section__intro">
          <p className="kicker">How we work</p>
          <h2 className="section-title">Discuss. Design. Build. Launch. Support.</h2>
          <p className="section-desc">
            A simple process so you always know what happens next — wherever you are based.
          </p>
        </Reveal>
        <ol className="process-rail">
          {PROCESS.map((item, i) => {
            const isActive = active === i
            return (
              <li key={item.title}>
                <Reveal delay={i * 0.05}>
                  <button
                    type="button"
                    className={`process-rail__item${isActive ? ' is-active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setActive(isActive ? null : i)}
                  >
                    <span className="process-rail__step">{item.step}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </button>
                </Reveal>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
