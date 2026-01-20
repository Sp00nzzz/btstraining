"use client";

import type { CheckoutState } from "@/store/useTicketingStore";

export default function PaymentForm({
  value,
  onChange
}: {
  value: CheckoutState["payment"];
  onChange: (next: CheckoutState["payment"]) => void;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h3 className="text-lg font-semibold">Payment</h3>
      <div className="mt-4 grid gap-3">
        <input
          value={value.name}
          onChange={(event) => onChange({ ...value, name: event.target.value })}
          placeholder="Name on card"
          className="rounded-full border border-ink/10 px-4 py-3 text-sm"
          aria-label="Name on card"
        />
        <input
          value={value.cardNumber}
          onChange={(event) => onChange({ ...value, cardNumber: event.target.value })}
          inputMode="numeric"
          placeholder="Card number"
          className="rounded-full border border-ink/10 px-4 py-3 text-sm"
          aria-label="Card number"
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            value={value.expiry}
            onChange={(event) => onChange({ ...value, expiry: event.target.value })}
            placeholder="MM/YY"
            className="rounded-full border border-ink/10 px-4 py-3 text-sm"
            aria-label="Expiry"
          />
          <input
            value={value.cvc}
            onChange={(event) => onChange({ ...value, cvc: event.target.value })}
            placeholder="CVC"
            className="rounded-full border border-ink/10 px-4 py-3 text-sm"
            aria-label="CVC"
          />
        </div>
      </div>
    </div>
  );
}
