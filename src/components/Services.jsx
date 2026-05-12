import { useInView } from 'react-intersection-observer'
import {
  MdLandscape, MdWeb, MdReceipt, MdShoppingCart,
  MdPhoneAndroid, MdCloud, MdArrowForward, MdCheck
} from 'react-icons/md'
import './Services.css'

const services = [
  {
    icon: <MdLandscape size={32} />,
    title: 'Landing Pages',
    desc: 'High-converting, blazing-fast landing pages designed to capture leads and drive sales. Fully responsive with stunning animations.',
    features: ['SEO Optimized', 'A/B Test Ready', 'Mobile First', 'Fast Load'],
    gradient: 'linear-gradient(135deg, #D4AF37, #FFD700)',
    tag: 'Most Popular',
  },
  {
    icon: <MdWeb size={32} />,
    title: 'Website Development',
    desc: 'Full-stack corporate & business websites built with modern tech. From brochure sites to complex web applications.',
    features: ['React / Next.js', 'REST APIs', 'Admin Panel', 'CMS Integration'],
    gradient: 'linear-gradient(135deg, #A07C20, #D4AF37)',
    tag: '',
  },
  {
    icon: <MdReceipt size={32} />,
    title: 'Billing Software',
    desc: 'Custom invoicing & billing management systems tailored for your business. Automate invoices, track payments, generate reports.',
    features: ['Invoice Generation', 'Payment Tracking', 'GST Ready', 'Multi-user'],
    gradient: 'linear-gradient(135deg, #FFD700, #D4AF37)',
    tag: 'High Demand',
  },
  {
    icon: <MdShoppingCart size={32} />,
    title: 'Shopping Software',
    desc: 'End-to-end e-commerce platforms with cart, checkout, inventory management & payment gateway integration.',
    features: ['Payment Gateway', 'Inventory', 'Order Tracking', 'Analytics'],
    gradient: 'linear-gradient(135deg, #D4AF37, #A07C20)',
    tag: '',
  },
  {
    icon: <MdPhoneAndroid size={32} />,
    title: 'Mobile Apps',
    desc: 'Cross-platform mobile applications for Android & iOS using React Native. Beautiful UI, native performance.',
    features: ['Android & iOS', 'Push Notifications', 'Offline Mode', 'App Store'],
    gradient: 'linear-gradient(135deg, #A07C20, #FFD700)',
    tag: '',
  },
  {
    icon: <MdCloud size={32} />,
    title: 'Cloud & DevOps',
    desc: 'Cloud infrastructure setup, CI/CD pipelines, server management & deployment automation for seamless operations.',
    features: ['AWS / GCP', 'Docker / K8s', 'CI/CD Setup', '24/7 Monitoring'],
    gradient: 'linear-gradient(135deg, #111111, #D4AF37)',
    tag: '',
  },
]

function ServiceCard({ service, index }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <div
      ref={ref}
      className={`service-card glass-card ${inView ? 'service-card--visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {service.tag && <span className="service-card__tag">{service.tag}</span>}
      <div className="service-card__icon" style={{ background: service.gradient }}>
        {service.icon}
      </div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <ul className="service-card__features">
        {service.features.map((f, i) => (
          <li key={i}><MdCheck size={14} /> {f}</li>
        ))}
      </ul>
      <button className="service-card__link">
        Learn More <MdArrowForward size={16} />
      </button>
      <div className="service-card__glow" style={{ background: service.gradient }} />
    </div>
  )
}

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="services" className="section services">
      <div className="container">
        <div ref={ref} className={`services__header ${inView ? 'visible' : ''}`}>
          <div className="section-tag">⚡ What We Do</div>
          <h2 className="section-title">
            Premium <span className="text-gradient">Services</span> We Offer
          </h2>
          <p className="section-desc">
            From concept to deployment, we craft digital solutions that stand out.
            Every project is built with precision, performance, and passion.
          </p>
        </div>

        <div className="services__grid">
          {services.map((s, i) => (
            <ServiceCard key={i} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
