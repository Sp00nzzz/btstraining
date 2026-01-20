import { describe, expect, it } from "vitest";
import {
  calculatePresaleExpiry,
  isPresaleExpired,
  PRESALE_WINDOW_MINUTES
} from "@/lib/presale";

describe("presale unlock expiry", () => {
  it("sets unlock window", () => {
    const now = 5_000_000;
    const expires = calculatePresaleExpiry(now);
    expect(expires - now).toBe(PRESALE_WINDOW_MINUTES * 60 * 1000);
  });

  it("marks expiry", () => {
    const now = 6_000_000;
    expect(isPresaleExpired(now - 1, now)).toBe(true);
    expect(isPresaleExpired(now + 1, now)).toBe(false);
  });
});
