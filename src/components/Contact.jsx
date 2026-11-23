import { useState } from 'react'
import {
  MdEmail, MdPhone, MdLocationOn, MdSend, MdCheck, MdErrorOutline, MdAccessTime,
} from 'react-icons/md'
import { FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'
import {
  COMPANY, SERVICES, BUDGETS_USD, COUNTRIES,
} from '../data/siteContent'
import './Contact.css'

const FORM_ENDPOINT = `https://formsubmit.co/ajax/${COMPANY.email}`
const serviceNames = SERVICES.map((s) => s.name).concat('Other')
const empty = {
  name: '', email: '', phone: '', country: '', service: '', budget: '', message: '', company: '',
}

function buildMailBody(form) {
  return [
    'New project inquiry from gypsycoders.in',
    '',
    '── Customer ──────────────────────────',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Mobile: ${form.phone}`,
    `Country: ${form.country}`,
    '',
    '── Project ───────────────────────────',
    `Service: ${form.service}`,
    `Budget: ${form.budget || 'Not specified'}`,
    '',
    '── Details ───────────────────────────',
    form.message.trim(),
    '',
    '── Next step ─────────────────────────',
    'Reply to this email or WhatsApp the mobile number above.',
    `Studio WhatsApp: ${COMPANY.phone}`,
  ].join('\n')
}

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    if (status !== 'idle') setStatus('idle')
    if (error) setError('')
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (form.company) return

    setStatus('sending')
    setError('')

    const subject = `Gypsy Coder · ${form.service} · ${form.name} · ${form.country}`
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      country: form.country,
      service: form.service,
      budget: form.budget || 'Not specified',
      message: buildMailBody(form),
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      _replyto: form.email,
    }

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.message || 'Could not send right now. Try WhatsApp or email.')
      }
      setStatus('sent')
      setForm(empty)
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Could not send right now. Try WhatsApp or email.')
    }
  }

  const sending = status === 'sending'

  return (
    <section id="contact" className="slide slide--top contact">
      <div className="container">
        <Reveal className="center contact__intro">
          <p className="kicker">Contact</p>
          <h2 className="section-title">Get a free quote within 24 hours</h2>
          <p className="section-desc">
            Tell us what you need. We reply on business days with a clear price and delivery date.
            Working hours: {COMPANY.hours}.
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__info glass-card">
            <h3>Talk to us</h3>
            <p>{COMPANY.replyPromise} Prefer a quick call? Book 15 minutes on WhatsApp.</p>

            <div className="contact__items">
              <a href={`mailto:${COMPANY.email}`} className="contact__item">
                <span><MdEmail size={20} /></span>
                <span><small>Email</small>{COMPANY.email}</span>
              </a>
              <a href={`tel:${COMPANY.phoneTel}`} className="contact__item">
                <span><MdPhone size={20} /></span>
                <span><small>Phone / WhatsApp</small>{COMPANY.phone}</span>
              </a>
              <div className="contact__item">
                <span><MdLocationOn size={20} /></span>
                <span><small>Studio</small>{COMPANY.city}, {COMPANY.country} · clients worldwide</span>
              </div>
              <div className="contact__item">
                <span><MdAccessTime size={20} /></span>
                <span><small>Working hours</small>{COMPANY.hours}</span>
              </div>
            </div>

            <div className="contact__socials">
              <a href={COMPANY.whatsapp} target="_blank" rel="noreferrer" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <FaWhatsapp size={18} /> WhatsApp us
              </a>
              <a href={COMPANY.bookCall} target="_blank" rel="noreferrer" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                Book a 15-minute call
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="contact__form glass-card" onSubmit={handleSubmit}>
              <input
                className="contact__honey"
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="contact__row">
                <label>
                  Your name
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" disabled={sending} />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@company.com" disabled={sending} />
                </label>
              </div>

              <div className="contact__row">
                <label>
                  Mobile number
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} required placeholder="+1 555 000 0000" disabled={sending} />
                </label>
                <label>
                  Country
                  <select name="country" value={form.country} onChange={handleChange} required disabled={sending}>
                    <option value="">Select country</option>
                    {COUNTRIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </label>
              </div>

              <div className="contact__row">
                <label>
                  Service needed
                  <select name="service" value={form.service} onChange={handleChange} required disabled={sending}>
                    <option value="">Select a service</option>
                    {serviceNames.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </label>
                <label>
                  Budget range (USD)
                  <select name="budget" value={form.budget} onChange={handleChange} disabled={sending}>
                    <option value="">Select a range</option>
                    {BUDGETS_USD.map((b) => <option key={b}>{b}</option>)}
                  </select>
                </label>
              </div>

              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="What should we build, who is it for, and when do you need it?"
                  disabled={sending}
                />
              </label>

              {status === 'sent' && (
                <p className="contact__note contact__note--ok" role="status">
                  <MdCheck size={18} /> Message sent. We’ll reply within 24 hours on business days.
                </p>
              )}
              {status === 'error' && (
                <p className="contact__note contact__note--err" role="alert">
                  <MdErrorOutline size={18} /> {error}
                </p>
              )}

              <button type="submit" className="btn-primary" disabled={sending || status === 'sent'}>
                {sending && <>Sending…</>}
                {status === 'sent' && <><MdCheck size={18} /> Message sent</>}
                {status !== 'sending' && status !== 'sent' && <><MdSend size={18} /> Send message</>}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
