import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { MdOpenInNew, MdCode, MdWeb, MdShoppingCart, MdReceipt, MdPhoneAndroid } from 'react-icons/md'
import './Portfolio.css'

const projects = [
  {
    title: 'Cake Online Shopping',
    category: 'Shopping Software',
    cat: 'shopping',
    desc: 'An interactive e-commerce platform for ordering custom cakes and bakery items online. Features include category filtering and order tracking.',
    tags: ['React', 'Cart System', 'Active Development'],
    icon: <MdShoppingCart size={24} />,
    gradient: 'linear-gradient(135deg, #06b6d4, #4f46e5)',
    accent: '#06b6d4',
  },
  {
    title: 'Building Construction',
    category: 'Website',
    cat: 'website',
    desc: 'Professional corporate website for construction services showcasing projects, service categories, and contact management.',
    tags: ['Business Site', 'Project Gallery', 'Active Development'],
    icon: <MdCode size={24} />,
    gradient: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
    accent: '#4f46e5',
  },
  {
    title: 'Modern Landing Page',
    category: 'Landing Page',
    cat: 'landing',
    desc: 'Multi-purpose high-converting landing page optimized for lead generation and business promotion with smooth animations.',
    tags: ['Lead Gen', 'Responsive', 'Active Development'],
    icon: <MdWeb size={24} />,
    gradient: 'linear-gradient(135deg, #8b3cf7, #4f46e5)',
    accent: '#8b3cf7',
  },
]

const filters = ['All', 'Landing Page', 'Website', 'Billing Software', 'Shopping Software', 'Mobile App']

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
            Featured <span className="text-gradient">Projects</span>
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
            <div key={i} className="portfolio-card glass-card">
              <div className="portfolio-card__header" style={{ background: p.gradient }}>
                <div className="portfolio-card__icon">{p.icon}</div>
                <span className="portfolio-card__cat">{p.category}</span>
              </div>
              <div className="portfolio-card__body">
                <h3 className="portfolio-card__title">{p.title}</h3>
                <p className="portfolio-card__desc">{p.desc}</p>
                <div className="portfolio-card__tags">
                  {p.tags.map((t, j) => (
                    <span key={j} className="portfolio-card__tag" style={{ color: p.accent, borderColor: p.accent + '44', background: p.accent + '11' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="portfolio-card__footer">
                <button className="portfolio-card__btn" style={{ color: p.accent }}>
                  <MdOpenInNew size={16} /> View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
