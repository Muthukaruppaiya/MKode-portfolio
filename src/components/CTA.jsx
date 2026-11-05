import { Link } from 'react-scroll'
import { MdArrowForward, MdWhatsapp } from 'react-icons/md'
import Reveal from './Reveal'
import Ridge from './Ridge'
import './CTA.css'

export default function CTA() {
  return (
    <section className="cta-band">
      <Ridge color="var(--bg)" />
      <div className="container">
        <Reveal className="cta-band__panel">
          <svg className="cta-band__scene" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <circle cx="980" cy="110" r="110" fill="#f3a873" opacity="0.12" />
            <circle cx="980" cy="110" r="54" fill="#f3a873" opacity="0.9" />
            <path fill="#2c5546" d="M0 300V210l120-70 90 50 140-100 130 110 110-60 150 90 120-80 130 60 110-50 100 40v100z" />
            <path fill="#36644f" d="M0 300v-50c120-30 260-10 380-30s240-40 380-10 300 20 440-10v100z" />
          </svg>
          <div className="cta-band__copy">
            <p className="kicker">Next stop</p>
            <h2>Where’s your project <em>headed?</em></h2>
            <p>Send the brief. You get a price and a delivery date. WhatsApp is the fastest way in.</p>
            <div className="cta-band__actions">
              <Link to="contact" smooth offset={0} duration={650} className="btn-primary">
                Plan the trip <MdArrowForward size={18} />
              </Link>
              <a
                href="https://wa.me/916383142368?text=Hi%20Gypsy%20Coder!%20I'd%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
                className="cta-section__wa"
              >
                <MdWhatsapp size={20} /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
