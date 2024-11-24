export function NODE_ENV() {
  const env = (process.env.NODE_ENV || 'dev').toLowerCase();

  return {
    IS_DEV: env.startsWith('dev'),
    IS_TEST: env.startsWith('test'),
    IS_PROD: env.startsWith('prod'),
  };
}
