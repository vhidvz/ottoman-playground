export function toString<T = any>(val: T): string {
  try {
    return typeof val === 'string' ? val : JSON.stringify(val);
  } catch {
    return String(val);
  }
}
