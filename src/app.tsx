import { FC, StrictMode } from 'react';

import { useGoogleFont } from '@hook/use-google-font';

export const App: FC = () => {
  useGoogleFont();

  return (
    <StrictMode>
      <span style={{ fontWeight: 'bold' }}>Empty</span>
    </StrictMode>
  );
};

App.displayName = 'App';
