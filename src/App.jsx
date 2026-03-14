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

  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX+'px'; dot.current.style.top = e.clientY+'px' }
      if (ring.current) { ring.current.style.left = e.clientX+'px'; ring.current.style.top = e.clientY+'px' }
    }
    window.addEventListener('mousemove', move)
    const addHover = () => document.body.classList.add('hovering')
    const rmHover  = () => document.body.classList.remove('hovering')
    const hoverEls = () => document.querySelectorAll('a,button,[role="button"]')
    const attach = () => hoverEls().forEach(el => { el.addEventListener('mouseenter',addHover); el.addEventListener('mouseleave',rmHover) })
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList:true, subtree:true })
    return () => { window.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])

  return (
    <>
      <div id="cursor" ref={dot}/>
      <div id="cursor-ring" ref={ring}/>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Cursor/>
      <Navbar/>
      <main>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </main>
      <Footer/>
    </BrowserRouter>
  )
}
