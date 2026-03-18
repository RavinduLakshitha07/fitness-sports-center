import { useState, useEffect, useMemo, useRef } from 'react';

const plans = [
  {
    name: 'STARTER', price: '$29', period: '/mo',
    features: ['Full gym access', 'Locker room', '2 group classes/week', 'Basic app access'],
    highlight: false
  },
  {
    name: 'PRO', price: '$59', period: '/mo',
    features: ['Everything in Starter', 'Unlimited classes', '1 PT session/month', 'Nutrition guide', 'Priority booking'],
    highlight: true
  },
  {
    name: 'ELITE', price: '$99', period: '/mo',
    features: ['Everything in Pro', '4 PT sessions/month', 'Body composition scans', 'Recovery zone access', 'Guest passes'],
    highlight: false
  },
];

const services = ['Strength Training', 'HIIT Classes', 'Yoga & Recovery', 'Personal Training', 'Boxing', 'Spin Cycling'];

// Descriptions for services to show in search results
const serviceDescriptions = {
  'Strength Training': 'Progressive resistance programs to build strength and muscle with structured coaching.',
  'HIIT Classes': 'Short, intense interval classes designed to boost cardio and burn calories.',
  'Yoga & Recovery': 'Mobility and restorative sessions to improve flexibility and aid recovery.',
  'Personal Training': 'One-on-one sessions tailored to your goals with certified trainers.',
  'Boxing': 'Technique and conditioning classes focusing on speed, power, and coordination.',
  'Spin Cycling': 'High-energy indoor cycling classes with interval and performance tracking.'
};

export default function Services() {
  const [search, setSearch] = useState('');
  const [extraServices, setExtraServices] = useState([]);
  const [plansState, setPlansState] = useState(plans);
  const [activeCategory, setActiveCategory] = useState('All');
  const didLoadExtrasRef = useRef(false);

  useEffect(() => {
    if (didLoadExtrasRef.current) return;
    didLoadExtrasRef.current = true;

    // fetch extra data from public/plans.json (demo of API integration)
    const ac = new AbortController();
    fetch('/plans.json', { signal: ac.signal })
      .then(r => r.json())
      .then(data => {
        if (data?.extraServices) {
          setExtraServices(prev => {
            const merged = [...prev, ...data.extraServices];
            return Array.from(new Set(merged));
          });
        }
        if (data?.extraPlans) {
          setPlansState(prev => {
            const merged = [...prev, ...data.extraPlans];
            const byKey = new Map();
            for (const p of merged) byKey.set(`${p?.name ?? ''}-${p?.price ?? ''}-${p?.period ?? ''}`, p);
            return Array.from(byKey.values());
          });
        }
      })
      .catch(() => {});

    return () => ac.abort();
  }, []);

  const visibleServices = useMemo(() => {
    const all = [...services, ...extraServices];
    const q = search.trim().toLowerCase();
    return all.filter(s => {
      const desc = (serviceDescriptions[s] || '').toLowerCase();
      const matchesSearch = !q || s.toLowerCase().includes(q) || desc.includes(q);
      const matchesCategory = !activeCategory || activeCategory === 'All' ? true : s === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, extraServices, activeCategory]);
  return (
    <>
    <section id="services" className="reveal" style={{ background: 'var(--bg)' }}>
      <div className="container">
        <div style={{ marginBottom: '16px', color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>
          WHAT WE OFFER
        </div>
        <h2 className="section-title">SERVICES &<br /><span className="accent">PLANS</span></h2>
        <p className="section-sub">Choose the plan that fits your goals. Upgrade or cancel anytime.</p>

        {/* Search + Service tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <input className="search-input" placeholder="Search services..." value={search} onChange={e => setSearch(e.target.value)} />
          <div style={{ color: 'var(--muted)', fontSize: '0.95rem' }}>{visibleServices.length} results</div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '64px' }}>
          {/* Category chips (click to filter) */}
          {(() => {
            const categories = ['All', ...Array.from(new Set([...services, ...extraServices]))];
            return categories.map((c, idx) => (
              <button
                key={`${c}-${idx}`}
                type="button"
                className={`chip ${activeCategory === c ? 'active' : ''}`}
                onClick={() => {
                  // toggle category; clear text search to rely on category filter
                  setActiveCategory(prev => (prev === c ? 'All' : c));
                  setSearch('');
                }}
              >{c}</button>
            ));
          })()}
        </div>

        {/* Matching services (with descriptions) */}
        <div className="service-grid" style={{ marginBottom: '32px' }}>
          {visibleServices.length === 0 ? (
            <div style={{ color: 'var(--muted)' }}>No services match your search.</div>
          ) : visibleServices.map(s => (
            <div key={s} className="service-card">
              <h3>{s}</h3>
              <p style={{ color: 'var(--muted)', marginBottom: '12px' }}>{serviceDescriptions[s] || 'Details about this service are available at our center.'}</p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <a href="#contact" className="icon-btn btn-transition" style={{ background: 'var(--accent)', color: '#000', padding: '8px 12px', borderRadius: 8 }}>Book</a>
                <button className="icon-btn btn-transition" style={{ border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Details</button>
              </div>
            </div>
          ))}
        </div>

        {/* end services container */}
      </div>
    </section>

    {/* Separate Plans section */}
      <section id="plans" className="reveal" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ marginBottom: '16px', color: 'var(--accent)', fontSize: '0.85rem', letterSpacing: '3px', fontWeight: 600 }}>
            PRICING
          </div>
          <h2 className="section-title">PLANS</h2>
          <p className="section-sub">Choose the plan that fits your goals. Upgrade or cancel anytime.</p>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px'
          }} className="plans-grid">
            {plansState.map((plan, idx) => (
              <div key={`${plan.name}-${idx}`} style={{
                background: plan.highlight ? 'var(--accent)' : 'var(--card)',
                border: `1px solid ${plan.highlight ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: 'var(--radius)', padding: '40px 32px',
                position: 'relative', transition: 'transform 0.2s',
                transform: plan.highlight ? 'translateY(-12px)' : 'none'
              }}
                onMouseEnter={e => { if (!plan.highlight) e.currentTarget.style.transform = 'translateY(-6px)'; }}
                onMouseLeave={e => { if (!plan.highlight) e.currentTarget.style.transform = 'none'; }}
              >
                {plan.highlight && (
                  <div style={{
                    position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)',
                    background: '#000', color: 'var(--accent)', padding: '4px 16px',
                    fontSize: '0.75rem', fontWeight: 700, letterSpacing: '2px',
                    borderRadius: '100px', border: '1px solid var(--accent)'
                  }}>MOST POPULAR</div>
                )}
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', letterSpacing: '2px',
                  color: plan.highlight ? '#000' : 'var(--text)', marginBottom: '8px' }}>{plan.name}</div>
                <div style={{ marginBottom: '32px' }}>
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: '3.5rem',
                    color: plan.highlight ? '#000' : 'var(--accent)' }}>{plan.price}</span>
                  <span style={{ color: plan.highlight ? '#333' : 'var(--muted)' }}>{plan.period}</span>
                </div>
                <ul style={{ listStyle: 'none', marginBottom: '32px' }}>
                  {plan.features.map(f => (
                    <li key={f} style={{
                      padding: '10px 0', borderBottom: `1px solid ${plan.highlight ? 'rgba(0,0,0,0.15)' : 'var(--border)'}`,
                      color: plan.highlight ? '#111' : 'var(--muted)', fontSize: '0.95rem',
                      display: 'flex', alignItems: 'center', gap: '10px'
                    }}>
                      <span style={{ color: plan.highlight ? '#000' : 'var(--accent)', fontWeight: 700 }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <a href="#contact" style={{
                  display: 'block', textAlign: 'center',
                  background: plan.highlight ? '#000' : 'var(--accent)',
                  color: plan.highlight ? 'var(--accent)' : '#000',
                  padding: '14px', borderRadius: '6px', fontWeight: 700,
                  fontSize: '0.9rem', letterSpacing: '2px', textDecoration: 'none'
                }}>GET STARTED</a>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 900px) {
          .plans-grid { grid-template-columns: 1fr !important; }
          .plans-grid > div { transform: none !important; }
        }
      `}</style>
    </>
  );
}
