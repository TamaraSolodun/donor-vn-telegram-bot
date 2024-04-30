import React from 'react';
import ReactDOM from 'react-dom/client';

import AppAppBar from './components/AppBar';
import { App } from './App';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
