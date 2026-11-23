import { useState } from 'react'
import { MdSchedule, MdPayments, MdForum } from 'react-icons/md'
import Reveal from './Reveal'
import { WHY_US } from '../data/siteContent'
import './HomeSections.css'

const icons = [<MdSchedule size={22} />, <MdPayments size={22} />, <MdForum size={22} />]

export default function WhyUs() {
  const [active, setActive] = useState(null)

  return (
    <section id="why-us" className="slide home-section">
      <div className="container">
        <Reveal className="center home-section__intro">
          <p className="kicker">Why choose us</p>
          <h2 className="section-title">Built for clients who need certainty.</h2>
          <p className="section-desc">
            International buyers care about dates, cost and communication. That is what we optimise for.
          </p>
        </Reveal>
        <div className="home-cards home-cards--2">
          {WHY_US.map((item, i) => {
            const isActive = active === i
            return (
              <Reveal key={item.title} delay={i * 0.06}>
                <button
                  type="button"
                  className={`home-card glass-card home-card--tap${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : i)}
                >
                  <span className="home-card__icon" aria-hidden="true">{icons[i]}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </button>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="home-guarantee">
          <strong>On-time delivery promise:</strong> we agree a handover date before build starts.
          If a risk appears, you hear it early with a clear plan.
        </Reveal>
      </div>
    </section>
  )
}
