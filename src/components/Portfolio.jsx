import { useState, useRef } from 'react'
import { Link } from 'react-scroll'
import { MdOpenInNew, MdShoppingCart, MdPhoneAndroid, MdArrowForward, MdFlight } from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import { clients } from '../data/clients'
import celesteShot from '../assets/shots/celeste-cakes.jpg'
import sriMobilesShot from '../assets/shots/sri-mobiles.jpg'
import Reveal from './Reveal'
import Ridge from './Ridge'
import './Portfolio.css'

const projects = [
  ...clients.map((client) => ({ ...client, title: client.name })),
  {
    title: 'Céleste Cakes',
    category: 'Online Shop',
    desc: 'Cake orders online. Pick a category, add to the cart, and place the order.',
    tags: ['React', 'Cart', 'Checkout'],
    icon: <MdShoppingCart size={22} />,
    sky: 'linear-gradient(180deg, #fbe3cf 0%, #f6efe6 100%)',
    url: 'https://hometowncakeshop.netlify.app/',
    shot: celesteShot,
  },
  {
    title: 'Muthukaruppaiya Mobiles',
    category: 'Landing Page',
    desc: 'Page for a mobile repair shop. Easy to find on Google, with a WhatsApp button.',
    tags: ['Landing page', 'SEO'],
    icon: <MdPhoneAndroid size={22} />,
    sky: 'linear-gradient(180deg, #d6e9f1 0%, #eef5f4 100%)',
    url: 'https://sri-mobiles.netlify.app/',
    shot: sriMobilesShot,
  },
]

const filters = ['All', ...new Set(projects.map((project) => project.category))]

function ProjectCard({ project }) {
  const cardRef = useRef(null)
  use3dTilt(cardRef)
  const live = Boolean(project.url)
  const domain = project.domain || (project.url && new URL(project.url).hostname)
  const framed = Boolean(project.shot || project.logo)
  const brandOnly = Boolean(project.logo && !project.shot)

  return (
    <article
      ref={cardRef}
      className={`project-card glass-card ${live ? 'project-card--live' : ''}`}
    >
      <div className={`project-card__head ${framed ? 'project-card__head--shot' : ''}`} style={{ background: project.sky }}>
        {framed && (
          <div className="project-card__browser" aria-hidden="true">
            <span className="project-card__bar"><i /><i /><i /><em>{domain}</em></span>
            {brandOnly ? (
              <span className="project-card__screen project-card__screen--brand" style={{ background: project.logoBg }}>
                <img src={project.logo} alt="" loading="lazy" />
              </span>
            ) : (
              <span className="project-card__screen">
                <img src={project.shot} alt="" loading="lazy" />
              </span>
            )}
          </div>
        )}
        {brandOnly ? null : project.logo ? (
          <span className="project-card__logo" style={{ background: project.logoBg }}>
            <img src={project.logo} alt={`${project.title} logo`} loading="lazy" />
          </span>
        ) : (
          <span className="project-card__icon">{project.icon}</span>
        )}
        <span className={`project-card__stamp ${live ? 'is-live' : ''}`}>
          {live ? 'Arrived · Live' : 'On the road'}
        </span>
      </div>
      <div className="project-card__body">
        <small>{project.place ? `${project.category} · ${project.place}` : project.category}</small>
        <h3>{project.title}</h3>
        {project.route && (
          <p className="project-card__route"><MdFlight size={14} /> {project.route}</p>
        )}
        <p>{project.desc}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        {live ? (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="project-card__link project-card__link--stretched"
            aria-label={`Visit ${project.title} (opens in a new tab)`}
          >
            Visit the site <MdOpenInNew size={16} />
          </a>
        ) : (
          <Link to="contact" smooth offset={0} duration={650} className="project-card__link">
            Want one like this <MdArrowForward size={16} />
          </Link>
        )}
      </div>
    </article>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter((project) => project.category === active)

  return (
    <section id="portfolio" className="slide slide--top portfolio">
      <Ridge color="var(--bg)" />
      <div className="container">
        <Reveal className="center portfolio__intro">
          <p className="kicker">Passport stamps</p>
          <h2 className="section-title">Places we’ve <em>shipped.</em></h2>
          <p className="section-desc">
            All five are live and taking orders today. Tap a card to visit the site.
          </p>
        </Reveal>

        <div className="portfolio__filters" role="tablist" aria-label="Project categories">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              role="tab"
              aria-selected={active === filter}
              className={active === filter ? 'is-active' : ''}
              onClick={() => setActive(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="portfolio__grid">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}
