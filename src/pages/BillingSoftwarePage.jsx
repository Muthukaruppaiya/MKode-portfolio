import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import './PageShell.css'

export default function BillingSoftwarePage() {
  usePageMeta({
    title: 'Billing Software | Gypsy Coder',
    description:
      'GST billing software for shops in Periyakulam and Theni. Invoices, paid and unpaid lists, and a simple report, built around how you already bill.',
    path: '/billing-software',
  })

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Billing software</p>
            <h1 className="page-shell__title">Billing software for shops</h1>
            <p className="page-shell__desc">
              Gypsy Coder builds GST billing software for shops in Periyakulam, Theni, and beyond. Invoices, who has paid, and a report you can read without opening a spreadsheet.
            </p>
            <div className="page-shell__actions">
              <Link to="/contact" className="btn-primary">Get a price</Link>
              <Link to="/services" className="btn-ghost">All services</Link>
            </div>
          </div>
        </header>
        <section className="page-shell" style={{ paddingTop: 0 }}>
          <div className="container page-shell__inner">
            <h2 className="page-shell__title" style={{ fontSize: '1.6rem' }}>What the billing software covers</h2>
            <p className="page-shell__desc">
              Print an invoice at the counter, mark a bill paid or unpaid, and keep GST fields the way your shop already uses them. Stock and expiry can be added when the shop needs them, as on the pharmacy billing work we have shipped.
            </p>
            <p className="page-shell__desc" style={{ marginTop: '0.9rem' }}>
              You see it working on your own phone before we call it done. Call or WhatsApp +91 63831 42368 and we send a price and a delivery date.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Mascot />
      <a
        href="https://wa.me/916383142368?text=Hi%20Gypsy%20Coder!%20I%20need%20billing%20software."
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
