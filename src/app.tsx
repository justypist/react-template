import { FC } from 'react';
import { useLogger } from './hook/use-logger';

export const App: FC = () => {
  useLogger();

  return (
    <>
      <span>Hello World</span>
    </>
  );
};
