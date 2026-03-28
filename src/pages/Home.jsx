import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { title: 'Road & Earthworks', desc: 'End-to-end road construction with certified processes and cutting-edge machinery.', accent: 'var(--accent-gold)' },
  { title: 'Building Construction', desc: 'Residential, commercial, and institutional builds to the highest quality standards.', accent: 'var(--accent-coral)' },
  { title: 'Planning & Design', desc: 'From concept to blueprint — seamless, coordinated design-build execution.', accent: 'var(--accent-sky)' },
  { title: 'Project Management', desc: 'Rigorous site management, estimating, and procurement from start to hand-over.', accent: 'var(--accent-gold)' },
  { title: 'Turnkey Projects', desc: 'Complete design-build solutions. You receive a finished project with zero gaps.', accent: 'var(--accent-coral)' },
  { title: 'Quality & Safety', desc: 'Zero-harm philosophy, ISO-aligned quality programs, and full environmental stewardship.', accent: 'var(--accent-sky)' },
]

const STATS = [
  { num: '20+', label: 'Years of Experience' },
  { num: '80+', label: 'Projects Completed' },
  { num: '6', label: 'States Served' },
  { num: '100%', label: 'On-Time Delivery' },
]

export default function Home() {
  const rootRef = useRef(null)
  const cardRef = useRef(null)
  const canvasRef = useRef(null)
  const bgLayerRef = useRef(null)
  const midLayerRef = useRef(null)
  const fgLayerRef = useRef(null)
  const sunRef = useRef(null)
  const particlesRef = useRef([])
  const rafRef = useRef(null)
  const navigate = useNavigate()

  /* ── particle canvas loop ── */
  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const ctx = cv.getContext('2d')

    function resize() {
      cv.width = cv.offsetWidth
      cv.height = cv.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function loop() {
      ctx.clearRect(0, 0, cv.width, cv.height)
      particlesRef.current.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        p.vy *= 0.98
        p.life--
        const a = p.life / p.maxLife
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r * a, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,168,75,${a * 0.35})`
        ctx.fill()
      })
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  /* ── hero card: mouse parallax + 3D tilt + particles ── */
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    function onMove(e) {
      const r = card.getBoundingClientRect()
      const mx = e.clientX - r.left
      const my = e.clientY - r.top
      const cx = r.width / 2
      const cy = r.height / 2
      const dx = (mx - cx) / cx   // -1 to 1
      const dy = (my - cy) / cy

      /* 3D tilt on card */
      card.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg) scale(1.01)`

      /* parallax on SVG layers */
      if (bgLayerRef.current) bgLayerRef.current.style.transform = `translate(${dx * -8}px, ${dy * -5}px)`
      if (midLayerRef.current) midLayerRef.current.style.transform = `translate(${dx * -16}px, ${dy * -10}px)`
      if (fgLayerRef.current) fgLayerRef.current.style.transform = `translate(${dx * -26}px, ${dy * -16}px)`
      if (sunRef.current) sunRef.current.style.transform = `translate(${dx * 10}px, ${dy * 7}px)`

      /* gold dust particles */
      if (Math.random() < 0.12) {
        particlesRef.current.push({
          x: mx, y: my,
          vx: (Math.random() - 0.5) * 1.5,
          vy: -Math.random() * 2.5 - 0.5,
          r: Math.random() * 3 + 1,
          life: 50 + Math.random() * 50,
          maxLife: 50 + Math.random() * 50,
        })
      }
    }

    function onLeave() {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)'
      if (bgLayerRef.current) bgLayerRef.current.style.transform = ''
      if (midLayerRef.current) midLayerRef.current.style.transform = ''
      if (fgLayerRef.current) fgLayerRef.current.style.transform = ''
      if (sunRef.current) sunRef.current.style.transform = ''
    }

    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* ── GSAP: hero entrance + scroll reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.h-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 })
        .fromTo('.h-word', { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: .09, duration: 1 }, '-=.3')
        .fromTo('.h-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, '-=.5')
        .fromTo('.h-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.4')
        .fromTo('.h-stats', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.3')
        .fromTo('.hero-img', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1.1 }, '<-=1.0')

      /* subtle float on card */
      gsap.to('.hero-img', {
        y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
      })

      /* parallax scroll on hero image */
      gsap.to('.hero-img-inner', {
        yPercent: 10, ease: 'none',
        scrollTrigger: { trigger: '.hero', scrub: 2 },
      })

      /* scroll reveals */
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 44 },
          {
            opacity: 1, y: 0, duration: .9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        )
      })

      gsap.utils.toArray('.reveal-stagger').forEach(parent => {
        gsap.fromTo(Array.from(parent.children),
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out',
            scrollTrigger: { trigger: parent, start: 'top 86%' }
          }
        )
      })

      /* intro SVG — buildings rise on scroll */
      gsap.utils.toArray('.intro-build').forEach((el, i) => {
        gsap.fromTo(el,
          { scaleY: 0, transformOrigin: 'bottom' },
          {
            scaleY: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: '.intro__img', start: 'top 82%' },
            delay: i * 0.07,
          }
        )
      })

      /* stats count-up */
      gsap.utils.toArray('.stat__num').forEach(el => {
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter: () => {
            const raw = el.dataset.val
            const num = parseFloat(raw)
            const suffix = raw.replace(/[\d.]/g, '')
            if (!isNaN(num)) {
              gsap.fromTo({ v: 0 }, {
                v: num, duration: 1.6, ease: 'power2.out',
                onUpdate: function () {
                  el.textContent = Math.round(this.targets()[0].v) + suffix
                },
              })
            }
          },
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="home" ref={rootRef}>

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-text">

          {/* Left — text */}
          <div className="hero-left">
            <p className="h-label eyebrow">
              <span className="eyebrow__line" />
              <span className="eyebrow__text">Mumbai's Trusted Civil Contractors</span>
            </p>
            <h1 className="hero-headline">
              <span className="h-line"><span className="h-word">We</span> <span className="h-word hero-em">Build</span></span>
              <span className="h-line"><span className="h-word">India's</span></span>
              <span className="h-line"><span className="h-word hero-strong">Future.</span></span>
            </h1>
            <p className="h-sub">
              For over 20 years, ROSA Infra has delivered roads, buildings and
              infrastructure that last for generations — on time, on budget.
            </p>
            <div className="h-actions">
              <button className="btn btn--dark" onClick={() => navigate('/contact')}>Start a Project</button>
              <button className="btn btn--ghost" onClick={() => navigate('/projects')}>View Our Work</button>
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

          {/* Right — interactive card */}
          <div className="hero-img" ref={cardRef}>
            {/* Particle canvas — sits on top of SVG */}
            <canvas
              ref={canvasRef}
              className="hero-canvas"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}
            />
            <div className="hero-img-inner">
              <HeroSVG
                bgRef={bgLayerRef}
                midRef={midLayerRef}
                fgRef={fgLayerRef}
                sunRef={sunRef}
              />
            </div>
            <div className="hero-badge">
              <div className="hero-badge__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div>
                <strong>ISO Quality Assured</strong>
                <span>Zero-harm philosophy</span>
              </div>
            </div>
          </div>

        </div>

        <div className="hero-scroll">
          <div className="hero-scroll__line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ══ TICKER ══ */}
      <div className="ticker">
        <div className="ticker__track">
          {[...Array(2)].flatMap(() =>
            ['Road Construction', 'Building Construction', 'Project Management',
              'Planning & Design', 'Turnkey Projects', 'Procurement',
              'Quality Monitoring', 'Site Management', 'Civil Contracting'].map((t, i) => (
                <span className="ticker__item" key={t + i}>
                  <span className="ticker__dot" />{t}
                </span>
              ))
          )}
        </div>
      </div>

      {/* ══ INTRO ══ */}
      <section className="intro">
        <div className="container intro__grid">
          <div className="intro__text">
            <div className="eyebrow reveal">
              <span className="eyebrow__line" /><span className="eyebrow__text">Who We Are</span>
            </div>
            <h2 className="intro__title reveal">
              Built with purpose,<br /><em>crafted to last.</em>
            </h2>
            <p className="reveal">
              ROSA Infra is a multi-disciplinary civil contracting firm founded to address
              the diverse construction needs of clients throughout India. Specialised
              associates have joined forces under one umbrella — The ROSA Group.
            </p>
            <p className="reveal">
              Each company consists of highly qualified individuals with unique backgrounds
              in infrastructure development and practical implementation experience.
            </p>
            <button className="btn btn--ghost reveal" onClick={() => navigate('/about')}>
              Our Story →
            </button>
          </div>
          <div className="intro__img reveal">
            <IntroSVG />
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="svc">
        <div className="container">
          <div className="svc__header">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">What We Do</span></div>
            <h2 className="svc__title reveal">Full-spectrum <em>construction</em> services</h2>
          </div>
          <div className="svc-grid reveal-stagger">
            {SERVICES.map(({ title, desc, accent }, i) => (
              <div className="svc-card" key={title} style={{ '--card-accent': accent }}>
                <span className="svc-card__num">0{i + 1}</span>
                <h3 className="svc-card__title">{title}</h3>
                <p className="svc-card__desc">{desc}</p>
                <div className="svc-card__line" />
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

/* ══════════════════════════════════════════════════════
   HERO SVG — split into parallax layers via refs
══════════════════════════════════════════════════════ */
function HeroSVG({ bgRef, midRef, fgRef, sunRef }) {
  return (
    <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%" preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7BB8E8" />
          <stop offset="40%" stopColor="#A8D4F0" />
          <stop offset="75%" stopColor="#C8E8F8" />
          <stop offset="100%" stopColor="#E0F2FC" />
        </linearGradient>
        <linearGradient id="bface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAE6E0" />
          <stop offset="50%" stopColor="#D8D4CE" />
          <stop offset="100%" stopColor="#C4C0BA" />
        </linearGradient>
        <linearGradient id="bfaceLeft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9BAAB8" />
          <stop offset="100%" stopColor="#B0BCC8" />
        </linearGradient>
        <linearGradient id="bside" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8496A8" />
          <stop offset="100%" stopColor="#6B82A0" />
        </linearGradient>
        <linearGradient id="bTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A84B" />
          <stop offset="100%" stopColor="#A88C38" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BA3CC" stopOpacity=".85" />
          <stop offset="50%" stopColor="#4A8DB8" stopOpacity=".75" />
          <stop offset="100%" stopColor="#3A78A4" stopOpacity=".65" />
        </linearGradient>
        <linearGradient id="glassSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2C6090" stopOpacity=".7" />
          <stop offset="100%" stopColor="#1E5080" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="glassLit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E8C870" stopOpacity=".9" />
          <stop offset="100%" stopColor="#C8A84B" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B8B4AC" />
          <stop offset="100%" stopColor="#9E9A92" />
        </linearGradient>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6E6A62" />
          <stop offset="100%" stopColor="#5A5650" />
        </linearGradient>
        <linearGradient id="podium" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D0CEC8" />
          <stop offset="100%" stopColor="#B8B6B0" />
        </linearGradient>
        <linearGradient id="aface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8D6D2" />
          <stop offset="100%" stopColor="#C4C2BE" />
        </linearGradient>
        <linearGradient id="aside" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8496A8" />
          <stop offset="100%" stopColor="#6B82A0" />
        </linearGradient>
        <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity=".22" />
          <stop offset="45%" stopColor="white" stopOpacity=".06" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="75%" cy="12%" r="30%">
          <stop offset="0%" stopColor="#FFF4C2" stopOpacity=".6" />
          <stop offset="60%" stopColor="#FFE080" stopOpacity=".15" />
          <stop offset="100%" stopColor="#7BB8E8" stopOpacity="0" />
        </radialGradient>
        <filter id="bshadow" x="-10%" y="-5%" width="130%" height="130%">
          <feDropShadow dx="8" dy="14" stdDeviation="18" floodColor="#0D1E38" floodOpacity=".28" />
        </filter>
        <filter id="ashadow" x="-10%" y="-5%" width="130%" height="130%">
          <feDropShadow dx="5" dy="10" stdDeviation="12" floodColor="#0D1E38" floodOpacity=".2" />
        </filter>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* SKY — always static */}
      <rect width="800" height="640" fill="url(#sky)" />
      <rect width="800" height="640" fill="url(#sunGlow)" />

      {/* ── LAYER 0: Sun — parallax via ref ── */}
      <g ref={sunRef} style={{ transition: 'transform .12s ease-out' }}>
        <circle cx="598" cy="75" r="28" fill="#FFF0A0" opacity=".82" />
        <circle cx="598" cy="75" r="20" fill="#FFED80" opacity=".95" />
        <circle cx="598" cy="75" r="13" fill="#FFE84A" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
          <line key={'ray' + i}
            x1={598 + Math.cos(a * Math.PI / 180) * 22} y1={75 + Math.sin(a * Math.PI / 180) * 22}
            x2={598 + Math.cos(a * Math.PI / 180) * 38} y2={75 + Math.sin(a * Math.PI / 180) * 38}
            stroke="#FFE84A" strokeWidth={i % 3 === 0 ? 2 : 1} opacity=".5" />
        ))}
        {/* Clouds near sun */}
        <ellipse cx="400" cy="48" rx="100" ry="22" fill="white" opacity=".38" />
        <ellipse cx="455" cy="36" rx="60" ry="16" fill="white" opacity=".3" />
      </g>

      {/* ── LAYER 1: Background — slow parallax ── */}
      <g ref={bgRef} style={{ transition: 'transform .1s ease-out' }}>
        {/* Clouds */}
        <ellipse cx="95" cy="72" rx="82" ry="20" fill="white" opacity=".65" />
        <ellipse cx="148" cy="60" rx="52" ry="15" fill="white" opacity=".55" />
        <ellipse cx="60" cy="80" rx="38" ry="12" fill="white" opacity=".4" />
        {/* Haze */}
        <rect x="0" y="295" width="800" height="60" fill="#B8D8F0" opacity=".18" />
        {/* Far silhouettes */}
        <rect x="5" y="285" width="48" height="230" fill="#B0BEC8" opacity=".35" />
        <rect x="48" y="305" width="36" height="210" fill="#A8B8C4" opacity=".28" />
        <rect x="78" y="270" width="30" height="250" fill="#9BAAB8" opacity=".3" />
        <polygon points="5,285 53,285 53,278 29,270" fill="#A0B0BE" opacity=".3" />
        <rect x="705" y="275" width="52" height="245" fill="#B0BEC8" opacity=".32" />
        <rect x="752" y="300" width="48" height="220" fill="#A8B8C4" opacity=".26" />
        <polygon points="705,275 757,275 757,268 731,260" fill="#A0B0BE" opacity=".28" />
        {/* Mid BG tower */}
        <rect x="28" y="220" width="62" height="310" fill="#BCC8D4" opacity=".45" />
        <polygon points="28,220 90,220 90,213 59,206" fill="#B0BCC8" opacity=".4" />
        {[0, 1, 2, 3, 4, 5].map(r => [0, 1].map(c => (
          <rect key={'mb' + r + c} x={34 + c * 28} y={228 + r * 44} width="22" height="34" fill="#6B92B0" opacity=".35" />
        )))}
      </g>

      {/* ── LAYER 2: Mid — medium parallax ── */}
      <g ref={midRef} style={{ transition: 'transform .1s ease-out' }}>
        {/* Annex building */}
        <rect x="540" y="218" width="158" height="304" fill="url(#aface)" filter="url(#ashadow)" />
        <polygon points="540,218 490,242 490,520 540,522" fill="#9BAAB8" />
        <polygon points="698,218 752,238 752,520 698,522" fill="url(#aside)" />
        <polygon points="540,218 698,218 752,238 594,238" fill="#C8A84B" opacity=".55" />
        <rect x="540" y="210" width="158" height="10" fill="#1E2D4E" />
        <polygon points="698,210 752,230 752,238 698,218" fill="#0D1826" />
        <polygon points="540,210 490,234 490,242 540,218" fill="#152238" />
        {[0, 1, 2, 3, 4, 5, 6].map(r => [0, 1, 2].map(c => {
          const lit = (r === 2 && c === 1) || (r === 5 && c === 0)
          return <rect key={'ap' + r + c} x={550 + c * 46} y={228 + r * 42} width="38" height="34"
            fill={lit ? 'url(#glassLit)' : 'url(#glass)'} opacity={lit ? .85 : .68} />
        }))}
        {[0, 1, 2, 3, 4, 5, 6].map(r => (
          <rect key={'ab' + r} x="540" y={226 + r * 42} width="158" height="4" fill="#1E2D4E" opacity=".12" />
        ))}
        <polygon points="540,218 570,218 600,522 540,522" fill="url(#shimmer)" />
        {[0, 1, 2, 3, 4, 5, 6].map(r => (
          <polygon key={'asg' + r}
            points={`698,${230 + r * 42} 752,${242 + r * 42} 752,${270 + r * 42} 698,${258 + r * 42}`}
            fill="url(#glassSide)" opacity=".5" />
        ))}
        {/* Annex podium */}
        <rect x="526" y="520" width="186" height="22" fill="#C0BEB8" />
        <polygon points="712,520 766,540 766,556 712,542" fill="#B0AEA8" />
        <polygon points="526,520 476,542 476,556 526,542" fill="#B8B6B0" />
        <polygon points="526,520 712,520 766,540 580,540" fill="#D4D2CC" opacity=".6" />
        <rect x="526" y="516" width="186" height="5" fill="#C8A84B" opacity=".45" />
      </g>

      {/* ── LAYER 3: Foreground — strongest parallax ── */}
      <g ref={fgRef} style={{ transition: 'transform .1s ease-out' }}>
        {/* MAIN TOWER */}
        <rect x="148" y="38" width="284" height="480" fill="url(#bface)" filter="url(#bshadow)" />
        <polygon points="148,38 88,68 88,524 148,518" fill="url(#bfaceLeft)" />
        <polygon points="432,38 500,62 500,514 432,518" fill="url(#bside)" />
        <rect x="148" y="26" width="284" height="16" fill="#1E2D4E" />
        <polygon points="148,26 88,52 88,68 148,42" fill="#152238" />
        <polygon points="432,26 500,50 500,62 432,42" fill="#0D1826" />
        <polygon points="148,26 432,26 500,50 214,50" fill="url(#bTop)" opacity=".88" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
          <rect key={'par' + i} x={160 + i * 34} y={20} width="18" height="8" fill="#1E2D4E" opacity=".7" />
        ))}
        <rect x="282" y="-12" width="4" height="40" fill="#1E2D4E" />
        <rect x="278" y="-14" width="12" height="4" fill="#C8A84B" />
        <circle cx="284" cy="-14" r="4" fill="#E8584A" opacity=".9" filter="url(#glow)" />
        {/* Curtain wall */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => (
          <line key={'cv' + c} x1={188 + c * 36} y1="38" x2={188 + c * 36} y2="518"
            stroke="#1E2D4E" strokeWidth="2.5" opacity=".18" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => (
          <rect key={'sr' + r} x="148" y={76 + r * 37} width="284" height="5" fill="#1E2D4E" opacity=".15" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => (
          <rect key={'sh' + r} x="148" y={81 + r * 37} width="284" height="2" fill="white" opacity=".12" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => [0, 1, 2, 3, 4, 5, 6].map(c => {
          const lit = (r === 4 && c === 2) || (r === 7 && c === 5) || (r === 2 && c === 4) || (r === 9 && c === 1)
          return <rect key={'gp' + r + c} x={152 + c * 36} y={82 + r * 37} width="30" height="29"
            fill={lit ? 'url(#glassLit)' : 'url(#glass)'} opacity={lit ? 0.9 : .78} />
        }))}
        <polygon points="148,38 200,38 260,518 148,518" fill="url(#shimmer)" />
        {/* Left face 3D glazing */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => (
          <polygon key={'lsp' + r}
            points={`148,${82 + r * 37} 88,${102 + r * 37} 88,${126 + r * 37} 148,${106 + r * 37}`}
            fill="#1E2D4E" opacity=".18" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => [0, 1].map(c => (
          <polygon key={'lgp' + r + c}
            points={`${148},${84 + r * 37} ${120 - c * 32},${104 + r * 37} ${120 - c * 32},${128 + r * 37} ${148},${108 + r * 37}`}
            fill="url(#glassSide)" opacity=".65" />
        )))}
        <polygon points="148,38 88,68 88,160 148,120" fill="white" opacity=".06" />
        {/* Right face glazing */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => (
          <line key={'rsl' + r} x1="432" y1={80 + r * 37} x2="500" y2={92 + r * 37}
            stroke="#1E2D4E" strokeWidth="1.5" opacity=".14" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => [0, 1].map(c => (
          <polygon key={'rgp' + r + c}
            points={`${432 + c * 34},${84 + r * 37} ${432 + c * 34 + 34},${90 + r * 37} ${432 + c * 34 + 34},${114 + r * 37} ${432 + c * 34},${108 + r * 37}`}
            fill="url(#glassSide)" opacity=".55" />
        )))}
        {/* Lobby */}
        <rect x="194" y="440" width="148" height="78" fill="#5BA3CC" opacity=".72" />
        {[0, 1, 2, 3].map(i => (
          <line key={'lm' + i} x1={194 + i * 37} y1="440" x2={194 + i * 37} y2="518"
            stroke="#1E2D4E" strokeWidth="2" opacity=".35" />
        ))}
        <line x1="194" y1="476" x2="342" y2="476" stroke="#1E2D4E" strokeWidth="1.5" opacity=".3" />
        <rect x="228" y="478" width="38" height="40" fill="#78C0E0" opacity=".85" />
        <rect x="270" y="478" width="38" height="40" fill="#78C0E0" opacity=".85" />
        <line x1="252" y1="496" x2="252" y2="504" stroke="#1E2D4E" strokeWidth="2" opacity=".5" />
        <line x1="282" y1="496" x2="282" y2="504" stroke="#1E2D4E" strokeWidth="2" opacity=".5" />
        <rect x="188" y="436" width="160" height="7" fill="#1E2D4E" opacity=".8" />
        <polygon points="148,440 88,462 88,524 148,518" fill="#2C6090" opacity=".5" />
        <polygon points="148,436 88,458 88,462 148,440" fill="#1E2D4E" opacity=".7" />
        <polygon points="342,440 380,450 380,518 342,518" fill="#3D5278" opacity=".45" />
        <polygon points="342,436 380,446 380,450 342,440" fill="#1E2D4E" opacity=".6" />
        <rect x="148" y="430" width="284" height="10" fill="#C8A84B" opacity=".7" />
        <polygon points="432,430 500,452 500,462 432,440" fill="#A88C38" opacity=".65" />
        <polygon points="148,430 88,452 88,458 148,440" fill="#A88C38" opacity=".55" />
        {/* Podium */}
        <rect x="108" y="516" width="364" height="26" fill="url(#podium)" />
        <polygon points="472,516 540,540 540,556 472,542" fill="#A8A6A0" />
        <polygon points="108,516 48,540 48,556 108,542" fill="#B0AEA8" />
        <polygon points="108,516 472,516 540,540 76,540" fill="#D8D6D0" opacity=".7" />
        <rect x="108" y="512" width="364" height="5" fill="#C8A84B" opacity=".6" />
        <polygon points="472,512 540,534 540,540 472,516" fill="#A88C38" opacity=".5" />
        {/* Crane */}
        <rect x="484" y="100" width="8" height="420" fill="#3D5278" opacity=".7" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <line key={'cl' + i} x1="484" y1={100 + i * 42} x2="492" y2={100 + i * 42 + 21}
            stroke="#3D5278" strokeWidth="1" opacity=".5" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
          <line key={'clr' + i} x1="492" y1={100 + i * 42} x2="484" y2={100 + i * 42 + 21}
            stroke="#3D5278" strokeWidth="1" opacity=".5" />
        ))}
        <rect x="388" y="96" width="180" height="7" fill="#3D5278" opacity=".8" />
        <rect x="484" y="96" width="80" height="5" fill="#6B82A0" opacity=".6" />
        <rect x="556" y="88" width="22" height="16" fill="#1E2D4E" opacity=".7" />
        <line x1="430" y1="103" x2="430" y2="160" stroke="#9BAAB8" strokeWidth="1.5" opacity=".6" />
        <line x1="450" y1="103" x2="450" y2="180" stroke="#9BAAB8" strokeWidth="1.5" opacity=".5" />
        <rect x="422" y="160" width="16" height="8" fill="#C8A84B" opacity=".8" />
        <rect x="480" y="108" width="20" height="16" fill="#C8A84B" opacity=".85" />
        <rect x="482" y="110" width="8" height="10" fill="#7BB8E8" opacity=".7" />
        {/* Scaffolding */}
        {[0, 1, 2, 3].map(level => (
          <g key={'sc' + level}>
            <line x1="432" y1={250 + level * 60} x2="480" y2={264 + level * 60}
              stroke="#9BAAB8" strokeWidth="3" opacity=".55" />
            <line x1="436" y1={188} x2="436" y2={490} stroke="#6B82A0" strokeWidth="2" opacity=".4" />
            <line x1="464" y1={192} x2="464" y2={500} stroke="#6B82A0" strokeWidth="2" opacity=".35" />
          </g>
        ))}
        {[0, 1, 2].map(i => (
          <line key={'scb' + i} x1="436" y1={210 + i * 90} x2="464" y2={250 + i * 90}
            stroke="#6B82A0" strokeWidth="1" opacity=".4" />
        ))}
        {/* Ground */}
        <rect x="0" y="536" width="800" height="104" fill="url(#ground)" />
        <rect x="0" y="566" width="800" height="50" fill="url(#road)" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(i => (
          <line key={'pt' + i} x1={i * 62} y1="536" x2={i * 62} y2="566"
            stroke="#A8A4A0" strokeWidth="1" opacity=".3" />
        ))}
        {[0, 1, 2].map(i => (
          <line key={'pth' + i} x1="0" y1={544 + i * 8} x2="800" y2={544 + i * 8}
            stroke="#A8A4A0" strokeWidth=".5" opacity=".2" />
        ))}
        <rect x="0" y="568" width="800" height="3" fill="#7A7670" opacity=".5" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <rect key={'rm' + i} x={i * 92 + 8} y="585" width="60" height="5" rx="2"
            fill="white" opacity=".25" />
        ))}
        <rect x="0" y="564" width="800" height="4" fill="#5A5650" />
        {/* Trees */}
        <rect x="74" y="504" width="8" height="52" fill="#3C3028" />
        <ellipse cx="78" cy="484" rx="32" ry="46" fill="#4A6E38" opacity=".8" />
        <ellipse cx="78" cy="466" rx="22" ry="30" fill="#5A8448" opacity=".72" />
        <ellipse cx="88" cy="472" rx="16" ry="22" fill="#6A9858" opacity=".6" />
        <ellipse cx="82" cy="536" rx="28" ry="6" fill="#2A2A2A" opacity=".12" />
        <rect x="656" y="508" width="7" height="48" fill="#3C3028" />
        <ellipse cx="659" cy="490" rx="28" ry="40" fill="#4A6E38" opacity=".75" />
        <ellipse cx="659" cy="474" rx="19" ry="26" fill="#5A8448" opacity=".68" />
        <ellipse cx="668" cy="478" rx="14" ry="18" fill="#6A9858" opacity=".55" />
        <ellipse cx="662" cy="536" rx="24" ry="5" fill="#2A2A2A" opacity=".1" />
        <ellipse cx="38" cy="532" rx="16" ry="12" fill="#5A8448" opacity=".5" />
        <ellipse cx="745" cy="532" rx="14" ry="10" fill="#5A8448" opacity=".45" />
        {/* Cars */}
        <rect x="120" y="575" width="58" height="18" rx="4" fill="#3D5278" />
        <rect x="128" y="570" width="40" height="14" rx="3" fill="#4A6490" />
        <rect x="130" y="572" width="18" height="10" fill="#7BB8E8" opacity=".7" />
        <rect x="150" y="572" width="14" height="10" fill="#7BB8E8" opacity=".65" />
        <circle cx="130" cy="593" r="5" fill="#1E2D4E" />
        <circle cx="170" cy="593" r="5" fill="#1E2D4E" />
        <circle cx="130" cy="593" r="2.5" fill="#9BAAB8" />
        <circle cx="170" cy="593" r="2.5" fill="#9BAAB8" />
        <rect x="560" y="576" width="52" height="17" rx="4" fill="#E8584A" opacity=".85" />
        <rect x="564" y="571" width="36" height="13" rx="3" fill="#F07060" opacity=".85" />
        <rect x="566" y="573" width="15" height="9" fill="#B8D8F0" opacity=".7" />
        <circle cx="568" cy="593" r="4.5" fill="#1E2D4E" />
        <circle cx="604" cy="593" r="4.5" fill="#1E2D4E" />
        <circle cx="568" cy="593" r="2" fill="#9BAAB8" />
        <circle cx="604" cy="593" r="2" fill="#9BAAB8" />
        {/* People */}
        <ellipse cx="200" cy="560" rx="4" ry="8" fill="#1E2D4E" opacity=".4" />
        <ellipse cx="215" cy="562" rx="3.5" ry="7" fill="#3D5278" opacity=".35" />
        <ellipse cx="580" cy="560" rx="3.5" ry="7" fill="#1E2D4E" opacity=".38" />
        <ellipse cx="593" cy="558" rx="4" ry="8" fill="#3D5278" opacity=".3" />
        {/* Street lamp */}
        <rect x="368" y="500" width="4" height="56" fill="#3D5278" opacity=".6" />
        <path d="M370,500 Q378,490 388,494" stroke="#3D5278" strokeWidth="2.5" fill="none" opacity=".6" />
        <circle cx="389" cy="494" r="5" fill="#FFE84A" opacity=".85" filter="url(#glow)" />
        <ellipse cx="389" cy="498" rx="12" ry="4" fill="#FFE84A" opacity=".15" />
      </g>
    </svg>
  )
}

/* ══════════════════════════════════════════════════════
   INTRO SVG — buildings tagged .intro-build for GSAP
══════════════════════════════════════════════════════ */
function IntroSVG() {
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%"
      style={{ display: 'block' }}>
      <defs>
        <linearGradient id="isky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7BB8E8" />
          <stop offset="55%" stopColor="#A8D4F0" />
          <stop offset="100%" stopColor="#D4ECFA" />
        </linearGradient>
        <linearGradient id="ibldg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EEECEA" />
          <stop offset="100%" stopColor="#D4D2CE" />
        </linearGradient>
        <linearGradient id="ibldgSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9BAAB8" />
          <stop offset="100%" stopColor="#8496A8" />
        </linearGradient>
        <linearGradient id="iglass2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BA3CC" stopOpacity=".75" />
          <stop offset="100%" stopColor="#3A78A4" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="iground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C0BCB4" />
          <stop offset="100%" stopColor="#A8A49C" />
        </linearGradient>
        <linearGradient id="iaccent" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A84B" />
          <stop offset="100%" stopColor="#A88C38" />
        </linearGradient>
        <radialGradient id="isun" cx="80%" cy="15%" r="25%">
          <stop offset="0%" stopColor="#FFF4C2" stopOpacity=".55" />
          <stop offset="100%" stopColor="#7BB8E8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Static sky */}
      <rect width="500" height="400" fill="url(#isky)" />
      <rect width="500" height="400" fill="url(#isun)" />
      <ellipse cx="370" cy="55" rx="75" ry="20" fill="white" opacity=".65" />
      <ellipse cx="415" cy="44" rx="48" ry="15" fill="white" opacity=".55" />
      <ellipse cx="100" cy="70" rx="55" ry="16" fill="white" opacity=".4" />

      {/* Static ground */}
      <rect x="0" y="325" width="500" height="75" fill="url(#iground)" />
      <rect x="0" y="352" width="500" height="30" fill="#808078" opacity=".7" />
      <rect x="0" y="350" width="500" height="4" fill="#5A5650" />
      {[0, 1, 2, 3, 4].map(i => (
        <rect key={i} x={i * 110 + 10} y="360" width="70" height="4" rx="2" fill="white" opacity=".2" />
      ))}

      {/* ── ANIMATED buildings — each gets intro-build class ── */}

      {/* Side building — rises first (behind) */}
      <g className="intro-build">
        <rect x="300" y="198" width="138" height="154" fill="#E0DEDC" />
        <polygon points="300,198 264,216 264,350 300,352" fill="#9BAAB8" opacity=".7" />
        <polygon points="438,198 470,214 470,350 438,352" fill="#8496A8" opacity=".6" />
        <polygon points="300,198 438,198 470,214 332,214" fill="#C8A84B" opacity=".5" />
        <rect x="300" y="190" width="138" height="10" fill="#1E2D4E" />
        {[0, 1, 2].map(row => [0, 1, 2].map(col => (
          <rect key={`j${row}${col}`} x={308 + col * 42} y={206 + row * 46}
            width="36" height="36" rx="1" fill="url(#iglass2)" opacity=".7" />
        )))}
        {[0, 1, 2].map(r => (
          <rect key={'jb' + r} x="300" y={204 + r * 46} width="138" height="3" fill="#1E2D4E" opacity=".1" />
        ))}
      </g>

      {/* Main building — rises second */}
      <g className="intro-build">
        <rect x="56" y="118" width="224" height="234" fill="url(#ibldg)" />
        <polygon points="56,118 12,138 12,346 56,352" fill="url(#ibldgSide)" />
        <polygon points="280,118 318,136 318,350 280,352" fill="#8496A8" opacity=".7" />
        <polygon points="56,118 280,118 318,136 94,136" fill="url(#iaccent)" opacity=".7" />
        <rect x="56" y="108" width="224" height="12" fill="#1E2D4E" />
        <polygon points="280,108 318,126 318,136 280,118" fill="#0D1826" />
        <polygon points="56,108 12,128 12,138 56,118" fill="#152238" />
        {[0, 1, 2, 3, 4, 5].map(r => (
          <rect key={r} x="56" y={118 + r * 38} width="224" height="4" fill="#1E2D4E" opacity=".12" />
        ))}
        {[0, 1, 2, 3, 4].map(row => [0, 1, 2, 3].map(col => {
          const lit = (row === 2 && col === 1) || (row === 4 && col === 3)
          return <rect key={`i${row}${col}`} x={66 + col * 50} y={126 + row * 38}
            width="42" height="30" rx="1"
            fill={lit ? '#C8A84B' : 'url(#iglass2)'} opacity={lit ? .7 : .78} />
        }))}
        {[0, 1, 2, 3, 4].map(r => (
          <polygon key={'lp' + r}
            points={`56,${128 + r * 38} 22,${142 + r * 38} 22,${166 + r * 38} 56,${152 + r * 38}`}
            fill="url(#iglass2)" opacity=".45" />
        ))}
        <rect x="56" y="340" width="224" height="8" fill="url(#iaccent)" opacity=".7" />
        <polygon points="280,340 318,354 318,358 280,348" fill="#A88C38" opacity=".6" />
        <polygon points="56,340 12,354 12,358 56,348" fill="#A88C38" opacity=".5" />
      </g>

      {/* Trees — pop in last */}
      <g className="intro-build">
        <rect x="20" y="296" width="6" height="54" fill="#3C3028" />
        <ellipse cx="23" cy="278" rx="28" ry="40" fill="#4A6E38" opacity=".85" />
        <ellipse cx="23" cy="262" rx="18" ry="26" fill="#5A8448" opacity=".7" />
        <rect x="468" y="300" width="5" height="50" fill="#3C3028" />
        <ellipse cx="470" cy="284" rx="24" ry="36" fill="#4A6E38" opacity=".78" />
        <ellipse cx="470" cy="268" rx="16" ry="22" fill="#5A8448" opacity=".65" />
      </g>

      {/* Label — always visible */}
      <rect x="0" y="364" width="500" height="36" fill="rgba(30,45,78,.75)" />
      <text x="250" y="385" textAnchor="middle" fill="rgba(200,168,75,.7)"
        fontSize="8" fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="4">
        ROSA INFRA · CIVIL CONTRACTORS
      </text>
    </svg>
  )
}