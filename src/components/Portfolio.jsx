import { useState, useRef } from 'react'
import { Link } from 'react-scroll'
import { MdOpenInNew, MdCode, MdWeb, MdShoppingCart, MdPhoneAndroid, Md3dRotation, MdArrowForward } from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import Reveal from './Reveal'
import Ridge from './Ridge'
import './Portfolio.css'

const projects = [
  {
    title: 'Céleste Cakes',
    category: 'Online Shop',
    desc: 'Cake orders online. Pick a category, add to the cart, and place the order.',
    tags: ['React', 'Cart', 'Checkout'],
    icon: <MdShoppingCart size={22} />,
    sky: 'linear-gradient(180deg, #fbe3cf 0%, #f6efe6 100%)',
    url: 'https://hometowncakeshop.netlify.app/',
  },
  {
    title: 'Muthukaruppaiya Mobiles',
    category: 'Landing Page',
    desc: 'Page for a mobile repair shop. Easy to find on Google, with a WhatsApp button.',
    tags: ['Landing page', 'SEO'],
    icon: <MdPhoneAndroid size={22} />,
    sky: 'linear-gradient(180deg, #d6e9f1 0%, #eef5f4 100%)',
    url: 'https://sri-mobiles.netlify.app/',
  },
  {
    title: 'Building Construction',
    category: 'Website',
    desc: 'Site for a construction company: services, photos of past jobs, and a contact form.',
    tags: ['Business site', 'Gallery'],
    icon: <MdCode size={22} />,
    sky: 'linear-gradient(180deg, #e3eedd 0%, #f2f5ee 100%)',
  },
  {
    title: '3D product site',
    category: '3D Website',
    desc: 'A product page where the item turns on screen. Still being put together.',
    tags: ['Three.js', 'WebGL'],
    icon: <Md3dRotation size={22} />,
    sky: 'linear-gradient(180deg, #e4e3f3 0%, #f1f1f6 100%)',
  },
  {
    title: 'Lead page',
    category: 'Landing Page',
    desc: 'A single page for collecting enquiries. Layout is done, content is going in.',
    tags: ['Lead gen', 'Responsive'],
    icon: <MdWeb size={22} />,
    sky: 'linear-gradient(180deg, #f6e7d4 0%, #f5f1ea 100%)',
  },
]

const filters = ['All', ...new Set(projects.map((project) => project.category))]

function ProjectCard({ project }) {
  const cardRef = useRef(null)
  use3dTilt(cardRef)
  const live = Boolean(project.url)

  return (
    <article ref={cardRef} className="project-card glass-card">
      <div className="project-card__head" style={{ background: project.sky }}>
        <span className="project-card__icon">{project.icon}</span>
        <span className={`project-card__stamp ${live ? 'is-live' : ''}`}>
          {live ? 'Arrived · Live' : 'On the road'}
        </span>
      </div>
      <div className="project-card__body">
        <small>{project.category}</small>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <div className="project-card__tags">
          {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        {live ? (
          <a href={project.url} target="_blank" rel="noreferrer" className="project-card__link">
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
            Two are live. The rest are still on the road.
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
