"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useTicketingStore } from "@/store/useTicketingStore";

const VALID_CODES = ["GUEST2026", "FRIENDS", "VIPACCESS"];

export default function PresaleCodeForm() {
  const router = useRouter();
  const setPresaleUnlocked = useTicketingStore((state) => state.setPresaleUnlocked);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const normalized = code.trim().toUpperCase();
    if (!VALID_CODES.includes(normalized)) {
      setError("That code did not match our presale list. Try another.");
      setSuccess(false);
      return;
    }
    setPresaleUnlocked(normalized);
    setError("");
    setSuccess(true);
    router.push("/event/123/seats");
  };

  return (
    <form onSubmit={submit} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h2 className="text-2xl font-semibold">Unlock presale access</h2>
      <p className="mt-2 text-muted">
        Enter the code shared with you to begin seat selection.
      </p>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={code}
          onChange={(event) => setCode(event.target.value)}
          className="flex-1 rounded-full border border-ink/10 px-4 py-3 text-sm"
          placeholder="Enter presale code"
          aria-label="Presale code"
        />
        <button
          type="submit"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift"
        >
          Unlock
        </button>
      </div>
      {error && <p className="mt-3 text-sm text-warn">{error}</p>}
      {success && <p className="mt-3 text-sm text-good">Code accepted. Loading seats...</p>}
    </form>
  );
}
