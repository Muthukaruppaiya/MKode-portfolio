import { Link as RouterLink } from 'react-router-dom'
import { MdArrowForward } from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'
import { COMPANY } from '../data/siteContent'
import './HomeSections.css'

export default function FinalCTA({ mode = 'route' }) {
  return (
    <section id="final-cta" className="slide home-section home-section--cta">
      <div className="container">
        <Reveal className="final-cta glass-card">
          <p className="kicker">Ready when you are</p>
          <h2 className="section-title">Tell us what you need. Get a free quote.</h2>
          <p className="section-desc">
            Share a short brief. You receive a clear price and delivery date — usually within one business day.
          </p>
          <div className="final-cta__actions">
            {mode === 'scroll' ? (
              <a href="#contact" className="btn-primary">
                Get a Free Quote <MdArrowForward size={18} />
              </a>
            ) : (
              <RouterLink to="/contact" className="btn-primary">
                Get a Free Quote <MdArrowForward size={18} />
              </RouterLink>
            )}
            <a
              href={COMPANY.bookCall}
              target="_blank"
              rel="noreferrer"
              className="btn-outline final-cta__wa"
            >
              <FaWhatsapp size={18} /> Book a 15-minute call
            </a>
          </div>
          <p className="final-cta__note">{COMPANY.replyPromise}</p>
        </Reveal>
      </div>
    </section>
  )
}
