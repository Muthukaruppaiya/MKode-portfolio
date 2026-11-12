import { useRef } from 'react'
import {
  SiReact, SiNodedotjs, SiNextdotjs, SiPostgresql,
  SiMongodb, SiDocker, SiFirebase, SiTailwindcss,
  SiTypescript, SiPython, SiGit, SiFigma,
} from 'react-icons/si'
import { MdVerified, MdPublic, MdSchedule, MdLocationOn, MdWifi, MdWhatsapp } from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import logo from '../assets/gypsy-coder-logo.png'
import Reveal from './Reveal'
import Ridge from './Ridge'
import './About.css'

const techStack = [
  { icon: <SiReact size={26} />, name: 'React', color: '#149eca' },
  { icon: <SiNextdotjs size={26} />, name: 'Next.js', color: '#2c261f' },
  { icon: <SiNodedotjs size={26} />, name: 'Node.js', color: '#3c8238' },
  { icon: <SiTypescript size={26} />, name: 'TypeScript', color: '#3178c6' },
  { icon: <SiPython size={26} />, name: 'Python', color: '#c9a227' },
  { icon: <SiPostgresql size={26} />, name: 'PostgreSQL', color: '#336791' },
  { icon: <SiMongodb size={26} />, name: 'MongoDB', color: '#47a248' },
  { icon: <SiFirebase size={26} />, name: 'Firebase', color: '#e0a100' },
  { icon: <SiDocker size={26} />, name: 'Docker', color: '#2496ed' },
  { icon: <SiGit size={26} />, name: 'Git', color: '#e05a33' },
  { icon: <SiTailwindcss size={26} />, name: 'Tailwind', color: '#0ea5e9' },
  { icon: <SiFigma size={26} />, name: 'Figma', color: '#f24e1e' },
]

const whyUs = [
  { icon: <MdPublic size={22} />, title: 'Work anywhere', desc: 'Calls, WhatsApp, and shared screens. Distance never slows a reply.' },
  { icon: <MdSchedule size={22} />, title: 'Deliver on time', desc: 'We set the date with you and keep it. If it must move, you hear early.' },
  { icon: <MdVerified size={22} />, title: 'Checked before handover', desc: 'You see it working on your own phone before we call it done.' },
]

function WhyCard({ item }) {
  const cardRef = useRef(null)
  use3dTilt(cardRef, { max: 7, scale: 1.015 })
  return (
    <article ref={cardRef} className="about__why glass-card">
      <div>{item.icon}</div>
      <div>
        <h3>{item.title}</h3>
        <p>{item.desc}</p>
      </div>
    </article>
  )
}

export default function About() {
  return (
    <section id="about" className="slide slide--top slide--mist about">
      <Ridge color="var(--sand)" />
      <div className="container">
        <Reveal className="about__intro">
          <p className="kicker">The traveller</p>
          <h2 className="section-title">Laptop in the bag. <em>Date in the diary.</em></h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__story glass-card">
            <div className="about__story-head">
              <img src={logo} alt="Gypsy Coder" />
              <div>
                <h3>Gypsy Coder</h3>
                <p>by Muthukaruppaiya</p>
              </div>
            </div>
            <p>
              Home base is <strong>Periyakulam, Theni</strong>. We build billing software, websites, and apps for local shops here — and for clients wherever the laptop goes.
            </p>
            <p>
              No account manager. You talk to the person who writes the code, one job at a time.
            </p>
            <div className="about__pills">
              <span><MdLocationOn size={15} /> Periyakulam · Theni</span>
              <span><MdWifi size={15} /> Fully remote</span>
              <span><MdWhatsapp size={15} /> Quick replies</span>
            </div>
          </Reveal>

          <div className="about__reasons">
            {whyUs.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <WhyCard item={item} />
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="about__tech">
          <h3>Packed in the bag</h3>
          <div className="about__tech-grid">
            {techStack.map((item) => (
              <div key={item.name} className="glass-card">
                <span style={{ color: item.color }}>{item.icon}</span>
                {item.name}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
