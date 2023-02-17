import { useMemo } from 'react';

export interface UseLoggerOptions {
  name?: string;
}

export const useLogger = (options: UseLoggerOptions) => {
  const stackName = useMemo(
    () => new Error().stack?.split('at')[2].split(' ')[1] ?? 'Unknown',
    [],
  );
  console.log(`[${options.name ?? stackName}]: rendered`);
};
