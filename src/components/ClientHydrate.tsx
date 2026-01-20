"use client";

import { useEffect } from "react";
import { useTicketingStore } from "@/store/useTicketingStore";
import { events } from "@/data/events";

export default function ClientHydrate() {
  const { refreshExpirations, event, setEvent } = useTicketingStore((state) => ({
    refreshExpirations: state.refreshExpirations,
    event: state.event,
    setEvent: state.setEvent
  }));

  useEffect(() => {
    refreshExpirations();
    if (!event) {
      setEvent(events[0]);
    }
  }, [event, refreshExpirations, setEvent]);

  return null;
}
