import './app.less';

import { FC, useCallback, useMemo } from 'react';
import { fromEvent, map } from 'rxjs';
import { useLogger } from './hook/use-logger';
import { ObservableAnimation, OnProgress } from './observable-animation';

export const App: FC = () => {
  useLogger();

  const scrollSubject = useMemo(
    () =>
      fromEvent(window, 'scroll').pipe(
        // debounceTime(16),
        map(() => {
          return window.scrollY / window.innerHeight;
        }),
      ),
    [],
  );

  const onProgress = useCallback<OnProgress<HTMLDivElement>>(
    (progress, oldProps) => ({
      style: {
        offsetDistance: `${progress * 100}%`,
      },
    }),
    [],
  );

  return (
    <div className="app">
      <ObservableAnimation
        progressSubject={scrollSubject}
        onProgress={onProgress}
      >
        <div className="item" />
      </ObservableAnimation>
    </div>
  );
};
