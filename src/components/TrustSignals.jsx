import { useState } from 'react'
import { MdSchedule, MdSecurity, MdVerified, MdPayments } from 'react-icons/md'
import Reveal from './Reveal'
import './HomeSections.css'

const items = [
  {
    icon: <MdSchedule size={22} />,
    title: 'Delivered on time',
    text: 'We agree a handover date before build starts. If a risk appears, you hear early.',
  },
  {
    icon: <MdVerified size={22} />,
    title: 'Clear quote first',
    text: 'Price and scope in writing before coding. No surprise invoices mid-project.',
  },
  {
    icon: <MdPayments size={22} />,
    title: 'Safe payments',
    text: 'Invoices with agreed milestones. You keep ownership of accounts and source after final payment.',
  },
  {
    icon: <MdSecurity size={22} />,
    title: 'Secure handoff',
    text: 'HTTPS, strong passwords, and access only for people who need it. Credentials go to you at launch.',
  },
]

export default function TrustSignals() {
  const [active, setActive] = useState(null)

  return (
    <section id="trust" className="slide home-section home-section--sand">
      <div className="container">
        <Reveal className="home-section__intro center">
          <p className="kicker">Trust</p>
          <h2 className="section-title">Built for clients who have never worked with us before</h2>
          <p className="section-desc">
            International buyers need clarity. Here is how we keep projects predictable and accounts safe.
          </p>
        </Reveal>
        <div className="home-cards home-cards--2">
          {items.map((item, i) => {
            const isActive = active === i
            return (
              <Reveal key={item.title} delay={i * 0.05}>
                <button
                  type="button"
                  className={`home-card glass-card home-card--tap${isActive ? ' is-active' : ''}`}
                  aria-pressed={isActive}
                  onClick={() => setActive(isActive ? null : i)}
                >
                  <div className="home-card__icon" aria-hidden="true">{item.icon}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </button>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="home-guarantee">
          <strong>On-time guarantee:</strong> If we miss an agreed delivery date for reasons in our control,
          we extend support at no extra cost for the delay period. Details are written into your quote.
        </Reveal>
      </div>
    </section>
  )
}
