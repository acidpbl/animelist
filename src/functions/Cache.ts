export const getCachedData = (key: string): any | null => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, timestamp } = JSON.parse(cached);
  const tenMinutes = 10 * 60 * 1000;
  const isExpired = Date.now() - timestamp > tenMinutes;

  return isExpired ? null : data;
};

export const setCachedData = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};
