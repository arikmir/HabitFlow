/**
 * Generate a unique ID for database records
 * Uses a combination of timestamp and random string for uniqueness
 */
export const generateId = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${randomPart}`;
};

/**
 * Generate a short ID (useful for display purposes)
 */
export const generateShortId = (): string => {
  return Math.random().toString(36).substring(2, 8);
};
