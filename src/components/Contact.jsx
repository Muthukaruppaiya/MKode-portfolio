import { useState } from 'react'
import {
  MdEmail, MdPhone, MdLocationOn, MdSend, MdCheck, MdErrorOutline,
} from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Reveal from './Reveal'
import './Contact.css'

const TO_EMAIL = 'sivamkaruppaiya15@gmail.com'
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${TO_EMAIL}`

const services = [
  'Landing Page', 'Website', 'Billing Software',
  'Online Shop', 'Mobile App', 'Automation', '3D Website', 'Cloud Servers', 'Hosting & Updates',
  'Digital Marketing', 'Power BI Reports', 'GPS with Software', 'Other',
]

const empty = { name: '', email: '', phone: '', service: '', budget: '', message: '', company: '' }

function buildMailBody(form) {
  return [
    'New project inquiry from gypsycoders.in',
    '',
    '── Customer ──────────────────────────',
    `Name: ${form.name}`,
    `Email: ${form.email}`,
    `Mobile: ${form.phone}`,
    '',
    '── Project ───────────────────────────',
    `Service: ${form.service}`,
    `Budget: ${form.budget || 'Not specified'}`,
    '',
    '── Details ───────────────────────────',
    form.message.trim(),
    '',
    '── Next step ─────────────────────────',
    'Reply to this email or call/WhatsApp the mobile number above.',
    `Studio WhatsApp: +91 63831 42368`,
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

    const subject = `Gypsy Coder · ${form.service} · ${form.name}`
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
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

  const contactInfo = [
    { icon: <MdEmail size={20} />, label: 'Email', value: TO_EMAIL, href: `mailto:${TO_EMAIL}` },
    { icon: <MdPhone size={20} />, label: 'Phone / WhatsApp', value: '+91 63831 42368', href: 'tel:+916383142368' },
    { icon: <MdLocationOn size={20} />, label: 'Home base', value: 'Coimbatore, Tamil Nadu. Working with clients anywhere.' },
  ]

  const sending = status === 'sending'

  return (
    <section id="contact" className="slide slide--top contact">
      <div className="container">
        <Reveal className="center contact__intro">
          <p className="kicker">Base camp</p>
          <h2 className="section-title">Tell us where you’re <em>going.</em></h2>
          <p className="section-desc">
            Share the job and a budget range. Your message lands in our inbox — we reply with a clear price and a delivery date.
          </p>
        </Reveal>

        <div className="contact__grid">
          <Reveal className="contact__info glass-card">
            <h3>Reach us from anywhere</h3>
            <p>Same number for calls and WhatsApp. Whatever your time zone, you get a reply.</p>
            <div className="contact__items">
              {contactInfo.map((item) => (
                item.href ? (
                  <a key={item.label} href={item.href} className="contact__item">
                    <span>{item.icon}</span>
                    <span>
                      <small>{item.label}</small>
                      {item.value}
                    </span>
                  </a>
                ) : (
                  <div key={item.label} className="contact__item">
                    <span>{item.icon}</span>
                    <span>
                      <small>{item.label}</small>
                      {item.value}
                    </span>
                  </div>
                )
              ))}
            </div>
            <div className="contact__socials">
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={18} /></a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin size={18} /></a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram size={18} /></a>
              <a href="https://wa.me/916383142368" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="contact__form glass-card" onSubmit={handleSubmit} noValidate={false}>
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
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" disabled={sending} />
                </label>
              </div>
              <label>
                Mobile number
                <input
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98765 43210"
                  disabled={sending}
                />
              </label>
              <div className="contact__row">
                <label>
                  Service
                  <select name="service" value={form.service} onChange={handleChange} required disabled={sending}>
                    <option value="">Select a service</option>
                    {services.map((service) => <option key={service}>{service}</option>)}
                  </select>
                </label>
                <label>
                  Budget
                  <select name="budget" value={form.budget} onChange={handleChange} disabled={sending}>
                    <option value="">Select a range</option>
                    <option>Under ₹10,000</option>
                    <option>₹10,000 – ₹30,000</option>
                    <option>₹30,000 – ₹75,000</option>
                    <option>₹75,000 – ₹1,50,000</option>
                    <option>₹1,50,000+</option>
                  </select>
                </label>
              </div>
              <label>
                Project details
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  required
                  placeholder="What should it do, who is it for, and when do you need it?"
                  disabled={sending}
                />
              </label>

              {status === 'sent' && (
                <p className="contact__note contact__note--ok" role="status">
                  <MdCheck size={18} /> Message sent. We’ll reply to your email soon.
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
