"use client";

import { RotateCcw } from "lucide-react";
import { useTicketingStore } from "@/store/useTicketingStore";
import { useTimerStore } from "@/store/useTimerStore";

export default function ResetDemoButton() {
  const resetDemo = useTicketingStore((state) => state.resetDemo);
  const resetTimer = useTimerStore((state) => state.resetTimer);

  const handleReset = () => {
    resetDemo();
    resetTimer();
    sessionStorage.clear();
    window.location.href = "/";
  };

  return (
    <button
      onClick={handleReset}
      className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-4 py-2 text-sm font-medium shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
    >
      <RotateCcw size={16} />
      Reset Demo
    </button>
  );
}
