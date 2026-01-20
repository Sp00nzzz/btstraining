"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTicketingStore } from "@/store/useTicketingStore";

export default function DebugPanel() {
  const params = useSearchParams();
  const enabled = params.get("debug") === "1";
  const [open, setOpen] = useState(false);
  const { queue, setQueue } = useTicketingStore((state) => ({
    queue: state.queue,
    setQueue: state.setQueue
  }));
  const [jump, setJump] = useState(queue.position.toString());

  if (!enabled) return null;

  return (
    <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-white p-4">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-sm font-semibold text-muted"
      >
        {open ? "Hide debug panel" : "Show debug panel"}
      </button>
      {open && (
        <div className="mt-4 grid gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setQueue({ paused: true })}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs"
            >
              Pause queue
            </button>
            <button
              onClick={() => setQueue({ paused: false })}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs"
            >
              Resume queue
            </button>
            <button
              onClick={() => setQueue({ position: 0 })}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs"
            >
              Fast-forward
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={jump}
              onChange={(event) => setJump(event.target.value)}
              className="w-24 rounded-full border border-ink/10 px-3 py-1 text-xs"
              aria-label="Jump to position"
            />
            <button
              onClick={() => {
                const next = Number(jump);
                if (!Number.isNaN(next)) {
                  setQueue({ position: Math.max(0, next) });
                }
              }}
              className="rounded-full border border-ink/10 px-3 py-1 text-xs"
            >
              Jump position
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
