"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { formatCountdown } from "@/lib/format";
import { isHoldExpired } from "@/lib/hold";

export default function HoldTimer({
  expiresAt,
  onExpire
}: {
  expiresAt: number | null;
  onExpire?: () => void;
}) {
  const [now, setNow] = useState(Date.now());
  const expiredRef = useRef(false);

  useEffect(() => {
    expiredRef.current = false;
  }, [expiresAt]);

  useEffect(() => {
    if (!expiresAt) return;
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [expiresAt]);

  useEffect(() => {
    if (!expiresAt) return;
    if (isHoldExpired(expiresAt, now)) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpire?.();
      }
    }
  }, [expiresAt, now, onExpire]);

  const remaining = useMemo(() => {
    if (!expiresAt) return 0;
    return Math.max(0, expiresAt - now);
  }, [expiresAt, now]);

  const isWarning = remaining <= 2 * 60 * 1000;

  return (
    <div
      className={`rounded-2xl border px-4 py-3 shadow-soft ${
        isWarning ? "border-warn/30 bg-warn/5" : "border-ink/10 bg-white"
      }`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-muted">Hold timer</p>
      <p className={`text-2xl font-semibold ${isWarning ? "text-warn" : "text-ink"}`}>
        {expiresAt ? formatCountdown(remaining) : "--:--"}
      </p>
      <p className="text-xs text-muted">Complete checkout before the hold expires.</p>
    </div>
  );
}
