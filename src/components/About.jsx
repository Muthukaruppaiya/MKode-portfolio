import { useRef } from 'react'
import {
  SiReact, SiNodedotjs, SiNextdotjs, SiPostgresql,
  SiMongodb, SiDocker, SiFirebase, SiTailwindcss,
  SiTypescript, SiPython, SiGit, SiFigma,
  SiVercel, SiGithub, SiLinux, SiJavascript,
  SiHtml5, SiCss, SiExpress, SiMysql,
  SiVite, SiSupabase, SiFlutter,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'
import { MdVerified, MdPublic, MdSchedule, MdLocationOn, MdWifi, MdWhatsapp } from 'react-icons/md'
import use3dTilt from '../hooks/use3dTilt'
import logo from '../assets/gypsy-coder-logo.png'
import Reveal from './Reveal'
import Ridge from './Ridge'
import WaterSurface from './WaterSurface'
import './About.css'

/*
  Same count (8 / 8 / 8). Odd rings clockwise, even rings anti-clockwise.
  Starts staggered so rings stay in each other’s gaps.
*/
const orbitRings = [
  {
    duration: '40s',
    start: 0,
    items: [
      { Icon: SiReact, name: 'React', color: '#61dafb' },
      { Icon: SiNodedotjs, name: 'Node.js', color: '#68a063' },
      { Icon: SiTypescript, name: 'TypeScript', color: '#3178c6' },
      { Icon: SiJavascript, name: 'JavaScript', color: '#f7df1e' },
      { Icon: SiDocker, name: 'Docker', color: '#2496ed' },
      { Icon: SiPython, name: 'Python', color: '#ffd43b' },
      { Icon: SiGit, name: 'Git', color: '#f05032' },
      { Icon: SiHtml5, name: 'HTML5', color: '#e34f26' },
    ],
  },
  {
    duration: '56s',
    start: 22.5,
    items: [
      { Icon: SiNextdotjs, name: 'Next.js', color: '#e5e7eb' },
      { Icon: SiPostgresql, name: 'PostgreSQL', color: '#5b9bd5' },
      { Icon: SiMongodb, name: 'MongoDB', color: '#4db33d' },
      { Icon: FaAws, name: 'AWS', color: '#ff9900' },
      { Icon: SiFirebase, name: 'Firebase', color: '#ffa000' },
      { Icon: SiExpress, name: 'Express', color: '#e5e7eb' },
      { Icon: SiMysql, name: 'MySQL', color: '#4479a1' },
      { Icon: SiCss, name: 'CSS3', color: '#1572b6' },
    ],
  },
  {
    duration: '72s',
    start: 11.25,
    items: [
      { Icon: SiTailwindcss, name: 'Tailwind', color: '#38bdf8' },
      { Icon: SiFigma, name: 'Figma', color: '#f24e1e' },
      { Icon: SiGithub, name: 'GitHub', color: '#e5e7eb' },
      { Icon: SiVercel, name: 'Vercel', color: '#e5e7eb' },
      { Icon: SiLinux, name: 'Linux', color: '#fcc624' },
      { Icon: SiVite, name: 'Vite', color: '#a855f7' },
      { Icon: SiSupabase, name: 'Supabase', color: '#3ecf8e' },
      { Icon: SiFlutter, name: 'Flutter', color: '#54c5f8' },
    ],
  },
]

function TechOrbit() {
  return (
    <div className="tech-orbit" aria-label="Tools packed in the bag">
      <WaterSurface variant="bar" className="tech-orbit__water" />
      <div className="tech-orbit__stage">
        {orbitRings.map((ring, ringIndex) => {
          const odd = (ringIndex + 1) % 2 === 1
          return (
          <div
            key={ringIndex}
            className={`tech-orbit__ring tech-orbit__ring--${ringIndex + 1}${odd ? ' is-cw' : ' is-ccw'}`}
            style={{ '--spin': ring.duration }}
          >
            {ring.items.map((item, itemIndex) => {
              const step = 360 / ring.items.length
              const angle = ring.start + step * itemIndex
              const { Icon } = item
              return (
                <div
                  key={item.name}
                  className="tech-orbit__slot"
                  style={{ '--angle': `${angle}deg` }}
                >
                  <span
                    className="tech-orbit__node"
                    style={{ '--icon': item.color }}
                    title={item.name}
                  >
                    <Icon size={18} aria-hidden="true" />
                    <span className="visually-hidden">{item.name}</span>
                  </span>
                </div>
              )
            })}
          </div>
          )
        })}
        <div className="tech-orbit__core">
          <img src={logo} alt="Gypsy Coder" />
        </div>
      </div>
    </div>
  )
}

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
          <p className="about__tech-note">The stack that travels with every project — always moving.</p>
          <TechOrbit />
        </Reveal>
      </div>
    </section>
  )
}
