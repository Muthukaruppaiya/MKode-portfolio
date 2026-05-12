import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { MdRocketLaunch, MdWbSunny, MdNightlight } from 'react-icons/md'
import { useTheme } from '../context/ThemeContext'
import logo from '../assets/gypsy-coder-logo.png'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

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
          <img src={logo} alt="Gypsy Coder Logo" />
          <span>Gypsy Coder</span>
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

        {/* Right side: Theme Toggle + CTA */}
        <div className="navbar__right">
          {/* Day / Night Toggle */}
          <button
            className={`theme-toggle theme-toggle--${theme}`}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'day' ? 'night' : 'day'} mode`}
            title={theme === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
          >
            <span className="theme-toggle__track">
              <span className="theme-toggle__thumb">
                {theme === 'day'
                  ? <MdWbSunny size={14} />
                  : <MdNightlight size={14} />
                }
              </span>
            </span>
            <span className="theme-toggle__label">
              {theme === 'day' ? 'Day' : 'Night'}
            </span>
          </button>

          <Link to="contact" smooth={true} offset={-80} duration={600} className="btn-primary navbar__cta">
            <MdRocketLaunch />
            Get a Quote
          </Link>
        </div>

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
        {/* Mobile Theme Toggle */}
        <button
          className={`theme-toggle theme-toggle--${theme} theme-toggle--mobile`}
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          <span className="theme-toggle__track">
            <span className="theme-toggle__thumb">
              {theme === 'day' ? <MdWbSunny size={14} /> : <MdNightlight size={14} />}
            </span>
          </span>
          <span className="theme-toggle__label">
            {theme === 'day' ? 'Switch to Night Mode' : 'Switch to Day Mode'}
          </span>
        </button>
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

