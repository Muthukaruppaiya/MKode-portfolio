import { useEffect, useState } from 'react'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { MdFlight } from 'react-icons/md'
import logo from '../assets/gypsy-coder-logo.png'
import WaterSurface from './WaterSurface'
import './Navbar.css'

const navLinks = [
  { label: 'Home', to: 'hero' },
  { label: 'Services', to: 'services' },
  { label: 'Portfolio', to: 'portfolio' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const close = () => setMenuOpen(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <WaterSurface variant="bar" className="navbar__water" />
        <Link to="hero" smooth duration={1100} offset={0} className="navbar__logo" onClick={close}>
          <img src={logo} alt="Gypsy Coder" />
          <span>Gypsy Coder</span>
        </Link>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link to={link.to} smooth offset={0} duration={1100} spy activeClass="active" className="navbar__link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link to="contact" smooth offset={0} duration={1100} className="btn-primary navbar__cta">
          <MdFlight />
          Get a price
        </Link>

        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <WaterSurface variant="menu" className="navbar__water" paused={!menuOpen} />
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            smooth
            offset={0}
            duration={1100}
            className="navbar__mobile-link"
            onClick={close}
          >
            {link.label}
          </Link>
        ))}
        <Link to="contact" smooth offset={0} duration={1100} className="btn-primary" onClick={close}>
          <MdFlight /> Get a price
        </Link>
      </div>
    </header>
  )
}
