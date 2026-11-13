import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Portfolio from '../components/Portfolio'
import Clients from '../components/Clients'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import CursorTracker from '../components/CursorTracker'
import usePageMeta from '../hooks/usePageMeta'
import './PageShell.css'

export default function PortfolioPage() {
  usePageMeta({
    title: 'Portfolio | Live Sites & Projects – Gypsy Coder',
    description:
      'Gypsy Coder portfolio — live websites and software projects for shops and brands in Periyakulam, Theni, and beyond. See work shipped on time.',
    path: '/portfolio',
  })

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Portfolio</p>
            <h1 className="page-shell__title">Work from Gypsy Coder</h1>
            <p className="page-shell__desc">
              Live sites and client stamps. Each job has a clear brief, a build window, and a handover date we keep.
            </p>
            <div className="page-shell__actions">
              <Link to="/contact" className="btn-primary">Get a price</Link>
              <Link to="/about" className="btn-ghost">About us</Link>
            </div>
          </div>
        </header>
        <Portfolio />
        <Clients />
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
