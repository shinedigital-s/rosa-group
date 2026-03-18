import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'
gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { title: 'Road & Earthworks', desc: 'End-to-end road construction with certified processes and cutting-edge machinery.' },
  { title: 'Building Construction', desc: 'Residential, commercial, and institutional builds to the highest quality standards.' },
  { title: 'Planning & Design', desc: 'From concept to blueprint — seamless, coordinated design-build execution.' },
  { title: 'Project Management', desc: 'Rigorous site management, estimating, and procurement from start to hand-over.' },
  { title: 'Turnkey Projects', desc: 'Complete design-build solutions. You receive a finished project with zero gaps.' },
  { title: 'Quality & Safety', desc: 'Zero-harm philosophy, ISO-aligned quality programs, and full environmental stewardship.' },
]

const STATS = [
  { num: '20+', label: 'Years of Experience' },
  { num: '80+', label: 'Projects Completed' },
  { num: '6', label: 'States Served' },
  { num: '100%', label: 'On-Time Delivery' },
]

export default function Home() {
  const rootRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.h-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 })
        .fromTo('.h-word', { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: .09, duration: 1 }, '-=.3')
        .fromTo('.h-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, '-=.5')
        .fromTo('.h-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.4')
        .fromTo('.h-stats', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.3')
        .fromTo('.hero-img', { opacity: 0 }, { opacity: 1, duration: 1.2 }, '<-=1.0')

      // Parallax on hero image
      gsap.to('.hero-img-inner', {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: '.hero', scrub: 2 }
      })

      // Scroll reveals
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 44 },
          {
            opacity: 1, y: 0, duration: .9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        )
      })

      // Stagger reveals
      gsap.utils.toArray('.reveal-stagger').forEach(parent => {
        gsap.fromTo(Array.from(parent.children),
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out',
            scrollTrigger: { trigger: parent, start: 'top 86%' }
          }
        )
      })

      // Stats count-up
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
                onUpdate: function () { el.textContent = Math.round(this.targets()[0].v) + suffix }
              })
            }
          }
        })
      })

    }, rootRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="home" ref={rootRef}>

      {/* ══ HERO ══ */}
      <section className="hero">
        {/* Two-col grid container */}
        <div className="hero-text">

          {/* Left — all text */}
          <div className="hero-left">
            <p className="h-label eyebrow">
              <span className="eyebrow__line" /><span className="eyebrow__text">Mumbai's Trusted Civil Contractors</span>
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

          {/* Right — image card */}
          <div className="hero-img">
            <div className="hero-img-inner">
              <HeroSVG />
            </div>
            <div className="hero-badge">
              <div className="hero-badge__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div>
                <strong>ISO Quality Assured</strong>
                <span>Zero-harm philosophy</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scroll hint */}
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

      {/* ══ INTRO — text left, large image right ══ */}
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
            {SERVICES.map(({ title, desc }, i) => (
              <div className="svc-card" key={title}>
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

/* ── HERO SVG — daytime, light architecture, blue sky ── */
function HeroSVG() {
  return (
    <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b8d4ec" />
          <stop offset="55%" stopColor="#d4e8f6" />
          <stop offset="100%" stopColor="#e8f3fa" />
        </linearGradient>
        <linearGradient id="bface" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0deda" />
          <stop offset="100%" stopColor="#cccac4" />
        </linearGradient>
        <linearGradient id="bside" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b8b6b0" />
          <stop offset="100%" stopColor="#a8a6a0" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#90bcd8" stopOpacity=".8" />
          <stop offset="100%" stopColor="#60a0c4" stopOpacity=".6" />
        </linearGradient>
        <linearGradient id="gside" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#5888b0" stopOpacity=".55" />
          <stop offset="100%" stopColor="#4878a0" stopOpacity=".4" />
        </linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4c0b8" />
          <stop offset="100%" stopColor="#b0aca4" />
        </linearGradient>
        <filter id="bshadow">
          <feDropShadow dx="6" dy="10" stdDeviation="14" floodColor="#0a1020" floodOpacity=".22" />
        </filter>
        <filter id="ashadow">
          <feDropShadow dx="4" dy="8" stdDeviation="10" floodColor="#0a1020" floodOpacity=".16" />
        </filter>
      </defs>

      {/* Sky */}
      <rect width="800" height="640" fill="url(#sky)" />

      {/* Background city haze */}
      <rect x="0" y="320" width="800" height="60" fill="#d8eaf6" opacity=".35" />

      {/* Far bg buildings */}
      <rect x="10" y="300" width="50" height="200" fill="#c8ccd4" opacity=".45" />
      <rect x="55" y="330" width="40" height="170" fill="#c0c4cc" opacity=".38" />
      <rect x="700" y="290" width="55" height="220" fill="#c8ccd4" opacity=".45" />
      <rect x="745" y="320" width="55" height="190" fill="#c0c4cc" opacity=".38" />

      {/* ── MAIN TOWER ── */}
      <rect x="150" y="40" width="280" height="480" fill="url(#bface)" filter="url(#bshadow)" />
      <polygon points="430,40 500,68 500,510 430,520" fill="url(#bside)" />
      <polygon points="144,38 430,38 500,66 214,66" fill="#b4b2ac" />
      <rect x="144" y="28" width="288" height="14" fill="#282624" />
      <polygon points="430,28 500,54 500,68 430,42" fill="#201e1c" />

      {/* Curtain wall verticals */}
      {[0, 1, 2, 3, 4, 5, 6].map(c => (
        <line key={"cv" + c} x1={190 + c * 38} y1="40" x2={190 + c * 38} y2="520"
          stroke="#1a1816" strokeWidth="2" opacity=".16" />
      ))}
      {/* Spandrel bands */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
        <rect key={"sr" + r} x="150" y={78 + r * 40} width="280" height="6"
          fill="#1a1816" opacity=".14" />
      ))}
      {/* Glass panels */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r =>
        [0, 1, 2, 3, 4, 5].map(c => (
          <rect key={"gp" + r + c}
            x={154 + c * 38} y={84 + r * 40}
            width="32" height="30"
            fill="url(#glass)"
            opacity={r === 3 && c === 2 || r === 6 && c === 4 ? 1 : .72} />
        ))
      )}

      {/* Side face glazing */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r =>
        [0, 1].map(c => (
          <rect key={"sg" + r + c}
            x={436 + c * 30} y={76 + r * 40}
            width="24" height="30"
            fill="url(#gside)" opacity=".7" />
        ))
      )}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(r => (
        <line key={"sl" + r}
          x1="430" y1={74 + r * 40} x2="500" y2={74 + r * 40 + 9}
          stroke="#1a1816" strokeWidth="1.5" opacity=".1" />
      ))}

      {/* Lobby */}
      <rect x="220" y="446" width="130" height="54" fill="#80b8d8" opacity=".7" />
      <line x1="285" y1="446" x2="285" y2="500" stroke="#58a0c8" strokeWidth="2" opacity=".55" />
      <line x1="252" y1="446" x2="252" y2="500" stroke="#58a0c8" strokeWidth="1" opacity=".38" />
      <line x1="318" y1="446" x2="318" y2="500" stroke="#58a0c8" strokeWidth="1" opacity=".38" />
      <rect x="200" y="442" width="170" height="7" fill="#282624" />
      {/* Lobby doors */}
      <rect x="242" y="470" width="36" height="30" fill="#68a8c8" opacity=".82" />
      <rect x="282" y="470" width="36" height="30" fill="#68a8c8" opacity=".82" />

      {/* Podium */}
      <rect x="110" y="498" width="360" height="40" fill="#c0beb8" />
      <polygon points="470,498 538,522 538,548 470,538" fill="#aaa89f" />
      <rect x="110" y="494" width="360" height="6" fill="#282624" />
      <polygon points="470,494 538,518 538,524 470,500" fill="#201e1c" />

      {/* ── ANNEX BUILDING ── */}
      <rect x="538" y="220" width="160" height="300" fill="#d4d2ce" filter="url(#ashadow)" />
      <polygon points="698,220 758,244 758,514 698,520" fill="#bcbab4" />
      <polygon points="532,218 698,218 758,242 592,242" fill="#b4b2ac" />
      <rect x="532" y="210" width="168" height="11" fill="#282624" />
      {[0, 1, 2, 3, 4, 5].map(r =>
        [0, 1, 2].map(c => (
          <rect key={"ap" + r + c}
            x={546 + c * 46} y={230 + r * 46}
            width="38" height="36"
            fill="url(#glass)" opacity=".62" />
        ))
      )}
      {[0, 1, 2, 3, 4, 5].map(r => (
        <rect key={"ab" + r} x="538" y={226 + r * 46} width="160" height="5"
          fill="#1a1816" opacity=".1" />
      ))}
      <rect x="524" y="498" width="180" height="24" fill="#b8b6b0" />
      <polygon points="704,498 764,520 764,540 704,522" fill="#aaa8a0" />

      {/* ── GROUND ── */}
      <rect x="0" y="538" width="800" height="102" fill="url(#ground)" />
      <rect x="0" y="570" width="800" height="50" fill="#888880" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
        <rect key={"rm" + i} x={i * 95 + 10} y="590" width="56" height="5" rx="2"
          fill="white" opacity=".28" />
      ))}
      <rect x="0" y="568" width="800" height="4" fill="#646058" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => (
        <line key={"pw" + i}
          x1={i * 58} y1="540" x2={i * 58} y2="570"
          stroke="#b0ada4" strokeWidth="1" opacity=".35" />
      ))}

      {/* Trees */}
      <rect x="90" y="508" width="7" height="42" fill="#504840" />
      <ellipse cx="93" cy="494" rx="26" ry="36" fill="#6a8858" opacity=".72" />
      <ellipse cx="93" cy="482" rx="18" ry="24" fill="#789868" opacity=".62" />
      <rect x="630" y="512" width="6" height="38" fill="#504840" />
      <ellipse cx="633" cy="499" rx="22" ry="32" fill="#6a8858" opacity=".68" />
      <ellipse cx="633" cy="488" rx="15" ry="22" fill="#789868" opacity=".58" />

      {/* Clouds */}
      <ellipse cx="100" cy="80" rx="75" ry="18" fill="white" opacity=".5" />
      <ellipse cx="145" cy="70" rx="50" ry="14" fill="white" opacity=".42" />
      <ellipse cx="590" cy="100" rx="65" ry="16" fill="white" opacity=".38" />
      <ellipse cx="635" cy="90" rx="42" ry="12" fill="white" opacity=".32" />
      <ellipse cx="370" cy="45" rx="90" ry="18" fill="white" opacity=".3" />
    </svg>
  )
}


/* ── INTRO SVG — daytime construction site / building exterior ── */
function IntroSVG() {
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="isky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c4ddf0" />
          <stop offset="100%" stopColor="#e8f2f8" />
        </linearGradient>
        <linearGradient id="ibldg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#efefed" />
          <stop offset="100%" stopColor="#dcdcd8" />
        </linearGradient>
        <linearGradient id="iglass2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9cc4dc" stopOpacity=".65" />
          <stop offset="100%" stopColor="#6aaac8" stopOpacity=".45" />
        </linearGradient>
      </defs>
      {/* Sky */}
      <rect width="500" height="400" fill="url(#isky)" />
      {/* Cloud */}
      <ellipse cx="380" cy="60" rx="70" ry="20" fill="white" opacity=".65" />
      <ellipse cx="420" cy="50" rx="45" ry="16" fill="white" opacity=".55" />
      {/* Ground */}
      <rect x="0" y="330" width="500" height="70" fill="#d4d0c8" />
      {/* Main building */}
      <rect x="60" y="120" width="220" height="240" fill="url(#ibldg)" />
      {/* Floor bands */}
      {[120, 165, 210, 255, 300, 345].map((y, i) => (
        <rect key={i} x="60" y={y} width="220" height="5" fill="#1a1a1a" opacity=".1" />
      ))}
      {/* Glass panels */}
      {[0, 1, 2, 3].map(row => [0, 1, 2, 3].map(col => (
        <rect key={`i${row}${col}`}
          x={70 + col * 50} y={128 + row * 45}
          width="42" height="36" rx="1"
          fill="url(#iglass2)" />
      )))}
      {/* Dark left strip */}
      <rect x="60" y="120" width="10" height="240" fill="#1a1a1a" opacity=".15" />
      {/* Roof */}
      <rect x="52" y="110" width="236" height="14" fill="#2a2a2a" opacity=".2" />
      {/* Side building */}
      <rect x="300" y="200" width="140" height="160" fill="#e4e4e0" />
      {[0, 1, 2].map(row => [0, 1, 2].map(col => (
        <rect key={`j${row}${col}`}
          x={310 + col * 42} y={210 + row * 48}
          width="36" height="38" rx="1"
          fill="url(#iglass2)" opacity=".7" />
      )))}
      <rect x="300" y="192" width="140" height="10" fill="#2a2a2a" opacity=".18" />
      {/* Trees */}
      <ellipse cx="30" cy="300" rx="24" ry="60" fill="#7a9a68" opacity=".4" />
      <ellipse cx="468" cy="290" rx="20" ry="50" fill="#7a9a68" opacity=".35" />
      {/* Label */}
      <rect x="0" y="360" width="500" height="40" fill="rgba(0,0,0,.2)" />
      <text x="250" y="383" textAnchor="middle" fill="rgba(255,255,255,.5)"
        fontSize="9" fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="3">
        ROSA INFRA · CIVIL CONTRACTORS
      </text>
    </svg>
  )
}