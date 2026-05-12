import { Link } from 'react-scroll'
import { MdRocketLaunch, MdEmail, MdPhone, MdLocationOn } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/gypsy-coder-logo.png'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = {
    Services: ['Landing Pages', 'Website Development', 'Billing Software', 'Shopping Software', 'Mobile Apps', 'Cloud & DevOps'],
    Company: ['About Us', 'Portfolio', 'Testimonials', 'Contact'],
  }

  const navSections = [
    { label: 'Home', to: 'hero' },
    { label: 'Services', to: 'services' },
    { label: 'Portfolio', to: 'portfolio' },
    { label: 'About', to: 'about' },
    { label: 'Contact', to: 'contact' },
  ]

  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={logo} alt="Gypsy Coder" />
              <span>Gypsy Coder</span>
            </div>
            <p className="footer__tagline">
              Premium software development studio delivering
              exceptional digital experiences for businesses worldwide.
            </p>
            <div className="footer__socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="footer__social"><FaGithub size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="footer__social"><FaLinkedin size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer__social"><FaInstagram size={18} /></a>
              <a href="https://wa.me/916383142368" target="_blank" rel="noreferrer" className="footer__social footer__social--wa"><FaWhatsapp size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__nav">
            <h4>Quick Links</h4>
            <ul>
              {navSections.map(n => (
                <li key={n.to}>
                  <Link to={n.to} smooth={true} offset={-80} duration={600} className="footer__link">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__nav">
            <h4>Services</h4>
            <ul>
              {links.Services.map(s => (
                <li key={s}><span className="footer__link">{s}</span></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__contact">
            <h4>Contact Us</h4>
            <div className="footer__contact-items">
              <a href="mailto:mkcode2026@gmail.com" className="footer__contact-item">
                <MdEmail size={16} />
                <span>mkcode2026@gmail.com</span>
              </a>
              <a href="tel:+916383142368" className="footer__contact-item">
                <MdPhone size={16} />
                <span>+91 63831 42368</span>
              </a>
              <div className="footer__contact-item">
                <MdLocationOn size={16} />
                <span>Coimbatore, Tamil Nadu, India</span>
              </div>
            </div>
            <Link to="contact" smooth={true} offset={-80} duration={600} className="btn-primary footer__cta">
              <MdRocketLaunch size={16} /> Get Free Quote
            </Link>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Gypsy Coder. All rights reserved. Built with ❤️ in Coimbatore.</p>
          <div className="footer__bottom-links">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
