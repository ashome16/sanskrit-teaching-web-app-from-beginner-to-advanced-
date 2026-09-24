import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dashboard from './components/Dashboard';
import { ErrorBoundary } from './components/ErrorBoundary';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Dashboard />
    </ErrorBoundary>
  </StrictMode>
);
