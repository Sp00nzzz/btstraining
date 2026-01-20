export const HOLD_MINUTES = 8;

export const calculateHoldExpiry = (now: number) =>
  now + HOLD_MINUTES * 60 * 1000;

export const isHoldExpired = (expiresAt: number | null, now: number) =>
  expiresAt !== null && now >= expiresAt;
