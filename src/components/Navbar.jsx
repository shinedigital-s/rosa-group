import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Our Projects' },
  { to: '/contact', label: 'Contact Us' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  /* scroll to top on every route change */
  useEffect(() => {
    window.scrollTo(0, 0)
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}${open ? ' nav--open' : ''}`}>
      <div className="nav__inner container">

        {/* LOGO — drop logo.png into src/assets/ */}
        <NavLink to="/" className="nav__logo">
          <img
            src="src/assets/projects/logo.jpg"
            alt="The ROSA Group"
            className="nav__logo-img"
            onError={e => {
              e.target.style.display = 'none'
              e.target.nextElementSibling.style.display = 'flex'
            }}
          />

        </NavLink>

        <ul className="nav__links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) => 'nav__link' + (isActive ? ' nav__link--active' : '')}
              >{label}</NavLink>
            </li>
          ))}
          <li>
            <button className="btn btn--red nav__cta" onClick={() => navigate('/contact')}>
              Get a Quote
            </button>
          </li>
        </ul>

        <button className={`nav__burger${open ? ' open' : ''}`} onClick={() => setOpen(v => !v)}>
          <span /><span /><span />
        </button>
      </div>

      <div className={`nav__mobile${open ? ' nav__mobile--open' : ''}`}>
        {LINKS.map(({ to, label }) => (
          <NavLink
            key={to} to={to} end={to === '/'}
            className="nav__mobile-link"
            onClick={() => setOpen(false)}
          >{label}</NavLink>
        ))}
        <button
          className="btn btn--red"
          style={{ marginTop: '1rem' }}
          onClick={() => { navigate('/contact'); setOpen(false) }}
        >Get a Quote</button>
      </div>
    </nav>
  )
}