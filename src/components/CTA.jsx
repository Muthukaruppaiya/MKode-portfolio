import { useInView } from 'react-intersection-observer'
import { Link } from 'react-scroll'
import { MdRocketLaunch, MdWhatsapp } from 'react-icons/md'
import './CTA.css'

export default function CTA() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section className="cta-section">
      <div className="cta-section__bg" />
      <div ref={ref} className={`container cta-section__inner ${inView ? 'visible' : ''}`}>
        <div className="cta-section__orb cta-section__orb--1" />
        <div className="cta-section__orb cta-section__orb--2" />
        <div className="section-tag" style={{ margin: '0 auto 20px' }}>🚀 Ready to Start?</div>
        <h2 className="cta-section__title">
          Let's Build Something <span className="text-gradient">Extraordinary</span> Together
        </h2>
        <p className="cta-section__desc">
          Get a free consultation and project estimate within 24 hours.
          No commitment required — just a conversation to understand your vision.
        </p>
        <div className="cta-section__btns">
          <Link to="contact" smooth={true} offset={-80} duration={600} className="btn-primary cta-section__btn">
            <MdRocketLaunch size={18} /> Start Your Project
          </Link>
          <a
            href="https://wa.me/916383142368?text=Hi%20MKode!%20I'd%20like%20to%20discuss%20a%20project."
            target="_blank"
            rel="noreferrer"
            className="cta-section__wa"
          >
            <MdWhatsapp size={20} /> Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
