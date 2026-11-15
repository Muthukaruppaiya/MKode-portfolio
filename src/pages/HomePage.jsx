import { useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Portfolio from '../components/Portfolio'
import About from '../components/About'
import CTA from '../components/CTA'
import Contact from '../components/Contact'
import Clients from '../components/Clients'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import useSmoothScroll from '../hooks/useSmoothScroll'
import usePageMeta from '../hooks/usePageMeta'

export default function HomePage() {
  useSmoothScroll()
  usePageMeta({
    title: 'Gypsy Coder: Billing Software, Ecommerce & Websites',
    description:
      'Official site of Gypsy Coder and Gypsy Coders. Billing software, ecommerce shops, and websites for Periyakulam, Theni, and clients anywhere. Delivered on the date we agree.',
    path: '/',
  })

  useEffect(() => {
    const hash = window.location.hash?.replace('#', '')
    if (!hash) return undefined
    const timer = window.setTimeout(() => {
      const el = document.getElementById(hash)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 120)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="app">
      <ScrollChrome />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <CTA />
        <Contact />
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
    </div>
  )
}
