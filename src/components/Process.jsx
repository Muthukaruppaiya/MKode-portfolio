import Reveal from './Reveal'
import { PROCESS } from '../data/siteContent'
import './HomeSections.css'

export default function Process() {
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
          {PROCESS.map((item, i) => (
            <li key={item.title}>
              <Reveal className="process-rail__item" delay={i * 0.05}>
                <span className="process-rail__step">{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
