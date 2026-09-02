import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dashboard from './components/Dashboard';

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>
);
