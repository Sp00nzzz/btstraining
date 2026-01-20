"use client";

import { useState, useEffect } from "react";
import EventHeader from "@/components/EventHeader";
import InteractiveSeatMap from "@/components/InteractiveSeatMap";
import TicketList from "@/components/TicketList";

// Define Section IDs for simulation matching
const SECTION_IDS = [
  "N113", "N112", "N114", "N111", "N110", "N109", "N108", "N115", "N116", "N117", "N118",
  "W107", "W106", "W105", "W104", "W103", "W102", "W101",
  "E119", "E120", "E121", "E122", "E123", "E124", "E125",
  "S130", "S129", "S128", "S131", "S132"
];

export default function SeatsPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>("all");
  const [selectedSeatFromMap, setSelectedSeatFromMap] = useState<any>(null);
  const [ticketCount, setTicketCount] = useState(2);
  const [maxPrice, setMaxPrice] = useState(1221);
  const [sectionAvailability, setSectionAvailability] = useState<Record<string, number>>({});

  // Initialize and run simulation
  useEffect(() => {
    const initial: Record<string, number> = {};
    SECTION_IDS.forEach(id => {
      // Randomly start some sections as sold out (0.0) or partially sold
      initial[id] = Math.random() < 0.2 ? 0.0 : 1.0;
    });
    setSectionAvailability(initial);

    const interval = setInterval(() => {
      setSectionAvailability(prev => {
        const next = { ...prev };
        let changed = false;

        // Randomly decrease availability for sections
        Object.keys(next).forEach(key => {
          if (next[key] > 0) {
            // Faster decay as requested
            const decay = Math.random() * 0.15;
            next[key] = Math.max(0, next[key] - decay);
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      <EventHeader />

      {/* Main Content Split View */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* Left: Map */}
        <div className="w-full lg:w-[60%] xl:w-[65%] h-full relative bg-[#f2f2f4]">
          {/* Top Info Banner */}
          <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 py-2 px-4 z-20 flex items-center gap-1 text-xs font-bold text-[#1f262d]">
            <span>Important Event Info:</span>
            <span className="font-normal text-[#1f262d]">Net Capacity: 50,547</span>
            <button className="underline ml-1 font-normal text-[#1f262d]">more</button>
          </div>

          <InteractiveSeatMap
            onSectionSelect={setSelectedSection}
            onSeatClick={setSelectedSeatFromMap}
            maxPrice={maxPrice}
            sectionAvailability={sectionAvailability}
          />

          {/* Bottom Disclaimer Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-200/90 to-transparent p-4 pb-2 text-center pointer-events-none">
            <p className="text-[10px] text-gray-500">
              By continuing past this page, you agree to our <span className="underline cursor-pointer pointer-events-auto">terms of use</span>. | <span className="bg-[#2d6f6d] text-white px-1 cursor-pointer pointer-events-auto">Manage my cookies and ad choices</span> | © Ticketmaster 2026.
            </p>
          </div>
        </div>

        {/* Right: List & Filters */}
        <div className="hidden lg:block lg:w-[40%] xl:w-[35%] h-full border-l border-gray-200 shadow-xl z-30">
          <TicketList
            externalSelection={selectedSeatFromMap}
            ticketCount={ticketCount}
            onTicketCountChange={setTicketCount}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            sectionAvailability={sectionAvailability}
          />
        </div>

      </div>
    </div>
  );
}
