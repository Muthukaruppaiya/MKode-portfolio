import { useInView } from 'react-intersection-observer'
import { MdFormatQuote, MdStar } from 'react-icons/md'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'CEO, TechVentures',
    stars: 5,
    text: 'MKode delivered our e-commerce platform ahead of schedule. The quality of code and design is exceptional. Highly recommend for any business looking for top-tier development.',
    avatar: 'AS',
    color: '#8b3cf7',
  },
  {
    name: 'Priya Krishnan',
    role: 'Founder, StyleMart',
    stars: 5,
    text: 'Our shopping platform built by MKode handles thousands of transactions seamlessly. The billing system integration is flawless. Outstanding work!',
    avatar: 'PK',
    color: '#06b6d4',
  },
  {
    name: 'Rajesh Kumar',
    role: 'MD, BuildPro Constructions',
    stars: 5,
    text: 'The corporate website they built for us has tripled our leads. Professional, responsive, and delivered exactly what we envisioned. Great team!',
    avatar: 'RK',
    color: '#c026d3',
  },
  {
    name: 'Meena Sundar',
    role: 'Owner, RestroEase',
    stars: 5,
    text: 'The POS and billing system transformed how we manage our restaurant. From order management to GST invoicing — everything works perfectly.',
    avatar: 'MS',
    color: '#4f46e5',
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="testimonials" className="section testimonials">
      <div className="container">
        <div ref={ref} className={`testimonials__header ${inView ? 'visible' : ''}`}>
          <div className="section-tag">💬 Client Stories</div>
          <h2 className="section-title">
            What Our <span className="text-gradient">Clients</span> Say
          </h2>
          <p className="section-desc">
            Don't just take our word for it. Here's what our happy clients have to say about working with MKode.
          </p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`testimonial-card glass-card ${inView ? 'testimonial-card--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <MdFormatQuote className="testimonial-card__quote" />

              {/* Stars */}
              <div className="testimonial-card__stars">
                {Array(t.stars).fill(0).map((_, s) => (
                  <MdStar key={s} size={16} color="#f59e0b" />
                ))}
              </div>

              <p className="testimonial-card__text">"{t.text}"</p>

              <div className="testimonial-card__author">
                <div
                  className="testimonial-card__avatar"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}88)` }}
                >
                  {t.avatar}
                </div>
                <div>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
