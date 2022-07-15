import { useEffect, useState } from 'react';
import { getUserInfo, UserInfo } from '../service/user.service';
import { CommonStore } from '../utils/common-store';

const store = new CommonStore<UserInfo, string>({
  hash: ({ name, passwd }) => name + passwd,
  fetchData: async (userInfos) => {
    console.log('fetch Data');
    const names = userInfos.map((info) => info.name);
    const { users } = await getUserInfo(names, 'common-passwd');
    return users;
  },
});

export const useUserInfo = (name: string, passwd: string) => {
  const [info, setInfo] = useState<string>();

  useEffect(() => {
    return store.subscribe({ name, passwd }, (info) => {
      setInfo(info);
    }).unsubscribe;
  }, [name, passwd]);

  return info;
};
