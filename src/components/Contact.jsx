import { useState } from 'react'
import { useInView } from 'react-intersection-observer'
import {
  MdEmail, MdPhone, MdLocationOn, MdSend,
  MdWhatsapp, MdCheck
} from 'react-icons/md'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import './Contact.css'

const services = [
  'Landing Page', 'Website Development', 'Billing Software',
  'Shopping Software', 'Mobile App', 'Cloud & DevOps', 'Other'
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    // Mailto fallback - replace with EmailJS/Formspree for real sending
    const subject = `MKode Project Inquiry - ${form.service}`
    const body = `Name: ${form.name}%0AEmail: ${form.email}%0AService: ${form.service}%0ABudget: ${form.budget}%0A%0AMessage:%0A${form.message}`
    window.open(`mailto:mkcode2026@gmail.com?subject=${subject}&body=${body}`)
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', service: '', budget: '', message: '' })
  }

  const contactInfo = [
    { icon: <MdEmail size={20} />, label: 'Email', value: 'mkcode2026@gmail.com', href: 'mailto:mkcode2026@gmail.com' },
    { icon: <MdPhone size={20} />, label: 'Phone / WhatsApp', value: '+91 63831 42368', href: 'tel:+916383142368' },
    { icon: <MdLocationOn size={20} />, label: 'Location', value: 'Chennai, Tamil Nadu, India', href: '#' },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <div ref={ref} className={`contact__header ${inView ? 'visible' : ''}`}>
          <div className="section-tag">📬 Get In Touch</div>
          <h2 className="section-title">
            Start Your <span className="text-gradient">Project</span> Today
          </h2>
          <p className="section-desc">
            Ready to build something amazing? Tell us about your project and get a free quote within 24 hours.
          </p>
        </div>

        <div className="contact__grid">
          {/* Info Panel */}
          <div className={`contact__info ${inView ? 'visible' : ''}`}>
            <div className="contact__info-card glass-card">
              <h3>Let's Talk Business</h3>
              <p>We're always excited to work on new projects. Reach out via any channel and we'll get back to you within 24 hours.</p>

              <div className="contact__info-items">
                {contactInfo.map((c, i) => (
                  <a key={i} href={c.href} className="contact__info-item">
                    <div className="contact__info-icon">{c.icon}</div>
                    <div>
                      <span className="contact__info-label">{c.label}</span>
                      <span className="contact__info-value">{c.value}</span>
                    </div>
                  </a>
                ))}
              </div>

              <div className="contact__socials">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="contact__social"><FaGithub size={20} /></a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact__social"><FaLinkedin size={20} /></a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="contact__social"><FaInstagram size={20} /></a>
                <a href="https://wa.me/916383142368" target="_blank" rel="noreferrer" className="contact__social contact__social--whatsapp"><MdWhatsapp size={22} /></a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`contact__form-wrap ${inView ? 'visible' : ''}`}>
            <form className="contact__form glass-card" onSubmit={handleSubmit}>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="name">Your Name</label>
                  <input
                    id="name" name="name" type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="service">Service Needed</label>
                  <select id="service" name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Select a service...</option>
                    {services.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="contact__field">
                  <label htmlFor="budget">Budget Range</label>
                  <select id="budget" name="budget" value={form.budget} onChange={handleChange}>
                    <option value="">Select budget...</option>
                    <option value="Under ₹10k">Under ₹10,000</option>
                    <option value="₹10k - ₹30k">₹10,000 - ₹30,000</option>
                    <option value="₹30k - ₹75k">₹30,000 - ₹75,000</option>
                    <option value="₹75k - ₹1.5L">₹75,000 - ₹1,50,000</option>
                    <option value="₹1.5L+">₹1,50,000+</option>
                  </select>
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="message">Project Details</label>
                <textarea
                  id="message" name="message" rows={5}
                  placeholder="Tell us about your project, goals, and any specific requirements..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={`btn-primary contact__submit ${submitted ? 'submitted' : ''}`}>
                {submitted ? <><MdCheck size={18} /> Message Sent!</> : <><MdSend size={18} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
