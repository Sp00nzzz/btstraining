export type SeatState = "available" | "selected" | "held" | "sold";
export type SeatTier = "Standard" | "Premium" | "VIP";

export type Seat = {
  id: string;
  section: "A" | "B" | "C";
  row: number;
  number: number;
  state: SeatState;
};

const hashSeed = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
};

const randomState = (id: string): SeatState => {
  const roll = hashSeed(id) % 100;
  if (roll < 8) return "sold";
  if (roll < 18) return "held";
  return "available";
};

export const generateSeats = () => {
  const seats: Seat[] = [];
  const sections: Seat["section"][] = ["A", "B", "C"];
  sections.forEach((section) => {
    for (let row = 1; row <= 10; row += 1) {
      for (let number = 1; number <= 20; number += 1) {
        const id = `${section}-${row}-${number}`;
        seats.push({
          id,
          section,
          row,
          number,
          state: randomState(id)
        });
      }
    }
  });
  return seats;
};
