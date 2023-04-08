import { useMemo } from 'react';

export const useLogger = (name?: string) => {
  const stackName = useMemo(
    () => new Error().stack?.split('at')[6].split(' ')[1] ?? 'Unknown',
    [],
  );
  console.debug(`[${name ?? stackName}]: rendered`);
};
