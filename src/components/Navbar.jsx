import { useState, useEffect, useContext } from 'react';
import logo from '../assets/logo.jpg';
import LoginModal from './LoginModal';
import { AuthContext } from '../AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['Home', 'About', 'Services', 'Contact'];

  // theme toggle (dark/light)
  const [light, setLight] = useState(false);

  // login modal
  const [showLogin, setShowLogin] = useState(false);

  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.classList.toggle('light', light);
  }, [light]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
  background: scrolled ? 'var(--scrolled-bg)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s ease', padding: '12px 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo image */}
        <img src={logo} alt="Fitness Sports Center Logo"
          style={{ height: '60px', width: 'auto', objectFit: 'contain' }} />

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: '36px', listStyle: 'none', alignItems: 'center' }} className="nav-links">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} style={{
                color: 'var(--text)', textDecoration: 'none',
                fontWeight: 500, fontSize: '0.95rem', letterSpacing: '1px', transition: 'color 0.2s'
              }}
                onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                onMouseLeave={e => e.target.style.color = 'var(--text)'}
              >{l}</a>
            </li>
          ))}
          <li>
            <a href="#contact" style={{
              background: 'var(--accent)', color: '#000', padding: '10px 24px',
              borderRadius: '4px', fontWeight: 700, fontSize: '0.9rem',
              textDecoration: 'none', letterSpacing: '1px'
            }}>JOIN NOW</a>
          </li>
        </ul>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme toggle */}
          <button
            aria-label="Toggle theme"
            className="icon-btn btn-transition"
            onClick={() => setLight(l => !l)}
            title={light ? 'Switch to dark' : 'Switch to light'}
            style={{ fontSize: '0.95rem' }}
          >
            {light ? '🌙' : '🌞'}
          </button>

          {/* Auth actions */}
          {user ? (
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>Hi, {user.name}</span>
              <button onClick={() => logout()} style={{ background: 'transparent', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 6 }}>Logout</button>
            </div>
          ) : (
            <button onClick={() => setShowLogin(true)} style={{ background: 'var(--accent)', color: '#000', padding: '8px 12px', borderRadius: 6, fontWeight: 700 }}>Login</button>
          )}

          {/* Hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', flexDirection: 'column', gap: '5px' }}
          className="hamburger">
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: '26px', height: '2px', background: 'var(--accent)' }} />
          ))}
        </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{ background: 'var(--surface)', padding: '20px 24px', borderTop: '1px solid var(--border)' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', padding: '12px 0', color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)' }}>
              {l}
            </a>
          ))}
        </div>
      )}

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
