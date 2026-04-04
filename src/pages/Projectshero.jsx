import { useEffect, useRef, useState } from 'react'
import './Projectshero.css'
import heroBg from '../assets/Untitled design (2).png'

const CHIP_DATA = [
    { id: 'stat-n1', target: 26, suffix: '+', label: 'Projects' },
    { id: 'stat-n2', target: 6, suffix: '', label: 'States' },
    { id: 'stat-n3', target: 20, suffix: '+', label: 'Years' },
    { id: 'stat-n4', target: null, label: 'Commitment' },
]

export default function ProjectsHero() {
    const heroRef = useRef(null)

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

    return (
        <section className="ph" ref={heroRef}>
            {/* Background image */}
            <div className="ph__bg">
                <img src={heroBg} alt="" className="ph__bg-img" />
                <div className="ph__bg-overlay" />
            </div>

            {/* Text */}
            <div className="ph__info">
                <div className="ph__eyebrow">
                    <span className="ph__eyebrow-line" />
                    <span className="ph__eyebrow-text">Our Work</span>
                </div>
                <h1 className="ph__title">
                    Every structure<br />tells a <em>story.</em>
                </h1>
                <p className="ph__sub">
                    From Mumbai's skyline to Gujarat's highways —<br />
                    built with precision and pride.
                </p>
                <div className="ph__chips">
                    {CHIP_DATA.map(c => (
                        <div className="ph__chip" key={c.label}>
                            <strong id={c.id}>0</strong>
                            <span>{c.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}