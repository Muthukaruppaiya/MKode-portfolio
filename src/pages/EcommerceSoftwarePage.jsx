import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ProductPlans from '../components/ProductPlans'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import { ECOMMERCE_PLANS, COMPANY } from '../data/siteContent'
import './PageShell.css'

const highlights = [
  {
    title: 'Catalogue to checkout',
    text: 'Products, cart, checkout and order status in one flow that works on phones.',
  },
  {
    title: 'UPI, cards and more',
    text: 'Local UPI options for India, plus card gateways and multi-currency options for international sales.',
  },
  {
    title: 'GST-aware selling',
    text: 'Tax-ready invoicing and order records when your store needs GST compliance.',
  },
]

export default function EcommerceSoftwarePage() {
  usePageMeta({
    title: 'Ecommerce Website Development | Gypsy Coder',
    description:
      'Custom ecommerce stores with catalogue, cart, checkout, UPI/card payments and multi-currency options. Clear USD starting plans. Request a demo.',
    path: '/ecommerce-software',
  })

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <header className="page-shell">
          <div className="container page-shell__inner">
            <p className="kicker">Ecommerce software</p>
            <h1 className="page-shell__title">Ecommerce websites built to take real orders</h1>
            <p className="page-shell__desc">
              Online shops with product pages, cart, checkout and an admin view for order status. Designed for India and international buyers, with UPI, cards and multi-currency support where needed.
            </p>
            <div className="page-shell__actions">
              <a href={COMPANY.quote} target="_blank" rel="noreferrer" className="btn-primary">Request a demo</a>
              <Link to="/portfolio" className="btn-ghost">See live shops</Link>
            </div>
          </div>
        </header>
        <ProductPlans
          title="Ecommerce plans"
          plans={ECOMMERCE_PLANS}
          highlights={highlights}
          mockLabel="Store admin preview"
        />
        <FinalCTA />
      </main>
      <Footer />
      <Mascot />
      <a
        href={`${COMPANY.whatsapp}?text=Hi%20Gypsy%20Coder!%20I%20need%20an%20ecommerce%20store.`}
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
