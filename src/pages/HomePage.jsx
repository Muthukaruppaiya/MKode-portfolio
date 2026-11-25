import { useEffect } from 'react'
import { FaWhatsapp } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import Process from '../components/Process'
import TrustSignals from '../components/TrustSignals'
import Portfolio from '../components/Portfolio'
import Clients from '../components/Clients'
import FAQ from '../components/FAQ'
import FinalCTA from '../components/FinalCTA'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import useSmoothScroll from '../hooks/useSmoothScroll'
import usePageMeta from '../hooks/usePageMeta'
import { pageMeta } from '../data/pageMeta'
import { COMPANY } from '../data/siteContent'

export default function HomePage() {
  useSmoothScroll()
  usePageMeta(pageMeta('/'))

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
        <WhyUs />
        <Process />
        <TrustSignals />
        <Portfolio />
        <Clients />
        <FAQ />
        <FinalCTA mode="scroll" />
        <Contact />
      </main>
      <Footer />
      <Mascot />
      <a
        href={`${COMPANY.whatsapp}?text=Hi%20Gypsy%20Coder!%20I'd%20like%20a%20free%20quote.`}
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
