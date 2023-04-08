import './index.less';

import { FC } from 'react';
import { useLogger } from '@hook/use-logger';

export const App: FC = () => {
  useLogger();

  return (
    <div className="app">
      <span>React Template</span>
    </div>
  );
};
