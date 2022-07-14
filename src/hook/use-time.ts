import { useEffect, useState } from 'react';
import { fetchTimes } from '../service/time.service';
import { CommonStore } from '../utils/common-store';

const store = new CommonStore<number, string>({
  hash: String,
  fetchData: async (timestamps) => {
    return Promise.all(fetchTimes(timestamps));
  },
});

export const useTime = (timestamp: number) => {
  const [timeString, setTimeString] = useState<string>('init');

  useEffect(() => {
    const subscription = store.subscribe(timestamp, (str) =>
      setTimeString(str ?? 'not response'),
    );
    return subscription.unsubscribe;
  }, [timestamp]);

  return timeString;
};
