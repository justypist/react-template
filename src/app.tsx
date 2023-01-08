import './app.less';

import { FC } from 'react';
import { useLogger } from './hook/use-logger';

import cloud from './asset/cloud.jpg';

export const App: FC = () => {
  useLogger();

  return (
    <div className="app">
      <img className="cloud" src={cloud} title="cloud" />
    </div>
  );
};
