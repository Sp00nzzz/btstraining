"use client";

import { priceMap } from "@/store/useTicketingStore";
import type { SeatTier } from "@/data/seats";
import { formatCurrency } from "@/lib/format";

const tiers: SeatTier[] = ["Standard", "Premium", "VIP"];

export default function PriceTierPicker({
  value,
  onChange
}: {
  value: SeatTier;
  onChange: (tier: SeatTier) => void;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
      <p className="text-sm font-semibold">Price tier</p>
      <div className="mt-3 grid gap-2">
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => onChange(tier)}
            className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition ${
              value === tier
                ? "border-accent bg-accentSoft text-accent"
                : "border-ink/10 bg-white"
            }`}
          >
            <span className="font-semibold">{tier}</span>
            <span>{formatCurrency(priceMap[tier])}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
