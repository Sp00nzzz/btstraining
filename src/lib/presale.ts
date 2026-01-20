export const PRESALE_WINDOW_MINUTES = 20;

export const calculatePresaleExpiry = (now: number) =>
  now + PRESALE_WINDOW_MINUTES * 60 * 1000;

export const isPresaleExpired = (expiresAt: number | null, now: number) =>
  expiresAt !== null && now >= expiresAt;
