import { useRef } from 'react'
import { Link } from 'react-scroll'
import {
  MdLandscape, MdWeb, MdReceipt, MdShoppingCart,
  MdPhoneAndroid, MdCloud, MdArrowForward, MdCheck, Md3dRotation,
  MdAutoAwesome, MdBolt, MdDns,
} from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import Reveal from './Reveal'
import Ridge from './Ridge'
import landingImg from '../assets/services/landing.jpg'
import websitesImg from '../assets/services/websites.jpg'
import billingImg from '../assets/services/billing.jpg'
import shopImg from '../assets/services/shop.jpg'
import appsImg from '../assets/services/apps.jpg'
import threeDImg from '../assets/services/3d.jpg'
import hostingImg from '../assets/services/hosting.jpg'
import aiImg from '../assets/services/ai.jpg'
import automationImg from '../assets/services/automation.jpg'
import cloudImg from '../assets/services/cloud.jpg'
import './Services.css'

const services = [
  {
    icon: <MdLandscape size={28} />,
    title: 'Landing Pages',
    image: landingImg,
    desc: 'One page for a shop, clinic, trip, or offer. Phone number, WhatsApp, and a form people actually use.',
    features: ['Found on Google', 'Fast on a phone', 'WhatsApp button', 'Ready in days'],
    tag: 'Most asked',
  },
  {
    icon: <MdWeb size={28} />,
    title: 'Websites',
    image: websitesImg,
    desc: 'A proper site with a few pages: what you do, photos, and an easy way to reach you.',
    features: ['React / Next.js', 'Edit it yourself', 'Your own domain'],
  },
  {
    icon: <MdReceipt size={28} />,
    title: 'Billing Software',
    image: billingImg,
    desc: 'Invoices, who has paid, and a simple report. Built around how you already bill, GST included.',
    features: ['Invoice print', 'Paid / unpaid', 'GST fields'],
    tag: 'Common job',
  },
  {
    icon: <MdShoppingCart size={28} />,
    title: 'Online Shops',
    image: shopImg,
    desc: 'Products, cart, and checkout, linked to the payment method you already use.',
    features: ['Cart and checkout', 'Stock list', 'Order status'],
  },
  {
    icon: <MdPhoneAndroid size={28} />,
    title: 'Mobile Apps',
    image: appsImg,
    desc: 'Android and iPhone apps for when a website is not enough. Store listing if you want it.',
    features: ['Android and iPhone', 'Notifications', 'Works offline'],
  },
  {
    icon: <MdAutoAwesome size={28} />,
    title: 'AI Products',
    image: aiImg,
    desc: 'Chatbots and assistants that answer from your own price list, catalog, or documents, on your site or on WhatsApp.',
    features: ['Trained on your data', 'WhatsApp bots', 'Smart search', 'Text & voice'],
    tag: 'New',
  },
  {
    icon: <MdBolt size={28} />,
    title: 'Automation',
    image: automationImg,
    desc: 'Let the repeat work run itself: new orders into a sheet, invoices by email, reminders on WhatsApp.',
    features: ['Google Sheets sync', 'Auto emails', 'Scheduled jobs'],
  },
  {
    icon: <Md3dRotation size={28} />,
    title: '3D Websites',
    image: threeDImg,
    desc: 'A product you can spin in the browser. Good when photos alone do not show it.',
    features: ['Three.js', 'No app install'],
    tag: 'Ask first',
  },
  {
    icon: <MdDns size={28} />,
    title: 'Cloud Servers',
    image: cloudImg,
    desc: 'Servers set up on AWS, Google Cloud, or a VPS, with SSL, backups, and a database that is ready to grow.',
    features: ['AWS / GCP / VPS', 'Daily backups', 'SSL & security'],
  },
  {
    icon: <MdCloud size={28} />,
    title: 'Hosting & Updates',
    image: hostingImg,
    desc: 'We put it online, keep it updated, and make sure a new version never takes the old one down.',
    features: ['Managed hosting', 'Updates from Git', 'Down alerts'],
  },
]

function ServiceCard({ service }) {
  const cardRef = useRef(null)
  use3dTilt(cardRef)

  return (
    <article ref={cardRef} className="service-card glass-card">
      <div className="service-card__media">
        <img src={service.image} alt="" loading="lazy" width="800" height="450" />
        {service.tag && <span className="service-card__tag">{service.tag}</span>}
        <div className="service-card__icon">{service.icon}</div>
      </div>
      <div className="service-card__body">
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
      </div>
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
            Ten kinds of work, from a one-page site to AI and cloud, all done remotely. Not on the list? Ask, and you get a straight yes or no.
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
