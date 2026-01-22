"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Heart, MoreVertical, ArrowLeftRight, SlidersHorizontal, ChevronDown } from "lucide-react";
import EventHeader from "@/components/EventHeader";
import InteractiveSeatMap from "@/components/InteractiveSeatMap";
import TicketList from "@/components/TicketList";
import { useRouter } from "next/navigation";

// Define Section IDs for simulation matching
const SECTION_IDS = [
  "N113", "N112", "N114", "N111", "N110", "N109", "N108", "N115", "N116", "N117", "N118",
  "W107", "W106", "W105", "W104", "W103", "W102", "W101",
  "E119", "E120", "E121", "E122", "E123", "E124", "E125",
  "S130", "S129", "S128", "S131", "S132",
  "WC107", "WC102", "WC119", "WC124"
];

export default function SeatsPage() {
  const router = useRouter();
  const [selectedSection, setSelectedSection] = useState<string | null>("all");
  const [selectedSeatFromMap, setSelectedSeatFromMap] = useState<any>(null);
  const [ticketCount, setTicketCount] = useState(2);
  const [maxPrice, setMaxPrice] = useState(1221);
  const [sectionAvailability, setSectionAvailability] = useState<Record<string, number>>({});
  const [mobileView, setMobileView] = useState<'map' | 'list'>('list');

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
            const decay = Math.random() * 0.35;
            next[key] = Math.max(0, next[key] - decay);
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  // Check if sold out
  const isSoldOut = Object.keys(sectionAvailability).length > 0 &&
    Object.values(sectionAvailability).every(val => val <= 0);

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden relative">
      {/* Game Over Overlay */}
      {isSoldOut && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
          <h1 className="text-3xl md:text-5xl font-black text-[#1f262d] mb-6 uppercase tracking-tight">
            oops too slow,<br />you need to be faster Army!
          </h1>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-[#026cdf] text-white font-bold py-4 px-10 rounded-sm hover:bg-[#025ec2] transition-colors shadow-lg text-lg uppercase tracking-wider"
          >
            Try Again
          </button>
        </div>
      )}

      {/* ===== MOBILE LAYOUT (< lg) ===== */}
      <div className="lg:hidden flex flex-col h-full">
        {/* Mobile Dark Header */}
        <header className="bg-[#1f262d] text-white px-4 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => router.back()} className="p-1">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 mx-3 min-w-0">
              <h1 className="font-bold text-base truncate">BTS WORLD TOUR 'ARIRANG' IN TORONTO</h1>
              <p className="text-xs text-gray-400">Sat • Jan 25 • 7:00PM - Rogers Centre</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1"><Heart className="w-5 h-5" /></button>
              <button className="p-1"><MoreVertical className="w-5 h-5" /></button>
            </div>
          </div>
        </header>

        {/* Switch to Map Button + Mini Map */}
        {mobileView === 'list' && (
          <div className="bg-[#f2f2f4] px-4 py-4">
            <button
              onClick={() => setMobileView('map')}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-[#1f262d] shadow-sm mb-4"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Switch to Map
            </button>

            {/* Mini Map Preview */}
            <div className="flex justify-center">
              <img
                src="/map.svg"
                alt="Venue Map"
                className="w-[200px] h-auto opacity-80"
              />
            </div>
          </div>
        )}

        {/* Map View (Full Screen Mobile) */}
        {mobileView === 'map' && (
          <div className="flex-1 relative bg-[#f2f2f4]">
            <button
              onClick={() => setMobileView('list')}
              className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm font-medium text-[#1f262d] shadow-sm"
            >
              <ArrowLeftRight className="w-4 h-4" />
              Switch to List
            </button>
            <InteractiveSeatMap
              onSectionSelect={setSelectedSection}
              onSeatClick={setSelectedSeatFromMap}
              maxPrice={maxPrice}
              sectionAvailability={sectionAvailability}
            />
          </div>
        )}

        {/* Mobile Ticket List */}
        {mobileView === 'list' && (
          <div className="flex-1 overflow-hidden bg-white">
            <TicketList
              externalSelection={selectedSeatFromMap}
              ticketCount={ticketCount}
              onTicketCountChange={setTicketCount}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              sectionAvailability={sectionAvailability}
            />
          </div>
        )}
      </div>

      {/* ===== DESKTOP LAYOUT (>= lg) ===== */}
      <div className="hidden lg:flex lg:flex-col h-full">
        <EventHeader />

        {/* Main Content Split View */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* Left: Map */}
          <div className="w-[60%] xl:w-[65%] h-full relative bg-[#f2f2f4]">
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
          <div className="w-[40%] xl:w-[35%] h-full border-l border-gray-200 shadow-xl z-30 bg-white">
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
    </div>
  );
}
