import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import CursorTracker from '../components/CursorTracker'
import usePageMeta from '../hooks/usePageMeta'
import './PageShell.css'

export default function AboutPage() {
  usePageMeta({
    title: 'About Gypsy Coder | Software Studio in Periyakulam, Theni',
    description:
      'About Gypsy Coder — the software studio of Muthukaruppaiya in Periyakulam, Theni. We build billing software, websites, and apps remotely and deliver on time.',
    path: '/about',
  })

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">About</p>
            <h1 className="page-shell__title">About Gypsy Coder</h1>
            <p className="page-shell__desc">
              Home base in Periyakulam, Theni. We build billing software, websites, and apps for local shops — and for clients wherever the laptop goes.
            </p>
            <div className="page-shell__actions">
              <Link to="/services" className="btn-primary">Our services</Link>
              <Link to="/contact" className="btn-ghost">Get a price</Link>
            </div>
          </div>
        </header>
        <About />
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
