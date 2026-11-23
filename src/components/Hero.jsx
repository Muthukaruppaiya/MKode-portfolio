import { useRef, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link as RouterLink } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { MdArrowForward, MdPublic, MdSchedule, MdVerified, MdSecurity } from 'react-icons/md'
import heroPhoto from '../assets/hero-coder.png'
import Reveal from './Reveal'
import { HERO } from '../data/siteContent'
import './Hero.css'

const marks = [
  { icon: <MdPublic size={18} />, value: 'Global', label: 'Remote clients welcome' },
  { icon: <MdSchedule size={18} />, value: 'On time', label: 'Agreed delivery date' },
  { icon: <MdVerified size={18} />, value: 'Clear quote', label: 'Price before build' },
  { icon: <MdSecurity size={18} />, value: 'Secure', label: 'Safe payments & handoff' },
]

const pines = [
  [70, 742, 1], [118, 736, 0.8], [168, 748, 1.1], [540, 712, 0.9], [586, 706, 1.2],
  [632, 716, 0.8], [1180, 676, 1], [1226, 668, 1.25], [1276, 680, 0.9], [1360, 690, 1.05],
]

const stars = [
  [90, 120, 1.6], [210, 70, 1.2], [330, 160, 1.8], [420, 90, 1.1], [520, 210, 1.4],
  [610, 60, 1.7], [820, 110, 1.3], [900, 60, 1.9], [960, 200, 1.2], [1060, 90, 1.5],
  [1150, 170, 1.8], [1240, 60, 1.2], [1320, 140, 1.6], [1400, 80, 1.1], [150, 260, 1.2],
  [760, 330, 1.1], [1100, 300, 1.4], [1380, 260, 1.3], [40, 330, 1.5], [470, 320, 1.2],
]

const TRAIL = 'M180 900 C300 830 520 860 640 792 C760 724 890 764 972 684 C1030 628 1052 604 1010 562'

function Pine({ x, y, s }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -58 L16 -26 H8 L22 0 H-22 L-8 -26 H-16 Z" />
      <rect x="-2.5" y="0" width="5" height="9" rx="1" />
    </g>
  )
}

function useLayers(sectionRef) {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const still = (range) => (reduce ? [0, 0] : range)
  return {
    reduce,
    scrollYProgress,
    sunY: useTransform(scrollYProgress, [0, 1], still([0, -50])),
    farY: useTransform(scrollYProgress, [0, 1], still([0, 50])),
    midY: useTransform(scrollYProgress, [0, 1], still([0, 100])),
    nearY: useTransform(scrollYProgress, [0, 1], still([0, 160])),
    contentY: useTransform(scrollYProgress, [0, 1], still([0, 70])),
    contentFade: useTransform(scrollYProgress, [0, 0.45, 0.85], reduce ? [1, 1, 1] : [1, 0.55, 0]),
  }
}

function Landscape({ layers }) {
  const { reduce, sunY, farY, midY, nearY } = layers

  return (
    <svg className="hero__land" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop className="sun-stop sun-stop--core" offset="0" />
          <stop className="sun-stop sun-stop--edge" offset="1" />
        </radialGradient>
        <linearGradient id="near" x1="0" y1="0" x2="0" y2="1">
          <stop className="near-stop near-stop--top" offset="0" />
          <stop className="near-stop near-stop--base" offset="1" />
        </linearGradient>
      </defs>

      <g className="hero__stars">
        {stars.map(([x, y, r], i) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} style={{ animationDelay: `${(i % 7) * 0.6}s` }} />)}
      </g>

      <motion.g style={{ y: sunY }}>
        <g className="hero__sun">
          <g className="hero__sun-disc">
            <circle className="hero__sun-glow" cx="700" cy="250" r="112" />
            <circle cx="700" cy="250" r="66" fill="url(#sun)" />
            <g className="hero__craters">
              <circle cx="680" cy="232" r="11" />
              <circle cx="722" cy="268" r="8" />
              <circle cx="716" cy="226" r="5" />
              <circle cx="684" cy="276" r="6" />
            </g>
          </g>
        </g>
      </motion.g>

      <g className="hero__clouds">
        <path opacity="0.85" d="M180 210c0-22 20-36 40-30 8-20 40-24 54-6 22-6 40 8 38 28H180z" />
        <path opacity="0.7" d="M1010 150c0-16 16-28 32-22 8-16 32-18 42-4 18-4 32 6 30 22h-104z" />
        <path opacity="0.6" d="M560 120c0-12 12-20 24-16 6-12 24-14 32-2 14-4 24 4 22 18h-78z" />
      </g>

      <g className="hero__birds" fill="none" strokeWidth="2.4" strokeLinecap="round">
        <path d="M820 190q8-8 16 0q8-8 16 0" />
        <path d="M864 214q6-6 12 0q6-6 12 0" />
        <path d="M842 236q5-5 10 0q5-5 10 0" />
      </g>

      <motion.path
        style={{ y: farY }}
        className="land-far"
        d="M0 640 L120 560 L220 600 L360 500 L470 580 L600 470 L720 560 L860 450 L980 540 L1100 470 L1230 560 L1340 500 L1440 560 V900 H0Z"
      />

      <motion.g style={{ y: midY }}>
        <path
          className="land-mid"
          d="M0 700 L140 620 L260 680 L420 560 L560 660 L700 590 L860 690 L1010 560 L1160 650 L1300 590 L1440 660 V900 H0Z"
        />
        <path className="land-snow" d="M420 560 L390 586 L406 582 L420 594 L434 581 L450 586Z" />
        <path className="land-snow" d="M1010 560 L980 586 L996 582 L1010 594 L1024 581 L1040 586Z" />
      </motion.g>

      <motion.g style={{ y: nearY }}>
        <path
          className="land-near"
          fill="url(#near)"
          d="M0 760 C180 700 320 730 480 700 C640 670 760 730 920 710 C1080 690 1240 640 1440 690 V900 H0Z"
        />
        <g className="land-pines">
          {pines.map(([x, y, s]) => <Pine key={`${x}-${y}`} x={x} y={y} s={s} />)}
        </g>
      </motion.g>

      <path className="hero__trail" id="hero-trail" d={TRAIL} />
      {!reduce && (
        <circle r="7" className="hero__walker">
          <animateMotion dur="16s" repeatCount="indefinite">
            <mpath href="#hero-trail" />
          </animateMotion>
        </circle>
      )}

      <path className="land-ground" d="M0 836 C240 796 420 826 640 806 C860 786 1100 826 1440 796 V900 H0Z" />
    </svg>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const layers = useLayers(sectionRef)
  const [activeMark, setActiveMark] = useState(null)

  return (
    <section id="hero" className="slide hero" ref={sectionRef}>
      <div className="hero__photo" aria-hidden="true">
        <img src={heroPhoto} alt="" />
      </div>
      <Landscape layers={layers} />
      <motion.div
        className="container hero__grid"
        style={{ y: layers.contentY, opacity: layers.contentFade }}
      >
        <Reveal className="hero__copy" immediate>
          <h1 className="hero__title">
            <span className="hero__headline">{HERO.headline}</span>
          </h1>
          <p className="hero__lede">{HERO.subhead}</p>
          <div className="hero__ctas">
            <ScrollLink to="contact" smooth offset={0} duration={900} className="btn-primary">
              {HERO.primary} <MdArrowForward size={18} />
            </ScrollLink>
            <RouterLink to="/portfolio" className="btn-outline">
              {HERO.secondary}
            </RouterLink>
          </div>
          <ul className="hero__marks" aria-label="Why clients trust us">
            {marks.map((mark, i) => {
              const isActive = activeMark === i
              return (
                <li key={mark.value}>
                  <button
                    type="button"
                    className={`hero__mark${isActive ? ' is-active' : ''}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveMark(isActive ? null : i)}
                  >
                    <span className="hero__mark-icon" aria-hidden="true">{mark.icon}</span>
                    <span className="hero__mark-text">
                      <strong>{mark.value}</strong>
                      <small>{mark.label}</small>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </motion.div>
    </section>
  )
}
