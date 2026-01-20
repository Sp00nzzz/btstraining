"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import EventCard from "@/components/EventCard";
import { events } from "@/data/events";
import { useTicketingStore } from "@/store/useTicketingStore";
import { useFacecamStore } from "@/components/Facecam";
import { useTimerStore } from "@/store/useTimerStore";

export default function HomePage() {
  const [hasStarted, setHasStarted] = useState(false);
  const [result, setResult] = useState<{ time: string; success: boolean } | null>(null);
  const { isCameraEnabled, enableCamera } = useFacecamStore();
  const startTimer = useTimerStore((state) => state.startTimer);
  const splashVideoRef = useRef<HTMLVideoElement>(null);

  const setEvent = useTicketingStore((state) => state.setEvent);
  const resetDemo = useTicketingStore((state) => state.resetDemo);

  useEffect(() => {
    setEvent(events[0]);
    const endTime = sessionStorage.getItem("training_end_time");
    const startTime = sessionStorage.getItem("training_start_time");

    if (startTime && endTime) {
      const diff = parseInt(endTime) - parseInt(startTime);
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      const timeStr = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      setResult({
        time: timeStr,
        success: diff < 120000 // 2 minutes
      });
      // Clear results after showing once
      sessionStorage.removeItem("training_end_time");
    }
  }, [setEvent]);

  useEffect(() => {
    if (splashVideoRef.current) {
      splashVideoRef.current.volume = 0.2;
      splashVideoRef.current.muted = false;
    }
  }, []);

  const handleStart = () => {
    resetDemo();
    startTimer();
    sessionStorage.setItem("training_started", "true");
    sessionStorage.setItem("training_start_time", Date.now().toString());
    sessionStorage.removeItem("training_end_time");
    setHasStarted(true);
  };

  if (!hasStarted) {
    return (
      <div
        className="fixed inset-0 z-[100] flex bg-white"
        style={{ fontFamily: "'Comic Sans MS', 'Comic Sans', cursive" }}
      >
        <div className="flex flex-col items-start justify-center flex-1 px-[50px] pt-24">
          <div className="max-w-xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight text-[#1f262d]">
                BTS Ticketmaster Training
              </h1>
              <p className="text-xl font-normal leading-relaxed text-[#1f262d] md:text-2xl">
                BTS is going on tour but tickets are hard to get, so i made this website to train yourself when the day of war arrives. Best of luck ARMY!건배
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleStart}
                className="group relative overflow-hidden rounded-[2px] bg-[#026cdf] px-12 py-3 text-lg font-bold text-white transition-all hover:bg-[#025ec2] active:scale-95 shadow-sm"
              >
                <span className="relative z-10 tracking-widest uppercase">start</span>
                <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform group-hover:translate-x-0" />
              </button>

              {!isCameraEnabled && (
                <button
                  onClick={enableCamera}
                  className="rounded-[2px] border-2 border-[#026cdf] px-8 py-3 text-lg font-bold text-[#026cdf] transition-all hover:bg-[#026cdf]/5 active:scale-95"
                >
                  Turn on speedrunner facecam
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-1/2 h-full bg-black relative">
          <video
            ref={splashVideoRef}
            src="/splashscreen.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
          />
          {/* Subtle overlay to blend if needed, but keeping it clean for now */}
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </div>

        <div className="absolute bottom-6 left-[50px] text-gray-400 font-bold text-lg z-20">
          @immike_wing
        </div>
      </div>
    );
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

        <div className="relative mx-auto mt-20 flex h-full max-w-[1440px] flex-col justify-center px-6 pb-20 text-white">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-2 ml-4">BTS WORLD TOUR 'ARIRANG' IN TORONTO</h1>
          <p className="text-lg font-medium text-white/90 ml-4 mb-8">Presale: Thu, Jan 22, 2026 @ 01:00 pm EST</p>

          <Link href="/queue">
            <button className="bg-[#026cdf] text-white font-bold py-3 px-6 rounded-[3px] hover:bg-[#025ec2] transition w-fit ml-4 text-sm uppercase tracking-wider">
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
