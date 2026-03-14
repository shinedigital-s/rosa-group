import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'
gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { icon: <RoadIcon/>, title: 'Road & Earthworks', desc: 'End-to-end road and earthworks construction with certified processes and cutting-edge machinery.' },
  { icon: <BuildIcon/>, title: 'Building Construction', desc: 'Residential, commercial, and institutional buildings built to the highest quality standards.' },
  { icon: <DesignIcon/>, title: 'Planning & Design', desc: 'From concept to blueprint — our design-build approach ensures seamless, coordinated execution.' },
  { icon: <MgmtIcon/>, title: 'Project Management', desc: 'Rigorous site management, estimating, and procurement from inception to hand-over.' },
  { icon: <TurnkeyIcon/>, title: 'Turnkey Projects', desc: 'Complete design-build solutions. You receive a finished, ready-to-use project with zero gaps.' },
  { icon: <SafetyIcon/>, title: 'Quality & Safety', desc: 'Zero-harm philosophy, ISO-aligned quality programs, and full environmental stewardship.' },
]

const STATS = [
  { num: '20+', label: 'Years of Experience' },
  { num: '80+', label: 'Projects Completed' },
  { num: '6',   label: 'States Served' },
  { num: '100%',label: 'On-Time Delivery' },
]

export default function Home() {
  const heroRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ──
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.hero__eyebrow',  { opacity:0, y:20 },           { opacity:1, y:0, duration:.8 })
        .fromTo('.hero__word',     { opacity:0, y:80, skewY:5 },  { opacity:1, y:0, skewY:0, stagger:.1, duration:1 }, '-=.4')
        .fromTo('.hero__sub',      { opacity:0, y:24 },           { opacity:1, y:0, duration:.9 }, '-=.5')
        .fromTo('.hero__actions',  { opacity:0, y:18 },           { opacity:1, y:0, duration:.7 }, '-=.4')
        .fromTo('.hero__stats-row',{ opacity:0, y:18 },           { opacity:1, y:0, duration:.7 }, '-=.3')
        .fromTo('.hero__img',      { opacity:0, scale:1.06 },     { opacity:1, scale:1, duration:1.4 }, '-=1.4')

      // ── Lenis-powered parallax on hero image ──
      gsap.to('.hero__img-wrap', {
        yPercent: 15, ease: 'none',
        scrollTrigger: { trigger: heroRef.current, scrub: 1.8 }
      })

      // ── Reveal every .reveal element on scroll ──
      gsap.utils.toArray('.reveal').forEach((el, i) => {
        gsap.fromTo(el,
          { opacity:0, y:48 },
          { opacity:1, y:0, duration:.9, ease:'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%' }
          }
        )
      })

      // ── Stagger reveals ──
      gsap.utils.toArray('.reveal-stagger').forEach(parent => {
        gsap.fromTo(parent.children,
          { opacity:0, y:36 },
          { opacity:1, y:0, duration:.75, stagger:.1, ease:'power3.out',
            scrollTrigger: { trigger: parent, start: 'top 85%' }
          }
        )
      })

      // ── Service cards ──
      gsap.fromTo('.svc-card',
        { opacity:0, y:40 },
        { opacity:1, y:0, duration:.7, stagger:.08, ease:'power3.out',
          scrollTrigger: { trigger: '.svc-grid', start: 'top 85%' }
        }
      )

      // ── Stats count-up ──
      gsap.utils.toArray('.stat__num').forEach(el => {
        ScrollTrigger.create({
          trigger: el, start:'top 88%', once:true,
          onEnter: () => {
            const raw = el.dataset.val
            const num = parseFloat(raw)
            const suffix = raw.replace(/[\d.]/g,'')
            if (!isNaN(num)) {
              gsap.fromTo({v:0},{v:num,duration:1.6,ease:'power2.out',
                onUpdate: function(){ el.textContent = Math.round(this.targets()[0].v)+suffix }
              })
            }
          }
        })
      })

      // ── Intro section image slide ──
      gsap.fromTo('.intro__img',
        { opacity:0, x:60 },
        { opacity:1, x:0, duration:1.1, ease:'power3.out',
          scrollTrigger: { trigger: '.intro__img', start:'top 85%' }
        }
      )

    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <div className="home" ref={heroRef}>

      {/* ── HERO (matches reference: text left, full-bleed image right) ── */}
      <section className="hero">
        <div className="hero__col-grid"><div className="col-grid">{Array.from({length:12}).map((_,i)=><div key={i} className="col-grid__line"/>)}</div></div>

        <div className="hero__inner container">
          <div className="hero__left">
            <div className="hero__eyebrow eyebrow">
              <span className="eyebrow__line"/><span className="eyebrow__text">Mumbai's Trusted Civil Contractors</span>
            </div>

            <h1 className="hero__headline display-title">
              <span className="hero__word">We</span>{' '}
              <span className="hero__word hero__word--em">Build</span>
              <br/>
              <span className="hero__word">India's</span>
              <br/>
              <span className="hero__word hero__word--strong">Future.</span>
            </h1>

            <p className="hero__sub">
              For over 20 years, ROSA Infra has delivered roads, buildings and
              infrastructure that last for generations — on time, on budget, and
              always at the highest quality.
            </p>

            <div className="hero__actions">
              <button className="btn btn--red" onClick={() => navigate('/contact')}>Start a Project</button>
              <button className="btn btn--outline" onClick={() => navigate('/projects')}>See Our Work</button>
            </div>

            <div className="hero__stats-row">
              {STATS.map(({ num, label }) => (
                <div className="hero__stat" key={label}>
                  <span className="hero__stat-num">{num}</span>
                  <span className="hero__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero__right">
            <div className="hero__img-wrap">
              <div className="hero__img">
                <ConstructionSVG />
              </div>
            </div>
            {/* Floating card — like reference */}
            <div className="hero__card">
              <CheckSVG />
              <div>
                <strong>ISO Quality Assured</strong>
                <span>Zero-harm philosophy</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__scroll">
          <div className="hero__scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div className="ticker">
        <div className="ticker__track">
          {[...Array(2)].flatMap(() =>
            ['Road Construction','Building Construction','Project Management',
             'Planning & Design','Turnkey Projects','Procurement',
             'Quality Monitoring','Site Management','Civil Contracting'].map((t,i) => (
              <span className="ticker__item" key={t+i}>
                <span className="ticker__dot"/>{t}
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── INTRO (two-col, image right — matches reference layout) ── */}
      <section className="intro">
        <div className="container intro__grid">
          <div className="intro__text">
            <div className="eyebrow reveal">
              <span className="eyebrow__line"/><span className="eyebrow__text">Who We Are</span>
            </div>
            <h2 className="section-title reveal">
              Built with purpose,<br/><em>crafted to last.</em>
            </h2>
            <p className="reveal">
              ROSA Infra is a multi-disciplinary civil contracting firm founded specifically
              to address the diverse needs of our clients throughout India. Specialised
              associates have joined forces under one umbrella — The ROSA Group.
            </p>
            <p className="reveal">
              Each specialised company consists of highly qualified individuals with a unique
              combination of backgrounds in infrastructure development and practical
              implementation experience — enabling us to deploy the best technology in
              a developing environment.
            </p>
            <button className="btn btn--outline reveal" onClick={() => navigate('/about')}>
              Our Story →
            </button>
          </div>
          <div className="intro__img">
            <IntroSVG />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="svc">
        <div className="container">
          <div className="svc__header">
            <div className="eyebrow reveal"><span className="eyebrow__line"/><span className="eyebrow__text">What We Do</span></div>
            <h2 className="section-title reveal">Full-spectrum <em>construction</em> services</h2>
          </div>
          <div className="svc-grid reveal-stagger">
            {SERVICES.map(({ icon, title, desc }) => (
              <div className="svc-card" key={title}>
                <div className="svc-card__icon">{icon}</div>
                <h3 className="svc-card__title">{title}</h3>
                <p className="svc-card__desc">{desc}</p>
                <div className="svc-card__bar" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS — light bg, no colour blocks ── */}
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

      {/* ── CTA ── */}
      <section className="cta">
        <div className="container cta__inner reveal">
          <div>
            <h2 className="section-title" style={{color:'#fff'}}>Have a project in mind?</h2>
            <p style={{color:'rgba(255,255,255,.55)', fontSize:'16px', marginTop:'.8rem'}}>
              Let's talk about how we can build it together.
            </p>
          </div>
          <div className="cta__btns">
            <button className="btn btn--red" onClick={() => navigate('/contact')}>Get in Touch</button>
            <a href="tel:+919867616718" className="btn btn--outline-white">Call Us Now</a>
          </div>
        </div>
      </section>

    </div>
  )
}

// ── SVG Icons ──
function RoadIcon() {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none"><rect x="4" y="14" width="24" height="4" rx="1" fill="#111111"/><rect x="2" y="20" width="28" height="3" rx="1" fill="#333333" opacity=".3"/><rect x="2" y="9" width="28" height="3" rx="1" fill="#333333" opacity=".3"/><rect x="14" y="6" width="4" height="20" rx="1" fill="#111111" opacity=".2"/></svg>
}
function BuildIcon() {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none"><rect x="6" y="10" width="8" height="16" rx="1" fill="#333333" opacity=".7"/><rect x="16" y="14" width="10" height="12" rx="1" fill="#111111" opacity=".7"/><rect x="3" y="26" width="26" height="2" rx="1" fill="#3D3830" opacity=".25"/><rect x="9" y="13" width="2" height="3" rx=".5" fill="white" opacity=".6"/><rect x="9" y="19" width="2" height="3" rx=".5" fill="white" opacity=".6"/></svg>
}
function DesignIcon() {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none"><rect x="5" y="5" width="22" height="22" rx="2" stroke="#111111" strokeWidth="1.5" fill="none"/><line x1="5" y1="11" x2="27" y2="11" stroke="#111111" strokeWidth="1.5"/><line x1="14" y1="5" x2="14" y2="27" stroke="#333333" strokeWidth="1" strokeDasharray="2 2" opacity=".5"/><circle cx="19" cy="19" r="3" stroke="#111111" strokeWidth="1.5" fill="none"/></svg>
}
function MgmtIcon() {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none"><rect x="4" y="8" width="24" height="18" rx="2" stroke="#333333" strokeWidth="1.5" fill="none"/><rect x="4" y="8" width="24" height="5" rx="2" fill="#111111" opacity=".15"/><circle cx="10" cy="20" r="2" fill="#111111"/><circle cx="16" cy="20" r="2" fill="#333333" opacity=".5"/><circle cx="22" cy="20" r="2" fill="#333333" opacity=".3"/></svg>
}
function TurnkeyIcon() {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none"><path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" stroke="#111111" strokeWidth="1.5" fill="none"/><path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" fill="#111111" opacity=".06"/><polyline points="10,16 14,20 22,12" stroke="#111111" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
}
function SafetyIcon() {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none"><path d="M16 4L26 8V16C26 21 21.5 25.5 16 28C10.5 25.5 6 21 6 16V8L16 4Z" stroke="#333333" strokeWidth="1.5" fill="#333333" fillOpacity=".06"/><polyline points="11,16 14,20 21,12" stroke="#111111" strokeWidth="2" strokeLinecap="round" fill="none"/></svg>
}
function CheckSVG() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
}

function ConstructionSVG() {
  return (
    <svg viewBox="0 0 600 480" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#111111"/>
          <stop offset="100%" stopColor="#2a2a2a"/>
        </linearGradient>
      </defs>
      <rect width="600" height="480" fill="url(#sky)"/>
      {/* Stars */}
      {[[40,30],[90,18],[200,12],[380,20],[500,30],[450,10],[150,40],[520,14]].map(([x,y],i)=>
        <circle key={i} cx={x} cy={y} r="1.4" fill="white" opacity=".6"/>
      )}
      {/* Moon — white crescent */}
      <circle cx="520" cy="55" r="22" fill="white" opacity=".9"/>
      <circle cx="530" cy="48" r="16" fill="#1a1a1a"/>
      {/* Tall building */}
      <rect x="60" y="100" width="110" height="310" fill="#e0e0e0"/>
      <rect x="60" y="100" width="5" height="310" fill="#111111"/>
      {[0,1,2,3,4,5,6,7].map(r=>[0,1,2].map(c=>
        <rect key={`a${r}${c}`} x={72+c*30} y={115+r*36} width="16" height="22" rx="1"
          fill={r+c===3||r+c===7?"rgba(255,255,255,.95)":"rgba(0,0,0,.08)"}/>
      ))}
      {/* Mid building */}
      <rect x="210" y="160" width="150" height="250" fill="#d0d0d0"/>
      {[0,1,2,3,4].map(r=>[0,1,2,3].map(c=>
        <rect key={`b${r}${c}`} x={222+c*34} y={175+r*46} width="20" height="30" rx="1"
          fill={r*4+c===8||r*4+c===13?"rgba(255,255,255,.95)":"rgba(0,0,0,.07)"}/>
      ))}
      {/* Short building right */}
      <rect x="400" y="220" width="100" height="190" fill="#c8c8c8"/>
      {[0,1,2].map(r=>[0,1].map(c=>
        <rect key={`c${r}${c}`} x={414+c*44} y={238+r*56} width="22" height="34" rx="1"
          fill={r+c===2?"rgba(255,255,255,.95)":"rgba(0,0,0,.07)"}/>
      ))}
      {/* Crane */}
      <rect x="178" y="48" width="5" height="180" fill="#ffffff"/>
      <rect x="140" y="48" width="98" height="5" fill="#ffffff"/>
      <line x1="181" y1="53" x2="233" y2="100" stroke="#ffffff" strokeWidth="1.5"/>
      <rect x="228" y="98" width="5" height="38" stroke="#ffffff" strokeWidth="1" fill="none"/>
      {/* Ground */}
      <rect x="0" y="410" width="600" height="70" fill="#000000"/>
      {/* Road lines */}
      {[0,1,2,3,4,5].map(i=><rect key={i} x={30+i*100} y="424" width="55" height="4" rx="2" fill="rgba(255,255,255,.2)"/>)}
    </svg>
  )
}

function IntroSVG() {
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#111111"/>
          <stop offset="100%" stopColor="#2a2a2a"/>
        </linearGradient>
      </defs>
      <rect width="500" height="400" fill="url(#ig)" rx="4"/>
      <rect x="40" y="60" width="180" height="280" fill="rgba(255,255,255,.12)" rx="3"/>
      <rect x="240" y="120" width="220" height="220" fill="rgba(255,255,255,.06)" rx="3"/>
      {/* Windows */}
      {[0,1,2,3,4,5].map(r=>[0,1,2].map(c=>
        <rect key={`w${r}${c}`} x={54+c*54} y={76+r*42} width="30" height="28" rx="1"
          fill={r+c===4?"rgba(255,255,255,.85)":"rgba(255,255,255,.08)"}/>
      ))}
      <rect x="0" y="350" width="500" height="50" fill="rgba(0,0,0,.35)"/>
      <text x="250" y="378" textAnchor="middle" fill="rgba(255,255,255,.4)" fontSize="10"
        fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="3">ROSA INFRA · CIVIL CONTRACTORS</text>
    </svg>
  )
}
