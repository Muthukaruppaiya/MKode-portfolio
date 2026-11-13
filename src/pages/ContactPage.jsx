import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import CursorTracker from '../components/CursorTracker'
import usePageMeta from '../hooks/usePageMeta'
import './PageShell.css'

export default function ContactPage() {
  usePageMeta({
    title: 'Contact Gypsy Coder | Get a Price in Periyakulam, Theni',
    description:
      'Contact Gypsy Coder for billing software, websites, apps, digital marketing, Power BI, or GPS with software. Call or WhatsApp +91 63831 42368. Based in Periyakulam, Theni.',
    path: '/contact',
  })

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Contact</p>
            <h1 className="page-shell__title">Contact Gypsy Coder</h1>
            <p className="page-shell__desc">
              Tell us what you need. Same number for calls and WhatsApp. You get a straight reply and a clear price before any build starts.
            </p>
            <div className="page-shell__actions">
              <a className="btn-primary" href="https://wa.me/916383142368?text=Hi%20Gypsy%20Coder!%20I'd%20like%20to%20discuss%20a%20project." target="_blank" rel="noreferrer">
                WhatsApp us
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
        href="https://wa.me/916383142368?text=Hi%20Gypsy%20Coder!%20I'd%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size={28} />
      </a>
      <CursorTracker />
    </div>
  )
}
