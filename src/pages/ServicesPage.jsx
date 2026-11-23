import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ServiceCatalog from '../components/ServiceCatalog'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import { COMPANY } from '../data/siteContent'
import './PageShell.css'

export default function ServicesPage() {
  usePageMeta({
    title: 'Software Development Services & Pricing (USD) | Gypsy Coder',
    description:
      'Billing software development, ecommerce website development, mobile apps, Power BI consulting and GPS tracking software. Clear USD starting prices and timelines.',
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
            <h1 className="page-shell__title">Software services with clear scope and USD pricing</h1>
            <p className="page-shell__desc">
              From billing systems to ecommerce stores, apps, Power BI dashboards and GPS tracking — each service includes who it’s for, key features, a typical timeline and a starting price.
            </p>
            <div className="page-shell__actions">
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/portfolio" className="btn-ghost">View Our Work</Link>
            </div>
          </div>
        </header>
        <ServiceCatalog />
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
