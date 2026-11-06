import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import './Mascot.css'

const WHATSAPP = 'https://wa.me/916383142368?text=Hi%20Gypsy%20Coder!%20I%20have%20a%20job%20to%20price.'

const QUICK = [
  { label: 'Services', text: 'What do you build?' },
  { label: 'Price', text: 'How do I get a price?' },
  { label: 'Work', text: 'What have you shipped?' },
  { label: 'Contact', text: 'How do I reach you?' },
]

const START = {
  from: 'bot',
  text: 'Hi, I’m Gypsy. Work anywhere, deliver on time. Ask about a job, a price, or how to reach us.',
}

function has(text, words) {
  return words.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(text))
}

function answer(raw) {
  const q = raw.toLowerCase()
  if (has(q, ['price', 'cost', 'quote', 'budget', 'charge', 'rate'])) {
    return 'Send the brief. You get a number before any code. WhatsApp is the fast way: +91 63831 42368.'
  }
  if (has(q, ['whatsapp', 'call', 'phone', 'contact', 'email', 'reach', 'hello', 'hi', 'hey'])) {
    return 'Call or WhatsApp +91 63831 42368. Email mkcode2026@gmail.com. We are in Coimbatore.'
  }
  if (has(q, ['where', 'location', 'coimbatore', 'address', 'city'])) {
    return 'Home base is Coimbatore, but we work remotely. Send the brief from anywhere.'
  }
  if (has(q, ['bill', 'billing', 'invoice', 'gst'])) {
    return 'Billing software covers invoices, who has paid, and GST fields. Built around how you already bill.'
  }
  if (has(q, ['shop', 'store', 'cart', 'checkout', 'order'])) {
    return 'A shop with products, a cart, and checkout. We hook up the payment method you already use.'
  }
  if (has(q, ['app', 'android', 'iphone', 'mobile'])) {
    return 'An Android and iPhone app when a website is not enough. Store listing is optional.'
  }
  if (has(q, ['3d', 'spin'])) {
    return 'A page where the product can be turned in the browser. Useful when photos are not enough.'
  }
  if (has(q, ['cloud', 'host', 'hosting', 'server', 'domain'])) {
    return 'We put the site on a server and set up updates so a new version does not take the old one down.'
  }
  if (has(q, ['portfolio', 'work', 'shipped', 'example', 'live', 'project', 'proof'])) {
    return 'Five are live: H2R Sports, Jagatha Organics, Vasritha, a cake shop, and a mobile-repair page. Scroll to Passport stamps to see them.'
  }
  if (has(q, ['time', 'deadline', 'when', 'date'])) {
    return 'Deliver on time is the promise. We set the date with you, one job at a time. If it must move, you hear early.'
  }
  if (has(q, ['service', 'services', 'build', 'website', 'landing', 'offer'])) {
    return 'Landing pages, websites, billing tools, online shops, mobile apps, automation, 3D pages, cloud servers, and hosting. Not on the list? Ask. We say yes or no.'
  }
  return 'I can help with services, a price, or the studio number. For the real quote, use WhatsApp.'
}

export default function Mascot() {
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const drift = useTransform(scrollYProgress, [0, 1], [0, -28])
  const tilt = useTransform(scrollYProgress, [0, 0.5, 1], [-4, 5, -2])
  const [narrow, setNarrow] = useState(false)
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [thinking, setThinking] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [cursor, setCursor] = useState(START.text.length)
  const [messages, setMessages] = useState([START])
  const threadRef = useRef(null)
  const inputRef = useRef(null)
  const replyTimer = useRef(null)
  const speakTimer = useRef(null)
  const greeted = useRef(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 720px)')
    const sync = () => setNarrow(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    return () => {
      window.clearTimeout(replyTimer.current)
      window.clearInterval(speakTimer.current)
    }
  }, [])

  const speak = (text) => {
    window.clearInterval(speakTimer.current)
    if (reduce) {
      setCursor(text.length)
      setSpeaking(false)
      return
    }
    setSpeaking(true)
    setCursor(0)
    let i = 0
    speakTimer.current = window.setInterval(() => {
      i += 1
      setCursor(i)
      if (i >= text.length) {
        window.clearInterval(speakTimer.current)
        setSpeaking(false)
      }
    }, 28)
  }

  useEffect(() => {
    const node = threadRef.current
    if (node) node.scrollTop = node.scrollHeight
  }, [messages, thinking, speaking, cursor, open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 40)
    if (!greeted.current) {
      greeted.current = true
      setSpeaking(true)
      window.setTimeout(() => setSpeaking(false), reduce ? 0 : 1600)
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusTimer)
    }
  }, [open])

  const parked = reduce || narrow || open

  const ask = (text) => {
    const clean = text.trim()
    if (!clean || thinking || speaking) return
    window.clearInterval(speakTimer.current)
    setSpeaking(false)
    setMessages((prev) => [...prev, { from: 'you', text: clean }])
    setDraft('')
    setThinking(true)
    window.clearTimeout(replyTimer.current)
    replyTimer.current = window.setTimeout(() => {
      const reply = answer(clean)
      setMessages((prev) => [...prev, { from: 'bot', text: reply }])
      setThinking(false)
      speak(reply)
    }, reduce ? 0 : 520)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    ask(draft)
  }

  return (
    <>
      {open && (
        <section className="chat" role="dialog" aria-label="Studio chat">
          <header className="chat__bar">
            <span className={`chat__avatar ${speaking ? 'is-speaking' : ''}`} aria-hidden="true">
              <TalkingFace />
            </span>
            <div>
              <strong>Gypsy</strong>
              <p>
                {speaking ? 'Speaking' : thinking ? 'Thinking' : 'Studio helper'}
                <span className={`chat__eq ${speaking || thinking ? 'is-on' : ''}`} aria-hidden="true">
                  <i /><i /><i /><i />
                </span>
              </p>
            </div>
            <button type="button" className="chat__close" onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </header>

          <div className="chat__thread" ref={threadRef}>
            {messages.map((message, index) => {
              const lastBot = message.from === 'bot' && index === messages.length - 1
              const shown = lastBot ? message.text.slice(0, cursor) : message.text
              return (
                <div key={`${message.from}-${index}`} className={`chat__line chat__line--${message.from}`}>
                  {message.from === 'bot' && (
                    <span className={`chat__avatar chat__avatar--sm ${lastBot && speaking ? 'is-speaking' : ''}`} aria-hidden="true">
                      <TalkingFace />
                    </span>
                  )}
                  <p className={`chat__msg chat__msg--${message.from}`}>
                    {shown}
                    {lastBot && speaking && <span className="chat__caret" aria-hidden="true" />}
                  </p>
                </div>
              )
            })}
            {thinking && (
              <div className="chat__line chat__line--bot">
                <span className="chat__avatar chat__avatar--sm" aria-hidden="true">
                  <TalkingFace />
                </span>
                <p className="chat__msg chat__msg--bot chat__msg--typing" aria-label="Thinking">
                  <span /><span /><span />
                </p>
              </div>
            )}
          </div>

          <div className="chat__quick">
            {QUICK.map((item) => (
              <button key={item.label} type="button" onClick={() => ask(item.text)} disabled={thinking || speaking}>
                {item.label}
              </button>
            ))}
          </div>

          <form className="chat__form" onSubmit={onSubmit}>
            <label className="sr-only" htmlFor="studio-chat">
              Your question
            </label>
            <input
              id="studio-chat"
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about a job"
              maxLength={240}
              autoComplete="off"
            />
            <button type="submit" disabled={!draft.trim() || thinking || speaking}>
              Send
            </button>
          </form>

          <a className="chat__handoff" href={WHATSAPP} target="_blank" rel="noreferrer">
            Continue on WhatsApp
          </a>
        </section>
      )}

      <motion.div
        className={`mascot ${parked ? 'mascot--parked' : ''} ${open ? 'mascot--open' : ''} ${thinking ? 'mascot--typing' : ''} ${speaking ? 'mascot--speaking' : ''}`}
        style={parked ? undefined : { y: drift, rotate: tilt }}
      >
        {!open && (
          <button type="button" className="mascot__bubble" onClick={() => setOpen(true)}>
            Need a price?
          </button>
        )}
        <button
          type="button"
          className="mascot__launcher"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Close studio chat' : 'Open studio chat'}
        >
          <span className="mascot__online" aria-hidden="true" />
          <span className="mascot__waves" aria-hidden="true"><i /><i /><i /></span>
          <div className="mascot__bob">
            <svg viewBox="0 0 160 210" width="148" height="194" aria-hidden="true">
              <ellipse className="mascot__shadow" cx="80" cy="196" rx="36" ry="8" />
              <path className="mascot__cloak" d="M46 118c-8 18-14 42-8 62 18 8 66 8 84 0 6-20 0-44-8-62-16 10-52 10-68 0z" />
              <path className="mascot__cloak-fold" d="M78 124c6 16 8 34 4 52" />
              <g className="mascot__laptop">
                <rect x="48" y="132" width="64" height="40" rx="6" />
                <path d="M44 172h72l6 8H38z" />
                <text x="80" y="156" textAnchor="middle">{'</>'}</text>
              </g>
              <g className="mascot__hands">
                <ellipse cx="62" cy="168" rx="7" ry="5" />
                <ellipse cx="98" cy="168" rx="7" ry="5" />
              </g>
              <g className="mascot__head">
                <circle cx="80" cy="78" r="28" />
                <path className="mascot__beard" d="M58 88c4 18 14 28 22 28s18-10 22-28c-8 8-36 8-44 0z" />
                <g className="mascot__eyes">
                  <ellipse cx="70" cy="78" rx="4" ry="4.5" />
                  <ellipse cx="90" cy="78" rx="4" ry="4.5" />
                  <path className="mascot__lids" d="M64 78h12M84 78h12" />
                </g>
                <path className="mascot__smile" d="M72 90c4 4 12 4 16 0" />
                <ellipse className="mascot__mouth" cx="80" cy="86" rx="7" ry="4.2" />
              </g>
              <g className="mascot__hat">
                <ellipse cx="80" cy="58" rx="46" ry="10" />
                <path d="M58 58c2-28 44-28 46 0" />
                <rect x="62" y="50" width="36" height="6" rx="2" />
                <path className="mascot__feather" d="M108 46c16-18 28-16 24 6-10 2-18 0-24-6z" />
              </g>
            </svg>
          </div>
        </button>
      </motion.div>
    </>
  )
}

function TalkingFace() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="36" r="18" fill="#f3d2b5" />
      <path d="M16 34c2 14 10 20 16 20s14-6 16-20c-6 6-26 6-32 0z" fill="#1c3336" />
      <ellipse cx="25" cy="34" rx="2.2" ry="2.6" fill="#163033" />
      <ellipse cx="39" cy="34" rx="2.2" ry="2.6" fill="#163033" />
      <path className="chat__smile" d="M27 42c2.4 2.4 7.6 2.4 10 0" fill="none" stroke="#c47a62" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse className="chat__mouth" cx="32" cy="42" rx="4.2" ry="2.6" fill="#8d4b3c" />
      <ellipse cx="32" cy="22" rx="22" ry="5" fill="#163033" />
      <path d="M20 22c1-14 23-14 24 0" fill="#163033" />
      <rect x="22" y="18" width="20" height="3.5" rx="1" fill="#d7a24a" />
      <path d="M46 16c8-8 14-7 12 3-5 1-9 0-12-3z" fill="#e7c27a" />
    </svg>
  )
}
