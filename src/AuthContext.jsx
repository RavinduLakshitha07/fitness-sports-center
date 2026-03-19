/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('auth_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  async function login({ email, password }) {
    // Demo: call a public placeholder endpoint and treat success as auth.
    // Replace this with your real API when available.
    const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) throw new Error('Login failed');
    const data = await res.json();
    const u = { email, name: email.split('@')[0], token: data.id ?? 'demo-token' };
    setUser(u);
  try { localStorage.setItem('auth_user', JSON.stringify(u)); } catch { /* ignore */ }
    return u;
  }

  function logout() {
    setUser(null);
    try { localStorage.removeItem('auth_user'); } catch { /* ignore */ }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
