import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

// Glob both folders as URLs — the correct Vite syntax for image src
const ROOT = import.meta.glob('../assets/projects/*', { eager: true, as: 'url' })
const SENT = import.meta.glob('../assets/projects/sent/*', { eager: true, as: 'url' })

function resolve(filename) {
  if (!filename) return null
  // Try the filename as-is first (for files where extension is already included)
  const direct = SENT[`../assets/projects/sent/${filename}`]
    || ROOT[`../assets/projects/${filename}`]
  if (direct) return direct

  // Try common extensions automatically (handles Windows hiding extensions)
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']) {
    const url = SENT[`../assets/projects/sent/${filename}${ext}`]
      || ROOT[`../assets/projects/${filename}${ext}`]
    if (url) return url
  }
  return null
}

const IMG_FILES = {
  1: 'st. louis convent',
  2: 'MAKERS TOWER JUHU',
  3: 'SHRI GANESH VIDYA MANDIR',
  4: 'aashram',
  5: 'don bosco ',
  6: 'enet house',
  7: 'om palace',
  8: 'st annes',
  9: 'BHAVBANDHAN.jpg',
  10: 'GAVDEVIKRUPA',
  11: 'ANTHONY FIBER',
  12: 'HAWARE GREEN PARK',
  13: "HAWARE VRINDAVAN",
  14: 'HAWARE SILICON TOWER',
  15: 'John XXIII High School, Virar',
  16: 'LIS INDIA CONSTRUCTION',
  17: 'FIVE STAR ELECTRICALS',
  18: 'gorai',
  19: 'JAL JEEVAN TALASARI',
  20: 'architectural design',
  22: 'karwar bungalow',
  23: 'private bunglow 2',
  24: 'private bunglow',
  25: 'GAJANAN ASHARAM',
  26: 'BHUMI INFRATECH',
}

const IMG = Object.fromEntries(
  Object.entries(IMG_FILES).map(([id, file]) => [Number(id), resolve(file)])
)

const PROJECTS = [
  { id: 1, area: 'Mumbai', name: 'St. Louis Convent School', location: 'Andheri (W), Mumbai', type: 'Institutional', scope: 'Auditorium hall civil work and interior work', color: '#333333' },
  { id: 2, area: 'Mumbai', name: 'Makers Tower', location: 'Juhu, Mumbai', type: 'Residential', scope: 'Aluminium sliding windows', color: '#444444' },
  { id: 3, area: 'Mumbai', name: 'Shri Ganesh Vidya Mandir', location: 'Dharavi, Mumbai', type: 'Institutional', scope: 'Civil work and interior work', color: '#333333' },
  { id: 4, area: 'Mumbai', name: 'Mariamma Mata Temple', location: 'Dharavi, Mumbai', type: 'Religious', scope: 'Civil work and interior work', color: '#222222' },
  { id: 5, area: 'Mumbai', name: 'Don Bosco Shelter Home', location: 'Wadala, Mumbai', type: 'Institutional', scope: 'Fabrication work of terrace shed', color: '#333333' },
  { id: 6, area: 'Mumbai', name: 'Enet House', location: 'Gorai, Borivali (W)', type: 'Residential', scope: 'Residential units – civil work and interior work', color: '#444444' },
  { id: 7, area: 'Mumbai', name: 'OM Palace', location: 'Malad (W), Mumbai', type: 'Residential', scope: '21-storied residential tower – civil work', color: '#111111' },
  { id: 8, area: 'Mumbai', name: "St. Anne's High School", location: 'Borivali (W), Mumbai', type: 'Institutional', scope: 'School building – civil work and finishing up to lock & key', color: '#333333', ongoing: true },
  { id: 9, area: 'Mumbai', name: 'Bhavbandhan', location: 'Borivali (W), Mumbai', type: 'Mixed-Use', scope: 'Commercial & residential building – civil work and finishing up to lock & key', color: '#444444', ongoing: true },
  { id: 10, area: 'Mumbai', name: 'Gavdevikrupa', location: 'Borivali (W), Mumbai', type: 'Mixed-Use', scope: 'Commercial & residential building – civil work and finishing up to lock & key', color: '#111111', ongoing: true },
  { id: 11, area: 'Mumbai', name: 'Anthony Fiber', location: 'Gorai, Borivali (W)', type: 'Industrial', scope: 'Factory – civil work and fabrication work', color: '#555555' },
  { id: 12, area: 'Navi Mumbai', name: 'Haware Green Park', location: 'Kamothe, Navi Mumbai', type: 'Residential', scope: 'Civil work, window seal, flooring', color: '#333333' },
  { id: 13, area: 'Navi Mumbai', name: "Haware's Vrindavan", location: 'New Panvel, Navi Mumbai', type: 'Residential', scope: 'Civil work', color: '#444444' },
  { id: 14, area: 'Navi Mumbai', name: 'Haware Silicon Tower', location: 'Vashi, Navi Mumbai', type: 'Commercial', scope: 'Interior work, flooring, tiling', color: '#111111' },
  { id: 15, area: 'Palghar', name: 'Jhon XXIII High School', location: 'Virar (W), Palghar', type: 'Institutional', scope: 'Fabrication work of prayer hall', color: '#333333' },
  { id: 16, area: 'Palghar', name: 'LIS India Construction', location: 'Mira Road (E), Thane', type: 'Mixed-Use', scope: 'Civil work and aluminium sliding windows', color: '#444444' },
  { id: 17, area: 'Palghar', name: 'Five Star Electricals', location: 'Virar (W), Palghar', type: 'Industrial', scope: 'Factory – civil work and fabrication work', color: '#555555' },
  { id: 18, area: 'Palghar', name: 'Shri Varad Vinayak Building', location: 'Vasai (E), Palghar', type: 'Mixed-Use', scope: 'Commercial & residential building – civil and interior', color: '#111111' },
  { id: 19, area: 'Palghar', name: 'Jal Jeevan Pradikaran', location: 'Talasari, Palghar', type: 'Infrastructure', scope: 'Water supply – pipe line & water reservoir', color: '#333333', ongoing: true },
  { id: 20, area: 'Others', name: 'Magnum Construction', location: 'Khopoli, Raigad', type: 'Infrastructure', scope: 'Town planning – roads, plotting, civil work of club house & bungalows', color: '#333333' },
  { id: 21, area: 'Others', name: 'Panchal & Panchal Asso.', location: 'Vapi, Gujarat', type: 'Infrastructure', scope: 'Town planning – land levelling, road, plotting', color: '#444444' },
  { id: 22, area: 'Others', name: 'Private Bungalow', location: 'Karwar, Karnataka', type: 'Residential', scope: 'Civil work and interior work', color: '#111111' },
  { id: 23, area: 'Others', name: 'Private Bungalow', location: 'Satpala, Virar (W)', type: 'Residential', scope: 'Civil work and interior work', color: '#222222' },
  { id: 24, area: 'Others', name: 'Private Bungalow', location: 'Nandan, Virar (W)', type: 'Residential', scope: 'Civil work and interior work', color: '#555555' },
  { id: 25, area: 'Others', name: 'Shree Gajanan Asharm', location: 'Malsar, Sinor, Vadodara', type: 'Institutional', scope: 'Ashram building – civil work and finishing up to lock & key', color: '#333333', ongoing: true },
  { id: 26, area: 'Others', name: 'M/s. Bhumi Infratech', location: 'Bavla, Ahmedabad', type: 'Industrial', scope: 'Stallion Laboratories – civil labour work for factory', color: '#555555', ongoing: true },
]

const AREAS = ['All', 'Mumbai', 'Navi Mumbai', 'Palghar', 'Others']
const TYPES = ['All Types', 'Residential', 'Commercial', 'Industrial', 'Institutional', 'Infrastructure', 'Religious', 'Mixed-Use']

export default function Projects() {
  const [activeArea, setActiveArea] = useState('All')
  const [activeType, setActiveType] = useState('All Types')
  const [showOngoing, setShowOngoing] = useState(false)
  const pageRef = useRef(null)
  const gridRef = useRef(null)

  const filtered = PROJECTS.filter(p => {
    const areaOk = activeArea === 'All' || p.area === activeArea
    const typeOk = activeType === 'All Types' || p.type === activeType
    const ongoingOk = showOngoing ? p.ongoing : true
    return areaOk && typeOk && ongoingOk
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.projects-hero__title .word',
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.3 }
      )
      gsap.fromTo('.projects-hero__sub',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.9 }
      )
      gsap.fromTo('.projects-hero__numbers .stat-chip',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)', delay: 1.1 }
      )
    }, pageRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.project-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out' }
    )
  }, [filtered.length, activeArea, activeType, showOngoing])

  return (
    <div className="projects" ref={pageRef}>

      <section className="projects-hero">
        <div className="projects-hero__bg" />
        <div className="container projects-hero__inner">
          <div className="eyebrow">
            <span className="eyebrow__line" /><span className="eyebrow__text">Our Work</span>
          </div>
          <h1 className="projects-hero__title">
            {['Every structure tells a'].map((w, i) => (
              <span key={i} className="word">{w} </span>
            ))}
            <br />
            <span className="word word--italic">story.</span>
          </h1>
          <p className="projects-hero__sub">
            From Mumbai's skyline to Gujarat's highways — 26 projects across
            6 states, each built with precision and pride.
          </p>
          <div className="projects-hero__numbers">
            {[['26+', 'Projects'], ['6', 'States'], ['20+', 'Years'], ['100%', 'Commitment']].map(([n, l]) => (
              <div className="stat-chip" key={l}><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILE FILTER BAR */}
      <div className="projects-filters projects-filters--mobile">
        <div className="container projects-filters__inner">
          <div className="filter-group">
            <span className="filter-label">Area</span>
            <div className="filter-tabs">
              {AREAS.map(a => (
                <button key={a} className={`filter-tab${activeArea === a ? ' active' : ''}`} onClick={() => setActiveArea(a)}>{a}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">Type</span>
            <select className="filter-select" value={activeType} onChange={e => setActiveType(e.target.value)}>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button className={`filter-toggle${showOngoing ? ' active' : ''}`} onClick={() => setShowOngoing(v => !v)}>
            <span className="filter-toggle__dot" />Ongoing only
          </button>
        </div>
      </div>

      {/* DESKTOP AREA BAR */}
      <div className="projects-area-bar projects-area-bar--desktop">
        <div className="container projects-area-bar__inner">
          {AREAS.map(a => (
            <button key={a} className={`area-tab${activeArea === a ? ' active' : ''}`} onClick={() => setActiveArea(a)}>{a}</button>
          ))}
        </div>
      </div>

      {/* GRID */}
      <section className="projects-grid-section">
        <div className="container projects-layout">
          <aside className="proj-sidebar">
            <p className="proj-sidebar__label">Type</p>
            <ul className="proj-type-list">
              {TYPES.map(t => (
                <li key={t}>
                  <button className={`proj-type-btn${activeType === t ? ' active' : ''}`} onClick={() => setActiveType(t)}>{t}</button>
                </li>
              ))}
            </ul>
            <div className="proj-sidebar__divider" />
            <button className={`filter-toggle${showOngoing ? ' active' : ''}`} onClick={() => setShowOngoing(v => !v)}>
              <span className="filter-toggle__dot" />Ongoing only
            </button>
          </aside>

          <div className="proj-main">
            <p className="projects-count">{filtered.length} project{filtered.length !== 1 ? 's' : ''}</p>
            <div className="projects-grid" ref={gridRef}>
              {filtered.map(p => (
                <div className="project-card" key={p.id}>
                  <div className="project-card__image">
                    {IMG[p.id]
                      ? <img src={IMG[p.id]} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      : <FallbackImg name={p.name} type={p.type} color={p.color} />
                    }
                    {p.ongoing && <span className="project-card__badge">Ongoing</span>}
                    <div className="project-card__image-overlay" />
                  </div>
                  <div className="project-card__body">
                    <div className="project-card__meta">
                      <span className="project-card__area">{p.area}</span>
                      <span className="project-card__type">{p.type}</span>
                    </div>
                    <h3 className="project-card__name">{p.name}</h3>
                    <p className="project-card__location">📍 {p.location}</p>
                    <p className="project-card__scope">{p.scope}</p>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="projects-empty">
                <span>No projects match your filters.</span>
                <button className="btn btn--outline" onClick={() => { setActiveArea('All'); setActiveType('All Types'); setShowOngoing(false) }}>Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>

    </div>
  )
}

function FallbackImg({ name, type, color }) {
  const gid = `g-${(name || type).replace(/[^a-z0-9]/gi, '-')}`
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.6" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${gid})`} />
      {[80, 160, 240, 320].map(x => <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />)}
      {[65, 130, 195].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />)}
      <rect x="60" y="80" width="80" height="130" fill="rgba(255,255,255,0.12)" rx="2" />
      <rect x="160" y="110" width="100" height="100" fill="rgba(255,255,255,0.10)" rx="2" />
      <rect x="280" y="130" width="60" height="80" fill="rgba(255,255,255,0.08)" rx="2" />
      {[0, 1, 2, 3].map(r => [0, 1, 2].map(c =>
        <rect key={`${r}-${c}`} x={70 + c * 22} y={92 + r * 26} width={12} height={16} fill="rgba(255,255,255,0.18)" rx="1" />
      ))}
      <rect x="0" y="210" width="400" height="50" fill="rgba(0,0,0,0.25)" />
      <text x="200" y="238" textAnchor="middle" fill="rgba(255,255,255,0.6)"
        fontSize="10" fontFamily="Montserrat,sans-serif" fontWeight="600" letterSpacing="1">
        {type.toUpperCase()}
      </text>
    </svg>
  )
}