import { useEffect, useRef } from 'react'
import { Link } from 'react-scroll'
import { MdRocketLaunch, MdArrowDownward } from 'react-icons/md'
import { HiCode } from 'react-icons/hi'
import logo from '../assets/MK-logo.png'
import './Hero.css'

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticles = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 12000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2 + 0.5,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.6 + 0.1,
          color: Math.random() > 0.5 ? '139, 60, 247' : '79, 70, 229',
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach(q => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(q.x, q.y)
            ctx.strokeStyle = `rgba(139, 60, 247, ${0.12 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      animId = requestAnimationFrame(draw)
    }

    resize()
    createParticles()
    draw()
    window.addEventListener('resize', () => { resize(); createParticles() })
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  const stats = [
    { value: '50+', label: 'Projects Delivered' },
    { value: '30+', label: 'Happy Clients' },
    { value: '3+', label: 'Years Experience' },
    { value: '99%', label: 'Satisfaction Rate' },
  ]

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* Gradient Orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      <div className="container hero__content">
        {/* Badge */}
        <div className="hero__badge">
          <HiCode size={14} />
          <span>Premium Software Development Studio</span>
        </div>

        {/* Logo */}
        <div className="hero__logo-wrap">
          <img src={logo} alt="MKode" className="hero__logo" />
        </div>

        {/* Heading */}
        <h1 className="hero__title">
          We Build <span className="text-gradient">Digital</span><br />
          Experiences That <span className="text-gradient-accent">Convert</span>
        </h1>

        <p className="hero__subtitle">
          From stunning landing pages to powerful billing & shopping software —
          MKode delivers premium, scalable solutions for businesses that demand excellence.
        </p>

        {/* CTAs */}
        <div className="hero__ctas">
          <Link to="services" smooth={true} offset={-80} duration={600} className="btn-primary hero__cta-main">
            <MdRocketLaunch size={18} />
            Explore Services
          </Link>
          <Link to="contact" smooth={true} offset={-80} duration={600} className="btn-outline">
            Start a Project →
          </Link>
        </div>

        {/* Stats */}
        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Creative</span>
            <span className="hero__stat-label">Unique Designs</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Modern</span>
            <span className="hero__stat-label">Latest Tech Stack</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Quality</span>
            <span className="hero__stat-label">Clean Coding</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-value text-gradient">Secure</span>
            <span className="hero__stat-label">Protected Sites</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <Link to="services" smooth={true} offset={-80} duration={600} className="hero__scroll">
        <MdArrowDownward size={18} />
      </Link>
    </section>
  )
}
