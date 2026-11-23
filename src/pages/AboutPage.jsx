import { FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { MdLocationOn, MdWorkHistory } from 'react-icons/md'
import Navbar from '../components/Navbar'
import About from '../components/About'
import Reveal from '../components/Reveal'
import FinalCTA from '../components/FinalCTA'
import Footer from '../components/Footer'
import ScrollChrome from '../components/ScrollChrome'
import Mascot from '../components/Mascot'
import usePageMeta from '../hooks/usePageMeta'
import { COMPANY, VALUES, TECH } from '../data/siteContent'
import './PageShell.css'
import '../components/HomeSections.css'

export default function AboutPage() {
  usePageMeta({
    title: 'About Gypsy Coder | Custom Software Company in Coimbatore',
    description:
      'Gypsy Coder is a Coimbatore software studio led by Muthukaruppaiya. Hire Indian developers for billing, ecommerce, apps and dashboards — delivered on the agreed date.',
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
            <h1 className="page-shell__title">A Coimbatore studio built for remote clients</h1>
            <p className="page-shell__desc">
              Gypsy Coder is led by {COMPANY.founder}. You speak with the person who designs and builds the product — with {COMPANY.years} years of shipping software for shops and growing brands.
            </p>
            <div className="page-shell__actions">
              <Link to="/contact" className="btn-primary">Get a Free Quote</Link>
              <Link to="/portfolio" className="btn-ghost">View Our Work</Link>
            </div>
            <p className="page-shell__desc" style={{ marginTop: '1.1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <MdLocationOn size={18} /> {COMPANY.city}, {COMPANY.country}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <MdWorkHistory size={18} /> {COMPANY.years} years experience
              </span>
            </p>
          </div>
        </header>

        <About />

        <section className="home-section home-section--sand">
          <div className="container">
            <Reveal className="center home-section__intro">
              <p className="kicker">Values</p>
              <h2 className="section-title">How we work with clients</h2>
            </Reveal>
            <div className="home-cards home-cards--3" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
              {VALUES.map((item, i) => (
                <Reveal key={item.title} className="home-card glass-card" delay={i * 0.05}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="home-section">
          <div className="container">
            <Reveal className="center home-section__intro">
              <p className="kicker">Tools</p>
              <h2 className="section-title">Technologies we use</h2>
              <p className="section-desc">
                Team photos and full profiles can be added when ready. Until then, here is the stack behind most builds.
              </p>
            </Reveal>
            <Reveal className="about-tech-cloud">
              {TECH.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </Reveal>
          </div>
        </section>

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
