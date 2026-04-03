import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { num: '01', title: 'Road & Earthworks', accent: '#C8A84B' },
  { num: '02', title: 'Building Construction', accent: '#E8584A' },
  { num: '03', title: 'Planning & Design', accent: '#5BA3CC' },
  { num: '04', title: 'Project Management', accent: '#C8A84B' },
  { num: '05', title: 'Turnkey Projects', accent: '#E8584A' },
  { num: '06', title: 'Quality & Safety', accent: '#5BA3CC' },
]

const STATS = [
  { num: '20+', label: 'Years of Experience' },
  { num: '80+', label: 'Projects Completed' },
  { num: '6', label: 'States Served' },
  { num: '100%', label: 'On-Time Delivery' },
]

/* ─────────────────────────────────────────
   Building SVG — night scene
   Each floor group has data-floor="0..5"
   matching SERVICES indices
───────────────────────────────────────── */
function BuildingSVG({ svgRef }) {
  return (
    <svg ref={svgRef} viewBox="0 0 460 600"
      xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="svSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#04080F" />
          <stop offset="100%" stopColor="#0C172A" />
        </linearGradient>
        <linearGradient id="svFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E2D4E" />
          <stop offset="100%" stopColor="#162035" />
        </linearGradient>
        <linearGradient id="svSide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#060D1A" />
          <stop offset="100%" stopColor="#0C1828" />
        </linearGradient>
        <linearGradient id="svTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C8A84B" />
          <stop offset="100%" stopColor="#9A7E34" />
        </linearGradient>
        <linearGradient id="svGround" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0C1828" />
          <stop offset="100%" stopColor="#060D18" />
        </linearGradient>
        <linearGradient id="svLobby" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1A2C4A" />
          <stop offset="100%" stopColor="#0F1E35" />
        </linearGradient>
        <linearGradient id="svWinGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFE9A0" stopOpacity=".95" />
          <stop offset="100%" stopColor="#C8A84B" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="svWinBlue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5BA3CC" stopOpacity=".7" />
          <stop offset="100%" stopColor="#2A6090" stopOpacity=".5" />
        </linearGradient>
        <linearGradient id="svWinOff" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3050" stopOpacity=".8" />
          <stop offset="100%" stopColor="#0F1E38" stopOpacity=".6" />
        </linearGradient>
        <filter id="svGlow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="svWinGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Sky */}
      <rect width="460" height="600" fill="url(#svSky)" />

      {/* Stars */}
      {[[22, 30], [70, 18], [130, 48], [200, 25], [270, 12], [340, 40], [400, 22], [50, 75],
      [155, 85], [295, 65], [360, 95], [110, 105], [240, 90], [430, 55], [180, 32], [310, 44]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 1.4 : i % 3 === 0 ? 1 : .65}
          fill="white" opacity={.12 + .22 * (i % 3)} />
      ))}

      {/* Moon */}
      <circle cx="390" cy="48" r="22" fill="#FFF8DC" opacity=".1" />
      <circle cx="397" cy="44" r="17" fill="#04080F" opacity=".95" />

      {/* Far city silhouette */}
      {[[18, 320, 28, 215], [50, 295, 20, 240], [76, 268, 16, 295], [102, 308, 24, 255],
      [138, 325, 18, 238], [350, 300, 26, 260], [378, 278, 18, 282], [404, 310, 22, 252], [388, 294, 14, 268]
      ].map(([x, y, w, h], i) => (
        <rect key={'c' + i} x={x} y={y} width={w} height={h} fill="#142035" opacity=".55" />
      ))}

      {/* Ground */}
      <rect x="0" y="500" width="460" height="100" fill="url(#svGround)" />
      <rect x="0" y="498" width="460" height="3" fill="#C8A84B" opacity=".2" />
      {/* Road dashes */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <rect key={'rd' + i} x={i * 80 + 10} y="522" width="48" height="3" rx="1.5"
          fill="white" opacity=".05" />
      ))}
      {/* Street lamps */}
      {[55, 400].map((x, i) => (
        <g key={'lamp' + i}>
          <rect x={x - 1.5} y="472" width="3" height="40" fill="#253552" opacity=".5" />
          <path d={`M${x} 472 Q${x + 10} 462 ${x + 18} 465`}
            stroke="#253552" strokeWidth="2" fill="none" opacity=".5" />
          <circle cx={x + 18} cy="465" r="4" fill="#FFE84A" opacity=".65" filter="url(#svGlow)" />
        </g>
      ))}

      {/* Podium — always visible */}
      <rect x="100" y="470" width="260" height="32" fill="#101E35" />
      <polygon points="100,470 58,482 58,502 100,502" fill="#080F1E" />
      <polygon points="360,470 402,480 402,502 360,502" fill="#060C1A" />
      <rect x="100" y="466" width="260" height="5" fill="#C8A84B" opacity=".5" />
      <polygon points="360,466 402,476 402,480 360,470" fill="#9A7E34" opacity=".6" />
      <polygon points="100,466 58,478 58,482 100,470" fill="#9A7E34" opacity=".5" />

      {/* Lobby — always visible */}
      <rect x="148" y="428" width="164" height="44" fill="url(#svLobby)" />
      <polygon points="148,428 106,440 106,472 148,472" fill="#080F1E" />
      <polygon points="312,428 354,438 354,472 312,472" fill="#060C1A" />
      {[0, 1, 2, 3].map(i => (
        <rect key={'ld' + i} x={156 + i * 36} y="433" width="28" height="36"
          fill="url(#svWinBlue)" opacity=".5" />
      ))}
      <rect x="148" y="424" width="164" height="5" fill="#C8A84B" opacity=".45" />

      {/* ── 6 FLOORS — each matches one service (data-floor="0..5") ── */}
      {/* Floor heights: each is 46px tall, stacked from bottom (floor0) to top (floor5) */}
      {[0, 1, 2, 3, 4, 5].map(f => {
        const y = 424 - (f + 1) * 46  // floor 0 = y:378, floor 5 = y:148
        // window lighting patterns
        const goldWins = [[1, 3], [0, 2, 4], [2], [1, 4], [0, 3], [2, 4]][f] || []
        const blueWins = [[0], [4], [0, 3], [2], [1], [0, 3]][f] || []
        return (
          <g key={'f' + f} data-floor={f}>
            {/* main face */}
            <rect x="110" y={y} width="240" height="44" fill="url(#svFace)" />
            {/* left side */}
            <polygon
              points={`110,${y} 68,${y + 12} 68,${y + 56} 110,${y + 44}`}
              fill="url(#svSide)" />
            {/* right side */}
            <polygon
              points={`350,${y} 392,${y + 10} 392,${y + 54} 350,${y + 44}`}
              fill="#060C1A" />
            {/* floor slab */}
            <rect x="110" y={y + 42} width="240" height="3" fill="#C8A84B" opacity=".18" />
            <rect x="110" y={y} width="240" height="2" fill="rgba(200,168,75,.1)" />
            {/* 5 windows */}
            {[0, 1, 2, 3, 4].map(w => {
              const isGold = goldWins.includes(w)
              const isBlue = blueWins.includes(w)
              return (
                <g key={'w' + w}>
                  <rect x={122 + w * 42} y={y + 8} width="30" height="28"
                    fill={isGold ? 'url(#svWinGold)' : isBlue ? 'url(#svWinBlue)' : 'url(#svWinOff)'}
                    opacity={isGold ? 1 : isBlue ? .62 : .85}
                    filter={isGold ? 'url(#svWinGlow)' : undefined}
                  />
                  <line x1={137 + w * 42} y1={y + 8} x2={137 + w * 42} y2={y + 36}
                    stroke="rgba(255,255,255,.04)" strokeWidth="1" />
                  <line x1={122 + w * 42} y1={y + 22} x2={152 + w * 42} y2={y + 22}
                    stroke="rgba(255,255,255,.03)" strokeWidth=".8" />
                </g>
              )
            })}
            {/* side windows */}
            {[0, 1].map(w => (
              <polygon key={'sw' + w}
                points={`110,${y + 10 + w * 20} 72,${y + 14 + w * 20} 72,${y + 28 + w * 20} 110,${y + 24 + w * 20}`}
                fill="url(#svWinOff)" opacity=".4" />
            ))}
          </g>
        )
      })}

      {/* Cap / Parapet — data-floor="cap" */}
      <g data-floor="cap">
        <rect x="110" y="102" width="240" height="22" fill="#162035" />
        <polygon points="110,102 68,114 68,124 110,124" fill="#080F1E" />
        <polygon points="350,102 392,110 392,122 350,124" fill="#060C1A" />
        <rect x="110" y="98" width="240" height="6" fill="url(#svTop)" />
        <polygon points="350,98 392,106 392,110 350,102" fill="#9A7E34" opacity=".65" />
        <polygon points="110,98 68,108 68,114 110,102" fill="#9A7E34" opacity=".55" />
        {[0, 1, 2, 3, 4, 5].map(i => (
          <rect key={'p' + i} x={118 + i * 36} y={104} width="22" height="9"
            fill="#080F1E" opacity=".9" />
        ))}
        {/* Antenna */}
        <rect x="226" y="60" width="8" height="40" fill="#9BAAB8" opacity=".45" />
        <rect x="222" y="58" width="16" height="5" fill="#C8A84B" opacity=".65" />
        <circle cx="230" cy="57" r="6" fill="#E8584A" opacity=".9" filter="url(#svGlow)" />
        <ellipse cx="230" cy="62" rx="12" ry="4" fill="#E8584A" opacity=".18" />
      </g>

      {/* Crane — data-floor="crane" */}
      <g data-floor="crane">
        <rect x="362" y="64" width="8" height="420" fill="#1E2D4E" opacity=".5" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <line key={'ca' + i} x1="362" y1={64 + i * 46} x2="370" y2={64 + i * 46 + 23}
            stroke="#1E2D4E" strokeWidth="1" opacity=".35" />
        ))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
          <line key={'cb' + i} x1="370" y1={64 + i * 46} x2="362" y2={64 + i * 46 + 23}
            stroke="#1E2D4E" strokeWidth="1" opacity=".35" />
        ))}
        <rect x="282" y="60" width="160" height="6" fill="#C8A84B" opacity=".55" />
        <rect x="418" y="52" width="20" height="16" fill="#0C172A" opacity=".75" />
        <line x1="310" y1="66" x2="310" y2="126" stroke="#9BAAB8" strokeWidth="1.5" opacity=".4" />
        <rect x="302" y="126" width="16" height="7" fill="#C8A84B" opacity=".55" />
      </g>

      {/* Scaffolding */}
      <g opacity=".18">
        <line x1="350" y1="130" x2="350" y2="472" stroke="#3D5278" strokeWidth="2" />
        <line x1="376" y1="138" x2="376" y2="472" stroke="#3D5278" strokeWidth="2" />
        {[0, 1, 2, 3, 4, 5, 6].map(i => (
          <g key={'sc' + i}>
            <line x1="350" y1={142 + i * 50} x2="376" y2={168 + i * 50} stroke="#3D5278" strokeWidth="1" />
            <line x1="376" y1={142 + i * 50} x2="350" y2={168 + i * 50} stroke="#3D5278" strokeWidth="1" />
            <rect x="346" y={160 + i * 50} width="34" height="3" fill="#C8A84B" opacity=".5" />
          </g>
        ))}
      </g>

      {/* Ground label */}
      <text x="230" y="558" textAnchor="middle"
        fill="rgba(200,168,75,.22)" fontSize="7.5"
        fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="4.5">
        ROSA INFRA · CIVIL CONTRACTORS
      </text>
    </svg>
  )
}

/* ─────────────────────────────────────────
   Main Home component
───────────────────────────────────────── */
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
  const svgRef = useRef(null)
  const svcRef = useRef(null)          // outer section
  const stepRefs = useRef([])            // one ref per service row

  /* ── particle canvas ── */
  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return
    const ctx = cv.getContext('2d')
    const resize = () => { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight }
    resize(); window.addEventListener('resize', resize)
    const loop = () => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      particlesRef.current.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy *= .98; p.life--
        const a = p.life / p.maxLife
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * a, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200,168,75,${a * .35})`; ctx.fill()
      })
      particlesRef.current = particlesRef.current.filter(p => p.life > 0)
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(rafRef.current) }
  }, [])

  /* ── hero card tilt ── */
  useEffect(() => {
    const card = cardRef.current; if (!card) return
    const onMove = e => {
      const r = card.getBoundingClientRect()
      const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2)
      const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2)
      card.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 4}deg) scale(1.01)`
      if (bgLayerRef.current) bgLayerRef.current.style.transform = `translate(${dx * -8}px,${dy * -5}px)`
      if (midLayerRef.current) midLayerRef.current.style.transform = `translate(${dx * -16}px,${dy * -10}px)`
      if (fgLayerRef.current) fgLayerRef.current.style.transform = `translate(${dx * -26}px,${dy * -16}px)`
      if (sunRef.current) sunRef.current.style.transform = `translate(${dx * 10}px,${dy * 7}px)`
      if (Math.random() < .12) particlesRef.current.push({
        x: e.clientX - r.left, y: e.clientY - r.top,
        vx: (Math.random() - .5) * 1.5, vy: -Math.random() * 2.5 - .5,
        r: Math.random() * 3 + 1, life: 50 + Math.random() * 50, maxLife: 100,
      })
    }
    const onLeave = () => {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)';
      [bgLayerRef, midLayerRef, fgLayerRef, sunRef].forEach(r => { if (r.current) r.current.style.transform = '' })
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => { card.removeEventListener('mousemove', onMove); card.removeEventListener('mouseleave', onLeave) }
  }, [])

  /* ── Sticky scroll: sync service steps with building floors ── */
  useEffect(() => {
    if (!svgRef.current || !svcRef.current) return
    const svg = svgRef.current

    // All animated floor elements: crane, floor0→5, cap (8 total)
    const floorEls = [
      svg.querySelector('[data-floor="crane"]'),
      ...[0, 1, 2, 3, 4, 5].map(i => svg.querySelector(`[data-floor="${i}"]`)),
      svg.querySelector('[data-floor="cap"]'),
    ].filter(Boolean)

    // Start everything hidden
    gsap.set(floorEls, { opacity: 0, y: 16 })

    const ctx = gsap.context(() => {
      // For each service step, when it enters the active zone:
      // reveal crane on step 0, floor[i] on step i, cap after step 5
      stepRefs.current.forEach((el, i) => {
        if (!el) return
        ScrollTrigger.create({
          trigger: el,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            // Mark active point
            stepRefs.current.forEach((s, j) => {
              if (s) s.classList.toggle('is-active', j === i)
            })
            // Reveal crane + floors 0..i + cap if last
            const toShow = [
              floorEls[0],                                    // crane always
              ...floorEls.slice(1, i + 2),                     // floors 0..i
              ...(i === SERVICES.length - 1 ? [floorEls[floorEls.length - 1]] : []),
            ]
            gsap.to(toShow, {
              opacity: 1, y: 0,
              duration: .55, stagger: .08, ease: 'power3.out',
              overwrite: 'auto',
            })
            // Hide floors above current
            const toHide = floorEls.slice(i + 2, floorEls.length - (i === SERVICES.length - 1 ? 0 : 1))
            if (toHide.length) gsap.to(toHide, { opacity: 0, y: 16, duration: .3, overwrite: 'auto' })
          },
          onLeaveBack: () => {
            // Going back up: activate previous point
            const prev = i - 1
            stepRefs.current.forEach((s, j) => {
              if (s) s.classList.toggle('is-active', j === prev)
            })
            const toHide = floorEls.slice(i + 2)
            if (toHide.length) gsap.to(toHide, { opacity: 0, y: 16, duration: .3, overwrite: 'auto' })
          },
        })
      })
    })

    return () => ctx.revert()
  }, [])

  /* ── GSAP hero + generic reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.h-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 })
        .fromTo('.h-word', { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: .09, duration: 1 }, '-=.3')
        .fromTo('.h-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, '-=.5')
        .fromTo('.h-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.4')
        .fromTo('.h-stats', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.3')
        .fromTo('.hero-img', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 1.1 }, '<-=1.0')
      gsap.to('.hero-img', { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
      gsap.to('.hero-img-inner', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.hero', scrub: 2 } })
      gsap.utils.toArray('.reveal').forEach(el => {
        gsap.fromTo(el, { opacity: 0, y: 44 }, {
          opacity: 1, y: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        })
      })
      gsap.utils.toArray('.reveal-stagger').forEach(parent => {
        gsap.fromTo(Array.from(parent.children), { opacity: 0, y: 32 }, {
          opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out',
          scrollTrigger: { trigger: parent, start: 'top 86%' }
        })
      })
      gsap.utils.toArray('.intro-build').forEach((el, i) => {
        gsap.fromTo(el, { scaleY: 0, transformOrigin: 'bottom' }, {
          scaleY: 1, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: '.intro__img', start: 'top 82%' }, delay: i * .07
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

      {/* ══ HERO ══ */}
      <section className="hero">
        <div className="hero-text">
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
            <p className="h-sub">For over 20 years, ROSA Infra has delivered roads, buildings and infrastructure that last for generations — on time, on budget.</p>
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
          <div className="hero-img" ref={cardRef}>
            <canvas ref={canvasRef} className="hero-canvas"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }} />
            <div className="hero-img-inner">
              <HeroSVG bgRef={bgLayerRef} midRef={midLayerRef} fgRef={fgLayerRef} sunRef={sunRef} />
            </div>
            <div className="hero-badge">
              <div className="hero-badge__icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
              </div>
              <div><strong>ISO Quality Assured</strong><span>Zero-harm philosophy</span></div>
            </div>
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

      {/* ══ INTRO ══ */}
      <section className="intro">
        <div className="container intro__grid">
          <div className="intro__text">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Who We Are</span></div>
            <h2 className="intro__title reveal">Built with purpose,<br /><em>crafted to last.</em></h2>
            <p className="reveal">ROSA Infra is a multi-disciplinary civil contracting firm founded to address the diverse construction needs of clients throughout India.</p>
            <p className="reveal">Each company consists of highly qualified individuals with unique backgrounds in infrastructure development and practical implementation experience.</p>
            <button className="btn btn--ghost reveal" onClick={() => navigate('/about')}>Our Story →</button>
          </div>
          <div className="intro__img reveal"><IntroSVG /></div>
        </div>
      </section>

      {/* ══ SERVICES — sticky scroll ══
          CRITICAL: NO overflow:hidden anywhere in this tree
          Left panel: sticky, heading + service points
          Right panel: building SVG synced to scroll
      ══ */}
      <section className="svc" ref={svcRef}>
        <div className="svc-inner">

          {/* ── LEFT sticky ── */}
          <div className="svc-sticky">
            {/* Heading — stays put */}
            <div className="svc-sticky__head">
              <div className="eyebrow">
                <span className="eyebrow__line" style={{ background: 'rgba(200,168,75,.5)' }} />
                <span className="eyebrow__text" style={{ color: 'rgba(200,168,75,.7)' }}>What We Do</span>
              </div>
              <h2 className="svc__title">
                Full-spectrum<br /><em>construction</em><br />services
              </h2>
            </div>

            {/* Service points list — each item scrolls into active state */}
            <ul className="svc-points">
              {SERVICES.map((s, i) => (
                <li
                  key={s.num}
                  className="svc-point"
                  ref={el => { stepRefs.current[i] = el }}
                  style={{ '--pt-accent': s.accent }}
                >
                  <span className="svc-point__num">{s.num}</span>
                  <span className="svc-point__title">{s.title}</span>
                  <span className="svc-point__line" />
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT building ── */}
          <div className="svc-building-col">
            <div className="svc-building-wrap">
              <BuildingSVG svgRef={svgRef} />
            </div>
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

/* ════════════ HeroSVG — unchanged ════════════ */
function HeroSVG({ bgRef, midRef, fgRef, sunRef }) {
  return (
    <svg viewBox="0 0 800 640" xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7BB8E8" /><stop offset="40%" stopColor="#A8D4F0" /><stop offset="75%" stopColor="#C8E8F8" /><stop offset="100%" stopColor="#E0F2FC" /></linearGradient>
        <linearGradient id="bface" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#EAE6E0" /><stop offset="50%" stopColor="#D8D4CE" /><stop offset="100%" stopColor="#C4C0BA" /></linearGradient>
        <linearGradient id="bfaceLeft" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9BAAB8" /><stop offset="100%" stopColor="#B0BCC8" /></linearGradient>
        <linearGradient id="bside" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8496A8" /><stop offset="100%" stopColor="#6B82A0" /></linearGradient>
        <linearGradient id="bTop" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8A84B" /><stop offset="100%" stopColor="#A88C38" /></linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5BA3CC" stopOpacity=".85" /><stop offset="50%" stopColor="#4A8DB8" stopOpacity=".75" /><stop offset="100%" stopColor="#3A78A4" stopOpacity=".65" /></linearGradient>
        <linearGradient id="glassSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#2C6090" stopOpacity=".7" /><stop offset="100%" stopColor="#1E5080" stopOpacity=".5" /></linearGradient>
        <linearGradient id="glassLit" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#E8C870" stopOpacity=".9" /><stop offset="100%" stopColor="#C8A84B" stopOpacity=".8" /></linearGradient>
        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#B8B4AC" /><stop offset="100%" stopColor="#9E9A92" /></linearGradient>
        <linearGradient id="road" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6E6A62" /><stop offset="100%" stopColor="#5A5650" /></linearGradient>
        <linearGradient id="podium" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D0CEC8" /><stop offset="100%" stopColor="#B8B6B0" /></linearGradient>
        <linearGradient id="aface" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#D8D6D2" /><stop offset="100%" stopColor="#C4C2BE" /></linearGradient>
        <linearGradient id="aside" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#8496A8" /><stop offset="100%" stopColor="#6B82A0" /></linearGradient>
        <linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="white" stopOpacity=".22" /><stop offset="45%" stopColor="white" stopOpacity=".06" /><stop offset="100%" stopColor="white" stopOpacity="0" /></linearGradient>
        <radialGradient id="sunGlow" cx="75%" cy="12%" r="30%"><stop offset="0%" stopColor="#FFF4C2" stopOpacity=".6" /><stop offset="60%" stopColor="#FFE080" stopOpacity=".15" /><stop offset="100%" stopColor="#7BB8E8" stopOpacity="0" /></radialGradient>
        <filter id="bshadow" x="-10%" y="-5%" width="130%" height="130%"><feDropShadow dx="8" dy="14" stdDeviation="18" floodColor="#0D1E38" floodOpacity=".28" /></filter>
        <filter id="ashadow" x="-10%" y="-5%" width="130%" height="130%"><feDropShadow dx="5" dy="10" stdDeviation="12" floodColor="#0D1E38" floodOpacity=".2" /></filter>
        <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      </defs>
      <rect width="800" height="640" fill="url(#sky)" />
      <rect width="800" height="640" fill="url(#sunGlow)" />
      <g ref={sunRef} style={{ transition: 'transform .12s ease-out' }}>
        <circle cx="598" cy="75" r="28" fill="#FFF0A0" opacity=".82" />
        <circle cx="598" cy="75" r="20" fill="#FFED80" opacity=".95" />
        <circle cx="598" cy="75" r="13" fill="#FFE84A" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (<line key={i} x1={598 + Math.cos(a * Math.PI / 180) * 22} y1={75 + Math.sin(a * Math.PI / 180) * 22} x2={598 + Math.cos(a * Math.PI / 180) * 38} y2={75 + Math.sin(a * Math.PI / 180) * 38} stroke="#FFE84A" strokeWidth={i % 3 === 0 ? 2 : 1} opacity=".5" />))}
        <ellipse cx="400" cy="48" rx="100" ry="22" fill="white" opacity=".38" />
        <ellipse cx="455" cy="36" rx="60" ry="16" fill="white" opacity=".3" />
      </g>
      <g ref={bgRef} style={{ transition: 'transform .1s ease-out' }}>
        <ellipse cx="95" cy="72" rx="82" ry="20" fill="white" opacity=".65" />
        <ellipse cx="148" cy="60" rx="52" ry="15" fill="white" opacity=".55" />
        <ellipse cx="60" cy="80" rx="38" ry="12" fill="white" opacity=".4" />
        <rect x="0" y="295" width="800" height="60" fill="#B8D8F0" opacity=".18" />
        <rect x="5" y="285" width="48" height="230" fill="#B0BEC8" opacity=".35" />
        <rect x="48" y="305" width="36" height="210" fill="#A8B8C4" opacity=".28" />
        <rect x="78" y="270" width="30" height="250" fill="#9BAAB8" opacity=".3" />
        <polygon points="5,285 53,285 53,278 29,270" fill="#A0B0BE" opacity=".3" />
        <rect x="705" y="275" width="52" height="245" fill="#B0BEC8" opacity=".32" />
        <rect x="752" y="300" width="48" height="220" fill="#A8B8C4" opacity=".26" />
        <polygon points="705,275 757,275 757,268 731,260" fill="#A0B0BE" opacity=".28" />
        <rect x="28" y="220" width="62" height="310" fill="#BCC8D4" opacity=".45" />
        <polygon points="28,220 90,220 90,213 59,206" fill="#B0BCC8" opacity=".4" />
        {[0, 1, 2, 3, 4, 5].map(r => [0, 1].map(c => (<rect key={'mb' + r + c} x={34 + c * 28} y={228 + r * 44} width="22" height="34" fill="#6B92B0" opacity=".35" />)))}
      </g>
      <g ref={midRef} style={{ transition: 'transform .1s ease-out' }}>
        <rect x="540" y="218" width="158" height="304" fill="url(#aface)" filter="url(#ashadow)" />
        <polygon points="540,218 490,242 490,520 540,522" fill="#9BAAB8" />
        <polygon points="698,218 752,238 752,520 698,522" fill="url(#aside)" />
        <polygon points="540,218 698,218 752,238 594,238" fill="#C8A84B" opacity=".55" />
        <rect x="540" y="210" width="158" height="10" fill="#1E2D4E" />
        {[0, 1, 2, 3, 4, 5, 6].map(r => [0, 1, 2].map(c => { const lit = (r === 2 && c === 1) || (r === 5 && c === 0); return <rect key={'ap' + r + c} x={550 + c * 46} y={228 + r * 42} width="38" height="34" fill={lit ? 'url(#glassLit)' : 'url(#glass)'} opacity={lit ? .85 : .68} /> }))}
        {[0, 1, 2, 3, 4, 5, 6].map(r => (<rect key={'ab' + r} x="540" y={226 + r * 42} width="158" height="4" fill="#1E2D4E" opacity=".12" />))}
        <polygon points="540,218 570,218 600,522 540,522" fill="url(#shimmer)" />
        <rect x="526" y="520" width="186" height="22" fill="#C0BEB8" />
        <polygon points="526,520 712,520 766,540 580,540" fill="#D4D2CC" opacity=".6" />
        <rect x="526" y="516" width="186" height="5" fill="#C8A84B" opacity=".45" />
      </g>
      <g ref={fgRef} style={{ transition: 'transform .1s ease-out' }}>
        <rect x="148" y="38" width="284" height="480" fill="url(#bface)" filter="url(#bshadow)" />
        <polygon points="148,38 88,68 88,524 148,518" fill="url(#bfaceLeft)" />
        <polygon points="432,38 500,62 500,514 432,518" fill="url(#bside)" />
        <rect x="148" y="26" width="284" height="16" fill="#1E2D4E" />
        <polygon points="148,26 432,26 500,50 214,50" fill="url(#bTop)" opacity=".88" />
        {[0, 1, 2, 3, 4, 5, 6, 7].map(c => (<line key={c} x1={188 + c * 36} y1="38" x2={188 + c * 36} y2="518" stroke="#1E2D4E" strokeWidth="2.5" opacity=".18" />))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => (<rect key={r} x="148" y={76 + r * 37} width="284" height="5" fill="#1E2D4E" opacity=".15" />))}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(r => [0, 1, 2, 3, 4, 5, 6].map(c => { const lit = (r === 4 && c === 2) || (r === 7 && c === 5) || (r === 2 && c === 4) || (r === 9 && c === 1); return <rect key={'gp' + r + c} x={152 + c * 36} y={82 + r * 37} width="30" height="29" fill={lit ? 'url(#glassLit)' : 'url(#glass)'} opacity={lit ? 0.9 : .78} /> }))}
        <polygon points="148,38 200,38 260,518 148,518" fill="url(#shimmer)" />
        <rect x="194" y="440" width="148" height="78" fill="#5BA3CC" opacity=".72" />
        <rect x="148" y="430" width="284" height="10" fill="#C8A84B" opacity=".7" />
        <rect x="108" y="516" width="364" height="26" fill="url(#podium)" />
        <polygon points="108,516 472,516 540,540 76,540" fill="#D8D6D0" opacity=".7" />
        <rect x="108" y="512" width="364" height="5" fill="#C8A84B" opacity=".6" />
        <rect x="0" y="536" width="800" height="104" fill="url(#ground)" />
        <rect x="0" y="566" width="800" height="50" fill="url(#road)" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (<rect key={i} x={i * 92 + 8} y="585" width="60" height="5" rx="2" fill="white" opacity=".25" />))}
      </g>
    </svg>
  )
}

function IntroSVG() {
  return (
    <svg viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="isky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7BB8E8" /><stop offset="55%" stopColor="#A8D4F0" /><stop offset="100%" stopColor="#D4ECFA" /></linearGradient>
        <linearGradient id="ibldg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#EEECEA" /><stop offset="100%" stopColor="#D4D2CE" /></linearGradient>
        <linearGradient id="ibldgSide" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#9BAAB8" /><stop offset="100%" stopColor="#8496A8" /></linearGradient>
        <linearGradient id="iglass2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#5BA3CC" stopOpacity=".75" /><stop offset="100%" stopColor="#3A78A4" stopOpacity=".55" /></linearGradient>
        <linearGradient id="iground" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C0BCB4" /><stop offset="100%" stopColor="#A8A49C" /></linearGradient>
        <linearGradient id="iaccent" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#C8A84B" /><stop offset="100%" stopColor="#A88C38" /></linearGradient>
        <radialGradient id="isun" cx="80%" cy="15%" r="25%"><stop offset="0%" stopColor="#FFF4C2" stopOpacity=".55" /><stop offset="100%" stopColor="#7BB8E8" stopOpacity="0" /></radialGradient>
      </defs>
      <rect width="500" height="400" fill="url(#isky)" />
      <rect width="500" height="400" fill="url(#isun)" />
      <ellipse cx="370" cy="55" rx="75" ry="20" fill="white" opacity=".65" />
      <ellipse cx="100" cy="70" rx="55" ry="16" fill="white" opacity=".4" />
      <rect x="0" y="325" width="500" height="75" fill="url(#iground)" />
      <rect x="0" y="350" width="500" height="4" fill="#5A5650" />
      {[0, 1, 2, 3, 4].map(i => (<rect key={i} x={i * 110 + 10} y="360" width="70" height="4" rx="2" fill="white" opacity=".2" />))}
      <g className="intro-build">
        <rect x="300" y="198" width="138" height="154" fill="#E0DEDC" />
        <polygon points="300,198 264,216 264,350 300,352" fill="#9BAAB8" opacity=".7" />
        <polygon points="438,198 470,214 470,350 438,352" fill="#8496A8" opacity=".6" />
        <polygon points="300,198 438,198 470,214 332,214" fill="#C8A84B" opacity=".5" />
        <rect x="300" y="190" width="138" height="10" fill="#1E2D4E" />
        {[0, 1, 2].map(row => [0, 1, 2].map(col => (<rect key={`j${row}${col}`} x={308 + col * 42} y={206 + row * 46} width="36" height="36" rx="1" fill="url(#iglass2)" opacity=".7" />)))}
      </g>
      <g className="intro-build">
        <rect x="56" y="118" width="224" height="234" fill="url(#ibldg)" />
        <polygon points="56,118 12,138 12,346 56,352" fill="url(#ibldgSide)" />
        <polygon points="280,118 318,136 318,350 280,352" fill="#8496A8" opacity=".7" />
        <polygon points="56,118 280,118 318,136 94,136" fill="url(#iaccent)" opacity=".7" />
        <rect x="56" y="108" width="224" height="12" fill="#1E2D4E" />
        {[0, 1, 2, 3, 4].map(row => [0, 1, 2, 3].map(col => { const lit = (row === 2 && col === 1) || (row === 4 && col === 3); return <rect key={`i${row}${col}`} x={66 + col * 50} y={126 + row * 38} width="42" height="30" rx="1" fill={lit ? '#C8A84B' : 'url(#iglass2)'} opacity={lit ? .7 : .78} /> }))}
        <rect x="56" y="340" width="224" height="8" fill="url(#iaccent)" opacity=".7" />
      </g>
      <g className="intro-build">
        <rect x="20" y="296" width="6" height="54" fill="#3C3028" />
        <ellipse cx="23" cy="278" rx="28" ry="40" fill="#4A6E38" opacity=".85" />
        <rect x="468" y="300" width="5" height="50" fill="#3C3028" />
        <ellipse cx="470" cy="284" rx="24" ry="36" fill="#4A6E38" opacity=".78" />
      </g>
      <rect x="0" y="364" width="500" height="36" fill="rgba(30,45,78,.75)" />
      <text x="250" y="385" textAnchor="middle" fill="rgba(200,168,75,.7)" fontSize="8" fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="4">ROSA INFRA · CIVIL CONTRACTORS</text>
    </svg>
  )
}