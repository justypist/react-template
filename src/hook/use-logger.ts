export interface UseLoggerOptions {
  name?: string;
  logOnRender?: boolean;
}

export const useLogger = (options: UseLoggerOptions = {}) => {
  const {
    name = new Error().stack?.split('at')[2].split(' ')[1] ?? 'Unknown',
    logOnRender = true,
  } = options;

  if (logOnRender) {
    console.log(`[${name || useLogger.caller.name}]: rendered`);
  }
};
