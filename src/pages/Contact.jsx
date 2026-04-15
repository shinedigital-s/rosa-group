import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Contact.css'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────────────────────────
   GOOGLE SHEETS SETUP:
   1. Create a Google Sheet.
   2. Go to Extensions → Apps Script, paste the web-app script
      (see README instructions in the zip).
   3. Deploy as Web App → Anyone.
   4. Replace SHEET_URL below with your deployed web-app URL.
───────────────────────────────────────────────────────────── */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbz_90qZeu6Kc8JrADph0EgrzWD9fVtMxIq8vIplz-ziCJltOVpm7E9G9_pa_esJXnAdHg/exec'
const CONTACT_INFO = [
  {
    icon: '📍',
    label: 'Registered Office',
    lines: [
      'Balmukund Apartment, Ground Floor,',
      'Lokmanya Tilak Road, Behind B.M.C. School,',
      'Babhai Naka, Borivali (West),',
      'Mumbai – 400 091, Maharashtra, India',
    ],
  },
  {
    icon: '📞',
    label: 'Phone',
    lines: ['(+91) 98 676167 18', '(+91) 98 202920 18'],
    links: ['tel:+919867616718', 'tel:+919820292018'],
  },
  {
    icon: '✉️',
    label: 'Email',
    lines: ['info@therosagroup.in'],
    links: ['mailto:info@therosagroup.in'],
  },
  {
    icon: '🌐',
    label: 'Website',
    lines: ['www.therosagroup.in'],
    links: ['https://www.therosagroup.in'],
  },
]

export default function Contact() {
  const pageRef = useRef(null)
  const [form, setForm] = useState({
    name: '', company: '', phone: '', email: '', service: '', message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  /* Hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero__title .word',
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.3 }
      )
      gsap.fromTo('.contact-hero__sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, delay: 0.85, ease: 'power3.out' })
      gsap.fromTo('.contact-info-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-info-card', start: 'top 88%' }
        }
      )
      gsap.fromTo('.contact-form',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-form', start: 'top 85%' }
        }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, timestamp: new Date().toISOString() }),
      })
      setStatus('success')
      setForm({ name: '', company: '', phone: '', email: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="contact" ref={pageRef}>

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero__bg" />
        <div className="container contact-hero__inner">
          <div className="section-eyebrow">
            <span className="line" />
            <span>Contact Us</span>
          </div>
          <h1 className="contact-hero__title">
            {["Let's", "build", "something"].map((w, i) => (
              <span key={i} className="word">{w} </span>
            ))}
            <br />
            <span className="word word--italic">together.</span>
          </h1>
          <p className="contact-hero__sub">
            Whether you have a new project, a quick question, or want to
            explore a partnership — we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* ── CONTACT BODY ── */}
      <section className="contact-body">
        <div className="container contact-body__grid">

          {/* ── LEFT: Info + Map ── */}
          <div className="contact-left">
            <h2 className="section-title" style={{ marginBottom: '40px' }}>
              Get in <em>touch</em>
            </h2>

            <div className="contact-info-list">
              {CONTACT_INFO.map(({ icon, label, lines, links }) => (
                <div className="contact-info-card" key={label}>
                  <div className="contact-info-card__icon">{icon}</div>
                  <div>
                    <h4>{label}</h4>
                    {lines.map((line, i) => (
                      links?.[i]
                        ? <a key={i} href={links[i]} className="contact-link">{line}</a>
                        : <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div className="contact-map">
              <div className="contact-map__header">
                <span>📍 Borivali (West), Mumbai</span>
                <a
                  href="https://maps.google.com/?q=Balmukund+Apartment+Lokmanya+Tilak+Road+Borivali+West+Mumbai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-map__link"
                >
                  Open in Google Maps →
                </a>
              </div>
              {/* Embedded static map placeholder */}
              <div className="contact-map__embed">
                <MapIllustration />
                <div className="contact-map__pin">
                  <div className="contact-map__pin-dot" />
                  <div className="contact-map__pin-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="contact-right">
            <div className="contact-form-wrap">
              <div className="contact-form-header">
                <h2 className="section-title">Send us a <em>message</em></h2>
                <p>Fill in the form and we'll get back to you within 24 hours.</p>
              </div>

              {status === 'success' ? (
                <div className="form-success">
                  <span className="form-success__icon">✅</span>
                  <h3>Message sent!</h3>
                  <p>Thank you for reaching out. We'll be in touch very soon.</p>
                  <button className="btn-outline" onClick={() => setStatus('idle')}>Send another</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Full Name *</label>
                      <input
                        type="text" name="name" required
                        value={form.name} onChange={handleChange}
                        placeholder="Brian R. Dsouza"
                      />
                    </div>
                    <div className="form-field">
                      <label>Company</label>
                      <input
                        type="text" name="company"
                        value={form.company} onChange={handleChange}
                        placeholder="Your Organisation"
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Phone Number *</label>
                      <input
                        type="tel" name="phone" required
                        value={form.phone} onChange={handleChange}
                        placeholder="+91 98000 00000"
                      />
                    </div>
                    <div className="form-field">
                      <label>Email Address *</label>
                      <input
                        type="email" name="email" required
                        value={form.email} onChange={handleChange}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Service of Interest</label>
                    <select name="service" value={form.service} onChange={handleChange}>
                      <option value="">Select a service…</option>
                      <option>Road & Building Construction</option>
                      <option>Planning & Design</option>
                      <option>Project Management</option>
                      <option>Turnkey (Design-Build)</option>
                      <option>Preconstruction & Estimating</option>
                      <option>Other / General Enquiry</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label>Message *</label>
                    <textarea
                      name="message" required rows={5}
                      value={form.message} onChange={handleChange}
                      placeholder="Tell us about your project — location, scope, timeline…"
                    />
                  </div>
                  {status === 'error' && (
                    <p className="form-error">Something went wrong. Please email us directly at info@therosagroup.in</p>
                  )}
                  <button
                    type="submit"
                    className="btn-primary form-submit"
                    disabled={status === 'sending'}
                  >
                    {status === 'sending' ? 'Sending…' : 'Send Message →'}
                  </button>
                  <p className="form-note">
                    Your information is kept private and will never be shared.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}

function MapIllustration() {
  return (
    <svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <rect width="480" height="260" fill="#f0f0f0" />
      {/* Grid */}
      {[0, 60, 120, 180, 240, 300, 360, 420].map(x => <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />)}
      {[0, 65, 130, 195].map(y => <line key={y} x1="0" y1={y} x2="480" y2={y} stroke="rgba(0,0,0,0.08)" strokeWidth="1" />)}
      {/* Roads */}
      <rect x="0" y="115" width="480" height="14" fill="rgba(255,255,255,0.9)" />
      <rect x="200" y="0" width="14" height="260" fill="rgba(255,255,255,0.9)" />
      <rect x="330" y="0" width="10" height="260" fill="rgba(255,255,255,0.7)" />
      <rect x="0" y="180" width="480" height="10" fill="rgba(255,255,255,0.7)" />
      {/* Blocks */}
      {[[20, 20, 80, 80], [120, 20, 60, 80], [300, 20, 100, 80], [400, 20, 60, 80], [20, 150, 80, 40], [350, 150, 80, 40], [120, 200, 60, 40], [300, 200, 40, 40]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="rgba(0,0,0,0.12)" rx="2" />
      ))}
      {/* Water */}
      <path d="M420 0 L480 0 L480 260 L420 260 Q400 200 420 130 Q440 60 420 0Z" fill="rgba(0,0,0,0.06)" />
      {/* Labels */}
      <text x="450" y="130" textAnchor="middle" fill="rgba(0,0,0,0.3)" fontSize="8" fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="1" transform="rotate(90,450,130)">ARABIAN SEA</text>
      <text x="10" y="112" fill="rgba(0,0,0,0.4)" fontSize="8" fontFamily="Montserrat,sans-serif" fontWeight="600">LOKMANYA TILAK RD</text>
    </svg>
  )
}
