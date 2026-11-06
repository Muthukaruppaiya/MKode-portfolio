import { useState } from 'react'
import {
  MdEmail, MdPhone, MdLocationOn, MdSend, MdWhatsapp, MdCheck,
} from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import Reveal from './Reveal'
import './Contact.css'

const services = [
  'Landing Page', 'Website', 'Billing Software',
  'Online Shop', 'Mobile App', 'Automation', '3D Website', 'Cloud Servers', 'Hosting & Updates', 'Other',
]

const empty = { name: '', email: '', service: '', budget: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(empty)
  const [opened, setOpened] = useState(false)

  const handleChange = (event) => {
    setOpened(false)
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = encodeURIComponent(`Gypsy Coder project inquiry — ${form.service}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget || 'Not specified'}\n\n${form.message}`,
    )
    window.location.href = `mailto:mkcode2026@gmail.com?subject=${subject}&body=${body}`
    setOpened(true)
    setForm(empty)
  }

  const contactInfo = [
    { icon: <MdEmail size={20} />, label: 'Email', value: 'mkcode2026@gmail.com', href: 'mailto:mkcode2026@gmail.com' },
    { icon: <MdPhone size={20} />, label: 'Phone / WhatsApp', value: '+91 63831 42368', href: 'tel:+916383142368' },
    { icon: <MdLocationOn size={20} />, label: 'Home base', value: 'Coimbatore, Tamil Nadu. Working remotely.' },
  ]

  return (
    <section id="contact" className="slide slide--top contact">
      <div className="container">
        <Reveal className="center contact__intro">
          <p className="kicker">Base camp</p>
          <h2 className="section-title">Tell us where you’re <em>going.</em></h2>
          <p className="section-desc">
            The form opens your email, already filled in. You press send.
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
              <a href="https://wa.me/916383142368" target="_blank" rel="noreferrer" aria-label="WhatsApp"><MdWhatsapp size={20} /></a>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form className="contact__form glass-card" onSubmit={handleSubmit}>
              <div className="contact__row">
                <label>
                  Your name
                  <input name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
                </label>
                <label>
                  Email
                  <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@email.com" />
                </label>
              </div>
              <div className="contact__row">
                <label>
                  Service
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service</option>
                    {services.map((service) => <option key={service}>{service}</option>)}
                  </select>
                </label>
                <label>
                  Budget
                  <select name="budget" value={form.budget} onChange={handleChange}>
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
                <textarea name="message" rows={5} value={form.message} onChange={handleChange} required placeholder="What should it do, and when do you need it?" />
              </label>
              <button type="submit" className="btn-primary">
                {opened ? <><MdCheck size={18} /> Email is open</> : <><MdSend size={18} /> Write the email</>}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
