import { useEffect, useRef, useState, useCallback } from 'react'
import './Projectshero.css'

const CHIP_DATA = [
    { id: 'stat-n1', target: 26, suffix: '+', label: 'Projects' },
    { id: 'stat-n2', target: 6, suffix: '', label: 'States' },
    { id: 'stat-n3', target: 20, suffix: '+', label: 'Years' },
    { id: 'stat-n4', target: null, label: 'Commitment' },
]

// Stars generated once outside component so they don't regenerate
const STARS = Array.from({ length: 90 }, () => ({
    x: Math.random(),
    y: Math.random() * 0.55,
    r: Math.random() * 1.4 + 0.4,
    phase: Math.random() * Math.PI * 2,
    speed: 0.018 + Math.random() * 0.025,
}))

function lerp(a, b, t) { return a + (b - a) * t }

// Smooth ease in-out
function easeInOut(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

export default function ProjectsHero() {
    // nightProg: 0 = full day, 1 = full night — this is the ONLY source of truth
    const nightProg = useRef(0)
    const targetProg = useRef(0)
    const animating = useRef(false)

    const [isNight, setIsNight] = useState(false)
    const [toggleDisabled, setToggleDisabled] = useState(false)

    const heroRef = useRef(null)
    const canvasRef = useRef(null)
    const bgRef = useRef(null)
    const midRef = useRef(null)
    const fgRef = useRef(null)

    const particlesRef = useRef([])
    const rafRef = useRef(null)

    // ── count-up on mount ──────────────────────────────────────────
    useEffect(() => {
        function countUp(id, target, suffix, dur) {
            const el = document.getElementById(id)
            if (!el) return
            const start = performance.now()
            function step(now) {
                const p = Math.min((now - start) / dur, 1)
                el.textContent = Math.round(p * target) + (suffix || '')
                if (p < 1) requestAnimationFrame(step)
            }
            requestAnimationFrame(step)
        }
        const t = setTimeout(() => {
            countUp('stat-n1', 26, '+', 1400)
            countUp('stat-n2', 6, '', 1000)
            countUp('stat-n3', 20, '+', 1200)
            const el = document.getElementById('stat-n4')
            if (el) el.textContent = '100%'
        }, 900)
        return () => clearTimeout(t)
    }, [])

    // ── mouse parallax + particles ─────────────────────────────────
    useEffect(() => {
        const hero = heroRef.current
        if (!hero) return

        function onMove(e) {
            const r = hero.getBoundingClientRect()
            const mx = e.clientX - r.left
            const my = e.clientY - r.top
            const cx = r.width / 2
            const cy = r.height / 2
            const dx = (mx - cx) / cx
            const dy = (my - cy) / cy

            if (bgRef.current) bgRef.current.style.transform = `translate(${dx * -6}px, ${dy * -4}px)`
            if (midRef.current) midRef.current.style.transform = `translate(${dx * -13}px, ${dy * -8}px)`
            if (fgRef.current) fgRef.current.style.transform = `translate(${dx * -22}px, ${dy * -13}px)`

            if (Math.random() < 0.09)
                particlesRef.current.push({
                    x: mx, y: my,
                    vx: (Math.random() - 0.5) * 1.4,
                    vy: -Math.random() * 2 - 0.3,
                    r: Math.random() * 2.5 + 0.8,
                    life: 55 + Math.random() * 35,
                    maxLife: 55 + Math.random() * 35,
                })
        }

        function onLeave() {
            if (bgRef.current) bgRef.current.style.transform = ''
            if (midRef.current) midRef.current.style.transform = ''
            if (fgRef.current) fgRef.current.style.transform = ''
        }

        hero.addEventListener('mousemove', onMove)
        hero.addEventListener('mouseleave', onLeave)
        return () => {
            hero.removeEventListener('mousemove', onMove)
            hero.removeEventListener('mouseleave', onLeave)
        }
    }, [])

    // ── main canvas render loop ────────────────────────────────────
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

        // Sky colour stops
        // Day:   top #eef4fa  bot #dce8f4
        // Night: top #080f1a  bot #0d1a2e
        const DAY_TOP = [238, 244, 250]
        const DAY_BOT = [220, 232, 244]
        const NITE_TOP = [8, 15, 26]
        const NITE_BOT = [13, 26, 46]

        function lc(a, b, t) {
            return [
                Math.round(lerp(a[0], b[0], t)),
                Math.round(lerp(a[1], b[1], t)),
                Math.round(lerp(a[2], b[2], t)),
            ]
        }

        let frameCount = 0

        function draw() {
            rafRef.current = requestAnimationFrame(draw)
            frameCount++

            const p = nightProg.current   // 0–1
            const W = cv.width
            const H = cv.height

            // ── Sky gradient ──
            const topC = lc(DAY_TOP, NITE_TOP, p)
            const botC = lc(DAY_BOT, NITE_BOT, p)
            const grad = ctx.createLinearGradient(0, 0, 0, H)
            grad.addColorStop(0, `rgb(${topC[0]},${topC[1]},${topC[2]})`)
            grad.addColorStop(1, `rgb(${botC[0]},${botC[1]},${botC[2]})`)
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, W, H)

            // ── Clouds (day only) ──
            const cloudAlpha = Math.max(0, 1 - p * 2.5)
            if (cloudAlpha > 0.01) {
                const clouds = [
                    { cx: 0.15, cy: 0.11, rx: 0.10, ry: 0.055 },
                    { cx: 0.22, cy: 0.08, rx: 0.06, ry: 0.038 },
                    { cx: 0.75, cy: 0.09, rx: 0.11, ry: 0.06 },
                    { cx: 0.83, cy: 0.06, rx: 0.07, ry: 0.042 },
                    { cx: 0.46, cy: 0.05, rx: 0.08, ry: 0.040 },
                ]
                clouds.forEach(c => {
                    ctx.beginPath()
                    ctx.ellipse(c.cx * W, c.cy * H, c.rx * W, c.ry * H, 0, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255,255,255,${cloudAlpha * 0.65})`
                    ctx.fill()
                })
            }

            // ── Sun (day) ──
            const sunAlpha = Math.max(0, 1 - p * 2.2)
            if (sunAlpha > 0.01) {
                const sx = W * 0.82
                const sy = H * 0.22
                // glow
                const sunGlow = ctx.createRadialGradient(sx, sy, 0, sx, sy, 80)
                sunGlow.addColorStop(0, `rgba(255,240,160,${sunAlpha * 0.35})`)
                sunGlow.addColorStop(1, `rgba(255,240,160,0)`)
                ctx.fillStyle = sunGlow
                ctx.fillRect(sx - 80, sy - 80, 160, 160)
                // disc layers
                ctx.beginPath(); ctx.arc(sx, sy, 28, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,240,160,${sunAlpha * 0.85})`; ctx.fill()
                ctx.beginPath(); ctx.arc(sx, sy, 20, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,237,128,${sunAlpha * 0.95})`; ctx.fill()
                ctx.beginPath(); ctx.arc(sx, sy, 13, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255,232,74,${sunAlpha})`; ctx.fill()
                // rays
                for (let i = 0; i < 12; i++) {
                    const a = (i / 12) * Math.PI * 2
                    const len = i % 3 === 0 ? 18 : 11
                    ctx.beginPath()
                    ctx.moveTo(sx + Math.cos(a) * 16, sy + Math.sin(a) * 16)
                    ctx.lineTo(sx + Math.cos(a) * (16 + len), sy + Math.sin(a) * (16 + len))
                    ctx.strokeStyle = `rgba(255,232,74,${sunAlpha * 0.6})`
                    ctx.lineWidth = i % 3 === 0 ? 2.5 : 1.5
                    ctx.lineCap = 'round'
                    ctx.stroke()
                }
            }

            // ── Stars (night) ──
            const starAlpha = Math.max(0, (p - 0.3) / 0.7)
            if (starAlpha > 0.01) {
                STARS.forEach(s => {
                    s.phase += s.speed
                    const twink = 0.55 + 0.45 * Math.sin(s.phase)
                    ctx.beginPath()
                    ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(255,255,255,${starAlpha * twink})`
                    ctx.fill()
                })
            }

            // ── Moon (night) ──
            const moonAlpha = Math.max(0, (p - 0.4) / 0.6)
            if (moonAlpha > 0.01) {
                const mx = W * 0.18
                const my = H * 0.16
                // glow
                const moonGlow = ctx.createRadialGradient(mx, my, 0, mx, my, 60)
                moonGlow.addColorStop(0, `rgba(200,215,240,${moonAlpha * 0.18})`)
                moonGlow.addColorStop(1, `rgba(200,215,240,0)`)
                ctx.fillStyle = moonGlow
                ctx.fillRect(mx - 60, my - 60, 120, 120)
                // crescent: big white disc minus offset circle
                ctx.save()
                ctx.globalAlpha = moonAlpha
                ctx.beginPath(); ctx.arc(mx, my, 22, 0, Math.PI * 2)
                ctx.fillStyle = '#e8eef8'; ctx.fill()
                ctx.beginPath(); ctx.arc(mx + 12, my - 6, 18, 0, Math.PI * 2)
                // cut out crescent using destination-out
                ctx.globalCompositeOperation = 'destination-out'
                ctx.fillStyle = 'rgba(0,0,0,1)'; ctx.fill()
                ctx.globalCompositeOperation = 'source-over'
                // craters
                ctx.globalAlpha = moonAlpha * 0.35
                ctx.beginPath(); ctx.arc(mx - 4, my + 6, 3, 0, Math.PI * 2)
                ctx.fillStyle = '#b0bcd0'; ctx.fill()
                ctx.beginPath(); ctx.arc(mx - 9, my - 2, 2, 0, Math.PI * 2)
                ctx.fillStyle = '#b0bcd0'; ctx.fill()
                ctx.beginPath(); ctx.arc(mx - 2, my + 12, 1.5, 0, Math.PI * 2)
                ctx.fillStyle = '#b0bcd0'; ctx.fill()
                ctx.restore()
            }

            // ── Particles ──
            particlesRef.current.forEach(pt => {
                pt.x += pt.vx; pt.y += pt.vy; pt.vy *= 0.97; pt.life--
                const a = pt.life / pt.maxLife
                ctx.beginPath()
                ctx.arc(pt.x, pt.y, pt.r * a, 0, Math.PI * 2)
                ctx.fillStyle = p > 0.5
                    ? `rgba(197,203,214,${a * 0.4})`
                    : `rgba(200,168,75,${a * 0.3})`
                ctx.fill()
            })
            particlesRef.current = particlesRef.current.filter(pt => pt.life > 0)

            // ── Advance animation ──
            if (animating.current) {
                const diff = targetProg.current - nightProg.current
                if (Math.abs(diff) < 0.005) {
                    nightProg.current = targetProg.current
                    animating.current = false
                    setToggleDisabled(false)
                } else {
                    nightProg.current += diff * 0.04
                }
            }

            // ── Update SVG building colours via CSS variables on canvas ──
            // We use a data attribute on the hero div so CSS can react,
            // but buildings are coloured inline so we update them via JS
            updateBuildingColors(nightProg.current)
        }

        draw()
        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(rafRef.current)
        }
    }, []) // eslint-disable-line

    // ── Update building fill colours in the SVG ────────────────────
    // We drive SVG rect/polygon fills by setting CSS custom properties
    // on the SVG element, which we read via inline style in JSX
    function updateBuildingColors(p) {
        const hero = heroRef.current
        if (!hero) return
        const svg = hero.querySelector('.ph__city')
        if (!svg) return

        function lerpHex(c1, c2, t) {
            const h = v => [
                parseInt(v.slice(1, 3), 16),
                parseInt(v.slice(3, 5), 16),
                parseInt(v.slice(5, 7), 16),
            ]
            const a = h(c1), b = h(c2)
            return `rgb(${Math.round(lerp(a[0], b[0], t))},${Math.round(lerp(a[1], b[1], t))},${Math.round(lerp(a[2], b[2], t))})`
        }

        svg.style.setProperty('--b-bg1-top', lerpHex('#b8cce0', '#1a2d48', p))
        svg.style.setProperty('--b-bg1-bot', lerpHex('#9ab4cc', '#0f1e30', p))
        svg.style.setProperty('--b-bg2-top', lerpHex('#ccdce8', '#223050', p))
        svg.style.setProperty('--b-bg2-bot', lerpHex('#b4c8d8', '#162038', p))
        svg.style.setProperty('--b-fg1-top', lerpHex('#2c3d5c', '#1e2a4a', p))
        svg.style.setProperty('--b-fg1-bot', lerpHex('#1a2840', '#0d1520', p))
        svg.style.setProperty('--b-fg2-top', lerpHex('#3a4e72', '#2a3d5e', p))
        svg.style.setProperty('--b-fg2-bot', lerpHex('#2a3a58', '#1a2840', p))
        svg.style.setProperty('--b-fg3-top', lerpHex('#526480', '#3a4e6a', p))
        svg.style.setProperty('--b-fg3-bot', lerpHex('#3a4e6a', '#2a3a58', p))
        svg.style.setProperty('--b-gnd-top', lerpHex('#d4e0ec', '#1a2438', p))
        svg.style.setProperty('--b-gnd-bot', lerpHex('#c4d4e4', '#121c2c', p))
        svg.style.setProperty('--b-road', lerpHex('#b8ccdc', '#121c2c', p))

        // window alpha for night glow
        const winDay = `rgba(255,255,255,0.22)`
        const nightWin = p > 0.5

        svg.querySelectorAll('[data-win="day"]').forEach(el => {
            el.style.fill = nightWin ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.22)'
        })
        svg.querySelectorAll('[data-win="warm"]').forEach(el => {
            el.style.fill = nightWin ? '#ffe080' : 'rgba(255,255,255,0.22)'
            el.style.filter = nightWin ? 'drop-shadow(0 0 3px #ffe080)' : 'none'
        })
        svg.querySelectorAll('[data-win="cool"]').forEach(el => {
            el.style.fill = nightWin ? '#a8d4f0' : 'rgba(255,255,255,0.22)'
            el.style.filter = nightWin ? 'drop-shadow(0 0 3px #a8d4f0)' : 'none'
        })

        // street lamp glow
        const lamp = svg.querySelector('[data-lamp]')
        if (lamp) {
            lamp.style.fill = nightWin ? '#ffe080' : '#ffe84a'
            lamp.style.filter = nightWin ? 'drop-shadow(0 0 8px #ffe080)' : 'none'
            lamp.style.opacity = nightWin ? '1' : '0.7'
        }

        // beacon lights
        svg.querySelectorAll('[data-beacon]').forEach(el => {
            el.style.filter = nightWin ? 'drop-shadow(0 0 7px #ff6b6b)' : 'none'
        })

        // ground road dashes
        svg.querySelectorAll('[data-dash]').forEach(el => {
            el.style.fill = nightWin ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.5)'
        })
    }

    // ── Toggle ──────────────────────────────────────────────────────
    const handleToggle = useCallback(() => {
        if (toggleDisabled) return
        setToggleDisabled(true)
        const next = !isNight
        setIsNight(next)
        targetProg.current = next ? 1 : 0
        animating.current = true
    }, [isNight, toggleDisabled])

    return (
        <section className="ph" ref={heroRef}>
            {/* Canvas — sky + sun + moon + stars + clouds + particles */}
            <canvas className="ph__canvas" ref={canvasRef} />

            {/* City SVG — buildings driven by CSS vars set from canvas loop */}
            <svg
                className="ph__city"
                viewBox="0 0 1200 480"
                preserveAspectRatio="xMidYMax meet"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="phBg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--b-bg1-top, #b8cce0)" />
                        <stop offset="100%" stopColor="var(--b-bg1-bot, #9ab4cc)" />
                    </linearGradient>
                    <linearGradient id="phBg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--b-bg2-top, #ccdce8)" />
                        <stop offset="100%" stopColor="var(--b-bg2-bot, #b4c8d8)" />
                    </linearGradient>
                    <linearGradient id="phFg1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--b-fg1-top, #2c3d5c)" />
                        <stop offset="100%" stopColor="var(--b-fg1-bot, #1a2840)" />
                    </linearGradient>
                    <linearGradient id="phFg2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--b-fg2-top, #3a4e72)" />
                        <stop offset="100%" stopColor="var(--b-fg2-bot, #2a3a58)" />
                    </linearGradient>
                    <linearGradient id="phFg3" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--b-fg3-top, #526480)" />
                        <stop offset="100%" stopColor="var(--b-fg3-bot, #3a4e6a)" />
                    </linearGradient>
                    <linearGradient id="phGnd" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--b-gnd-top, #d4e0ec)" />
                        <stop offset="100%" stopColor="var(--b-gnd-bot, #c4d4e4)" />
                    </linearGradient>
                </defs>

                {/* Ground */}
                <rect x="0" y="445" width="1200" height="35" fill="url(#phGnd)" />
                <rect x="0" y="458" width="1200" height="22" fill="var(--b-road, #b8ccdc)" />
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
                    <rect key={i} data-dash="1" x={i * 130 + 20} y="466" width="70" height="4" rx="2"
                        fill="rgba(255,255,255,0.5)" />
                ))}

                {/* ── Background layer ── */}
                <g ref={bgRef} style={{ transition: 'transform .12s ease-out' }}>
                    {[40, 110, 170, 230, 290, 850, 920, 980, 1050, 1120].map((x, i) => (
                        <rect key={'fb' + i} x={x} y={300 - i % 3 * 28} width={42 + i % 2 * 18} height={180 + i % 3 * 28}
                            fill="url(#phBg1)" />
                    ))}
                </g>

                {/* ── Mid layer ── */}
                <g ref={midRef} style={{ transition: 'transform .12s ease-out' }}>
                    {[60, 140, 210, 280, 800, 870, 950, 1030, 1100].map((x, i) => (
                        <rect key={'mb' + i} x={x} y={260 - i % 3 * 22} width={58 + i % 2 * 14} height={220 + i % 3 * 22}
                            fill="url(#phBg2)" />
                    ))}
                    {/* Mid tower left */}
                    <rect x="75" y="190" width="85" height="270" fill="url(#phFg3)" />
                    <polygon points="75,190 160,190 168,176 83,176" fill="url(#phFg3)" />
                    {/* Mid tower right */}
                    <rect x="910" y="200" width="95" height="260" fill="url(#phFg3)" />
                    <polygon points="910,200 1005,200 1012,186 918,186" fill="url(#phFg3)" />
                    {/* Windows mid left */}
                    {[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c => (
                        <rect key={`mwl${r}${c}`}
                            data-win={(r * 3 + c) % 4 === 0 ? 'warm' : (r * 3 + c) % 3 === 0 ? 'cool' : 'day'}
                            x={86 + c * 24} y={202 + r * 44} width={16} height={26}
                            fill="rgba(255,255,255,0.22)" rx="1" />
                    )))}
                    {/* Windows mid right */}
                    {[0, 1, 2, 3, 4].map(r => [0, 1, 2].map(c => (
                        <rect key={`mwr${r}${c}`}
                            data-win={(r * 3 + c) % 5 === 0 ? 'warm' : (r * 3 + c) % 3 === 0 ? 'cool' : 'day'}
                            x={922 + c * 28} y={212 + r * 42} width={20} height={28}
                            fill="rgba(255,255,255,0.22)" rx="1" />
                    )))}
                </g>

                {/* ── Foreground layer ── */}
                <g ref={fgRef} style={{ transition: 'transform .12s ease-out' }}>
                    {/* Left tower */}
                    <rect x="195" y="90" width="105" height="375" fill="url(#phFg1)" />
                    <polygon points="195,90 300,90 312,74 207,74" fill="url(#phFg1)" />
                    <rect x="245" y="50" width="5" height="24" fill="#3a4e72" />
                    <circle cx="247" cy="47" r="5" data-beacon="1" fill="#e8584a" opacity=".9" />

                    <rect x="312" y="140" width="90" height="325" fill="url(#phFg2)" />
                    <rect x="314" y="130" width="86" height="14" fill="url(#phFg2)" />

                    {/* Centre tower */}
                    <rect x="500" y="48" width="130" height="420" fill="url(#phFg1)" />
                    <polygon points="500,48 630,48 630,24 563,6 500,24" fill="url(#phFg1)" />
                    <rect x="561" y="0" width="5" height="30" fill="#3a4e72" />
                    <circle cx="563" cy="-2" r="6" data-beacon="1" fill="#e8584a" opacity=".85" />

                    <rect x="640" y="108" width="100" height="360" fill="url(#phFg2)" />
                    <rect x="642" y="98" width="96" height="14" fill="url(#phFg2)" />

                    {/* Right tower */}
                    <rect x="830" y="78" width="115" height="390" fill="url(#phFg1)" />
                    <polygon points="830,78 945,78 956,62 841,62" fill="url(#phFg1)" />
                    <rect x="878" y="52" width="5" height="20" fill="#3a4e72" />

                    <rect x="956" y="148" width="85" height="320" fill="url(#phFg2)" />

                    {/* Windows — centre tower */}
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(r => [0, 1, 2, 3, 4].map(c => (
                        <rect key={`cw${r}${c}`}
                            data-win={(r * 5 + c) % 7 === 0 ? 'warm' : (r * 5 + c) % 4 === 0 ? 'cool' : 'day'}
                            x={510 + c * 22} y={60 + r * 38} width={15} height={24}
                            fill="rgba(255,255,255,0.18)" rx="1" />
                    )))}
                    {/* Windows — left tower */}
                    {[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2, 3].map(c => (
                        <rect key={`lw${r}${c}`}
                            data-win={(r * 4 + c) % 6 === 0 ? 'warm' : (r * 4 + c) % 4 === 0 ? 'cool' : 'day'}
                            x={205 + c * 22} y={100 + r * 54} width={15} height={34}
                            fill="rgba(255,255,255,0.20)" rx="1" />
                    )))}
                    {/* Windows — right tower */}
                    {[0, 1, 2, 3, 4, 5].map(r => [0, 1, 2, 3].map(c => (
                        <rect key={`rw${r}${c}`}
                            data-win={(r * 4 + c) % 7 === 0 ? 'warm' : (r * 4 + c) % 5 === 0 ? 'cool' : 'day'}
                            x={840 + c * 24} y={90 + r * 56} width={17} height={36}
                            fill="rgba(255,255,255,0.17)" rx="1" />
                    )))}

                    {/* Crane */}
                    <rect x="478" y="110" width="7" height="310" fill="#5a6e8c" opacity=".7" />
                    <rect x="416" y="106" width="140" height="7" fill="#5a6e8c" opacity=".75" />
                    <rect x="485" y="106" width="65" height="5" fill="#8a9ab5" opacity=".5" />
                    <rect x="538" y="96" width="18" height="14" fill="#c8a84b" opacity=".8" />
                    <line x1="440" y1="113" x2="440" y2="175" stroke="#8a9ab5" strokeWidth="1.5" opacity=".5" />
                    <rect x="433" y="175" width="14" height="7" fill="#c8a84b" opacity=".75" />

                    {/* Street lamp */}
                    <rect x="455" y="378" width="4" height="68" fill="#5a6e8c" opacity=".6" />
                    <path d="M457,378 Q465,367 476,370" stroke="#5a6e8c" strokeWidth="2.5" fill="none" opacity=".6" />
                    <circle cx="477" cy="370" r="5" data-lamp="1" fill="#ffe84a" opacity=".7" />
                </g>
            </svg>

            {/* ── Toggle ── */}
            <button
                className={`ph__toggle${isNight ? ' ph__toggle--night' : ''}`}
                onClick={handleToggle}
                disabled={toggleDisabled}
                aria-label={isNight ? 'Switch to day' : 'Switch to night'}
            >
                <span className="ph__toggle-track">
                    <span className="ph__toggle-thumb">
                        {isNight ? <MoonIcon /> : <SunIcon />}
                    </span>
                </span>
                <span className="ph__toggle-label">
                    {isNight ? 'Night' : 'Day'}
                </span>
            </button>

            {/* ── Text ── */}
            <div className="ph__info">
                <div className="ph__eyebrow">
                    <span className="ph__eyebrow-line" />
                    <span className="ph__eyebrow-text">Our Work</span>
                </div>
                <h1 className={`ph__title${isNight ? ' ph__title--night' : ''}`}>
                    Every structure<br />tells a <em>story.</em>
                </h1>
                <p className={`ph__sub${isNight ? ' ph__sub--night' : ''}`}>
                    From Mumbai's skyline to Gujarat's highways —<br />
                    built with precision and pride.
                </p>
                <div className="ph__chips">
                    {CHIP_DATA.map(c => (
                        <div className={`ph__chip${isNight ? ' ph__chip--night' : ''}`} key={c.label}>
                            <strong id={c.id}>0</strong>
                            <span>{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function SunIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#c8a84b" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    )
}

function MoonIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
            stroke="#c5cbd6" strokeWidth="2.5" strokeLinecap="round">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 0010 9.79z" />
        </svg>
    )
}