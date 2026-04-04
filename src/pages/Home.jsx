import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'
import svcImg1 from '../assets/2.png'
import svcImg2 from '../assets/6.png'
import svcImg3 from '../assets/4.png'
import svcImg4 from '../assets/3.png'
import svcImg5 from '../assets/5.png'
import svcImg6 from '../assets/7.png'
import bannerImg from '../assets/homepage banner.jpeg'
import introImg from '../assets/Untitled design.png'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    title: 'Road & Earthworks',
    accent: '#C8A84B',
    desc: 'From national highways to rural access roads — precision grading, sub-base preparation, and durable surfacing across challenging terrain.',
    photo: svcImg1,
  },
  {
    num: '02',
    title: 'Building Construction',
    accent: '#1E2D4E',
    desc: 'Residential towers, commercial complexes, institutional campuses — reinforced concrete structures built for decades of service.',
    photo: svcImg2,
  },
  {
    num: '03',
    title: 'Planning & Design',
    accent: '#C8A84B',
    desc: 'Site feasibility, structural drawings, BOQ preparation, and liaisoning with statutory bodies — handled end-to-end.',
    photo: svcImg3,
  },
  {
    num: '04',
    title: 'Project Management',
    accent: '#1E2D4E',
    desc: 'Dedicated project managers, real-time progress tracking, and rigorous cost control to keep every milestone on target.',
    photo: svcImg4,
  },
  {
    num: '05',
    title: 'Turnkey Projects',
    accent: '#C8A84B',
    desc: 'Single-point accountability from concept to handover. We manage design, procurement, construction and commissioning.',
    photo: svcImg5,
  },
  {
    num: '06',
    title: 'Quality & Safety',
    accent: '#1E2D4E',
    desc: 'ISO-certified processes, zero-harm philosophy, and third-party audits ensure every structure meets the highest standards.',
    photo: svcImg6,
  },
]

const STATS = [
  { num: '20+', label: 'Years of Experience' },
  { num: '80+', label: 'Projects Completed' },
  { num: '6', label: 'States Served' },
  { num: '100%', label: 'On-Time Delivery' },
]

/* ─────────────────────────────────────────
   Main Home component
───────────────────────────────────────── */
export default function Home() {
  const rootRef = useRef(null)
  const svcRef = useRef(null)
  const cardRefs = useRef([])
  const [activeService, setActiveService] = useState(0)
  const navigate = useNavigate()

  /* ── Services scroll: native scroll observer ── */
  useEffect(() => {
    if (!svcRef.current) return
    const observers = []
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveService(i)
        },
        { root: null, rootMargin: '-30% 0px -30% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  /* ── GSAP hero + generic reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.h-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 })
        .fromTo('.h-word', { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: .09, duration: 1 }, '-=.3')
        .fromTo('.h-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, '-=.5')
        .fromTo('.h-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.4')
        .fromTo('.h-stats', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.3')

      // Generic reveals
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 44 }, {
          opacity: 1, y: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        })
      })

      gsap.utils.toArray('.stat__num').forEach(el => {
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true, onEnter: () => {
            const raw = el.dataset.val, num = parseFloat(raw), suffix = raw.replace(/[\d.]/g, '')
            if (!isNaN(num)) gsap.fromTo({ v: 0 }, {
              v: num, duration: 1.6, ease: 'power2.out',
              onUpdate: function () { el.textContent = Math.round(this.targets()[0].v) + suffix }
            })
          }
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="home" ref={rootRef}>

      {/* ══ HERO — photo banner with text overlay ══ */}
      <section className="hero">
        <div className="hero-banner">
          <img
            src={bannerImg}
            alt="ROSA Infra — Civil Contractors"
            className="hero-banner__img"
          />
          <div className="hero-banner__overlay" />
        </div>
        <div className="hero-content">
          <p className="h-label eyebrow">
            <span className="eyebrow__line" />
            <span className="eyebrow__text">Mumbai's Trusted Civil Contractors</span>
          </p>
          <h1 className="hero-headline">
            <span className="h-line"><span className="h-word">We</span> <span className="h-word hero-em">Build</span></span>
            <span className="h-line"><span className="h-word">India's</span></span>
            <span className="h-line"><span className="h-word hero-strong">Future.</span></span>
          </h1>
          <p className="h-sub">For over 20 years, ROSA Infra has delivered roads, buildings and infrastructure that last for generations — on time, on budget.</p>
          <div className="h-actions">
            <button className="btn btn--light" onClick={() => navigate('/contact')}>Start a Project</button>
            <button className="btn btn--ghost-light" onClick={() => navigate('/projects')}>View Our Work</button>
          </div>
          <div className="h-stats">
            {STATS.map(({ num, label }) => (
              <div className="h-stat" key={label}>
                <span className="h-stat-num">{num}</span>
                <span className="h-stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-scroll"><div className="hero-scroll__line" /><span>Scroll</span></div>
      </section>

      {/* ══ TICKER ══ */}
      <div className="ticker">
        <div className="ticker__track">
          {[...Array(2)].flatMap(() =>
            ['Road Construction', 'Building Construction', 'Project Management',
              'Planning & Design', 'Turnkey Projects', 'Procurement',
              'Quality Monitoring', 'Site Management', 'Civil Contracting'].map((t, i) => (
                <span className="ticker__item" key={t + i}><span className="ticker__dot" />{t}</span>
              ))
          )}
        </div>
      </div>

      {/* ══ INTRO — static image ══ */}
      <section className="intro">
        <div className="container intro__grid">
          <div className="intro__text">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Who We Are</span></div>
            <h2 className="intro__title reveal">Built with purpose,<br /><em>crafted to last.</em></h2>
            <p className="reveal">ROSA Infra is a multi-disciplinary civil contracting firm founded to address the diverse construction needs of clients throughout India.</p>
            <p className="reveal">Each company consists of highly qualified individuals with unique backgrounds in infrastructure development and practical implementation experience.</p>
            <button className="btn btn--ghost reveal" onClick={() => navigate('/about')}>Our Story →</button>
          </div>
          <div className="intro__img reveal">
            <img
              src={introImg}
              alt="Who We Are — ROSA Infra"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ══ SERVICES — clean scroll with image swap ══ */}
      <section className="svc" ref={svcRef}>
        <div className="container svc__header reveal">
          <div className="eyebrow">
            <span className="eyebrow__line" />
            <span className="eyebrow__text">What We Do</span>
          </div>
          <h2 className="svc__title">
            Full-spectrum <em>construction</em> services
          </h2>
        </div>

        <div className="svc-inner">
          {/* LEFT — sticky image panel */}
          <div className="svc-img-col">
            <div className="svc-img-wrap">
              {SERVICES.map((s, i) => (
                <div
                  key={s.num}
                  className={`svc-img-slide ${i === activeService ? 'is-visible' : ''}`}
                  aria-hidden={i !== activeService}
                >
                  <img
                    src={s.photo}
                    alt={s.title}
                    className="svc-img-photo"
                  />
                </div>
              ))}
              <div className="svc-img-label">
                <span className="svc-img-num">{SERVICES[activeService].num}</span>
                <span className="svc-img-name">{SERVICES[activeService].title}</span>
              </div>
            </div>
          </div>

          {/* RIGHT — scrolling cards */}
          <div className="svc-cards-col">
            {SERVICES.map((s, i) => (
              <div
                key={s.num}
                className={`svc-card ${i === activeService ? 'is-active' : ''}`}
                ref={el => { cardRefs.current[i] = el }}
                style={{ '--card-accent': s.accent }}
              >
                <img
                  src={s.photo}
                  alt={s.title}
                  className="svc-card__img"
                />
                <div className="svc-card__num">{s.num}</div>
                <div className="svc-card__body">
                  <h3 className="svc-card__title">{s.title}</h3>
                  <p className="svc-card__desc">{s.desc}</p>
                  <div className="svc-card__bar" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="stats">
        <div className="container stats__grid">
          {STATS.map(({ num, label }) => (
            <div className="stat" key={label}>
              <span className="stat__num" data-val={num}>{num}</span>
              <span className="stat__label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="cta">
        <div className="container cta__inner reveal">
          <div>
            <h2 className="cta__title">Have a project in mind?</h2>
            <p className="cta__sub">Let's talk about how we can build it together.</p>
          </div>
          <div className="cta__btns">
            <button className="btn btn--light" onClick={() => navigate('/contact')}>Get in Touch</button>
            <a href="tel:+919867616718" className="btn btn--ghost-light">Call Us Now</a>
          </div>
        </div>
      </section>

    </div>
  )
}