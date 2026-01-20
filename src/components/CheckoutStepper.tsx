"use client";

import clsx from "clsx";

const steps = [
  { id: 1, label: "Contact" },
  { id: 2, label: "Delivery" },
  { id: 3, label: "Payment" },
  { id: 4, label: "Review" }
];

export default function CheckoutStepper({
  current
}: {
  current: 1 | 2 | 3 | 4;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {steps.map((step) => (
        <div
          key={step.id}
          className={clsx(
            "flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold",
            current === step.id
              ? "border-accent bg-accentSoft text-accent"
              : "border-ink/10 text-muted"
          )}
        >
          <span
            className={clsx(
              "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
              current === step.id ? "bg-accent text-white" : "bg-ink/10"
            )}
          >
            {step.id}
          </span>
          {step.label}
        </div>
      ))}
    </div>
  );
}
