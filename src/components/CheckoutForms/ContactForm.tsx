"use client";

import type { CheckoutState } from "@/store/useTicketingStore";

export default function ContactForm({
  value,
  onChange
}: {
  value: CheckoutState["contact"];
  onChange: (next: CheckoutState["contact"]) => void;
}) {
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h3 className="text-lg font-semibold">Contact details</h3>
      <div className="mt-4 grid gap-3">
        <input
          value={value.email}
          onChange={(event) => onChange({ ...value, email: event.target.value })}
          type="email"
          placeholder="Email address"
          className="rounded-full border border-ink/10 px-4 py-3 text-sm"
          aria-label="Email address"
        />
        <input
          value={value.phone}
          onChange={(event) => onChange({ ...value, phone: event.target.value })}
          type="tel"
          placeholder="Phone number"
          className="rounded-full border border-ink/10 px-4 py-3 text-sm"
          aria-label="Phone number"
        />
      </div>
    </div>
  );
}
