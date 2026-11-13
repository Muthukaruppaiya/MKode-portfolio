import { useRef } from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { MdEmail, MdPhone, MdLocationOn, MdArrowUpward, MdTouchApp } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/gypsy-coder-logo.png'
import WaterSurface from './WaterSurface'
import Reveal from './Reveal'
import './Footer.css'

const WORD = 'Gypsy Coder'

const nav = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Services', href: '/services', type: 'route' },
  { label: 'Portfolio', href: '/portfolio', type: 'route' },
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Contact', href: '/contact', type: 'route' },
]

const services = [
  { label: 'Websites', href: '/services' },
  { label: 'Billing Software', href: '/services' },
  { label: 'Online Shops', href: '/services' },
  { label: 'Mobile Apps', href: '/services' },
  { label: 'Digital Marketing', href: '/services' },
  { label: 'Power BI Reports', href: '/services' },
  { label: 'GPS with Software', href: '/services' },
  { label: 'Cloud Servers', href: '/services' },
]

const socials = [
  { label: 'GitHub', href: 'https://github.com', icon: FaGithub },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedin },
  { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
  { label: 'WhatsApp', href: 'https://wa.me/916383142368', icon: FaWhatsapp },
]

const follow = (event) => {
  const box = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - box.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - box.top}px`)
}

function SectionOrRoute({ item, children, className }) {
  const location = useLocation()
  const onHome = location.pathname === '/'

  if (item.type === 'route') {
    return (
      <RouterLink to={item.href} className={className}>
        {children}
      </RouterLink>
    )
  }

  if (onHome) {
    return (
      <ScrollLink to={item.href} smooth offset={0} duration={1100} className={className}>
        {children}
      </ScrollLink>
    )
  }

  return (
    <RouterLink to={`/#${item.href}`} className={className}>
      {children}
    </RouterLink>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const wordRef = useRef(null)
  const location = useLocation()
  const onHome = location.pathname === '/'

  return (
    <footer className="footer">
      <WaterSurface word={WORD} wordRef={wordRef} className="footer__water" />

      <div className="container footer__top">
        <Reveal className="footer__intro">
          <div className="footer__brand">
            <img src={logo} alt="" />
            <strong>GYPSY CODER</strong>
          </div>
          <p className="footer__headline">WORK ANYWHERE.<br />DELIVER ON TIME.</p>
          <a className="footer__mail" href="mailto:sivamkaruppaiya15@gmail.com" data-cursor="Write">
            <MdEmail size={18} />
            <span>sivamkaruppaiya15@gmail.com</span>
            <strong>Say hello</strong>
          </a>
          <p className="footer__note">Calls and WhatsApp: <a href="tel:+916383142368">+91 63831 42368</a></p>
        </Reveal>

        <Reveal className="footer__panel-wrap" delay={0.12}>
          <nav className="footer__panel" aria-label="Footer" onPointerMove={follow}>
            <div>
              <h2>Explore</h2>
              <ul>
                {nav.map((item) => (
                  <li key={item.label}>
                    <SectionOrRoute item={item}>{item.label}</SectionOrRoute>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                {services.map((item) => (
                  <li key={item.label}>
                    <RouterLink to={item.href}>{item.label}</RouterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Base camp</h2>
              <ul>
                <li><a href="mailto:sivamkaruppaiya15@gmail.com"><MdEmail size={15} /> Email us</a></li>
                <li><a href="tel:+916383142368"><MdPhone size={15} /> Call us</a></li>
                <li><a href="https://wa.me/916383142368" target="_blank" rel="noreferrer"><FaWhatsapp size={15} /> WhatsApp</a></li>
                <li><span><MdLocationOn size={15} /> Periyakulam, Theni</span></li>
                <li>
                  <RouterLink to="/contact" className="footer__price">Get a price</RouterLink>
                </li>
              </ul>
            </div>
          </nav>
        </Reveal>
      </div>

      <Reveal className="container footer__base" delay={0.2}>
        <p>
          © {year} Gypsy Coder
          <span className="footer__status"><i /> Taking new projects</span>
        </p>
        <div className="footer__base-right">
          <div className="footer__socials">
            {socials.map(({ label, href, icon: Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon size={15} />
              </a>
            ))}
          </div>
          {onHome ? (
            <ScrollLink to="hero" smooth offset={0} duration={1100} className="footer__up">
              Back to top <MdArrowUpward size={15} />
            </ScrollLink>
          ) : (
            <RouterLink to="/" className="footer__up">
              Back to home <MdArrowUpward size={15} />
            </RouterLink>
          )}
        </div>
      </Reveal>

      <div ref={wordRef} className="footer__word" aria-hidden="true">
        <span>{WORD}</span>
        <p className="footer__hint">
          <MdTouchApp size={16} />
          <span className="footer__hint-pc">Move across the water</span>
          <span className="footer__hint-touch">Touch the water</span>
        </p>
      </div>
    </footer>
  )
}
