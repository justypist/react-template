import { FC } from 'react';
import { useLogger } from './hook/use-logger';
import { useSum } from './hook/use-sum';

export const App: FC = () => {
  useLogger();
  const t1 = useSum(10);
  const t2 = useSum(0);
  const t3 = useSum(20);
  const t4 = useSum(30);

  return (
    <>
      <p>{t1}</p>
      <p>{t2}</p>
      <p>{t3}</p>
      <p>{t4}</p>
    </>
  );
};
