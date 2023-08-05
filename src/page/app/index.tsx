import './index.less';

import { FC } from 'react';
import { useLogger } from '@hook/use-logger';

export const App: FC = () => {
  useLogger();

  return (
    <div className="app">
      <span>__PROJECT_NAME__</span>
    </div>
  );
};

export default App;
