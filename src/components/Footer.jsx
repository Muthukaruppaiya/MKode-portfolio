import { useRef } from 'react'
import { Link } from 'react-scroll'
import { MdEmail, MdPhone, MdLocationOn, MdArrowUpward, MdTouchApp } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/gypsy-coder-logo.png'
import WaterSurface from './WaterSurface'
import Reveal from './Reveal'
import './Footer.css'

const WORD = 'Gypsy Coder'

const nav = [
  { label: 'Home', to: 'hero' },
  { label: 'Services', to: 'services' },
  { label: 'Portfolio', to: 'portfolio' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
]

const services = ['Websites', 'Billing Software', 'Online Shops', 'Mobile Apps', 'Automation', 'Cloud Servers']

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

export default function Footer() {
  const year = new Date().getFullYear()
  const wordRef = useRef(null)

  return (
    <footer className="footer">
      <WaterSurface word={WORD} wordRef={wordRef} className="footer__water" />

      <div className="container footer__top">
        <Reveal className="footer__intro">
          <div className="footer__brand">
            <img src={logo} alt="" />
            <strong>Gypsy Coder</strong>
          </div>
          <p className="footer__headline">Work anywhere.<br />Deliver on time.</p>
          <a className="footer__mail" href="mailto:mkcode2026@gmail.com" data-cursor="Write">
            <MdEmail size={18} />
            <span>mkcode2026@gmail.com</span>
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
                  <li key={item.to}>
                    <Link to={item.to} smooth offset={0} duration={650}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Services</h2>
              <ul>
                {services.map((item) => (
                  <li key={item}>
                    <Link to="services" smooth offset={0} duration={650}>{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Base camp</h2>
              <ul>
                <li><a href="mailto:mkcode2026@gmail.com"><MdEmail size={15} /> Email us</a></li>
                <li><a href="tel:+916383142368"><MdPhone size={15} /> Call us</a></li>
                <li><a href="https://wa.me/916383142368" target="_blank" rel="noreferrer"><FaWhatsapp size={15} /> WhatsApp</a></li>
                <li><span><MdLocationOn size={15} /> Periyakulam, Theni</span></li>
                <li>
                  <Link to="contact" smooth offset={0} duration={650} className="footer__price">Get a price</Link>
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
          <Link to="hero" smooth offset={0} duration={650} className="footer__up">
            Back to top <MdArrowUpward size={15} />
          </Link>
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
