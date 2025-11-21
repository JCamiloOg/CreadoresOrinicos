import { createRoot } from 'react-dom/client';
import './styles/index.css';
import "./styles/background.css";
import App from './App.tsx';
import { BrowserRouter } from 'react-router';
import ScrollToTop from './hooks/scrollToTop.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ScrollToTop />
    <App />
  </BrowserRouter>,
);
