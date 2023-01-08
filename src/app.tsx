import './app.less';

import { FC, ReactNode, useEffect, useState } from 'react';
import { useLogger } from './hook/use-logger';

import cloud from './asset/cloud.jpg';

const pages: ReactNode[] = [
  <img key="cloud" className="cloud" src={cloud} title="cloud" />,
  <div key="main" className="main">
    <button onClick={console.log}>click</button>
  </div>,
];

export const App: FC = () => {
  useLogger();

  const [pageIndex, setPageIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setPageIndex(1), 2000);

    return () => clearTimeout(timer);
  }, []);

  const page = pages[pageIndex];

  return <div className="app">{page}</div>;
};
