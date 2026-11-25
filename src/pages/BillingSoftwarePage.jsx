import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductPlans from '../components/ProductPlans'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import { pageMeta } from '../data/pageMeta'
import { BILLING_PLANS, COMPANY } from '../data/siteContent'
import './PageShell.css'

const highlights = [
  {
    title: 'GST-ready invoicing',
    text: 'Tax fields and invoice layouts that match how Indian shops bill — without spreadsheet chaos.',
  },
  {
    title: 'UPI and card payments',
    text: 'Connect the payment methods your customers already use, including UPI where required.',
  },
  {
    title: 'Multi-currency ready',
    text: 'Need overseas pricing or reporting? We can support multi-currency workflows in custom builds.',
  },
]

export default function BillingSoftwarePage() {
  usePageMeta(pageMeta('/billing-software'))

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Billing software</p>
            <h1 className="page-shell__title">Billing software that keeps invoices and payments clear</h1>
            <p className="page-shell__desc">
              Built for shops and service teams that need GST invoices, payment status and reports — without living in spreadsheets. See plans below or request a demo.
            </p>
            <div className="page-shell__actions">
              <a href={COMPANY.quote} target="_blank" rel="noreferrer" className="btn-primary">Request a demo</a>
              <Link to="/contact" className="btn-ghost">Get a Free Quote</Link>
            </div>
          </div>
        </header>
        <ProductPlans
          title="Billing software plans"
          plans={BILLING_PLANS}
          highlights={highlights}
          mockLabel="Billing dashboard preview"
        />
        <FinalCTA />
      </main>
      <Footer />
      <Mascot />
      <a
        href={`${COMPANY.whatsapp}?text=Hi%20Gypsy%20Coder!%20I%20need%20billing%20software.`}
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
