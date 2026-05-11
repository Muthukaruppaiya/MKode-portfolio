import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { MdRocketLaunch } from 'react-icons/md'
import logo from '../assets/MK-logo.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', to: 'hero' },
    { label: 'Services', to: 'services' },
    { label: 'Portfolio', to: 'portfolio' },
    { label: 'About', to: 'about' },
    { label: 'Contact', to: 'contact' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="hero" smooth={true} duration={600} className="navbar__logo">
          <img src={logo} alt="MKode Logo" />
          <span>MKode</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="navbar__links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                smooth={true}
                offset={-80}
                duration={600}
                spy={true}
                activeClass="active"
                className="navbar__link"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to="contact" smooth={true} offset={-80} duration={600} className="btn-primary navbar__cta">
          <MdRocketLaunch />
          Get a Quote
        </Link>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={26} /> : <HiMenuAlt3 size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        {navLinks.map(link => (
          <Link
            key={link.to}
            to={link.to}
            smooth={true}
            offset={-80}
            duration={600}
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="contact"
          smooth={true}
          offset={-80}
          duration={600}
          className="btn-primary"
          onClick={() => setMenuOpen(false)}
        >
          <MdRocketLaunch /> Get a Quote
        </Link>
      </div>
    </nav>
  )
}
