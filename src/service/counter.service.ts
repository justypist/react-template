export const sum = async (nums: number[]) =>
  new Promise<number>((resolve) => {
    setTimeout(
      () => resolve(nums.reduce((total, current) => total + current, 0)),
      1000,
    );
  });
