import { FC, useState } from 'react';
import { useConstValue } from './hook/use-const-value';
import { useLogger } from './hook/use-logger';

export const App: FC = () => {
  useLogger();
  const value = useConstValue();

  const [count, setCount] = useState<number>(0);

  return (
    <>
      {JSON.stringify(value)}{' '}
      <button onClick={() => setCount((p) => p + 1)}>{count}</button>
    </>
  );
};
