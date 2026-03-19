import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)

// IntersectionObserver for reveal animations
if (typeof window !== 'undefined') {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.12 });

  const observeReveal = () => {
    document.querySelectorAll('.reveal').forEach(el => {
      // add `animate` to enable JS-driven hide/animate behavior; if JS doesn't run
      // the `.reveal` remains visible because `.reveal` default is visible.
      el.classList.add('animate');
      io.observe(el);
    });
  };

  // Observe immediately (handles HMR/dev) and also on load for full reliability
  observeReveal();
  window.addEventListener('load', observeReveal);
}
