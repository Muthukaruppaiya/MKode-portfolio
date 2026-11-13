import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import CursorTracker from '../components/CursorTracker'
import usePageMeta from '../hooks/usePageMeta'
import './PageShell.css'

export default function ServicesPage() {
  usePageMeta({
    title: 'Services | Billing Software, Websites & Apps – Gypsy Coder',
    description:
      'Gypsy Coder services: billing software, websites, online shops, mobile apps, digital marketing, Power BI reports, GPS with software, cloud, and automation for Periyakulam, Theni, and beyond.',
    path: '/services',
  })

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Services</p>
            <h1 className="page-shell__title">Services from Gypsy Coder</h1>
            <p className="page-shell__desc">
              Billing software, websites, online shops, apps, digital marketing, Power BI, and GPS with software — built remotely, handed over on the date we agree.
            </p>
            <div className="page-shell__actions">
              <Link to="/about" className="btn-primary">About us</Link>
              <Link to="/#contact" className="btn-ghost">Get a price</Link>
            </div>
          </div>
        </header>
        <Services />
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
