"use client";

import { formatCurrency } from "@/lib/format";
import type { Seat } from "@/data/seats";

export default function ReviewForm({
  seats,
  subtotal,
  fees,
  total
}: {
  seats: Seat[];
  subtotal: number;
  fees: number;
  total: number;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h3 className="text-lg font-semibold">Review your order</h3>
      <div className="mt-4">
        <p className="text-sm font-semibold">Seats</p>
        <p className="text-sm text-muted">
          {seats.length
            ? seats.map((seat) => `${seat.section}${seat.row}-${seat.number}`).join(", ")
            : "Best available selection"}
        </p>
      </div>
      <div className="mt-4 space-y-1 text-sm">
        <div className="flex items-center justify-between">
          <span>Tickets</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-muted">
          <span>Fees</span>
          <span>{formatCurrency(fees)}</span>
        </div>
        <div className="flex items-center justify-between text-base font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
}
