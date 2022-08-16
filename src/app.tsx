import { FC, useState } from 'react';
import { useConstValue } from './hook/use-const-value';
import { useLogger } from './hook/use-logger';

export const App: FC = () => {
  useLogger();
  const [count, setCount] = useState<number>(0);
  const value = useConstValue(count);
  const value2 = useConstValue(count);
  const value3 = useConstValue(count);

  return (
    <>
      <p>{value?.value}</p>
      <p>{value2?.value}</p>
      <p>{value3?.value}</p>
      <button onClick={() => setCount((p) => p + 1)}>{count}</button>
    </>
  );
};
