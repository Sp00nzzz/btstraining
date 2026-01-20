"use client";

import type { CheckoutState } from "@/store/useTicketingStore";

export default function DeliveryForm({
  value,
  onChange
}: {
  value: CheckoutState["delivery"];
  onChange: (next: CheckoutState["delivery"]) => void;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h3 className="text-lg font-semibold">Delivery method</h3>
      <div className="mt-4 grid gap-3">
        {[
          { id: "mobile", label: "Mobile transfer", detail: "Transfer to your phone after purchase." },
          { id: "digital", label: "Digital pass", detail: "Downloadable PDF tickets." }
        ].map((option) => (
          <label
            key={option.id}
            className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-sm ${
              value === option.id
                ? "border-accent bg-accentSoft"
                : "border-ink/10"
            }`}
          >
            <input
              type="radio"
              name="delivery"
              value={option.id}
              checked={value === option.id}
              onChange={() => onChange(option.id as CheckoutState["delivery"])}
              className="mt-1"
            />
            <div>
              <p className="font-semibold">{option.label}</p>
              <p className="text-muted text-xs">{option.detail}</p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
