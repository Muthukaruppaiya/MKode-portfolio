import { Link as RouterLink, useLocation } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import { MdEmail, MdPhone, MdLocationOn, MdArrowUpward } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import logo from '../assets/gypsy-coder-logo.webp'
import WaterSurface from './WaterSurface'
import Reveal from './Reveal'
import './Footer.css'

const nav = [
  { label: 'Home', href: '/', type: 'route' },
  { label: 'Services', href: '/services', type: 'route' },
  { label: 'Billing Software', href: '/billing-software', type: 'route' },
  { label: 'Ecommerce Software', href: '/ecommerce-software', type: 'route' },
  { label: 'Portfolio', href: '/portfolio', type: 'route' },
  { label: 'About', href: '/about', type: 'route' },
  { label: 'Contact', href: '/contact', type: 'route' },
]

const services = [
  { label: 'Websites', href: '/services' },
  { label: 'Billing Software', href: '/billing-software' },
  { label: 'Ecommerce Software', href: '/ecommerce-software' },
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
  const location = useLocation()
  const onHome = location.pathname === '/'

  return (
    <footer className="footer">
      <WaterSurface className="footer__water" />

      <Reveal className="container">
        <div className="footer__shell" onPointerMove={follow}>
          <div className="footer__body">
            <div className="footer__intro">
              <div className="footer__brand">
                <img src={logo} alt="" />
                <div className="footer__brand-text">
                  <strong>Gypsy Coder</strong>
                  <span>Coimbatore</span>
                </div>
              </div>
              <p className="footer__headline">Work anywhere.<br />Deliver on time.</p>
              <a className="footer__mail" href="mailto:sivamkaruppaiya15@gmail.com">
                <MdEmail size={18} />
                <span>sivamkaruppaiya15@gmail.com</span>
                <strong>Say hello</strong>
              </a>
              <p className="footer__note">
                Calls and WhatsApp: <a href="tel:+916383142368">+91 63831 42368</a>
              </p>
              <RouterLink to="/contact" className="footer__price">Get a price</RouterLink>
            </div>

            <nav className="footer__nav" aria-label="Footer">
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
                  <li>
                    <a href="mailto:sivamkaruppaiya15@gmail.com">
                      <MdEmail size={15} /> Email us
                    </a>
                  </li>
                  <li>
                    <a href="tel:+916383142368">
                      <MdPhone size={15} /> Call us
                    </a>
                  </li>
                  <li>
                    <a href="https://wa.me/916383142368" target="_blank" rel="noreferrer">
                      <FaWhatsapp size={15} /> WhatsApp
                    </a>
                  </li>
                  <li>
                    <span>
                      <MdLocationOn size={15} /> Coimbatore
                    </span>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          <div className="footer__base">
            <div className="footer__legal">
              <p>© {year} Gypsy Coder</p>
              <span className="footer__status">
                <i /> Taking new projects
              </span>
            </div>
            <div className="footer__base-right">
              <div className="footer__socials" aria-label="Social links">
                {socials.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
              {onHome ? (
                <ScrollLink
                  to="hero"
                  smooth
                  offset={0}
                  duration={1100}
                  className="footer__up"
                  aria-label="Back to top"
                >
                  <span>Top</span>
                  <MdArrowUpward size={16} />
                </ScrollLink>
              ) : (
                <RouterLink to="/" className="footer__up" aria-label="Back to home">
                  <span>Home</span>
                  <MdArrowUpward size={16} />
                </RouterLink>
              )}
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}
