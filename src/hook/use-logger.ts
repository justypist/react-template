import { useMemo } from 'react';

export const useLogger = (name?: string) => {
  const stackName = useMemo(
    () => new Error().stack?.split('at')[2].split(' ')[1] ?? 'Unknown',
    [],
  );
  console.log(`[${name ?? stackName}]: rendered`);
};
