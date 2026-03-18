export default function Hero() {
  return (
    <section id="home" className="reveal" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'linear-gradient(135deg, var(--bg) 0%, var(--surface) 50%, var(--bg) 100%)',
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
        backgroundSize: '60px 60px', opacity: 0.3
      }} />

      {/* accent blob removed */}

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block', background: 'var(--accent)', color: '#000',
          padding: '6px 16px', fontSize: '0.8rem', fontWeight: 700,
          letterSpacing: '3px', marginBottom: '24px'
        }}>
          NOW OPEN IN YOUR CITY
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(4rem, 12vw, 10rem)',
          lineHeight: 0.9, letterSpacing: '3px', marginBottom: '32px'
        }}>
          FORGE<br />
          YOUR<br />
          <span style={{ color: 'var(--accent)', WebkitTextStroke: '2px var(--accent)' }}>LIMITS</span>
        </h1>

        <p style={{
          fontSize: '1.2rem', color: 'var(--muted)', maxWidth: '480px',
          marginBottom: '48px', lineHeight: 1.7
        }}>
          State-of-the-art equipment, expert trainers, and a community that pushes you beyond what you thought possible.
        </p>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#contact" style={{
            background: 'var(--accent)', color: '#000', padding: '16px 40px',
            fontWeight: 700, fontSize: '1rem', letterSpacing: '2px',
            textDecoration: 'none', borderRadius: '4px',
            transition: 'transform 0.2s, opacity 0.2s',
            display: 'inline-block'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            START FREE TRIAL
          </a>
          <a href="#services" style={{
            border: '1px solid var(--border)', color: 'var(--text)',
            padding: '16px 40px', fontWeight: 600, fontSize: '1rem',
            letterSpacing: '2px', textDecoration: 'none', borderRadius: '4px',
            transition: 'border-color 0.2s', display: 'inline-block'
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            EXPLORE
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: '48px', marginTop: '80px', flexWrap: 'wrap'
        }}>
          {[['500+', 'Members'], ['15+', 'Expert Trainers'], ['50+', 'Equipment'], ['24/7', 'Access']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', color: 'var(--accent)' }}>{num}</div>
              <div style={{ color: 'var(--muted)', fontSize: '0.9rem', letterSpacing: '1px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
