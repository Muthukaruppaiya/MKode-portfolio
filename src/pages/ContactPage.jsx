import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import { pageMeta } from '../data/pageMeta'
import { COMPANY } from '../data/siteContent'
import './PageShell.css'

export default function ContactPage() {
  usePageMeta(pageMeta('/contact'))

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Contact</p>
            <h1 className="page-shell__title">Get a free quote within 24 hours</h1>
            <p className="page-shell__desc">
              Share your project, country and budget. We reply on business days with a clear price and delivery date.
              Working hours: {COMPANY.hours}.
            </p>
            <div className="page-shell__actions">
              <a className="btn-primary" href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
              <a className="btn-ghost" href={COMPANY.bookCall} target="_blank" rel="noreferrer">
                Book a 15-minute call
              </a>
              <Link to="/services" className="btn-ghost">See services</Link>
            </div>
          </div>
        </header>
        <Contact />
      </main>
      <Footer />
      <Mascot />
      <a
        href={`${COMPANY.whatsapp}?text=Hi%20Gypsy%20Coder!%20I'd%20like%20a%20free%20quote.`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
    </div>
  )
}
