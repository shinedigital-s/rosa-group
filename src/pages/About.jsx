import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'
gsap.registerPlugin(ScrollTrigger)

/* ── SVG value icons ── */
const HandshakeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M13 8l4-3 4 3 5 2 3 5-2 4-5 3-5-1-5 1-5-3-2-4 3-5 5-2z" fill="#1a4a7a" fillOpacity=".14" stroke="#1a4a7a" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11 18c2 1.5 4 2 7 2s5-.5 7-2" stroke="#1a4a7a" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="15" r="1.5" fill="#1a4a7a" />
    <circle cx="22" cy="15" r="1.5" fill="#1a4a7a" />
  </svg>
)
const ChatIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="5" y="6" width="22" height="16" rx="4" fill="#2a5a9a" fillOpacity=".1" stroke="#2a5a9a" strokeWidth="1.5" />
    <path d="M5 18l-3 5 6-2" fill="#2a5a9a" fillOpacity=".2" stroke="#2a5a9a" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="12" y="18" width="18" height="13" rx="3" fill="#1a4a7a" fillOpacity=".15" stroke="#1a4a7a" strokeWidth="1.5" />
    <circle cx="17" cy="24" r="1.2" fill="#1a4a7a" />
    <circle cx="21" cy="24" r="1.2" fill="#1a4a7a" />
    <circle cx="25" cy="24" r="1.2" fill="#1a4a7a" />
  </svg>
)
const ShieldIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 4L30 9v10c0 7-5.5 12-12 14C9.5 31 4 26 4 19V9L18 4z" fill="#1a4a7a" fillOpacity=".1" stroke="#1a4a7a" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 18l4 4 8-8" stroke="#1a4a7a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const StarIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <polygon points="18,4 21.5,13.5 32,13.5 23.5,19.5 26.5,29 18,23 9.5,29 12.5,19.5 4,13.5 14.5,13.5" fill="#2a5a9a" fillOpacity=".15" stroke="#2a5a9a" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

const VALUES = [
  { Icon: HandshakeIcon, title: 'Honesty & Integrity', desc: 'Complete transparency in every relationship — with clients, employees, and communities.', accent: '#1a4a7a' },
  { Icon: ChatIcon, title: 'Open Communication', desc: 'Open and transparent dialogue is the foundation of every project we undertake.', accent: '#2a5a9a' },
  { Icon: ShieldIcon, title: 'Safety of People', desc: 'Zero-harm philosophy. Safety and development of every individual is non-negotiable.', accent: '#1a4a7a' },
  { Icon: StarIcon, title: 'Professionalism', desc: 'World-class quality and precision craftsmanship in every aspect of every build.', accent: '#2a5a9a' },
]

const VISION_ITEMS = [
  'To operate as a multi-disciplinary company in the construction economies of India.',
  'To focus on continuous and sustainable top and bottom line growth.',
  'To create a desirable place of work — a natural home for creativity and enthusiasm, within a safe working environment.',
]

const PHILOSOPHY = [
  'An energetic enthusiasm for what we do',
  'A sensitivity to the needs of our customers',
  'A willingness to accept total responsibility',
  'A craftsman-like pride in knowing what we construct will last for generations',
]

/* ── Mission Bento — smooth phased explosion ── */
function MissionBento() {
  const [phase, setPhase] = useState('idle') // idle | exploding | revealed
  const wallRef = useRef(null)
  const quoteRef = useRef(null)

  const BRICKS = [
    { label: 'Mission', bg: '#0d2a4a', color: '#fff', size: 'large' },
    { label: 'Community', bg: '#1a4a7a', color: '#fff', size: 'small' },
    { label: 'Design', bg: '#555555', color: '#fff', size: 'small' },
    { label: 'Build', bg: '#2a5a9a', color: '#fff', size: 'medium' },
    { label: 'India', bg: '#111111', color: '#fff', size: 'medium' },
    { label: 'Expertise', bg: '#EEEEEE', color: '#111111', size: 'small' },
    { label: 'Growth', bg: '#1e3d6a', color: '#fff', size: 'small' },
    { label: 'Construct', bg: '#555555', color: '#fff', size: 'large' },
    { label: 'Improve', bg: '#EEEEEE', color: '#111111', size: 'medium' },
    { label: 'Rehabilitate', bg: '#2a5a9a', color: '#fff', size: 'medium' },
    { label: 'Plan', bg: '#111111', color: '#fff', size: 'small' },
    { label: 'Develop', bg: '#EEEEEE', color: '#111111', size: 'small' },
  ]

  const handleSmash = () => {
    if (phase !== 'idle') return
    setPhase('exploding')

    const bricks = wallRef.current?.querySelectorAll('.brick')
    if (!bricks) return

    bricks.forEach((brick, i) => {
      // Each brick gets a unique outward direction + spin
      const angle = (i / bricks.length) * Math.PI * 2 + Math.random() * 0.5
      const dist = 280 + Math.random() * 380
      const dx = Math.cos(angle) * dist
      const dy = Math.sin(angle) * dist - 100  // bias upward
      const rot = (Math.random() - 0.5) * 600
      const delay = i * 0.035                      // smooth stagger wave

      gsap.to(brick, {
        x: dx,
        y: dy,
        rotation: rot,
        opacity: 0,
        scale: 0.2 + Math.random() * 0.5,
        duration: 0.65 + Math.random() * 0.25,
        delay,
        ease: 'power3.in',
        overwrite: true,
      })
    })

    // Reveal quote after last brick has flown
    const lastDelay = (bricks.length - 1) * 0.035 + 0.65
    gsap.delayedCall(lastDelay * 0.75, () => setPhase('revealed'))
  }

  // Animate quote word-by-word once revealed
  useEffect(() => {
    if (phase !== 'revealed' || !quoteRef.current) return

    const words = quoteRef.current.querySelectorAll('.q-word')
    const line = quoteRef.current.querySelector('.q-line')

    // Line draws down
    gsap.fromTo(line,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1, ease: 'power3.out' }
    )

    // Words fade + rise + unblur in sequence
    gsap.fromTo(words,
      { opacity: 0, y: 14, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.45,
        stagger: 0.05,
        ease: 'power2.out',
        delay: 0.15,
      }
    )
  }, [phase])

  const QUOTE = 'Our mission is to address the needs of our clients through the employment of our expertise in the development, planning and design, improvement, construction and rehabilitation of the living environment of communities throughout India.'

  return (
    <div
      className={`mission-bento${phase === 'idle' ? ' mission-bento--idle' : ''}`}
      onClick={handleSmash}
    >
      {/* Wall — always rendered so ref works during explosion */}
      <div
        className="mission-bento__wall"
        ref={wallRef}
        style={{ display: phase === 'revealed' ? 'none' : 'grid' }}
      >
        {BRICKS.map((b, i) => (
          <div key={i} className={`brick brick--${b.size}`} style={{ background: b.bg, color: b.color }}>
            {b.label}
          </div>
        ))}
      </div>

      {/* Hint — only while idle */}
      {phase === 'idle' && (
        <div className="mission-bento__hint">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Tap to reveal our mission</span>
        </div>
      )}

      {/* Quote — revealed after explosion */}
      {phase === 'revealed' && (
        <div className="mission-bento__quote" ref={quoteRef}>
          <div className="q-line" />
          <blockquote>
            {QUOTE.split(' ').map((word, i) => (
              <span key={i} className="q-word">{word}&nbsp;</span>
            ))}
          </blockquote>
        </div>
      )}
    </div>
  )
}

export default function About() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ah-word',
        { yPercent: 110, skewY: 4 },
        { yPercent: 0, skewY: 0, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 0.3 }
      )
      gsap.fromTo('.about-hero__sub',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, delay: 1.1, ease: 'power3.out' }
      )
      gsap.fromTo('.stat-box',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.15, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.about-company', start: 'top 80%' }
        }
      )
      document.querySelectorAll('.counter').forEach(el => {
        const val = parseFloat(el.dataset.val)
        const suffix = el.dataset.suffix || ''
        ScrollTrigger.create({
          trigger: el, start: 'top 85%', once: true,
          onEnter: () => gsap.fromTo({ v: 0 }, {
            v: val, duration: 2, ease: 'power2.out',
            onUpdate: function () { el.textContent = Math.round(this.targets()[0].v) + suffix }
          })
        })
      })
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        })
      })
      gsap.fromTo('.philosophy-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.philosophy-list', start: 'top 83%' }
        }
      )
      gsap.fromTo('.vision-item',
        { opacity: 0, x: 40 },
        {
          opacity: 1, x: 0, duration: 0.75, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: '.vision-list', start: 'top 83%' }
        }
      )
      gsap.fromTo('.value-card',
        { opacity: 0, scale: 0.82, y: 40 },
        {
          opacity: 1, scale: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.values-grid', start: 'top 83%' }
        }
      )
      gsap.fromTo('.approach-block',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.65, stagger: 0.08, ease: 'power3.out',
          scrollTrigger: { trigger: '.approach-grid', start: 'top 85%' }
        }
      )
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div className="about" ref={ref}>

      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="container about-hero__inner">
          <div className="eyebrow">
            <span className="eyebrow__line" /><span className="eyebrow__text">About Us</span>
          </div>
          <h1 className="about-hero__title">
            <span className="ah-line"><span className="ah-word">We don't just</span></span>
            <span className="ah-line"><span className="ah-word">build structures.</span></span>
            <span className="ah-line">
              <span className="ah-word">We build&nbsp;</span>
              <span className="ah-word ah-italic">legacies.</span>
            </span>
          </h1>
          <p className="about-hero__sub">
            20 years. Mumbai to Gujarat, Karnataka to Vadodara.
            <br />One group. One standard. <strong>Delivering Expectations.</strong>
          </p>
        </div>
      </section>

      <section className="about-company">
        <div className="container about-company__grid">
          <div className="about-company__left">
            {[
              { val: '20', suffix: '+', label: 'Years of Excellence', accent: '#1a4a7a' },
              { val: '80', suffix: '+', label: 'Projects Delivered', accent: '#2a5a9a' },
              { val: '6', suffix: '', label: 'States Served', accent: '#1e3d6a' },
            ].map(({ val, suffix, label, accent }) => (
              <div className="stat-box" key={label} style={{ '--accent': accent }}>
                <span className="counter stat-box__num" data-val={val} data-suffix={suffix}>{val}{suffix}</span>
                <span className="stat-box__label">{label}</span>
                <div className="stat-box__bar" />
              </div>
            ))}
          </div>
          <div className="about-company__right">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Our Story</span></div>
            <h2 className="section-title reveal">A multi-disciplinary firm <em>built for India</em></h2>
            <p className="reveal">ROSA Infra is a multi-disciplinary firm founded specifically to address the diverse needs of our clients throughout India. Specialised associates have joined forces under one umbrella — The ROSA Group.</p>
            <p className="reveal">Each specialised company consists of highly qualified and experienced individuals with a unique combination of backgrounds in infrastructure development and practical implementation experience in their fields of expertise.</p>
            <p className="reveal">This unique combination enables us to implement the best available technology in a practical sense in a developing environment.</p>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <div className="container">
          <div className="eyebrow about-mission__eyebrow">
            <span className="eyebrow__line" /><span className="eyebrow__text">Our Mission</span>
          </div>
          <MissionBento />
        </div>
      </section>

      <section className="about-philosophy">
        <div className="container">
          <div className="philosophy-header">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Our Philosophy</span></div>
            <h2 className="section-title reveal">Over 20 years of <em>guiding values</em></h2>
            <p className="philosophy-lead reveal">Over the past 20 years, ROSA Infra has emerged as one of the most respected general contracting firms in Mumbai — repeatedly proving our ability to take large, complex projects and complete them on time, on budget, and at the highest levels of quality.</p>
          </div>
          <div className="philosophy-list">
            {PHILOSOPHY.map((item, i) => (
              <div className="philosophy-item" key={i}>
                <span className="philosophy-item__num" style={{ color: ['#1a4a7a', '#2a5a9a', '#1e3d6a', '#1a4a7a'][i] }}>0{i + 1}</span>
                <p>{item}</p>
                <svg className="philosophy-item__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-vision">
        <div className="container about-vision__grid">
          <div className="about-vision__left">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Vision</span></div>
            <h2 className="section-title reveal">Contractor of <em>choice</em><br />across India</h2>
            <p className="reveal">ROSA Infra aims to be the contractor of choice in the construction industry throughout India — through a solid commitment to safe, timely, high quality, innovative and cost-effective construction.</p>
          </div>
          <ul className="vision-list">
            {VISION_ITEMS.map((item, i) => (
              <li className="vision-item" key={i}>
                <span className="vision-item__dot" style={{ background: ['#1a4a7a', '#2a5a9a', '#1e3d6a'][i] }} />
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Values</span></div>
            <h2 className="section-title reveal">The principles that <em>guide us</em></h2>
          </div>
          <div className="values-grid">
            {VALUES.map(({ Icon, title, desc, accent }) => (
              <div className="value-card" key={title} style={{ '--card-accent': accent }}>
                <div className="value-card__icon-wrap"><Icon /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="value-card__bottom-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-approach">
        <div className="container">
          <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Approach to Business</span></div>
          <h2 className="section-title reveal" style={{ marginBottom: '16px' }}>From <em>needs assessment</em> to hand-over</h2>
          <p className="approach-lead reveal">ROSA Infra provides a full range of services — from needs assessment and project identification through design, procurement, construction, project management, maintenance, and operation.</p>
          <div className="approach-grid">
            {[
              ['01', 'Needs Assessment', 'Deep-dive into what the client requires, site constraints, and community impact.', '#1a4a7a'],
              ['02', 'Planning & Design', 'Concept design through detailed engineering — our in-house team handles everything.', '#2a5a9a'],
              ['03', 'Procurement', 'Strategic procurement that balances quality, cost, and schedule.', '#1e3d6a'],
              ['04', 'Construction', 'Precision on-site execution with certified safety and quality monitoring.', '#1a4a7a'],
              ['05', 'Project Management', 'End-to-end site management, reporting, and stakeholder communication.', '#2a5a9a'],
              ['06', 'Handover & Support', 'Lock-and-key handover with post-completion support and capacity building.', '#1e3d6a'],
            ].map(([step, title, desc, col]) => (
              <div className="approach-block" key={step}>
                <span className="approach-block__step" style={{ color: col }}>{step}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}