import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import './styles/index.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/animations.css';
import './styles/screens.css';
import './styles/dashboard-presentation.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
