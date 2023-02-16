import { cloneElement, ReactElement, useEffect, useState } from 'react';
import { Observable } from 'rxjs';
import { useLogger } from '../hook/use-logger';

type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]> | undefined;
};

export type OnProgress<T> = (
  progress: number,
  oldProps: Partial<T>,
) => DeepPartial<T>;

interface ObservableAnimationProps<T extends HTMLElement> {
  progressSubject: Observable<number>;
  onProgress: OnProgress<T>;
  children: ReactElement<T>;
}

export function ObservableAnimation<T extends HTMLElement>({
  progressSubject,
  onProgress,
  children,
}: ObservableAnimationProps<T>) {
  useLogger();

  const [props, setProps] = useState<Partial<T>>(children.props);

  useEffect(() => {
    const subscription = progressSubject.subscribe((progress) => {
      setProps((oldProps) => ({
        ...oldProps,
        ...onProgress(progress, oldProps),
      }));
    });

    return () => subscription.unsubscribe();
  }, [progressSubject, onProgress]);

  return cloneElement(children, props);
}
