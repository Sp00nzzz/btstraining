"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PresaleCodeForm from "@/components/PresaleCodeForm";
import { useTicketingStore } from "@/store/useTicketingStore";
import { isPresaleExpired } from "@/lib/presale";

export default function PresalePage() {
  const router = useRouter();
  const presale = useTicketingStore((state) => state.presale);

  useEffect(() => {
    if (presale.unlockedUntil && !isPresaleExpired(presale.unlockedUntil, Date.now())) {
      router.push("/event/123/seats");
    }
  }, [presale.unlockedUntil, router]);

  return (
    <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
      <PresaleCodeForm />
      <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
        <h3 className="text-lg font-semibold">Presale tips</h3>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          <li>Codes are case-insensitive.</li>
          <li>Access is held for 20 minutes.</li>
          <li>Have seat preferences ready for a faster checkout.</li>
        </ul>
      </div>
    </div>
  );
}
