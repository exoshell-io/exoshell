import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import 'allotment/dist/style.css';

ReactDOM.createRoot(document.getElementById('app')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
