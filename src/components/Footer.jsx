import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    <footer style={{ background: '#050500', borderTop: '1px solid var(--border)', padding: '40px 0', textAlign: 'center', position: 'relative' }}>
      <div className="container">
        <img src={logo} alt="Fitness Sports Center"
          style={{ height: '70px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }} />
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Fitness Sports Center. All rights reserved.
        </p>
      </div>
      {/* Back to top floating button */}
      <button
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: 'fixed', right: 20, bottom: 28,
          background: 'var(--accent)', color: '#000', border: 'none',
          padding: '10px 14px', borderRadius: 999, cursor: 'pointer',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)', fontWeight: 700
        }}
      >TOP</button>
    </footer>
  );
}
