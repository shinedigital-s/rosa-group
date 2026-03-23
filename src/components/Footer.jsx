import { NavLink } from 'react-router-dom'
import logoImg from '../assets/projects/logo.jpg'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__brand">
          <div className="footer__logo">
            <img
              src={logoImg}
              alt="The ROSA Group"
              style={{ height: '56px', width: 'auto' }}
            />
          </div>
          <p className="footer__desc">
            A multi-disciplinary civil contracting firm serving India's
            infrastructure needs with integrity, precision, and craftsmanship
            for over 20 years.
          </p>
        </div>

        <div className="footer__nav">
          <h4 className="footer__heading">Navigation</h4>
          <ul>
            {[['/', 'Home'], ['/about', 'About Us'], ['/projects', 'Our Projects'], ['/contact', 'Contact Us']].map(([to, label]) => (
              <li key={to}><NavLink to={to} end={to === '/'}>{label}</NavLink></li>
            ))}
          </ul>
        </div>

        <div className="footer__services">
          <h4 className="footer__heading">Services</h4>
          <ul>
            {['Road & Building Construction', 'Planning & Design', 'Project Management', 'Procurement', 'Quality Monitoring', 'Turnkey Projects'].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="footer__contact">
          <h4 className="footer__heading">Contact</h4>
          <address>
            <p>Balmukund Apartment, Ground Floor,</p>
            <p>Lokmanya Tilak Road, Babhai Naka,</p>
            <p>Borivali (West), Mumbai – 400 091</p>
            <p>Maharashtra, India</p>
          </address>
          <div className="footer__contact-links">
            <a href="tel:+919867616718">(+91) 98 676167 18</a>
            <a href="tel:+919820292018">(+91) 98 202920 18</a>
            <a href="mailto:info@therosagroup.in">info@therosagroup.in</a>
            <a href="https://www.therosagroup.in" target="_blank" rel="noopener noreferrer">www.therosagroup.in</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} The ROSA Group. All rights reserved.</p>
        <p>M/s. ROSA Infra – Civil Contractors</p>
      </div>
    </footer>
  )
}