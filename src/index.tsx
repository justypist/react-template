import 'normalize.css';
import './index.less';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@router';

const entrypoint = document.getElementById('entrypoint');

(() => {
  if (!entrypoint) {
    const tip = document.createElement('strong');
    tip.textContent = 'entrypoint not found';
    tip.style.color = 'red';
    document.body.appendChild(tip);
    return;
  }

  const root = createRoot(entrypoint);
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
})();
