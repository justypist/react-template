export const fetchTime = (timestamp: number) =>
  new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log('api run');
      resolve(timestamp.toString());
    }, 1000);
  });

export const fetchTimes = (timestamps: number[]) => {
  return timestamps.map(fetchTime);
};
