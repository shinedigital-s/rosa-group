import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './About.css'

import approachImg from '../assets/building.jpeg'

gsap.registerPlugin(ScrollTrigger)

/* ── SVG value icons ── */
const HandshakeIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M13 8l4-3 4 3 5 2 3 5-2 4-5 3-5-1-5 1-5-3-2-4 3-5 5-2z" fill="rgba(255,255,255,.2)" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M11 18c2 1.5 4 2 7 2s5-.5 7-2" stroke="rgba(255,255,255,.7)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="14" cy="15" r="1.5" fill="rgba(255,255,255,.8)" />
    <circle cx="22" cy="15" r="1.5" fill="rgba(255,255,255,.8)" />
  </svg>
)

const ChatIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <rect x="5" y="6" width="22" height="16" rx="4" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" />
    <path d="M5 18l-3 5 6-2" fill="rgba(255,255,255,.15)" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeLinejoin="round" />
    <rect x="12" y="18" width="18" height="13" rx="3" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" />
    <circle cx="17" cy="24" r="1.2" fill="rgba(255,255,255,.7)" />
    <circle cx="21" cy="24" r="1.2" fill="rgba(255,255,255,.7)" />
    <circle cx="25" cy="24" r="1.2" fill="rgba(255,255,255,.7)" />
  </svg>
)

const ShieldIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path d="M18 4L30 9v10c0 7-5.5 12-12 14C9.5 31 4 26 4 19V9L18 4z" fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.6)" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M12 18l4 4 8-8" stroke="rgba(255,255,255,.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const StarIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <polygon points="18,4 21.5,13.5 32,13.5 23.5,19.5 26.5,29 18,23 9.5,29 12.5,19.5 4,13.5 14.5,13.5" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
)

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="#C8A84B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const VALUES = [
  { Icon: HandshakeIcon, title: 'Honesty & Integrity', desc: 'Complete transparency in every relationship — with clients, employees, and communities.', accent: '#C4C8CE' },
  { Icon: ChatIcon, title: 'Open Communication', desc: 'Open and transparent dialogue is the foundation of every project we undertake.', accent: '#868D97' },
  { Icon: ShieldIcon, title: 'Safety of People', desc: 'Zero-harm philosophy. Safety and development of every individual is non-negotiable.', accent: '#C4C8CE' },
  { Icon: StarIcon, title: 'Professionalism', desc: 'World-class quality and precision craftsmanship in every aspect of every build.', accent: '#868D97' },
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

const APPROACH_STEPS = [
  { num: '01', title: 'Needs Assessment', desc: 'Deep-dive into client requirements, site constraints, and community impact. We map every stakeholder need before a single line is drawn.', tag: 'Discovery phase' },
  { num: '02', title: 'Planning & Design', desc: 'Concept design through detailed engineering — our in-house team handles everything from master planning to structural calculations and facade systems.', tag: 'Design phase' },
  { num: '03', title: 'Procurement', desc: 'Strategic procurement balancing quality, cost, and schedule. We leverage long-standing supplier relationships across India for the best outcomes.', tag: 'Pre-construction' },
  { num: '04', title: 'Construction', desc: 'Precision on-site execution with certified safety protocols and real-time quality monitoring. Every milestone tracked against the master programme.', tag: 'Build phase' },
  { num: '05', title: 'Project Management', desc: 'End-to-end site management with daily reporting, stakeholder communication, and proactive risk mitigation throughout the entire programme.', tag: 'Ongoing' },
  { num: '06', title: 'Handover & Support', desc: 'Lock-and-key handover with full documentation, as-built drawings, and post-completion support. We stay until you are fully operational.', tag: 'Completion' },
]

/* ─────────────────────────────────────────────
   MissionBento — unchanged from original
───────────────────────────────────────────── */
function MissionBento() {
  const [phase, setPhase] = useState('idle')
  const wallRef = useRef(null)
  const quoteRef = useRef(null)

  const BRICKS = [
    { label: 'Mission', bg: 'rgba(12,23,42,.9)', color: '#fff', size: 'large' },
    { label: 'Community', bg: 'rgba(255,255,255,.08)', color: '#fff', size: 'small' },
    { label: 'Design', bg: 'rgba(134,141,151,.25)', color: '#fff', size: 'small' },
    { label: 'Build', bg: 'rgba(255,255,255,.14)', color: '#fff', size: 'medium' },
    { label: 'India', bg: 'rgba(255,255,255,.05)', color: 'rgba(255,255,255,.5)', size: 'medium' },
    { label: 'Expertise', bg: 'rgba(255,255,255,.12)', color: '#fff', size: 'small' },
    { label: 'Growth', bg: 'rgba(255,255,255,.08)', color: '#fff', size: 'small' },
    { label: 'Construct', bg: 'rgba(43,52,71,.85)', color: '#fff', size: 'large' },
    { label: 'Improve', bg: 'rgba(255,255,255,.08)', color: 'rgba(255,255,255,.7)', size: 'medium' },
    { label: 'Rehabilitate', bg: 'rgba(255,255,255,.14)', color: '#fff', size: 'medium' },
    { label: 'Plan', bg: 'rgba(12,23,42,.8)', color: '#fff', size: 'small' },
    { label: 'Develop', bg: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.6)', size: 'small' },
  ]

  const handleSmash = () => {
    if (phase !== 'idle') return
    setPhase('exploding')
    const bricks = wallRef.current?.querySelectorAll('.brick')
    if (!bricks) return
    bricks.forEach((brick, i) => {
      const angle = (i / bricks.length) * Math.PI * 2 + Math.random() * 0.5
      const dist = 280 + Math.random() * 380
      gsap.to(brick, {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist - 100,
        rotation: (Math.random() - 0.5) * 600,
        opacity: 0,
        scale: 0.2 + Math.random() * 0.5,
        duration: 0.65 + Math.random() * 0.25,
        delay: i * 0.035,
        ease: 'power3.in',
        overwrite: true,
      })
    })
    gsap.delayedCall(
      (bricks.length - 1) * 0.035 * 0.75 + 0.65 * 0.75,
      () => setPhase('revealed')
    )
  }

  useEffect(() => {
    if (phase !== 'revealed' || !quoteRef.current) return
    const words = quoteRef.current.querySelectorAll('.q-word')
    const line = quoteRef.current.querySelector('.q-line')
    gsap.fromTo(line,
      { scaleY: 0, transformOrigin: 'top center' },
      { scaleY: 1, duration: 1, ease: 'power3.out' }
    )
    gsap.fromTo(words,
      { opacity: 0, y: 14, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, stagger: 0.05, ease: 'power2.out', delay: 0.15 }
    )
  }, [phase])

  const QUOTE = 'Our mission is to address the needs of our clients through the employment of our expertise in the development, planning and design, improvement, construction and rehabilitation of the living environment of communities throughout India.'

  return (
    <div
      className={`mission-bento${phase === 'idle' ? ' mission-bento--idle' : ''}`}
      onClick={handleSmash}
    >
      <div
        className="mission-bento__wall"
        ref={wallRef}
        style={{ display: phase === 'revealed' ? 'none' : 'grid' }}
      >
        {BRICKS.map((b, i) => (
          <div
            key={i}
            className={`brick brick--${b.size}`}
            style={{ background: b.bg, color: b.color }}
          >
            {b.label}
          </div>
        ))}
      </div>

      {phase === 'idle' && (
        <div className="mission-bento__hint">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span>Tap to reveal our mission</span>
        </div>
      )}

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

/* ─────────────────────────────────────────────
   ApproachCard — desktop card
───────────────────────────────────────────── */
function ApproachCard({ step, cardRef, isActive }) {
  return (
    <div
      className={`approach-card${isActive ? ' approach-card--active' : ''}`}
      ref={cardRef}
    >
      <div className="approach-card__inner">
        <div className="approach-card__num-wrap">
          <span className="approach-card__num">{step.num}</span>
          <span className="approach-card__tag">{step.tag}</span>
        </div>
        <h3 className="approach-card__title">{step.title}</h3>
        <p className="approach-card__desc">{step.desc}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   ApproachStep — mobile roadmap step
───────────────────────────────────────────── */
function ApproachStep({ step, nodeRef, isActive, isDone }) {
  const lit = isActive || isDone
  return (
    <div
      className={`approach-step-row${isActive ? ' approach-step-row--active' : ''}`}
      ref={nodeRef}
    >
      <div className={`approach-node${isActive ? ' approach-node--active' : isDone ? ' approach-node--done' : ''}`}>
        {isDone ? <CheckIcon /> : <span>{step.num}</span>}
      </div>
      <div className="approach-step-content">
        <p className={`approach-step-micro${lit ? ' approach-step-micro--lit' : ''}`}>Step {step.num}</p>
        <h3 className={`approach-step-title${lit ? ' approach-step-title--lit' : ''}`}>{step.title}</h3>
        <p className={`approach-step-desc${lit ? ' approach-step-desc--lit' : ''}`}>{step.desc}</p>
        <span className={`approach-step-tag${lit ? ' approach-step-tag--lit' : ''}`}>{step.tag}</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Main About component
───────────────────────────────────────────── */
export default function About() {
  const ref = useRef(null)

  /* Desktop card refs + active state */
  const cardRefs = useRef([])
  const activeLabelRef = useRef(null)
  const activeTitleRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  /* Mobile roadmap refs */
  const progressFillRef = useRef(null)
  const spineFillRef = useRef(null)
  const stepNodeRefs = useRef([])

  /* ── Desktop: watch each card entering the viewport centre ── */
  useEffect(() => {
    const observers = []

    cardRefs.current.forEach((el, i) => {
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          setActiveStep(i)

          /* Fade the image label out → swap text → fade in */
          if (activeLabelRef.current && activeTitleRef.current) {
            activeLabelRef.current.style.opacity = '0'
            activeTitleRef.current.style.opacity = '0'
            setTimeout(() => {
              if (!activeLabelRef.current || !activeTitleRef.current) return
              activeLabelRef.current.textContent = APPROACH_STEPS[i].num
              activeTitleRef.current.textContent = APPROACH_STEPS[i].title
              activeLabelRef.current.style.opacity = '1'
              activeTitleRef.current.style.opacity = '1'
            }, 160)
          }
        },
        /*
         * rootMargin: '-20% 0px -60% 0px'
         * A card becomes "active" when its top edge crosses 20% from the top
         * of the viewport (i.e. is well inside the screen) AND its bottom edge
         * hasn't yet reached 40% from the bottom.
         * This keeps exactly one card active at a time as the user scrolls.
         */
        { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  /* ── Mobile: watch roadmap nodes ── */
  useEffect(() => {
    const observers = []
    const total = APPROACH_STEPS.length

    stepNodeRefs.current.forEach((el, i) => {
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return

          if (progressFillRef.current) {
            progressFillRef.current.style.height = `${((i + 1) / total) * 100}%`
          }
          if (spineFillRef.current) {
            const pct = i === 0 ? 0 : (i / (total - 1)) * 100
            spineFillRef.current.style.height = `${pct}%`
          }
        },
        { rootMargin: '-30% 0px -40% 0px', threshold: 0 }
      )

      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  /* ── GSAP entrance animations ── */
  useEffect(() => {
    const ctx = gsap.context(() => {

      /* Hero title words clip-reveal */
      gsap.fromTo('.ah-word',
        { yPercent: 110, skewY: 4 },
        { yPercent: 0, skewY: 0, duration: 1.1, stagger: 0.09, ease: 'power4.out', delay: 0.3 }
      )

      /* Hero subtitle fade up */
      gsap.fromTo('.about-hero__sub',
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.9, delay: 1.1, ease: 'power3.out' }
      )

      /* Stat boxes scale in on scroll */
      gsap.fromTo('.stat-box',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.75, stagger: 0.15, ease: 'back.out(1.5)',
          scrollTrigger: { trigger: '.about-company', start: 'top 80%' }
        }
      )

      /* Counters */
      document.querySelectorAll('.counter').forEach(el => {
        const val = parseFloat(el.dataset.val)
        const suffix = el.dataset.suffix || ''
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () =>
            gsap.fromTo(
              { v: 0 },
              {
                v: val,
                duration: 2,
                ease: 'power2.out',
                onUpdate: function () {
                  el.textContent = Math.round(this.targets()[0].v) + suffix
                },
              }
            ),
        })
      })

      /* Generic reveal elements */
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        )
      })

      /* Value cards pop in */
      gsap.fromTo('.value-card',
        { opacity: 0, scale: 0.82, y: 40 },
        {
          opacity: 1, scale: 1, y: 0,
          duration: 0.65, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.values-grid', start: 'top 83%' }
        }
      )

    }, ref)

    return () => ctx.revert()
  }, [])

  return (
    <div className="about" ref={ref}>

      {/* ══ HERO ══ */}
      <section className="about-hero">
        <div className="container about-hero__inner">
          <div className="eyebrow">
            <span className="eyebrow__line" />
            <span className="eyebrow__text">About Us</span>
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
            20 years. Mumbai to Gujarat. <br />
            One group. One standard. <strong>Delivering Expectations.</strong>
          </p>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="about-company">
        <div className="container about-company__grid">
          <div className="about-company__left">
            {[
              { val: '20', suffix: '+', label: 'Years of Excellence' },
              { val: '80', suffix: '+', label: 'Projects Delivered' },
              { val: '6', suffix: '', label: 'States Served' },
            ].map(({ val, suffix, label }) => (
              <div className="stat-box" key={label}>
                <span className="counter stat-box__num" data-val={val} data-suffix={suffix}>
                  {val}{suffix}
                </span>
                <span className="stat-box__label">{label}</span>
                <div className="stat-box__bar" />
              </div>
            ))}
          </div>
          <div className="about-company__right">
            <div className="eyebrow reveal">
              <span className="eyebrow__line" /><span className="eyebrow__text">Our Story</span>
            </div>
            <h2 className="section-title reveal">A multi-disciplinary firm <em>built for India</em></h2>
            <p className="reveal">ROSA Infra is a multi-disciplinary firm founded specifically to address the diverse needs of our clients throughout India.</p>
            <p className="reveal">This unique combination enables us to implement the best available technology in a practical sense.</p>
          </div>
        </div>
      </section>

      {/* ══ MISSION ══ */}
      <section className="about-mission">
        <div className="container">
          <div className="eyebrow about-mission__eyebrow">
            <span className="eyebrow__line" /><span className="eyebrow__text">Our Mission</span>
          </div>
          <MissionBento />
        </div>
      </section>

      {/* ══ PHILOSOPHY ══ */}
      <section className="about-philosophy">
        <div className="container">
          <div className="philosophy-header">
            <div className="eyebrow reveal">
              <span className="eyebrow__line" /><span className="eyebrow__text">Our Philosophy</span>
            </div>
            <h2 className="section-title reveal">Over 20 years of <em>guiding values</em></h2>
          </div>
          <div className="philosophy-list">
            {PHILOSOPHY.map((item, i) => (
              <div className="philosophy-item" key={i}>
                <span className="philosophy-item__num">0{i + 1}</span>
                <p>{item}</p>
                <svg className="philosophy-item__arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ VALUES ══ */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <div className="eyebrow reveal">
              <span className="eyebrow__line" /><span className="eyebrow__text">Values</span>
            </div>
            <h2 className="section-title reveal">The principles that <em>guide us</em></h2>
          </div>
          <div className="values-grid">
            {VALUES.map(({ Icon, title, desc }) => (
              <div className="value-card" key={title}>
                <div className="value-card__icon-wrap"><Icon /></div>
                <h3>{title}</h3>
                <p>{desc}</p>
                <div className="value-card__bottom-line" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APPROACH ══ */}
      {/*
        STICKY SCROLL — how it works:
        ─────────────────────────────
        The outer <section> has NO overflow:hidden.
        .approach-desktop is a flex row with NO overflow:hidden.

        LEFT column (.approach-desktop__sticky):
          - position: sticky; top: 76px
          - height: calc(100vh - 76px)
          - This makes it exactly one viewport tall, pinned just below the navbar.
          - It does NOT scroll — the document scrolls PAST it.

        RIGHT column (.approach-desktop__cards):
          - Normal block flow inside the flex row.
          - Its natural height (6 cards + padding) is taller than the viewport,
            so the document scrolls while the left column stays pinned.
          - padding-bottom: 50vh so the last card can reach the active zone.

        IntersectionObserver on each card fires when the card enters the
        central band of the viewport, updating activeStep and the image label.

        COMMON PITFALLS that break this:
          1. overflow:hidden on any ancestor → kills sticky entirely.
          2. overflow:auto on any ancestor → creates a new scroll container;
             sticky works but only within that container (often invisible).
          3. Lenis / Locomotive Scroll wrapping the page → sticky doesn't work
             on the document scroll; you'd need to observe the wrapper element.
             Fix: pass the Lenis wrapper ref to ScrollTrigger's `scroller` option
             AND set overflow on that wrapper (not body) to 'auto'.
      */}
      <section className="about-approach">

        {/* ── DESKTOP: sticky image + heading left, scrolling cards right ── */}
        <div className="approach-desktop">

          {/* Sticky left column */}
          <div className="approach-desktop__sticky">
            <div className="approach-desktop__eyebrow">
              <div className="eyebrow">
                <span className="eyebrow__line" />
                <span className="eyebrow__text">Approach to Business</span>
              </div>
              <h2 className="section-title">
                From <em>needs assessment</em><br />to hand-over
              </h2>
              <p className="approach-lead">
                ROSA Infra provides a full range of services — from needs assessment and project
                identification through design, procurement, construction, and operation.
              </p>
            </div>

            {/* Image fills remaining height of the sticky column */}
            <div className="approach-desktop__img-wrap">
              <img
                src={approachImg}
                alt="ROSA Infra approach"
                className="approach-desktop__img"
              />
              <div className="approach-desktop__img-overlay" />
              <div className="approach-desktop__img-label">
                <span className="approach-desktop__img-num" ref={activeLabelRef}>01</span>
                <span className="approach-desktop__img-name" ref={activeTitleRef}>Needs Assessment</span>
              </div>
            </div>
          </div>

          {/* Scrolling right column */}
          <div className="approach-desktop__cards">
            {APPROACH_STEPS.map((step, i) => (
              <ApproachCard
                key={step.num}
                step={step}
                cardRef={el => { cardRefs.current[i] = el }}
                isActive={activeStep === i}
              />
            ))}
          </div>
        </div>

        {/* ── MOBILE: vertical roadmap ── */}
        <div className="approach-mobile">
          <div className="eyebrow">
            <span className="eyebrow__line" />
            <span className="eyebrow__text">Approach to Business</span>
          </div>
          <h2 className="section-title">
            From <em>needs assessment</em><br />to hand-over
          </h2>
          <p className="approach-lead">
            ROSA Infra provides a full range of services — from needs assessment and project
            identification through design, procurement, construction, and operation.
          </p>
          <div className="approach-roadmap">
            <div className="approach-spine-track" />
            <div className="approach-spine-fill" ref={spineFillRef} />
            {APPROACH_STEPS.map((step, i) => (
              <ApproachStep
                key={step.num}
                step={step}
                nodeRef={el => { stepNodeRefs.current[i] = el }}
                isActive={activeStep === i}
                isDone={activeStep > i}
              />
            ))}
          </div>
          <div className="approach-progress-track" style={{ display: 'none' }}>
            <div className="approach-progress-fill" ref={progressFillRef} />
          </div>
        </div>

      </section>
    </div>
  )
}