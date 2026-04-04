import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Home.css'
import svcImg1 from '../assets/Untitled design (4).png'
import svcImg2 from '../assets/Untitled design (3).png'
import svcImg3 from '../assets/Untitled design (2).png'
import svcImg4 from '../assets/Untitled design (1).png'
import svcImg5 from '../assets/Untitled design.png'
import bannerImg from '../assets/homepage banner.jpeg'

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
    photo: svcImg1,
  },
]

const STATS = [
  { num: '20+', label: 'Years of Experience' },
  { num: '80+', label: 'Projects Completed' },
  { num: '6', label: 'States Served' },
  { num: '100%', label: 'On-Time Delivery' },
]

/* ─────────────────────────────────────────
   Service image illustrations (SVG)
   One per service, light cream/gold/navy theme
───────────────────────────────────────── */
function ServiceIllustration({ type }) {
  const defs = (
    <defs>
      <linearGradient id="sg1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F5F2EE" />
        <stop offset="100%" stopColor="#E8E4DE" />
      </linearGradient>
      <linearGradient id="sg2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C8A84B" />
        <stop offset="100%" stopColor="#A88C38" />
      </linearGradient>
      <linearGradient id="sg3" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E2D4E" />
        <stop offset="100%" stopColor="#0C172A" />
      </linearGradient>
    </defs>
  )

  if (type === 'road') return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {defs}
      <rect width="480" height="360" fill="url(#sg1)" />
      {/* Sky */}
      <rect width="480" height="180" fill="#EEF3F8" />
      {/* Mountains */}
      <polygon points="0,180 80,80 160,180" fill="#D0D8E4" opacity=".6" />
      <polygon points="80,180 180,60 280,180" fill="#C8D4E0" opacity=".5" />
      <polygon points="220,180 340,90 440,180" fill="#D8E0EC" opacity=".55" />
      {/* Ground */}
      <rect x="0" y="180" width="480" height="180" fill="#C8C4BC" />
      {/* Road */}
      <polygon points="140,180 340,180 460,360 20,360" fill="#6E6A62" />
      {/* Road markings */}
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={225} y={195 + i * 44} width="30" height="22" rx="2" fill="white" opacity=".3" />
      ))}
      {/* Road edge lines */}
      <line x1="140" y1="180" x2="20" y2="360" stroke="#C8A84B" strokeWidth="2.5" opacity=".7" />
      <line x1="340" y1="180" x2="460" y2="360" stroke="#C8A84B" strokeWidth="2.5" opacity=".7" />
      {/* Machinery */}
      <rect x="60" y="155" width="80" height="35" rx="4" fill="url(#sg2)" />
      <rect x="50" y="175" width="100" height="14" rx="3" fill="#9A7E34" />
      <circle cx="68" cy="192" r="10" fill="#1E2D4E" /><circle cx="68" cy="192" r="5" fill="#C8A84B" />
      <circle cx="128" cy="192" r="10" fill="#1E2D4E" /><circle cx="128" cy="192" r="5" fill="#C8A84B" />
      <rect x="62" y="140" width="60" height="18" rx="3" fill="#1E2D4E" />
      {/* Accent strip */}
      <rect x="0" y="352" width="480" height="8" fill="url(#sg2)" />
    </svg>
  )

  if (type === 'building') return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {defs}
      <rect width="480" height="360" fill="#EEF3F8" />
      {/* Sky gradient */}
      <rect width="480" height="240" fill="#E8F0F8" />
      {/* Main building */}
      <rect x="140" y="60" width="200" height="260" fill="url(#sg1)" />
      <polygon points="140,60 340,60 370,46 110,46" fill="url(#sg2)" />
      <polygon points="340,60 380,78 380,320 340,320" fill="#D8D4CE" />
      {/* Windows grid */}
      {[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2, 3].map(c => (
        <rect key={`w${r}${c}`} x={152 + c * 44} y={74 + r * 38} width="36" height="28" rx="1"
          fill={r === 2 && c === 1 ? '#C8A84B' : r === 4 && c === 3 ? '#C8A84B' : '#5BA3CC'}
          opacity={r === 2 && c === 1 || r === 4 && c === 3 ? .7 : .45} />
      )))}
      {/* Accent lines */}
      {[0, 1, 2, 3, 4, 5].map(r => (
        <rect key={`l${r}`} x="140" y={70 + r * 38} width="200" height="2" fill="#1E2D4E" opacity=".08" />
      ))}
      {/* Side buildings */}
      <rect x="30" y="130" width="100" height="190" fill="#D8D4CE" opacity=".7" />
      <polygon points="30,130 130,130 150,120 50,120" fill="#C8A84B" opacity=".4" />
      <rect x="350" y="110" width="110" height="210" fill="#D0CCc8" opacity=".6" />
      <polygon points="350,110 460,110 460,100 360,100" fill="#C8A84B" opacity=".35" />
      {/* Ground */}
      <rect x="0" y="318" width="480" height="42" fill="#C0BCB4" />
      <rect x="0" y="316" width="480" height="4" fill="url(#sg2)" opacity=".6" />
    </svg>
  )

  if (type === 'planning') return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {defs}
      <rect width="480" height="360" fill="url(#sg1)" />
      {/* Blueprint paper */}
      <rect x="40" y="40" width="400" height="280" rx="4" fill="#EEF3F8" stroke="#C2CED8" strokeWidth="1.5" />
      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={`h${i}`} x1="40" y1={70 + i * 35} x2="440" y2={70 + i * 35} stroke="#C2CED8" strokeWidth=".7" opacity=".5" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
        <line key={`v${i}`} x1={80 + i * 40} y1="40" x2={80 + i * 40} y2="320" stroke="#C2CED8" strokeWidth=".7" opacity=".5" />
      ))}
      {/* Floor plan outline */}
      <rect x="120" y="90" width="240" height="170" fill="none" stroke="#1E2D4E" strokeWidth="2.5" />
      {/* Rooms */}
      <line x1="120" y1="175" x2="280" y2="175" stroke="#1E2D4E" strokeWidth="1.5" />
      <line x1="260" y1="90" x2="260" y2="175" stroke="#1E2D4E" strokeWidth="1.5" />
      <line x1="200" y1="175" x2="200" y2="260" stroke="#1E2D4E" strokeWidth="1.5" />
      {/* Door arcs */}
      <path d="M 260 120 Q 245 120 245 135" fill="none" stroke="#C8A84B" strokeWidth="1.5" />
      <path d="M 200 200 Q 185 200 185 215" fill="none" stroke="#C8A84B" strokeWidth="1.5" />
      {/* Dimensions */}
      <line x1="120" y1="78" x2="360" y2="78" stroke="#C8A84B" strokeWidth="1" markerEnd="url(#arr)" />
      <text x="240" y="74" textAnchor="middle" fill="#C8A84B" fontSize="9" fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="1">12.5 M</text>
      {/* Compass */}
      <circle cx="400" cy="80" r="22" fill="none" stroke="#1E2D4E" strokeWidth="1.5" />
      <polygon points="400,60 396,80 400,76 404,80" fill="#C8A84B" />
      <polygon points="400,100 396,80 400,84 404,80" fill="#1E2D4E" opacity=".4" />
      <text x="400" y="57" textAnchor="middle" fill="#1E2D4E" fontSize="8" fontFamily="Montserrat,sans-serif" fontWeight="700">N</text>
      {/* Accent strip */}
      <rect x="40" y="308" width="400" height="5" rx="2" fill="url(#sg2)" />
    </svg>
  )

  if (type === 'management') return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {defs}
      <rect width="480" height="360" fill="url(#sg1)" />
      {/* Gantt-style chart */}
      <rect x="40" y="40" width="400" height="280" rx="4" fill="#FDFCFA" stroke="#C2CED8" strokeWidth="1" />
      {/* Header */}
      <rect x="40" y="40" width="400" height="36" rx="4" fill="url(#sg3)" />
      <text x="240" y="63" textAnchor="middle" fill="rgba(200,168,75,.9)" fontSize="10" fontFamily="Montserrat,sans-serif" fontWeight="700" letterSpacing="3">PROJECT TIMELINE</text>
      {/* Row labels */}
      {['Design', 'Foundation', 'Structure', 'Facade', 'MEP', 'Handover'].map((label, i) => (
        <g key={label}>
          <text x="58" y={100 + i * 36} fill="#2B3447" fontSize="9" fontFamily="Montserrat,sans-serif" fontWeight="600">{label}</text>
          <rect x="140" y={88 + i * 36} width={[180, 120, 200, 160, 140, 80][i]} height="16" rx="3"
            fill={i === 0 || i === 2 || i === 4 ? '#C8A84B' : '#1E2D4E'} opacity={.75} />
          {i < 5 && <line x1="40" y1={108 + i * 36} x2="440" y2={108 + i * 36} stroke="#C2CED8" strokeWidth=".6" />}
        </g>
      ))}
      {/* Progress dots */}
      <circle cx="320" cy="98" r="5" fill="white" stroke="#C8A84B" strokeWidth="2" />
      <circle cx="260" cy="134" r="5" fill="white" stroke="#1E2D4E" strokeWidth="2" />
      {/* Today line */}
      <line x1="300" y1="76" x2="300" y2="310" stroke="#E8584A" strokeWidth="1.5" strokeDasharray="4 3" opacity=".6" />
      <rect x="284" y="66" width="32" height="12" rx="3" fill="#E8584A" opacity=".8" />
      <text x="300" y="75" textAnchor="middle" fill="white" fontSize="7" fontFamily="Montserrat,sans-serif" fontWeight="700">TODAY</text>
    </svg>
  )

  if (type === 'turnkey') return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {defs}
      <rect width="480" height="360" fill="url(#sg1)" />
      {/* Central key icon */}
      <circle cx="240" cy="140" r="70" fill="none" stroke="#C8A84B" strokeWidth="2" opacity=".3" />
      <circle cx="240" cy="140" r="50" fill="none" stroke="#1E2D4E" strokeWidth="1.5" opacity=".15" />
      {/* Key shape */}
      <circle cx="240" cy="120" r="28" fill="none" stroke="#1E2D4E" strokeWidth="3" />
      <circle cx="240" cy="120" r="16" fill="#C8A84B" opacity=".25" />
      <rect x="236" y="146" width="8" height="55" rx="2" fill="#1E2D4E" />
      <rect x="236" y="178" width="20" height="7" rx="1.5" fill="#C8A84B" />
      <rect x="236" y="192" width="14" height="7" rx="1.5" fill="#C8A84B" />
      {/* Phase labels around */}
      {[
        ['Concept', 160, 62], ['Design', 330, 100], ['Procurement', 350, 200],
        ['Construction', 220, 265], ['Handover', 80, 200], ['Monitoring', 76, 100]
      ].map(([label, x, y]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="22" fill="white" stroke="#C8A84B" strokeWidth="1.5" opacity=".9" />
          <text x={x} y={y + 3} textAnchor="middle" fill="#1E2D4E" fontSize="7.5" fontFamily="Montserrat,sans-serif" fontWeight="700">{label}</text>
          <line x1={x} y1={y} x2="240" y2="140" stroke="#C8A84B" strokeWidth="1" strokeDasharray="3 3" opacity=".3" />
        </g>
      ))}
      {/* Bottom accent */}
      <rect x="80" y="315" width="320" height="4" rx="2" fill="url(#sg2)" />
    </svg>
  )

  if (type === 'quality') return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      {defs}
      <rect width="480" height="360" fill="url(#sg1)" />
      {/* Shield */}
      <path d="M240 50 L340 90 L340 200 Q340 270 240 310 Q140 270 140 200 L140 90 Z" fill="none" stroke="#1E2D4E" strokeWidth="2.5" opacity=".2" />
      <path d="M240 65 L325 100 L325 200 Q325 258 240 294 Q155 258 155 200 L155 100 Z" fill="white" stroke="#C8A84B" strokeWidth="2" />
      {/* Check mark */}
      <polyline points="188,188 222,222 288,155" fill="none" stroke="#C8A84B" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* ISO badge */}
      <circle cx="330" cy="280" r="38" fill="url(#sg3)" />
      <text x="330" y="276" textAnchor="middle" fill="#C8A84B" fontSize="11" fontFamily="Montserrat,sans-serif" fontWeight="700">ISO</text>
      <text x="330" y="291" textAnchor="middle" fill="white" fontSize="7.5" fontFamily="Montserrat,sans-serif" fontWeight="600" letterSpacing="1">CERTIFIED</text>
      {/* Stars */}
      {[-2, -1, 0, 1, 2].map((d, i) => (
        <text key={i} x={136 + d * 22} y="50" textAnchor="middle" fill="#C8A84B" fontSize="14" opacity={.6 + i * .08}>★</text>
      ))}
      {/* Bottom strip */}
      <rect x="60" y="330" width="360" height="5" rx="2" fill="url(#sg2)" opacity=".7" />
    </svg>
  )

  return null
}

/* ─────────────────────────────────────────
   Building SVG — night scene (moved to Intro)
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
      <rect width="460" height="600" fill="url(#svSky)" />
      {[[22, 30], [70, 18], [130, 48], [200, 25], [270, 12], [340, 40], [400, 22], [50, 75],
      [155, 85], [295, 65], [360, 95], [110, 105], [240, 90], [430, 55], [180, 32], [310, 44]
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 1.4 : i % 3 === 0 ? 1 : .65} fill="white" opacity={.12 + .22 * (i % 3)} />
      ))}
      <circle cx="390" cy="48" r="22" fill="#FFF8DC" opacity=".1" />
      <circle cx="397" cy="44" r="17" fill="#04080F" opacity=".95" />
      {[[18, 320, 28, 215], [50, 295, 20, 240], [76, 268, 16, 295], [102, 308, 24, 255],
      [138, 325, 18, 238], [350, 300, 26, 260], [378, 278, 18, 282], [404, 310, 22, 252], [388, 294, 14, 268]
      ].map(([x, y, w, h], i) => (
        <rect key={'c' + i} x={x} y={y} width={w} height={h} fill="#142035" opacity=".55" />
      ))}
      <rect x="0" y="500" width="460" height="100" fill="url(#svGround)" />
      <rect x="0" y="498" width="460" height="3" fill="#C8A84B" opacity=".2" />
      {[0, 1, 2, 3, 4, 5].map(i => (
        <rect key={'rd' + i} x={i * 80 + 10} y="522" width="48" height="3" rx="1.5" fill="white" opacity=".05" />
      ))}
      {[55, 400].map((x, i) => (
        <g key={'lamp' + i}>
          <rect x={x - 1.5} y="472" width="3" height="40" fill="#253552" opacity=".5" />
          <path d={`M${x} 472 Q${x + 10} 462 ${x + 18} 465`} stroke="#253552" strokeWidth="2" fill="none" opacity=".5" />
          <circle cx={x + 18} cy="465" r="4" fill="#FFE84A" opacity=".65" filter="url(#svGlow)" />
        </g>
      ))}
      <rect x="100" y="470" width="260" height="32" fill="#101E35" />
      <polygon points="100,470 58,482 58,502 100,502" fill="#080F1E" />
      <polygon points="360,470 402,480 402,502 360,502" fill="#060C1A" />
      <rect x="100" y="466" width="260" height="5" fill="#C8A84B" opacity=".5" />
      <rect x="148" y="428" width="164" height="44" fill="url(#svLobby)" />
      <polygon points="148,428 106,440 106,472 148,472" fill="#080F1E" />
      <polygon points="312,428 354,438 354,472 312,472" fill="#060C1A" />
      {[0, 1, 2, 3].map(i => (
        <rect key={'ld' + i} x={156 + i * 36} y="433" width="28" height="36" fill="url(#svWinBlue)" opacity=".5" />
      ))}
      <rect x="148" y="424" width="164" height="5" fill="#C8A84B" opacity=".45" />
      {[0, 1, 2, 3, 4, 5].map(f => {
        const y = 424 - (f + 1) * 46
        const goldWins = [[1, 3], [0, 2, 4], [2], [1, 4], [0, 3], [2, 4]][f] || []
        const blueWins = [[0], [4], [0, 3], [2], [1], [0, 3]][f] || []
        return (
          <g key={'f' + f} data-floor={f}>
            <rect x="110" y={y} width="240" height="44" fill="url(#svFace)" />
            <polygon points={`110,${y} 68,${y + 12} 68,${y + 56} 110,${y + 44}`} fill="url(#svSide)" />
            <polygon points={`350,${y} 392,${y + 10} 392,${y + 54} 350,${y + 44}`} fill="#060C1A" />
            <rect x="110" y={y + 42} width="240" height="3" fill="#C8A84B" opacity=".18" />
            <rect x="110" y={y} width="240" height="2" fill="rgba(200,168,75,.1)" />
            {[0, 1, 2, 3, 4].map(w => {
              const isGold = goldWins.includes(w)
              const isBlue = blueWins.includes(w)
              return (
                <g key={'w' + w}>
                  <rect x={122 + w * 42} y={y + 8} width="30" height="28"
                    fill={isGold ? 'url(#svWinGold)' : isBlue ? 'url(#svWinBlue)' : 'url(#svWinOff)'}
                    opacity={isGold ? 1 : isBlue ? .62 : .85}
                    filter={isGold ? 'url(#svWinGlow)' : undefined} />
                  <line x1={137 + w * 42} y1={y + 8} x2={137 + w * 42} y2={y + 36} stroke="rgba(255,255,255,.04)" strokeWidth="1" />
                  <line x1={122 + w * 42} y1={y + 22} x2={152 + w * 42} y2={y + 22} stroke="rgba(255,255,255,.03)" strokeWidth=".8" />
                </g>
              )
            })}
            {[0, 1].map(w => (
              <polygon key={'sw' + w}
                points={`110,${y + 10 + w * 20} 72,${y + 14 + w * 20} 72,${y + 28 + w * 20} 110,${y + 24 + w * 20}`}
                fill="url(#svWinOff)" opacity=".4" />
            ))}
          </g>
        )
      })}
      <g>
        <rect x="110" y="102" width="240" height="22" fill="#162035" />
        <polygon points="110,102 68,114 68,124 110,124" fill="#080F1E" />
        <polygon points="350,102 392,110 392,122 350,124" fill="#060C1A" />
        <rect x="110" y="98" width="240" height="6" fill="url(#svTop)" />
        <rect x="226" y="60" width="8" height="40" fill="#9BAAB8" opacity=".45" />
        <rect x="222" y="58" width="16" height="5" fill="#C8A84B" opacity=".65" />
        <circle cx="230" cy="57" r="6" fill="#E8584A" opacity=".9" filter="url(#svGlow)" />
      </g>
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
  const svgRef = useRef(null)            // building SVG — now in intro section
  const svcRef = useRef(null)
  const cardRefs = useRef([])
  const [activeService, setActiveService] = useState(0)
  const navigate = useNavigate()

  /* ── Services scroll: Lenis-style native scroll observer ── */
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

  /* ── GSAP hero + building reveal + generic reveals ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.fromTo('.h-label', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 })
        .fromTo('.h-word', { opacity: 0, y: 70, skewY: 4 }, { opacity: 1, y: 0, skewY: 0, stagger: .09, duration: 1 }, '-=.3')
        .fromTo('.h-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .8 }, '-=.5')
        .fromTo('.h-actions', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.4')
        .fromTo('.h-stats', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .7 }, '-=.3')

      // Building in intro — reveal all floors at once on scroll
      if (svgRef.current) {
        const svg = svgRef.current
        const allFloors = [
          ...[0, 1, 2, 3, 4, 5].map(i => svg.querySelector(`[data-floor="${i}"]`)),
        ].filter(Boolean)
        gsap.set(allFloors, { opacity: 0, y: 20 })
        ScrollTrigger.create({
          trigger: '.intro__img',
          start: 'top 80%',
          onEnter: () => {
            gsap.to(allFloors, { opacity: 1, y: 0, duration: .7, stagger: .1, ease: 'power3.out' })
          }
        })
      }

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

      {/* ══ INTRO — with building animation ══ */}
      <section className="intro">
        <div className="container intro__grid">
          <div className="intro__text">
            <div className="eyebrow reveal"><span className="eyebrow__line" /><span className="eyebrow__text">Who We Are</span></div>
            <h2 className="intro__title reveal">Built with purpose,<br /><em>crafted to last.</em></h2>
            <p className="reveal">ROSA Infra is a multi-disciplinary civil contracting firm founded to address the diverse construction needs of clients throughout India.</p>
            <p className="reveal">Each company consists of highly qualified individuals with unique backgrounds in infrastructure development and practical implementation experience.</p>
            <button className="btn btn--ghost reveal" onClick={() => navigate('/about')}>Our Story →</button>
          </div>
          {/* Building SVG animation moved here */}
          <div className="intro__img reveal">
            <BuildingSVG svgRef={svgRef} />
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
                {/* Mobile-only inline image — hidden on desktop via CSS */}
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