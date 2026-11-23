import { Link } from 'react-router-dom'
import { MdArrowForward, MdCheck } from 'react-icons/md'
import Reveal from './Reveal'
import { SERVICES, COMPANY, formatUsd } from '../data/siteContent'
import './ServiceCatalog.css'

export default function ServiceCatalog() {
  return (
    <section id="service-catalog" className="slide service-catalog">
      <div className="container">
        <div className="service-catalog__list">
          {SERVICES.map((service, i) => (
            <Reveal key={service.id} className="service-block glass-card" delay={i * 0.04}>
              <div className="service-block__top">
                <div>
                  <h2>{service.name}</h2>
                  <p className="service-block__summary">{service.summary}</p>
                </div>
                <div className="service-block__price">
                  <span>Starting from</span>
                  <strong>
                    {formatUsd(service.fromUsd)}
                    {service.priceNote || ''}
                  </strong>
                </div>
              </div>

              <p className="service-block__for">
                <strong>Who it’s for:</strong> {service.forWho}
              </p>

              <ul className="service-block__features">
                {service.features.map((f) => (
                  <li key={f}><MdCheck size={16} /> {f}</li>
                ))}
              </ul>

              <div className="service-block__meta">
                <span>Typical timeline: <strong>{service.timeline}</strong></span>
                {service.href ? (
                  <Link to={service.href} className="btn-ghost">
                    View details <MdArrowForward size={16} />
                  </Link>
                ) : (
                  <a href={COMPANY.quote} target="_blank" rel="noreferrer" className="btn-ghost">
                    Get a Free Quote <MdArrowForward size={16} />
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
