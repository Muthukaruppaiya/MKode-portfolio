import { useRef } from 'react'
import { Link } from 'react-scroll'
import {
  MdLandscape, MdWeb, MdReceipt, MdShoppingCart,
  MdPhoneAndroid, MdCloud, MdArrowForward, MdCheck, Md3dRotation,
} from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import Reveal from './Reveal'
import Ridge from './Ridge'
import './Services.css'

const services = [
  {
    icon: <MdLandscape size={28} />,
    title: 'Landing Pages',
    desc: 'One page for a shop, clinic, trip, or offer. Phone number, WhatsApp, and a form people actually use.',
    features: ['Found on Google', 'Fast on a phone', 'WhatsApp button', 'Ready in days'],
    tag: 'Most asked',
  },
  {
    icon: <MdWeb size={28} />,
    title: 'Websites',
    desc: 'A proper site with a few pages: what you do, photos, and an easy way to reach you.',
    features: ['React / Next.js', 'Edit it yourself', 'Your own domain'],
  },
  {
    icon: <MdReceipt size={28} />,
    title: 'Billing Software',
    desc: 'Invoices, who has paid, and a simple report. Built around how you already bill, GST included.',
    features: ['Invoice print', 'Paid / unpaid', 'GST fields'],
    tag: 'Common job',
  },
  {
    icon: <MdShoppingCart size={28} />,
    title: 'Online Shops',
    desc: 'Products, cart, and checkout, linked to the payment method you already use.',
    features: ['Cart and checkout', 'Stock list', 'Order status'],
  },
  {
    icon: <MdPhoneAndroid size={28} />,
    title: 'Mobile Apps',
    desc: 'Android and iPhone apps for when a website is not enough. Store listing if you want it.',
    features: ['Android and iPhone', 'Notifications', 'Works offline'],
  },
  {
    icon: <Md3dRotation size={28} />,
    title: '3D Websites',
    desc: 'A product you can spin in the browser. Good when photos alone do not show it.',
    features: ['Three.js', 'No app install'],
    tag: 'Ask first',
  },
  {
    icon: <MdCloud size={28} />,
    title: 'Hosting & Updates',
    desc: 'We put it online, keep it updated, and make sure a new version never takes the old one down.',
    features: ['Cloud servers', 'Updates from Git', 'Down alerts'],
  },
]

function ServiceCard({ service }) {
  const cardRef = useRef(null)
  use3dTilt(cardRef)

  return (
    <article ref={cardRef} className="service-card glass-card">
      <div className="service-card__top">
        <div className="service-card__icon">{service.icon}</div>
        {service.tag && <span className="service-card__tag">{service.tag}</span>}
      </div>
      <h3>{service.title}</h3>
      <p>{service.desc}</p>
      <ul>
        {service.features.map((feature) => (
          <li key={feature}><MdCheck size={15} /> {feature}</li>
        ))}
      </ul>
      <Link to="contact" smooth offset={0} duration={650} className="service-card__more">
        Ask about this <MdArrowForward size={16} />
      </Link>
    </article>
  )
}

export default function Services() {
  return (
    <section id="services" className="slide slide--top slide--mist services">
      <Ridge color="var(--sand)" />
      <div className="container">
        <Reveal className="center services__intro">
          <p className="kicker">The routes</p>
          <h2 className="section-title">Pick where you’re <em>headed.</em></h2>
          <p className="section-desc">
            Seven kinds of work, all done remotely. Not on the list? Ask, and you get a straight yes or no.
          </p>
        </Reveal>
        <div className="services__grid">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
