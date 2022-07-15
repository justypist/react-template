export interface UserInfo {
  name: string;
  passwd: string;
}

export const getUserInfo = (names: string[], passwd: string) =>
  new Promise<{ users: string[] }>((resolve) => {
    setTimeout(() => {
      const users = names.map<string>((name) => name + passwd);
      resolve({ users });
    }, 1000);
  });
