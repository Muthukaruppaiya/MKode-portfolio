import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import './PageShell.css'

export default function EcommerceSoftwarePage() {
  usePageMeta({
    title: 'Ecommerce Software | Gypsy Coder',
    description:
      'Ecommerce software and online shops from Gypsy Coder. Products, cart, checkout, and order status, linked to the payment method you already use.',
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
            <h1 className="page-shell__title">Ecommerce software and online shops</h1>
            <p className="page-shell__desc">
              Gypsy Coder builds ecommerce software for shops that want to sell online. Customers browse products, add them to a cart, pay, and you can see the order status.
            </p>
            <div className="page-shell__actions">
              <Link to="/contact" className="btn-primary">Get a price</Link>
              <Link to="/portfolio" className="btn-ghost">See live shops</Link>
            </div>
          </div>
        </header>
        <section className="page-shell" style={{ paddingTop: 0 }}>
          <div className="container page-shell__inner">
            <h2 className="page-shell__title" style={{ fontSize: '1.6rem' }}>What the shop includes</h2>
            <p className="page-shell__desc">
              A product list, cart, and checkout tied to UPI, card, or the payment method you already use. Stock and order status stay in one place, so a kitchen, a bat shop, or a saree store can take orders without a separate app.
            </p>
            <p className="page-shell__desc" style={{ marginTop: '0.9rem' }}>
              Live examples include sports, organics, and clothing shops. Tell us what you sell and we reply with a price and a date. WhatsApp +91 63831 42368.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <Mascot />
      <a
        href="https://wa.me/916383142368?text=Hi%20Gypsy%20Coder!%20I%20need%20an%20online%20shop."
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
