import type { Seat, SeatTier } from "@/data/seats";

export const seatTierFor = (seat: Seat): SeatTier => {
  if (seat.section === "A" && seat.row <= 3) return "VIP";
  if (seat.section !== "C" && seat.row <= 7) return "Premium";
  return "Standard";
};

export const canSelectSeat = (seat: Seat) => seat.state === "available";

export const toggleSeatSelection = (
  current: Seat[],
  seat: Seat,
  max: number
): Seat[] => {
  if (!canSelectSeat(seat)) return current;
  const exists = current.find((item) => item.id === seat.id);
  if (exists) {
    return current.filter((item) => item.id !== seat.id);
  }
  if (current.length >= max) return current;
  return [...current, seat];
};

export const pickBestAvailable = (
  seats: Seat[],
  tier: SeatTier,
  quantity: number
) => {
  const filtered = seats
    .filter((seat) => seat.state === "available")
    .filter((seat) => seatTierFor(seat) === tier)
    .sort((a, b) => a.row - b.row || a.number - b.number);
  return filtered.slice(0, quantity);
};
