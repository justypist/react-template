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
      setTimeout(
        () =>
          resolve(
            requests.map((_, index) => ({
              index,
              value: index * 10,
            })),
          ),
        1000,
      );
    }),
  debounceTime: 2000,
  initialValue: {
    value: -1,
    index: -1,
  },
});

export const useConstValue = () => {
  const [value, setValue] = useState<Res>();

  useEffect(() => store.subscribe({}, setValue).unsubscribe, []);

  return value;
};
