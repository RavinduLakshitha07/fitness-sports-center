import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function LoginModal({ open, onClose }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Enter email and password');
    try {
      setLoading(true);
      await login({ email, password });
      setLoading(false);
      onClose?.();
    } catch {
      setLoading(false);
      setError('Login failed. Try again.');
    }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }}>
      <div style={{ width: 420, maxWidth: '92%', background: 'var(--surface)', padding: 20, borderRadius: 12, boxShadow: '0 20px 50px rgba(0,0,0,0.4)' }}>
        <h3 style={{ marginBottom: 8 }}>Sign in</h3>
        <p style={{ color: 'var(--muted)', marginBottom: 12 }}>Enter your email and password to continue.</p>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 10 }}>
            <input className="search-input" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <input className="search-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <div style={{ color: '#ff6b6b', marginBottom: 10 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ background: 'transparent', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Cancel</button>
            <button type="submit" disabled={loading} style={{ background: 'var(--accent)', color: '#000', padding: '8px 12px', borderRadius: 8, fontWeight: 700 }}>{loading ? 'Signing...' : 'Sign in'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
