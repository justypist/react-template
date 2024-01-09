import './index.less';

import { App } from '@app';
import { createRoot } from 'react-dom/client';

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    await navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => console.log('service worker registered.'))
      .catch((registrationError) => {
        console.warn('service worker registration failed: ', registrationError);
      });
  });
}

(() => {
  const entrypoint = document.createElement('div');
  document.body.appendChild(entrypoint);
  const root = createRoot(entrypoint);
  root.render(<App />);
})();
