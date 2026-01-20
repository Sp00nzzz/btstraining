"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { EventData } from "@/data/events";
import type { Seat, SeatTier } from "@/data/seats";
import { calculateHoldExpiry, isHoldExpired } from "@/lib/hold";
import { calculatePresaleExpiry, isPresaleExpired } from "@/lib/presale";

export type QueueState = {
  position: number;
  paused: boolean;
  etaSeconds: number;
};

export type PresaleState = {
  unlockedUntil: number | null;
  codeUsed: string | null;
};

export type SeatState = {
  selectedSeats: Seat[];
  quantity: number;
  tier: SeatTier;
};

export type CartState = {
  serviceFee: number;
  facilityFee: number;
  holdExpiresAt: number | null;
};

export type CheckoutState = {
  contact: {
    email: string;
    phone: string;
  };
  delivery: "mobile" | "digital";
  payment: {
    name: string;
    cardNumber: string;
    expiry: string;
    cvc: string;
  };
  step: 1 | 2 | 3 | 4;
};

export type TicketingStore = {
  queue: QueueState;
  presale: PresaleState;
  event: EventData | null;
  seats: SeatState;
  cart: CartState;
  checkout: CheckoutState;
  setQueue: (
    partial: Partial<QueueState> | ((state: QueueState) => Partial<QueueState>)
  ) => void;
  setPresaleUnlocked: (code: string) => void;
  clearPresale: () => void;
  setEvent: (event: EventData) => void;
  setSeatSelection: (seats: Seat[]) => void;
  setSeatQuantity: (quantity: number) => void;
  setSeatTier: (tier: SeatTier) => void;
  setCartHold: (selectedSeatsOverride?: Seat[]) => void;
  clearCart: () => void;
  setCheckoutStep: (step: 1 | 2 | 3 | 4) => void;
  updateContact: (contact: CheckoutState["contact"]) => void;
  updateDelivery: (delivery: CheckoutState["delivery"]) => void;
  updatePayment: (payment: CheckoutState["payment"]) => void;
  refreshExpirations: () => void;
  resetDemo: () => void;
};

const initialCheckout: CheckoutState = {
  contact: {
    email: "",
    phone: ""
  },
  delivery: "mobile",
  payment: {
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: ""
  },
  step: 1
};

const storage = createJSONStorage(() => {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => { },
      removeItem: () => { },
    };
  }
  return localStorage;
});

export const priceMap: Record<SeatTier, number> = {
  Standard: 79,
  Premium: 129,
  VIP: 179
};

export const useTicketingStore = create<TicketingStore>()(
  persist(
    (set, get) => ({
      queue: {
        position: 10,
        paused: false,
        etaSeconds: 10
      },
      presale: {
        unlockedUntil: null,
        codeUsed: null
      },
      event: null,
      seats: {
        selectedSeats: [],
        quantity: 2,
        tier: "Standard"
      },
      cart: {
        serviceFee: 0,
        facilityFee: 0,
        holdExpiresAt: null
      },
      checkout: initialCheckout,
      setQueue: (partial) =>
        set((state) => ({
          queue: {
            ...state.queue,
            ...(typeof partial === "function" ? partial(state.queue) : partial)
          }
        })),
      setPresaleUnlocked: (code) =>
        set(() => ({
          presale: {
            codeUsed: code,
            unlockedUntil: calculatePresaleExpiry(Date.now())
          }
        })),
      clearPresale: () =>
        set(() => ({
          presale: { codeUsed: null, unlockedUntil: null }
        })),
      setEvent: (event) => set(() => ({ event })),
      setSeatSelection: (seats) =>
        set((state) => ({ seats: { ...state.seats, selectedSeats: seats } })),
      setSeatQuantity: (quantity) =>
        set((state) => ({ seats: { ...state.seats, quantity } })),
      setSeatTier: (tier) =>
        set((state) => ({ seats: { ...state.seats, tier } })),
      setCartHold: (selectedSeatsOverride) => {
        const { seats } = get();
        const seatCount =
          selectedSeatsOverride?.length ??
          (seats.selectedSeats.length || seats.quantity);
        const quantity = selectedSeatsOverride?.length ?? seats.quantity;
        const subtotal = seatCount * priceMap[seats.tier];
        const serviceFee = Math.round(subtotal * 0.12);
        const facilityFee = quantity * 6;
        set(() => ({
          cart: {
            serviceFee,
            facilityFee,
            holdExpiresAt: calculateHoldExpiry(Date.now())
          }
        }));
      },
      clearCart: () =>
        set((state) => ({
          seats: { ...state.seats, selectedSeats: [] },
          cart: { serviceFee: 0, facilityFee: 0, holdExpiresAt: null },
          checkout: initialCheckout
        })),
      setCheckoutStep: (step) =>
        set((state) => ({ checkout: { ...state.checkout, step } })),
      updateContact: (contact) =>
        set((state) => ({ checkout: { ...state.checkout, contact } })),
      updateDelivery: (delivery) =>
        set((state) => ({ checkout: { ...state.checkout, delivery } })),
      updatePayment: (payment) =>
        set((state) => ({ checkout: { ...state.checkout, payment } })),
      refreshExpirations: () => {
        const now = Date.now();
        const { presale, cart } = get();
        if (isPresaleExpired(presale.unlockedUntil, now)) {
          set(() => ({ presale: { codeUsed: null, unlockedUntil: null } }));
        }
        if (isHoldExpired(cart.holdExpiresAt, now)) {
          set((state) => ({
            seats: { ...state.seats, selectedSeats: [] },
            cart: { serviceFee: 0, facilityFee: 0, holdExpiresAt: null }
          }));
        }
      },
      resetDemo: () =>
        set(() => ({
          queue: { position: 10, paused: false, etaSeconds: 10 },
          presale: { unlockedUntil: null, codeUsed: null },
          event: null,
          seats: { selectedSeats: [], quantity: 2, tier: "Standard" },
          cart: { serviceFee: 0, facilityFee: 0, holdExpiresAt: null },
          checkout: initialCheckout
        }))
    }),
    {
      name: "ticketing-store",
      storage,
      partialize: (state) => ({
        queue: state.queue,
        presale: state.presale,
        event: state.event,
        seats: state.seats,
        cart: state.cart,
        checkout: state.checkout
      })
    }
  )
);
