import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProjectsHero from './Projectshero'
import './Projects.css'

gsap.registerPlugin(ScrollTrigger)

const ROOT = import.meta.glob('../assets/projects/*', { query: '?url', import: 'default', eager: true })
const SENT = import.meta.glob('../assets/projects/sent/*', { query: '?url', import: 'default', eager: true })

function resolve(filename) {
  if (!filename) return null
  // Try exact match first (with and without sent/)
  const direct = SENT[`../assets/projects/sent/${filename}`]
    || ROOT[`../assets/projects/${filename}`]
  if (direct) return direct
  // Try appending common extensions
  for (const ext of ['.jpg', '.jpeg', '.png', '.webp', '.JPG', '.JPEG', '.PNG']) {
    const url = SENT[`../assets/projects/sent/${filename}${ext}`]
      || ROOT[`../assets/projects/${filename}${ext}`]
    if (url) return url
  }
  return null
}

// ─────────────────────────────────────────────────────────────
// IMG_FILES — keys are project IDs, values are exact filenames
// (without extension where the resolve() will auto-append it)
// Cross-referenced against the actual folder screenshot:
// ─────────────────────────────────────────────────────────────
const IMG_FILES = {
  1: 'st. louis convent',          // st. louis convent (folder)
  2: 'MAKERS TOWER JUHU',          // MAKERS TOWER JUHU
  3: 'SHRI GANESH VIDYA MANDIR',   // SHRI GANESH VIDYA MANDIR  (was: ganesh vidya mandir → wrong)
  4: 'Mariamma temple',                    // aashram (Mariamma Mata Temple = ashram area)
  5: 'shelter don bosco',          // shelter don bosco
  6: 'enet house',                 // enet house
  7: 'Om palace',                  // Om palace
  8: '2',                   // st annes
  9: 'BHAVBANDHAN.jpg',            // has explicit .jpg in filename
  10: 'GAVDEVIK RUPA',              // GAVDEVIK RUPA (was: GAVDEVIKRUPA — space missing)
  11: 'ANTHONY FIBER',              // ANTHONY FIBER (was: ANTHONY FIBER — matches)
  12: 'HAWARE GREEN PARK',          // HAWARE GREEN PARK
  13: 'HAWARE VRINDAVAN',           // HAWARE VRINDAVAN (was: HAWARE VRINDAVAN — matches)
  14: 'HAWARE SILICON TOWER',       // HAWARE SILICON TOWER
  15: 'John XXIII High School, Virar', // John XXIII High School, Virar
  16: 'LIS INDIA CONSTRUCTION',     // LIS INDIA CONSTRUCTION
  17: 'Five star',      // FIVE STAR ELECTRICALS (was: FIVE STAR ELECTRICALS — matches)
  18: 'Varad nayak',                      // gorai (Shri Varad Vinayak = Gorai area)
  19: 'JAL JEEVAN TALASARI',        // JAL JEEVAN TALASARI (was: JAL JEEVAN TALASARI — matches)
  20: 'Magnum construction',       // architectural design (Magnum / town planning)
  21: 'Panchal vapi',               // Panchal vapi — NEW: was missing entirely
  22: 'bunglow (1)',                 // bunglow (1) — private bungalow Karwar
  23: 'bunglow (2)',                 // bunglow (2) — private bungalow Satpala
  24: 'bunglow (3)',                 // bunglow (3) — private bungalow Nandan
  25: 'GAJANAN ASHARAM',            // GAJANAN ASHARAM (was: GAJANAN ASHARAM — matches)
  26: '3',            // BHUMI INFRATECH (was: BHUMI INFRATECH — matches)
}

const IMG = Object.fromEntries(
  Object.entries(IMG_FILES).map(([id, file]) => [Number(id), resolve(file)])
)

const PROJECTS = [
  { id: 1, area: 'Mumbai', name: 'St. Louis Convent School', location: 'Andheri (W), Mumbai', type: 'Institutional', scope: 'Auditorium hall civil work and interior work', color: '#1e2a4a' },
  { id: 2, area: 'Mumbai', name: 'Makers Tower', location: 'Juhu, Mumbai', type: 'Residential', scope: 'Aluminium sliding windows', color: '#3a4e72' },
  { id: 3, area: 'Mumbai', name: 'Shri Ganesh Vidya Mandir', location: 'Dharavi, Mumbai', type: 'Institutional', scope: 'Civil work and interior work', color: '#1e2a4a' },
  { id: 4, area: 'Mumbai', name: 'Mariamma Mata Temple', location: 'Dharavi, Mumbai', type: 'Religious', scope: 'Civil work and interior work', color: '#2e4060' },
  { id: 5, area: 'Mumbai', name: 'Don Bosco Shelter Home', location: 'Wadala, Mumbai', type: 'Institutional', scope: 'Fabrication work of terrace shed', color: '#1e2a4a' },
  { id: 6, area: 'Mumbai', name: 'Enet House', location: 'Gorai, Borivali (W)', type: 'Residential', scope: 'Residential units – civil work and interior work', color: '#3a4e72' },
  { id: 7, area: 'Mumbai', name: 'OM Palace', location: 'Malad (W), Mumbai', type: 'Residential', scope: '21-storied residential tower – civil work', color: '#0d1826' },
  { id: 8, area: 'Mumbai', name: "St. Anne's High School", location: 'Borivali (W), Mumbai', type: 'Institutional', scope: 'School building – civil work and finishing up to lock & key', color: '#1e2a4a', ongoing: true },
  { id: 9, area: 'Mumbai', name: 'Bhavbandhan', location: 'Borivali (W), Mumbai', type: 'Mixed-Use', scope: 'Commercial & residential building – civil work and finishing up to lock & key', color: '#3a4e72', ongoing: true },
  { id: 10, area: 'Mumbai', name: 'Gavdevikrupa', location: 'Borivali (W), Mumbai', type: 'Mixed-Use', scope: 'Commercial & residential building – civil work and finishing up to lock & key', color: '#6b7a96', ongoing: true },
  { id: 11, area: 'Mumbai', name: 'Anthony Fiber', location: 'Gorai, Borivali (W)', type: 'Industrial', scope: 'Factory – civil work and fabrication work', color: '#8a9ab5' },
  { id: 12, area: 'Navi Mumbai', name: 'Haware Green Park', location: 'Kamothe, Navi Mumbai', type: 'Residential', scope: 'Civil work, window seal, flooring', color: '#3a4e72' },
  { id: 13, area: 'Navi Mumbai', name: "Haware's Vrindavan", location: 'New Panvel, Navi Mumbai', type: 'Residential', scope: 'Civil work', color: '#1e2a4a' },
  { id: 14, area: 'Navi Mumbai', name: 'Haware Silicon Tower', location: 'Vashi, Navi Mumbai', type: 'Commercial', scope: 'Interior work, flooring, tiling', color: '#5a6e8c' },
  { id: 15, area: 'Palghar', name: 'Jhon XXIII High School', location: 'Virar (W), Palghar', type: 'Institutional', scope: 'Fabrication work of prayer hall', color: '#1e2a4a' },
  { id: 16, area: 'Palghar', name: 'LIS India Construction', location: 'Mira Road (E), Thane', type: 'Mixed-Use', scope: 'Civil work and aluminium sliding windows', color: '#3a4e72' },
  { id: 17, area: 'Palghar', name: 'Five Star Electricals', location: 'Virar (W), Palghar', type: 'Industrial', scope: 'Factory – civil work and fabrication work', color: '#8a9ab5' },
  { id: 18, area: 'Palghar', name: 'Shri Varad Vinayak Building', location: 'Vasai (E), Palghar', type: 'Mixed-Use', scope: 'Commercial & residential building – civil and interior', color: '#6b7a96' },
  { id: 19, area: 'Palghar', name: 'Jal Jeevan Pradikaran', location: 'Talasari, Palghar', type: 'Infrastructure', scope: 'Water supply – pipe line & water reservoir', color: '#2e5080', ongoing: true },
  { id: 20, area: 'Others', name: 'Magnum Construction', location: 'Khopoli, Raigad', type: 'Infrastructure', scope: 'Town planning – roads, plotting, civil work of club house & bungalows', color: '#1e2a4a' },
  { id: 21, area: 'Others', name: 'Panchal & Panchal Asso.', location: 'Vapi, Gujarat', type: 'Infrastructure', scope: 'Town planning – land levelling, road, plotting', color: '#3a4e72' },
  { id: 22, area: 'Others', name: 'Private Bungalow', location: 'Karwar, Karnataka', type: 'Residential', scope: 'Civil work and interior work', color: '#6b7a96' },
  { id: 23, area: 'Others', name: 'Private Bungalow', location: 'Satpala, Virar (W)', type: 'Residential', scope: 'Civil work and interior work', color: '#3a4e72' },
  { id: 24, area: 'Others', name: 'Private Bungalow', location: 'Nandan, Virar (W)', type: 'Residential', scope: 'Civil work and interior work', color: '#1e2a4a' },
  { id: 25, area: 'Others', name: 'Shree Gajanan Asharm', location: 'Malsar, Sinor, Vadodara', type: 'Institutional', scope: 'Ashram building – civil work and finishing up to lock & key', color: '#8a9ab5', ongoing: true },
  { id: 26, area: 'Others', name: 'M/s. Bhumi Infratech', location: 'Bavla, Ahmedabad', type: 'Industrial', scope: 'Stallion Laboratories – civil labour work for factory', color: '#8a9ab5', ongoing: true },
]

const AREAS = ['All', 'Mumbai', 'Navi Mumbai', 'Palghar', 'Others']
const TYPES = ['All Types', 'Residential', 'Commercial', 'Industrial', 'Institutional', 'Infrastructure', 'Religious', 'Mixed-Use']

const TYPE_ACCENT = {
  Residential: '#3a4e72',
  Commercial: '#5a6e8c',
  Industrial: '#8a9ab5',
  Institutional: '#1e2a4a',
  Infrastructure: '#2e5080',
  Religious: '#4a3870',
  'Mixed-Use': '#5c4e8c',
  'All Types': '#1e2a4a',
}

export default function Projects() {
  const [activeArea, setActiveArea] = useState('All')
  const [activeType, setActiveType] = useState('All Types')
  const [showOngoing, setShowOngoing] = useState(false)
  const gridRef = useRef(null)

  const filtered = PROJECTS.filter(p => {
    const areaOk = activeArea === 'All' || p.area === activeArea
    const typeOk = activeType === 'All Types' || p.type === activeType
    const ongoingOk = showOngoing ? p.ongoing : true
    return areaOk && typeOk && ongoingOk
  })

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('.project-card')
    gsap.fromTo(cards,
      { opacity: 0, y: 32, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.045, ease: 'power3.out' }
    )
  }, [filtered.length, activeArea, activeType, showOngoing])

  return (
    <div className="projects">

      <ProjectsHero />

      {/* MOBILE FILTER BAR */}
      <div className="projects-filters projects-filters--mobile">
        <div className="container projects-filters__inner">
          <div className="filter-group">
            <span className="filter-label">Area</span>
            <div className="filter-tabs">
              {AREAS.map(a => (
                <button key={a} className={`filter-tab${activeArea === a ? ' active' : ''}`}
                  onClick={() => setActiveArea(a)}>{a}</button>
              ))}
            </div>
          </div>
          <div className="filter-group">
            <span className="filter-label">Type</span>
            <select className="filter-select" value={activeType}
              onChange={e => setActiveType(e.target.value)}>
              {TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
          <button className={`filter-toggle${showOngoing ? ' active' : ''}`}
            onClick={() => setShowOngoing(v => !v)}>
            <span className="filter-toggle__dot" />Ongoing only
          </button>
        </div>
      </div>

      {/* DESKTOP AREA BAR */}
      <div className="projects-area-bar projects-area-bar--desktop">
        <div className="container projects-area-bar__inner">
          {AREAS.map(a => (
            <button key={a} className={`area-tab${activeArea === a ? ' active' : ''}`}
              onClick={() => setActiveArea(a)}>{a}</button>
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
                  <button className={`proj-type-btn${activeType === t ? ' active' : ''}`}
                    style={{ '--type-accent': TYPE_ACCENT[t] }}
                    onClick={() => setActiveType(t)}>{t}</button>
                </li>
              ))}
            </ul>
            <div className="proj-sidebar__divider" />
            <button className={`filter-toggle${showOngoing ? ' active' : ''}`}
              onClick={() => setShowOngoing(v => !v)}>
              <span className="filter-toggle__dot" />Ongoing only
            </button>
          </aside>

          <div className="proj-main">
            <p className="projects-count">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </p>
            <div className="projects-grid" ref={gridRef}>
              {filtered.map(p => (
                <div className="project-card" key={p.id}
                  style={{ '--card-type-accent': TYPE_ACCENT[p.type] }}>
                  <div className="project-card__image">
                    {IMG[p.id]
                      ? <img src={IMG[p.id]} alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
                <button className="btn btn--ghost"
                  onClick={() => { setActiveArea('All'); setActiveType('All Types'); setShowOngoing(false) }}>
                  Clear Filters
                </button>
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
  const gid2 = `g2-${(name || type).replace(/[^a-z0-9]/gi, '-')}`
  return (
    <svg viewBox="0 0 400 260" xmlns="http://www.w3.org/2000/svg"
      width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={gid2} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#8a9ab5" stopOpacity=".20" />
          <stop offset="100%" stopColor="#8a9ab5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${gid})`} />
      <rect width="400" height="260" fill={`url(#${gid2})`} />
      {[80, 160, 240, 320].map(x => <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="rgba(255,255,255,0.07)" strokeWidth="1" />)}
      {[52, 104, 156, 208].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="1" />)}
      <rect x="42" y="68" width="84" height="154" fill="rgba(255,255,255,0.09)" rx="2" />
      <rect x="146" y="96" width="104" height="126" fill="rgba(255,255,255,0.08)" rx="2" />
      <rect x="270" y="118" width="66" height="104" fill="rgba(255,255,255,0.07)" rx="2" />
      {[0, 1, 2, 3].map(r => [0, 1, 2].map(c => (
        <rect key={`l${r}${c}`} x={55 + c * 23} y={80 + r * 30} width={14} height={18} fill="rgba(255,255,255,0.20)" rx="1" />
      )))}
      {[0, 1, 2].map(r => [0, 1, 2, 3].map(c => (
        <rect key={`m${r}${c}`} x={156 + c * 22} y={110 + r * 30} width={13} height={17} fill="rgba(255,255,255,0.17)" rx="1" />
      )))}
      <rect x="0" y="222" width="400" height="38" fill="rgba(0,0,0,0.28)" />
      <text x="200" y="244" textAnchor="middle" fill="rgba(197,203,214,0.80)"
        fontSize="9" fontFamily="Arial,sans-serif" fontWeight="700" letterSpacing="2.5">
        {type.toUpperCase()}
      </text>
    </svg>
  )
}