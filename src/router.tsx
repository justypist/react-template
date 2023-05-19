import { LazyPage } from '@component/lazy-page';
import { createBrowserRouter, redirect } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LazyPage page="app" />,
  },
  {
    path: '*',
    loader: async () => redirect('/'),
  },
]);
