import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)

  // Don't run cursor logic on touch devices
  const isTouchDevice = () =>
    window.matchMedia('(hover: none) and (pointer: coarse)').matches

  useEffect(() => {
    if (isTouchDevice()) return

    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX + 'px'; dot.current.style.top = e.clientY + 'px' }
      if (ring.current) { ring.current.style.left = e.clientX + 'px'; ring.current.style.top = e.clientY + 'px' }
    }
    window.addEventListener('mousemove', move)

    const addHover = () => document.body.classList.add('hovering')
    const rmHover = () => document.body.classList.remove('hovering')
    const attach = () =>
      document.querySelectorAll('a,button,[role="button"]').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', rmHover)
      })
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => { window.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])

  // Don't render the elements at all on touch devices
  if (typeof window !== 'undefined' && isTouchDevice()) return null

  return (
    <>
      <div id="cursor" ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  )
}