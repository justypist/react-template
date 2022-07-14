import { useEffect, useState } from 'react';
import { CommonStore } from '../utils/common-store';
import { sum } from '../service/counter.service';
import { times } from 'lodash';

const store = new CommonStore<number, number>({
  fetchData: (nums) => Promise.all(times(nums.length).map(() => sum(nums))),
});

export const useSum = (num: number) => {
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    return store.subscribe(num, (total) => {
      setTotal(total ?? 0);
    }).unsubscribe;
  }, [num]);

  return total;
};
