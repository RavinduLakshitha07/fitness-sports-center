import { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

export default function LoginModal({ open, onClose }) {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  if (!open) return null;

  const emailIsValid = (e => /\S+@\S+\.\S+/.test(e))(email);
  const passwordIsValid = password.length >= 6;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) return setError('Enter email and password');
    if (!emailIsValid) return setError('Please enter a valid email address');
    if (!passwordIsValid) return setError('Password must be at least 6 characters');
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
            <input
              className="search-input"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              aria-invalid={!emailIsValid && emailTouched}
              autoFocus
            />
            {emailTouched && !emailIsValid && (
              <div style={{ color: '#ffb3b3', fontSize: '0.9rem', marginTop: 6 }}>Enter a valid email (e.g. you@domain.com)</div>
            )}
          </div>
          <div style={{ marginBottom: 12 }}>
            <input
              className="search-input"
              type="password"
              placeholder="Password (min 6 chars)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onBlur={() => setPasswordTouched(true)}
              aria-invalid={!passwordIsValid && passwordTouched}
            />
            {passwordTouched && !passwordIsValid && (
              <div style={{ color: '#ffb3b3', fontSize: '0.9rem', marginTop: 6 }}>Password must be at least 6 characters</div>
            )}
          </div>
          {error && <div style={{ color: '#ff6b6b', marginBottom: 10 }}>{error}</div>}
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} style={{ background: 'transparent', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8 }}>Cancel</button>
            <button type="submit" disabled={loading || !emailIsValid || !passwordIsValid} style={{ background: (loading || !emailIsValid || !passwordIsValid) ? 'rgba(201,154,13,0.4)' : 'var(--accent)', color: '#000', padding: '8px 12px', borderRadius: 8, fontWeight: 700 }}>{loading ? 'Signing...' : 'Sign in'}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
