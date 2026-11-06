import { Link } from 'react-scroll'
import { MdArrowForward, MdLocationOn, MdOpenInNew } from 'react-icons/md'
import { clients } from '../data/clients'
import Reveal from './Reveal'
import './Clients.css'

export default function Clients() {
  return (
    <section id="clients" className="clients">
      <div className="container">
        <Reveal className="clients__intro">
          <p className="kicker">Fellow travellers</p>
          <h2 className="section-title">Brands that <em>boarded</em> with us.</h2>
          <p className="section-desc">Real businesses, open for orders right now. Pick a tag to visit their site.</p>
        </Reveal>

        <div className="clients__line">
          {clients.map((client, i) => (
            <Reveal key={client.name} className="clients__slot" delay={i * 0.08}>
              <a className="client-tag" href={client.url} target="_blank" rel="noreferrer">
                <span className="client-tag__hole" aria-hidden="true" />
                <span className="client-tag__logo" style={{ background: client.logoBg }}>
                  <img src={client.logo} alt="" loading="lazy" />
                </span>
                <strong>{client.name}</strong>
                <span className="client-tag__trade">{client.trade}</span>
                <span className="client-tag__place"><MdLocationOn size={14} /> {client.place}</span>
                <span className="client-tag__domain">{client.domain} <MdOpenInNew size={14} /></span>
              </a>
            </Reveal>
          ))}

          <Reveal className="clients__slot" delay={clients.length * 0.08}>
            <Link to="contact" smooth offset={0} duration={650} className="client-tag client-tag--next">
              <span className="client-tag__hole" aria-hidden="true" />
              <span className="client-tag__logo client-tag__logo--empty" aria-hidden="true">+</span>
              <strong>Your brand</strong>
              <span className="client-tag__trade">Next on board</span>
              <span className="client-tag__domain">Save a seat <MdArrowForward size={14} /></span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
