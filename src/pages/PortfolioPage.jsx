import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CaseStudies from '../components/CaseStudies'
import Portfolio from '../components/Portfolio'
import Clients from '../components/Clients'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import { pageMeta } from '../data/pageMeta'
import { COMPANY } from '../data/siteContent'
import './PageShell.css'

export default function PortfolioPage() {
  usePageMeta(pageMeta('/portfolio'))

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Portfolio</p>
            <h1 className="page-shell__title">Work that shipped on an agreed date</h1>
            <p className="page-shell__desc">
              Case studies below show the client type, problem, what we built, technologies and result. Live project stamps follow.
            </p>
            <div className="page-shell__actions">
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/services" className="btn-ghost">Browse services</Link>
            </div>
          </div>
        </header>
        <CaseStudies />
        <Portfolio />
        <Clients />
        <FinalCTA />
      </main>
      <Footer />
      <Mascot />
      <a
        href={COMPANY.quote}
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
