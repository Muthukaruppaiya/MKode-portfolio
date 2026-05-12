import { BrowserRouter } from 'react-router-dom'
import { FaWhatsapp } from 'react-icons/fa'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import About from './components/About'
import CTA from './components/CTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main>
            <Hero />
            <Services />
            <Portfolio />
            <About />
            <CTA />
            <Contact />
          </main>
          <Footer />
          {/* Floating WhatsApp */}
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
      </BrowserRouter>
    </ThemeProvider>
  )
}

