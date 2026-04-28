import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import './components/base/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
