import { Link } from 'react-scroll'
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/gypsy-coder-logo.png'
import Ridge from './Ridge'
import './Footer.css'

const nav = [
  { label: 'Home', to: 'hero' },
  { label: 'Services', to: 'services' },
  { label: 'Portfolio', to: 'portfolio' },
  { label: 'About', to: 'about' },
  { label: 'Contact', to: 'contact' },
]

const services = ['Websites', 'Billing Software', 'Online Shops', 'Mobile Apps', 'Automation', 'Cloud Servers']

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <Ridge color="var(--footer-bg)" />
      <div className="container footer__grid">
        <div>
          <div className="footer__brand">
            <img src={logo} alt="" />
            <strong>Gypsy Coder</strong>
          </div>
          <p className="footer__motto">Work anywhere. Deliver on time.</p>
          <p>Websites and custom software. Home base: Coimbatore.</p>
          <div className="footer__socials">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={16} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={16} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={16} /></a>
            <a href="https://wa.me/916383142368" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp size={16} /></a>
          </div>
        </div>

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
          <a href="mailto:mkcode2026@gmail.com"><MdEmail size={16} /> mkcode2026@gmail.com</a>
          <a href="tel:+916383142368"><MdPhone size={16} /> +91 63831 42368</a>
          <p><MdLocationOn size={16} /> Coimbatore, Tamil Nadu, India</p>
          <Link to="contact" smooth offset={0} duration={650} className="btn-primary">Get a price</Link>
        </div>
      </div>
      <div className="container footer__base">
        <p>© {year} Gypsy Coder. Coded on the road, from Coimbatore.</p>
      </div>
    </footer>
  )
}
