import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { Link } from 'react-scroll'
import {
  MdLandscape, MdWeb, MdReceipt, MdShoppingCart,
  MdPhoneAndroid, MdCloud, MdArrowForward, MdCheck, Md3dRotation,
  MdBolt, MdDns,
} from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import Reveal from './Reveal'
import Ridge from './Ridge'
import './Services.css'

const clipFiles = import.meta.glob('../assets/services/clips/*.{mp4,jpg}', { eager: true, import: 'default' })
const clip = (name) => ({
  video: clipFiles[`../assets/services/clips/${name}.mp4`],
  poster: clipFiles[`../assets/services/clips/${name}.jpg`],
})

const services = [
  {
    icon: <MdLandscape size={28} />,
    title: 'Landing Pages',
    media: clip('landing'),
    desc: 'One page for a Periyakulam or Theni shop, clinic, trip, or offer. Phone number, WhatsApp, and a form people actually use.',
    features: ['Found on Google', 'Fast on a phone', 'WhatsApp button', 'Ready in days'],
    tag: 'Most asked',
  },
  {
    icon: <MdWeb size={28} />,
    title: 'Websites',
    media: clip('websites'),
    desc: 'A proper site for your Periyakulam or Theni business: what you do, photos, and an easy way to reach you.',
    features: ['React / Next.js', 'Edit it yourself', 'Your own domain'],
  },
  {
    icon: <MdReceipt size={28} />,
    title: 'Billing Software',
    media: clip('billing'),
    desc: 'GST billing software for shops in Periyakulam and Theni. Invoices, who has paid, and a simple report — built around how you already bill.',
    features: ['Invoice print', 'Paid / unpaid', 'GST fields'],
    tag: 'Common job',
  },
  {
    icon: <MdShoppingCart size={28} />,
    title: 'Online Shops',
    media: clip('shop'),
    desc: 'Products, cart, and checkout, linked to the payment method you already use.',
    features: ['Cart and checkout', 'Stock list', 'Order status'],
  },
  {
    icon: <MdPhoneAndroid size={28} />,
    title: 'Mobile Apps',
    media: clip('apps'),
    desc: 'Android and iPhone apps for when a website is not enough. Store listing if you want it.',
    features: ['Android and iPhone', 'Notifications', 'Works offline'],
  },
  {
    icon: <MdBolt size={28} />,
    title: 'Automation',
    media: clip('automation'),
    desc: 'Let the repeat work run itself: new orders into a sheet, invoices by email, reminders on WhatsApp.',
    features: ['Google Sheets sync', 'Auto emails', 'Scheduled jobs'],
  },
  {
    icon: <Md3dRotation size={28} />,
    title: '3D Websites',
    media: clip('3d'),
    desc: 'A product you can spin in the browser. Good when photos alone do not show it.',
    features: ['Three.js', 'No app install'],
    tag: 'Ask first',
  },
  {
    icon: <MdDns size={28} />,
    title: 'Cloud Servers',
    media: clip('cloud'),
    desc: 'Servers set up on AWS, Google Cloud, or a VPS, with SSL, backups, and a database that is ready to grow.',
    features: ['AWS / GCP / VPS', 'Daily backups', 'SSL & security'],
  },
  {
    icon: <MdCloud size={28} />,
    title: 'Hosting & Updates',
    media: clip('hosting'),
    desc: 'We put it online, keep it updated, and make sure a new version never takes the old one down.',
    features: ['Managed hosting', 'Updates from Git', 'Down alerts'],
  },
]

function ServiceClip({ media }) {
  const videoRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const video = videoRef.current
    if (!video || reduce) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (video.preload !== 'auto') video.preload = 'auto'
        video.play().catch(() => {})
      } else {
        video.pause()
      }
    }, { rootMargin: '200px 0px' })
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduce])

  return (
    <video
      ref={videoRef}
      src={media.video}
      poster={media.poster}
      muted
      loop
      playsInline
      preload="none"
      width="640"
      height="360"
      aria-hidden="true"
    />
  )
}

function ServiceCard({ service }) {
  const cardRef = useRef(null)
  use3dTilt(cardRef)

  return (
    <article ref={cardRef} className="service-card glass-card">
      <div className="service-card__media">
        <ServiceClip media={service.media} />
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
            Billing software, websites, online shops, apps, and cloud — for shops and offices in Periyakulam and Theni, and for clients anywhere. Not on the list? Ask, and you get a straight yes or no.
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
