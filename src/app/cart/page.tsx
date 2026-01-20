"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import HoldTimer from "@/components/HoldTimer";
import { useTicketingStore, priceMap } from "@/store/useTicketingStore";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const router = useRouter();
  const [expired, setExpired] = useState(false);
  const {
    selectedSeats,
    quantity,
    tier,
    cart,
    clearCart
  } = useTicketingStore((state) => ({
    selectedSeats: state.seats.selectedSeats,
    quantity: state.seats.quantity,
    tier: state.seats.tier,
    cart: state.cart,
    clearCart: state.clearCart
  }));

  useEffect(() => {
    if (!cart.holdExpiresAt) {
      router.push("/event/123/seats");
    }
  }, [cart.holdExpiresAt, router]);

  useEffect(() => {
    if (!expired) return;
    const timeout = setTimeout(() => {
      clearCart();
      router.push("/event/123/seats");
    }, 1500);
    return () => clearTimeout(timeout);
  }, [clearCart, expired, router]);

  const subtotal = useMemo(
    () => quantity * priceMap[tier],
    [quantity, tier]
  );
  const fees = cart.serviceFee + cart.facilityFee;
  const total = subtotal + fees;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-6">
        <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-semibold">Your cart hold</h2>
          <p className="mt-2 text-muted">
            We are holding your seats for a limited time. Complete checkout to keep them.
          </p>
          <div className="mt-4 rounded-xl border border-ink/10 p-4">
            <p className="text-sm font-semibold">Seats</p>
            <p className="mt-2 text-sm text-muted">
              {selectedSeats.length
                ? selectedSeats
                    .map((seat) => `${seat.section}${seat.row}-${seat.number}`)
                    .join(", ")
                : `Best available ${quantity} seats`}
            </p>
          </div>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
          <h3 className="text-lg font-semibold">Price details</h3>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Tickets ({quantity})</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>Service fee</span>
              <span>{formatCurrency(cart.serviceFee)}</span>
            </div>
            <div className="flex items-center justify-between text-muted">
              <span>Facility fee</span>
              <span>{formatCurrency(cart.facilityFee)}</span>
            </div>
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-4 lg:sticky lg:top-6 self-start">
        <HoldTimer
          expiresAt={cart.holdExpiresAt}
          onExpire={() => setExpired(true)}
        />
        <button
          onClick={() => router.push("/checkout")}
          className="w-full rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5"
        >
          Checkout
        </button>
      </aside>

      {expired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
          <div className="rounded-2xl bg-white p-6 shadow-lift max-w-md w-full">
            <h3 className="text-lg font-semibold">Hold expired</h3>
            <p className="mt-2 text-sm text-muted">
              Your cart hold ended. Select seats again to continue.
            </p>
            <button
              onClick={() => {
                clearCart();
                router.push("/event/123/seats");
              }}
              className="mt-4 w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
            >
              Return to seats
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
