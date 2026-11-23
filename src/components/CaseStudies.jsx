import Reveal from './Reveal'
import { CASE_STUDIES } from '../data/siteContent'
import './CaseStudies.css'

export default function CaseStudies() {
  return (
    <section id="case-studies" className="slide case-studies">
      <div className="container">
        <Reveal className="center case-studies__intro">
          <p className="kicker">Case studies</p>
          <h2 className="section-title">Selected work, told as outcomes.</h2>
          <p className="section-desc">
            Placeholder metrics are marked clearly until confirmed client results are provided.
          </p>
        </Reveal>

        <div className="case-grid">
          {CASE_STUDIES.map((item, i) => (
            <Reveal key={item.slug} className="case-card glass-card" delay={i * 0.05}>
              <p className="case-card__type">{item.clientType}</p>
              <h3>{item.title}</h3>
              <dl>
                <div>
                  <dt>Problem</dt>
                  <dd>{item.problem}</dd>
                </div>
                <div>
                  <dt>What we built</dt>
                  <dd>{item.built}</dd>
                </div>
                <div>
                  <dt>Technologies</dt>
                  <dd>{item.tech.join(' · ')}</dd>
                </div>
                <div>
                  <dt>Result</dt>
                  <dd>
                    {item.result}
                    {item.placeholder && <em className="case-card__note"> Placeholder until confirmed</em>}
                  </dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
