import { describe, expect, it } from "vitest";
import { calculateHoldExpiry, isHoldExpired, HOLD_MINUTES } from "@/lib/hold";

describe("hold expiration", () => {
  it("calculates hold expiry window", () => {
    const now = 1_000_000;
    const expires = calculateHoldExpiry(now);
    expect(expires - now).toBe(HOLD_MINUTES * 60 * 1000);
  });

  it("detects expiration", () => {
    const now = 2_000_000;
    expect(isHoldExpired(now - 1000, now)).toBe(true);
    expect(isHoldExpired(now + 1000, now)).toBe(false);
  });
});
