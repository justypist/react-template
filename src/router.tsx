import { App } from '@app';
import { createBrowserRouter, redirect } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '*',
    loader: async () => redirect('/'),
  },
]);
