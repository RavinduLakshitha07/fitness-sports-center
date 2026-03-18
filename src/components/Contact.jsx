import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    // POST to a mock API (jsonplaceholder) to demonstrate API integration
    (async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (!res.ok) throw new Error('Network response was not ok');
        await res.json();
        // success
        setSuccess(true);
        setForm({ name: '', email: '', message: '' });
        setErrors({});
      } catch {
        setErrors({ submit: 'Failed to send message. Please try again later.' });
      } finally {
        setLoading(false);
      }
    })();
  };

  const inputStyle = (field) => ({
    width: '100%', background: 'var(--card)', border: `1px solid ${errors[field] ? '#ff4444' : 'var(--border)'}`,
    borderRadius: '8px', padding: '14px 18px', color: 'var(--text)',
    fontSize: '1rem', fontFamily: 'var(--font-body)', outline: 'none',
    transition: 'border-color 0.2s'
  });

  return (
  <section id="contact" className="reveal" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
          className="contact-grid">
          {/* Left */}
          <div>
            <div style={{ width: '60px', height: '4px', background: 'var(--accent)', marginBottom: '24px' }} />
            <h2 className="section-title">GET IN <span className="accent">TOUCH</span></h2>
            <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '48px' }}>
              Ready to start? Have questions? Drop us a message and our team will get back to you within 24 hours.
            </p>
            {[
              ['📍', 'Location', '123 Fitness Ave, Colombo 05'],
              ['📞', 'Phone', '+94 77 123 4567'],
              ['✉️', 'Email', 'hello@ironpeak.lk'],
              ['🕐', 'Hours', 'Mon–Sun: 5AM – 11PM'],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ display: 'flex', gap: '16px', marginBottom: '24px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1.4rem' }}>{icon}</span>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent)', letterSpacing: '2px', fontWeight: 600 }}>{label}</div>
                  <div style={{ color: 'var(--muted)', marginTop: '2px' }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — Form */}
          <div style={{
            background: 'var(--card)', borderRadius: 'var(--radius)',
            padding: '48px', border: '1px solid var(--border)'
          }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>✅</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: 'var(--accent)', marginBottom: '12px' }}>
                  MESSAGE SENT!
                </h3>
                <p style={{ color: 'var(--muted)' }}>We'll get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} style={{
                  marginTop: '24px', background: 'var(--accent)', color: '#000',
                  border: 'none', padding: '12px 28px', borderRadius: '6px',
                  fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem', letterSpacing: '1px'
                }}>SEND ANOTHER</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '32px', letterSpacing: '2px' }}>
                  SEND A MESSAGE
                </h3>

                {[
                  { id: 'name', label: 'Full Name', type: 'text', placeholder: 'John Doe' },
                  { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                ].map(({ id, label, type, placeholder }) => (
                  <div key={id} style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem',
                      color: 'var(--muted)', letterSpacing: '1px' }}>{label}</label>
                    <input type={type} placeholder={placeholder} value={form[id]}
                      onChange={e => { setForm({ ...form, [id]: e.target.value }); setErrors({ ...errors, [id]: '' }); }}
                      style={inputStyle(id)}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = errors[id] ? '#ff4444' : 'var(--border)'}
                    />
                    {errors[id] && <span style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors[id]}</span>}
                  </div>
                ))}

                <div style={{ marginBottom: '28px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem',
                    color: 'var(--muted)', letterSpacing: '1px' }}>Message</label>
                  <textarea placeholder="Tell us about your fitness goals..." value={form.message} rows={5}
                    onChange={e => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: '' }); }}
                    style={{ ...inputStyle('message'), resize: 'vertical' }}
                    onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                    onBlur={e => e.target.style.borderColor = errors.message ? '#ff4444' : 'var(--border)'}
                  />
                  {errors.message && <span style={{ color: '#ff4444', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>{errors.message}</span>}
                </div>

                <button type="submit" disabled={loading} style={{
                  width: '100%', background: loading ? '#666' : 'var(--accent)', color: '#000',
                  border: 'none', padding: '16px', borderRadius: '8px',
                  fontWeight: 700, fontSize: '1rem', letterSpacing: '2px',
                  cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s',
                  fontFamily: 'var(--font-body)'
                }}>
                  {loading ? 'SENDING...' : 'SEND MESSAGE'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
