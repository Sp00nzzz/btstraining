import { describe, expect, it, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import SeatGrid from "@/components/SeatGrid";
import { generateSeats } from "@/data/seats";


describe("SeatGrid", () => {
  it("fires toggle when clicking an available seat", () => {
    const seats = generateSeats();
    const available = seats.find((seat) => seat.state === "available");
    if (!available) {
      throw new Error("No available seat in generated data");
    }
    const onToggle = vi.fn();
    const { getByLabelText } = render(
      <SeatGrid seats={seats} selectedSeats={[]} onToggle={onToggle} />
    );
    const button = getByLabelText(`Seat ${available.section}${available.row}-${available.number} ${available.state}`);
    fireEvent.click(button);
    expect(onToggle).toHaveBeenCalledWith(available);
  });
});
