import { describe, expect, it } from "vitest";
import { pickBestAvailable, toggleSeatSelection } from "@/lib/seatRules";
import type { Seat } from "@/data/seats";

const seat = (id: string, state: Seat["state"] = "available"): Seat => {
  const [section, row, number] = id.split("-");
  return {
    id,
    section: section as Seat["section"],
    row: Number(row),
    number: Number(number),
    state
  };
};

describe("seat selection rules", () => {
  it("toggles a seat on and off", () => {
    const a = seat("A-1-1");
    let selected = toggleSeatSelection([], a, 2);
    expect(selected).toHaveLength(1);
    selected = toggleSeatSelection(selected, a, 2);
    expect(selected).toHaveLength(0);
  });

  it("does not exceed max quantity", () => {
    const a = seat("A-1-1");
    const b = seat("A-1-2");
    const c = seat("A-1-3");
    let selected = toggleSeatSelection([], a, 2);
    selected = toggleSeatSelection(selected, b, 2);
    selected = toggleSeatSelection(selected, c, 2);
    expect(selected).toHaveLength(2);
  });

  it("ignores held or sold seats", () => {
    const held = seat("A-1-4", "held");
    const sold = seat("A-1-5", "sold");
    let selected = toggleSeatSelection([], held, 2);
    selected = toggleSeatSelection(selected, sold, 2);
    expect(selected).toHaveLength(0);
  });

  it("picks best available seats by tier", () => {
    const seats = [
      seat("A-1-1"),
      seat("A-2-1"),
      seat("B-8-1"),
      seat("C-9-1")
    ];
    const best = pickBestAvailable(seats, "VIP", 2);
    expect(best).toHaveLength(2);
    expect(best[0].id).toBe("A-1-1");
  });
});
