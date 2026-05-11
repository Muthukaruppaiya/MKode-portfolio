import { useInView } from 'react-intersection-observer'
import { MdVerified, MdStar, MdEmojiEvents } from 'react-icons/md'
import {
  SiReact, SiNodedotjs, SiNextdotjs, SiPostgresql,
  SiMongodb, SiDocker, SiFirebase, SiTailwindcss,
  SiTypescript, SiPython, SiGit, SiFigma
} from 'react-icons/si'
import logo from '../assets/MK-logo.png'
import './About.css'

const techStack = [
  { icon: <SiReact size={28} />, name: 'React', color: '#61dafb' },
  { icon: <SiNextdotjs size={28} />, name: 'Next.js', color: '#fff' },
  { icon: <SiNodedotjs size={28} />, name: 'Node.js', color: '#68a063' },
  { icon: <SiTypescript size={28} />, name: 'TypeScript', color: '#3178c6' },
  { icon: <SiPython size={28} />, name: 'Python', color: '#ffd343' },
  { icon: <SiPostgresql size={28} />, name: 'PostgreSQL', color: '#336791' },
  { icon: <SiMongodb size={28} />, name: 'MongoDB', color: '#47a248' },
  { icon: <SiFirebase size={28} />, name: 'Firebase', color: '#ffca28' },
  { icon: <SiDocker size={28} />, name: 'Docker', color: '#2496ed' },
  { icon: <SiGit size={28} />, name: 'Git', color: '#f05032' },
  { icon: <SiTailwindcss size={28} />, name: 'Tailwind', color: '#38bdf8' },
  { icon: <SiFigma size={28} />, name: 'Figma', color: '#f24e1e' },
]

const whyUs = [
  { icon: <MdVerified size={22} />, title: 'Quality Assured', desc: 'Every project goes through rigorous testing and review before delivery.' },
  { icon: <MdStar size={22} />, title: 'Premium Design', desc: 'Pixel-perfect, modern interfaces that impress users and boost conversions.' },
  { icon: <MdEmojiEvents size={22} />, title: 'On-Time Delivery', desc: 'We respect your time. Projects delivered within agreed timelines, every time.' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const { ref: techRef, inView: techInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className="section about">
      <div className="container">
        {/* Header */}
        <div ref={ref} className={`about__header ${inView ? 'visible' : ''}`}>
          <div className="section-tag">👤 Who We Are</div>
          <h2 className="section-title">
            The Team Behind <span className="text-gradient">MKode</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div className="about__grid">
          {/* Left - Story */}
          <div className={`about__story glass-card ${inView ? 'visible' : ''}`}>
            <div className="about__logo-wrap">
              <img src={logo} alt="MKode" />
            </div>
            <h3>Muthukaruppaiya Development Studio</h3>
            <p>
              MKode is a fresh, premium software development studio based in <strong>Chennai, India</strong>. 
              We are currently in our early stages but already have <strong>2 major projects in hand</strong> — 
              a Cake Online Shopping platform and a Building Construction website.
            </p>
            <p>
              Our mission is simple: deliver excellence from day one. Every line of code we write, 
              every pixel we design is crafted to create real impact for our clients' businesses.
            </p>
            <div className="about__badges">
              <span className="about__badge">📍 Chennai, India</span>
              <span className="about__badge">🚀 Full Stack Studio</span>
              <span className="about__badge">⭐ 5-Star Rated</span>
            </div>
          </div>

          {/* Right - Why Us */}
          <div className="about__why">
            {whyUs.map((w, i) => (
              <div
                key={i}
                className={`about__why-card glass-card ${inView ? 'visible' : ''}`}
                style={{ transitionDelay: `${0.2 + i * 0.15}s` }}
              >
                <div className="about__why-icon">{w.icon}</div>
                <div>
                  <h4>{w.title}</h4>
                  <p>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div ref={techRef} className={`about__tech ${techInView ? 'visible' : ''}`}>
          <h3 className="about__tech-title">
            Our <span className="text-gradient">Tech Stack</span>
          </h3>
          <div className="about__tech-grid">
            {techStack.map((t, i) => (
              <div
                key={i}
                className="about__tech-item glass-card"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span style={{ color: t.color }}>{t.icon}</span>
                <span>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
