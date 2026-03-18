export default function About() {
  return (
    <section id="about" className="reveal" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '80px', alignItems: 'center'
        }}
          className="about-grid">
          {/* Left */}
          <div>
            <div style={{
              width: '60px', height: '4px',
              background: 'var(--accent)', marginBottom: '24px'
            }} />
            <h2 className="section-title">WHO WE <span className="accent">ARE</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: '24px', lineHeight: 1.8 }}>
              IRONPEAK was built for people who are serious about change. We're not your average gym — we're a performance hub designed around results, community, and science-backed training.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: '40px', lineHeight: 1.8 }}>
              From beginners to elite athletes, our certified coaches create personalized programs that evolve as you do.
            </p>
            <a href="#contact" style={{
              display: 'inline-block', background: 'var(--accent)', color: '#000',
              padding: '14px 32px', fontWeight: 700, letterSpacing: '2px',
              textDecoration: 'none', borderRadius: '4px'
            }}>
              GET STARTED
            </a>
          </div>

          {/* Right — visual card */}
          <div style={{ position: 'relative' }}>
            <div style={{
              background: 'var(--card)', borderRadius: 'var(--radius)',
              padding: '48px', border: '1px solid var(--border)',
              position: 'relative', overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '200px', height: '200px',
                background: 'radial-gradient(circle at top right, rgba(232,255,0,0.1), transparent 70%)'
              }} />
              {[
                ['🏋️', 'World-Class Equipment', 'Olympic lifting platforms, cardio zones, and recovery suites.'],
                ['👥', 'Community First', 'Group classes, challenges, and a culture that celebrates every win.'],
                ['📊', 'Data-Driven Training', 'Track progress with our app and in-gym performance monitors.'],
              ].map(([icon, title, desc]) => (
                <div key={title} style={{
                  display: 'flex', gap: '16px', marginBottom: '32px',
                  paddingBottom: '32px', borderBottom: '1px solid var(--border)'
                }}>
                  <span style={{ fontSize: '2rem', flexShrink: 0 }}>{icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '6px', fontSize: '1rem' }}>{title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
