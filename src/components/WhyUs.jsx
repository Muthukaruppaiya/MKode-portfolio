import { MdSchedule, MdPayments, MdForum } from 'react-icons/md'
import Reveal from './Reveal'
import { WHY_US } from '../data/siteContent'
import './HomeSections.css'

const icons = [<MdSchedule size={22} />, <MdPayments size={22} />, <MdForum size={22} />]

export default function WhyUs() {
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
        <div className="home-cards home-cards--3">
          {WHY_US.map((item, i) => (
            <Reveal key={item.title} className="home-card glass-card" delay={i * 0.06}>
              <span className="home-card__icon" aria-hidden="true">{icons[i]}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="home-guarantee">
          <strong>On-time delivery promise:</strong> we agree a handover date before build starts.
          If a risk appears, you hear it early with a clear plan.
        </Reveal>
      </div>
    </section>
  )
}
