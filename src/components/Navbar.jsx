import { useEffect, useState } from 'react'
import { Link as RouterLink, NavLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { MdDarkMode, MdFlight, MdLightMode } from 'react-icons/md'
import { useTheme } from '../context/ThemeContext'
import logo from '../assets/gypsy-coder-logo.png'
import WaterSurface from './WaterSurface'
import './Navbar.css'

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme()
  const night = theme === 'night'

  const choose = (next) => (event) => {
    if ((next === 'night') === night) return
    const box = event.currentTarget.getBoundingClientRect()
    toggleTheme({ x: box.left + box.width / 2, y: box.top + box.height / 2 })
  }

  return (
    <div className={`theme-switch ${night ? 'is-night' : ''}`} role="group" aria-label="Color theme">
      <span className="theme-switch__thumb" aria-hidden="true" />
      <button type="button" aria-pressed={!night} onClick={choose('day')}>
        <MdLightMode size={16} />
        <span>Light</span>
      </button>
      <button type="button" aria-pressed={night} onClick={choose('night')}>
        <MdDarkMode size={16} />
        <span>Dark</span>
      </button>
    </div>
  )
}

const navLinks = [
  { label: 'Home', to: '/', type: 'route' },
  { label: 'Services', to: '/services', type: 'route' },
  { label: 'Portfolio', to: '/portfolio', type: 'route' },
  { label: 'About', to: '/about', type: 'route' },
  { label: 'Contact', to: '/contact', type: 'route' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const onHome = location.pathname === '/'

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

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const close = () => setMenuOpen(false)

  const renderLink = (link, className) => {
    if (link.type === 'route') {
      return (
        <NavLink
          to={link.to}
          end={link.to === '/'}
          className={({ isActive }) => `${className}${isActive ? ' active' : ''}`}
          onClick={close}
        >
          {link.label}
        </NavLink>
      )
    }

    if (onHome) {
      return (
        <ScrollLink
          to={link.to}
          smooth
          offset={0}
          duration={1100}
          spy
          activeClass="active"
          className={className}
          onClick={close}
        >
          {link.label}
        </ScrollLink>
      )
    }

    return (
      <RouterLink to={`/#${link.to}`} className={className} onClick={close}>
        {link.label}
      </RouterLink>
    )
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <WaterSurface variant="bar" className="navbar__water" />
        <RouterLink to="/" className="navbar__logo" onClick={close}>
          <img src={logo} alt="Gypsy Coder" />
          <span>Gypsy Coder</span>
        </RouterLink>

        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.label}>
              {renderLink(link, 'navbar__link')}
            </li>
          ))}
        </ul>

        <ThemeSwitch />

        <RouterLink to="/contact" className="btn-primary navbar__cta" onClick={close}>
          <MdFlight />
          Get a price
        </RouterLink>

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
        {navLinks.map((link) => renderLink(link, 'navbar__mobile-link'))}
        <RouterLink to="/contact" className="btn-primary" onClick={close}>
          <MdFlight /> Get a price
        </RouterLink>
      </div>
    </header>
  )
}
