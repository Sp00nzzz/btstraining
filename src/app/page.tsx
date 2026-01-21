"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import { useTicketingStore } from "@/store/useTicketingStore";
import { useTimerStore } from "@/store/useTimerStore";
import SplashScreen from "@/components/SplashScreen";

export default function HomePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const startTimer = useTimerStore((state) => state.startTimer);

  const setEvent = useTicketingStore((state) => state.setEvent);
  const resetDemo = useTicketingStore((state) => state.resetDemo);

  useEffect(() => {
    setEvent(events[0]);
  }, [setEvent]);

  const handleStart = () => {
    resetDemo();
    startTimer();
    sessionStorage.setItem("training_started", "true");
    sessionStorage.setItem("training_start_time", Date.now().toString());
    sessionStorage.removeItem("training_end_time");
    setHasStarted(true);
  };

  if (!hasStarted) {
    return <SplashScreen onStart={handleStart} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f2f2f4]">


      {/* Hero Section */}
      <section className="relative h-[480px] w-full overflow-hidden bg-[#1f262d]">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: 'url("/BTS.jpg")',
            backgroundPosition: 'center 20%'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="relative mx-auto mt-10 md:mt-20 flex h-full max-w-[1440px] flex-col justify-center px-6 pb-10 md:pb-20 text-white">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2 md:ml-4 leading-tight">BTS WORLD TOUR 'ARIRANG' IN TORONTO</h1>
          <p className="text-base md:text-lg font-medium text-white/90 md:ml-4 mb-6 md:mb-8">Presale: Thu, Jan 22, 2026 @ 01:00 pm EST</p>

          <Link href="/queue">
            <button className="bg-[#026cdf] text-white font-bold py-3 px-6 rounded-[3px] hover:bg-[#025ec2] transition w-fit md:ml-4 text-sm uppercase tracking-wider">
              Find Tickets
            </button>
          </Link>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="mx-auto w-full max-w-[1440px] px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left Column: Events */}
          <div className="flex-1">
            <div className="mb-6 flex items-baseline justify-between border-b pb-4">
              <h2 className="text-2xl font-bold text-black uppercase tracking-tight">Concerts Near You</h2>
              <a href="#" className="text-sm font-semibold text-[#026cdf] hover:underline">See All</a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Right Column: Advertisement */}
          <div className="hidden lg:block w-[300px] shrink-0">
            <div className="bg-white p-4 shadow-sm h-[600px] flex flex-col items-center justify-center border border-gray-200 text-gray-400 text-sm">
              <div className="mb-4 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-300">AD</span>
              </div>
              Advertisement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
