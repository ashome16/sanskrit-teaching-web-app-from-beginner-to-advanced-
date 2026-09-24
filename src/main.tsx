import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dashboard from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

// Prevent benign browser ResizeObserver notification warnings from triggering unhandled error traps
if (typeof window !== 'undefined') {
  window.addEventListener('error', (e: ErrorEvent) => {
    const msg = e.message || '';
    if (
      msg.includes('ResizeObserver loop') ||
      msg.includes('ResizeObserver loop completed') ||
      msg.includes('ResizeObserver loop limit exceeded')
    ) {
      e.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  </StrictMode>
);
