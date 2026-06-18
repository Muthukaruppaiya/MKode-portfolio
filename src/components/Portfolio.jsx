import { useState, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { MdOpenInNew, MdCode, MdWeb, MdShoppingCart, MdReceipt, MdPhoneAndroid, Md3dRotation } from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import './Portfolio.css'

const projects = [
  {
    title: 'Céleste Cakes – Online Bakery',
    category: 'Shopping Software',
    cat: 'shopping',
    desc: 'A premium artisanal bakery e-commerce platform with category filtering, cart system, and seamless online ordering for custom cakes & bakery items.',
    tags: ['React', 'E-Commerce', 'Live'],
    icon: <MdShoppingCart size={24} />,
    gradient: 'linear-gradient(135deg, #D4AF37, #FFD700)',
    accent: '#D4AF37',
    url: 'https://hometowncakeshop.netlify.app/',
  },
  {
    title: 'Muthukaruppaiya Mobiles',
    category: 'Landing Page',
    cat: 'landing',
    desc: 'A high-converting landing page for a mobile repair & accessories shop featuring SEO optimization, local business schema, and WhatsApp integration.',
    tags: ['Landing Page', 'SEO', 'Live'],
    icon: <MdPhoneAndroid size={24} />,
    gradient: 'linear-gradient(135deg, #6C5CE7, #A29BFE)',
    accent: '#6C5CE7',
    url: 'https://sri-mobiles.netlify.app/',
  },
  {
    title: 'Building Construction',
    category: 'Website',
    cat: 'website',
    desc: 'Professional corporate website for construction services showcasing projects, service categories, and contact management.',
    tags: ['Business Site', 'Project Gallery', 'Active Development'],
    icon: <MdCode size={24} />,
    gradient: 'linear-gradient(135deg, #A07C20, #D4AF37)',
    accent: '#A07C20',
  },
  {
    title: 'Immersive 3D Portfolio',
    category: '3D Website',
    cat: '3d',
    desc: 'A stunning premium 3D interactive website with Three.js powered scenes, WebGL animations, and immersive scroll-driven experiences.',
    tags: ['Three.js', 'WebGL', 'Premium', 'Coming Soon'],
    icon: <Md3dRotation size={24} />,
    gradient: 'linear-gradient(135deg, #00B4D8, #0077B6)',
    accent: '#00B4D8',
  },
  {
    title: 'Modern Landing Page',
    category: 'Landing Page',
    cat: 'landing',
    desc: 'Multi-purpose high-converting landing page optimized for lead generation and business promotion with smooth animations.',
    tags: ['Lead Gen', 'Responsive', 'Active Development'],
    icon: <MdWeb size={24} />,
    gradient: 'linear-gradient(135deg, #FFD700, #A07C20)',
    accent: '#FFD700',
  },
]

const filters = ['All', 'Landing Page', 'Website', '3D Website', 'Billing Software', 'Shopping Software', 'Mobile App']

function ProjectCard({ project, index }) {
  const { ref: inViewRef, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const cardRef = useRef(null)

  use3dTilt(cardRef)

  const setRefs = (node) => {
    cardRef.current = node
    inViewRef(node)
  }

  return (
    <div
      ref={setRefs}
      className={`portfolio-card glass-card ${inView ? 'visible' : ''}`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="portfolio-card__header" style={{ background: project.gradient }}>
        <div className="portfolio-card__icon">{project.icon}</div>
        <span className="portfolio-card__cat">{project.category}</span>
      </div>
      <div className="portfolio-card__body">
        <h3 className="portfolio-card__title">{project.title}</h3>
        <p className="portfolio-card__desc">{project.desc}</p>
        <div className="portfolio-card__tags">
          {project.tags.map((t, j) => (
            <span key={j} className="portfolio-card__tag" style={{ color: project.accent, borderColor: project.accent + '44', background: project.accent + '11' }}>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="portfolio-card__footer">
        {project.url ? (
          <a href={project.url} target="_blank" rel="noreferrer" className="portfolio-card__btn" style={{ color: project.accent }}>
            <MdOpenInNew size={16} /> View Live
          </a>
        ) : (
          <button className="portfolio-card__btn" style={{ color: project.accent }}>
            <MdOpenInNew size={16} /> View Project
          </button>
        )}
      </div>
    </div>
  )
}

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  const filtered = active === 'All'
    ? projects
    : projects.filter(p => p.category === active)

  return (
    <section id="portfolio" className="section portfolio">
      <div className="container">
        <div ref={ref} className={`portfolio__header ${inView ? 'visible' : ''}`}>
          <div className="section-tag">🏆 Our Work</div>
          <h2 className="section-title">
            Featured <span className="text-gradient-silver">Projects</span>
          </h2>
          <p className="section-desc">
            A showcase of our finest work — built to perform, designed to impress.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="portfolio__filters">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`portfolio__filter ${active === f ? 'portfolio__filter--active' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="portfolio__grid">
          {filtered.map((p, i) => (
            <ProjectCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
