"use client";

import { useMemo } from "react";
import type { KeyboardEvent } from "react";
import clsx from "clsx";
import type { Seat } from "@/data/seats";

const seatLabel = (seat: Seat) => `${seat.section}${seat.row}-${seat.number}`;

export default function SeatGrid({
  seats,
  selectedSeats,
  onToggle
}: {
  seats: Seat[];
  selectedSeats: Seat[];
  onToggle: (seat: Seat) => void;
}) {
  const seatMap = useMemo(() => {
    const map = new Map<string, Seat>();
    seats.forEach((seat) => map.set(seat.id, seat));
    return map;
  }, [seats]);

  const isSelected = (seat: Seat) =>
    selectedSeats.some((item) => item.id === seat.id);

  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, seat: Seat) => {
    const focusSeat = (next: Seat | undefined) => {
      if (!next) return;
      const element = document.getElementById(`seat-${next.id}`);
      element?.focus();
    };

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(seat);
      return;
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusSeat(seatMap.get(`${seat.section}-${seat.row}-${seat.number + 1}`));
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusSeat(seatMap.get(`${seat.section}-${seat.row}-${seat.number - 1}`));
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      focusSeat(seatMap.get(`${seat.section}-${seat.row + 1}-${seat.number}`));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      focusSeat(seatMap.get(`${seat.section}-${seat.row - 1}-${seat.number}`));
    }
  };

  const sections = ["A", "B", "C"] as const;

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Section {section}</h3>
            <span className="text-xs text-muted">Rows 1-10</span>
          </div>
          <div className="grid gap-2">
            {Array.from({ length: 10 }).map((_, rowIndex) => {
              const row = rowIndex + 1;
              return (
                <div key={`${section}-${row}`} className="flex items-center gap-2">
                  <span className="w-10 text-xs text-muted">R{row}</span>
                  <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1">
                    {Array.from({ length: 20 }).map((_, seatIndex) => {
                      const number = seatIndex + 1;
                      const seat = seatMap.get(`${section}-${row}-${number}`);
                      if (!seat) return null;
                      const selected = isSelected(seat);
                      const disabled = seat.state !== "available";
                      return (
                        <button
                          key={seat.id}
                          id={`seat-${seat.id}`}
                          onClick={() => onToggle(seat)}
                          onKeyDown={(event) => handleKey(event, seat)}
                          disabled={disabled}
                          aria-label={`Seat ${seatLabel(seat)} ${seat.state}`}
                          className={clsx(
                            "h-7 w-7 rounded-md text-[10px] font-semibold transition",
                            selected && "bg-accent text-white",
                            !selected && seat.state === "available" && "bg-white border border-ink/15",
                            seat.state === "held" && "bg-amber-100 text-amber-700",
                            seat.state === "sold" && "bg-ink/10 text-ink/30",
                            disabled && "cursor-not-allowed"
                          )}
                        >
                          {number}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
