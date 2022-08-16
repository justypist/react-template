import { useEffect, useState } from 'react';
import { CommonStore } from '../utils/common-store';

// eslint-disable-next-line @typescript-eslint/ban-types
type NoopRequest = {};
type Res = {
  index: number;
  value: number;
};
const store = new CommonStore<NoopRequest, Res>({
  fetchData: async (requests) =>
    new Promise((resolve) => {
      console.log('trigger');
      const now = Date.now();
      setTimeout(
        () =>
          resolve(
            requests.map((_, index) => ({
              index,
              value: now,
            })),
          ),
        1000,
      );
    }),
  debounceTime: 1000,
  cacheTime: 0,
  initialValue: {
    value: -1,
    index: -1,
  },
});

export const useConstValue = (p?: number) => {
  const [value, setValue] = useState<Res>();

  useEffect(() => {
    const subscription = store.subscribe({}, setValue);
    return () => subscription.unsubscribe();
  }, [p]);

  return value;
};
