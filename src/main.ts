import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Dashboard from './components/Dashboard';

const rootElement = document.getElementById('app');

if (!rootElement) {
  throw new Error('Root app container #app was not found.');
}

createRoot(rootElement).render(
  createElement(
    StrictMode,
    null,
    createElement(Dashboard)
  )
);
