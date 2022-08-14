import { FC, useState } from 'react';
import { useConstValue } from './hook/use-const-value';
import { useLogger } from './hook/use-logger';

export const App: FC = () => {
  useLogger();
  const value = useConstValue();
  const value2 = useConstValue();
  const value3 = useConstValue();

  const [count, setCount] = useState<number>(0);

  return (
    <>
      {JSON.stringify(value)}
      {JSON.stringify(value2)}
      {JSON.stringify(value3)}
      <button onClick={() => setCount((p) => p + 1)}>{count}</button>
    </>
  );
};
