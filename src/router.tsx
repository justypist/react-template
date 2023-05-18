import { lazy, Suspense } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';

const App = lazy(() => import('@app'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
  },
  {
    path: '*',
    loader: async () => redirect('/'),
  },
]);
