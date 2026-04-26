export const retry = async (fn: Function, retries = 3) => {
  let lastError;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      console.log(`Retry ${i + 1} failed`);
    }
  }

  throw lastError;
};