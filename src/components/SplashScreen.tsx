"use client";

import { useState, useEffect, useRef } from "react";
import { useFacecamStore } from "@/components/Facecam";
import LeaderboardBanner from "@/components/LeaderboardBanner";
import CharacterSelect from "@/components/CharacterSelect";

// Image assets from public/splash2 folder
const imgBTSLogo = "/splash2/bts-logo-white.png";
const imgTicketTrainerText = "/splash2/header-text.png";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const { isCameraEnabled, toggleCamera } = useFacecamStore();
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Countdown timer state - countdown to Sat, Jan 24 @ 1:00 PM EST
  const TARGET_DATE = new Date('2026-01-24T18:00:00Z');
  const [countdown, setCountdown] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  const handleCharacterSelect = (index: number, name: string) => {
    setSelectedCharacter(index);
    setSelectedName(name);
  };

  useEffect(() => {
    // Set initial scroll for mobile
    if (scrollContainerRef.current && window.innerWidth < 768) {
      scrollContainerRef.current.scrollLeft = 140;
    }

    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();
      if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0 };
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return { hours, minutes, seconds };
    };

    setCountdown(calculateTimeRemaining());
    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white">
      {/* Header Bar */}
      <header className="flex-shrink-0 h-[80px] md:h-[120px] bg-[#0059e3] flex items-center px-6 md:px-12">
        <div className="flex items-center gap-4 md:gap-8 w-full">
          <img
            src={imgBTSLogo}
            alt="BTS"
            className="h-[45px] md:h-[65px] w-auto flex-shrink-0"
          />
          <img
            src={imgTicketTrainerText}
            alt="BTS TICKET TRAINER"
            className="h-[55px] md:h-[95px] flex-1 object-fill mix-blend-plus-lighter"
          />
        </div>
      </header>

      {/* Leaderboard Banner */}
      <div className="-mt-3 md:-mt-4">
        <LeaderboardBanner />
      </div>

      {/* Main Content - Character Select */}
      <main
        ref={scrollContainerRef}
        className="relative flex-1 min-h-0 overflow-x-auto md:overflow-hidden overscroll-x-contain"
      >
        <CharacterSelect
          onSelect={handleCharacterSelect}
          selectedCharacter={selectedCharacter}
        />
      </main>

      {/* Footer Section - Unified for PC/Mobile */}
      <footer className="flex-shrink-0 bg-white px-4 md:px-8 pt-4 pb-6 md:py-4 pb-safe relative z-40">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-0">

          {/* Steps (Left on PC, Bottom on Mobile) */}
          <div className="flex flex-row flex-wrap justify-center gap-x-4 gap-y-2 md:flex-col md:gap-2 order-3 md:order-1 w-full md:w-auto md:items-start">
            {[
              { num: 1, label: "WAIT IN LINE", color: "bg-[#0059e3]" },
              { num: 2, label: "SELECT SEATS", color: "bg-[#0059e3]" },
              { num: 3, label: "CHECKOUT", color: "bg-[#0059e3]" },
              { num: 4, label: "WIN", color: "bg-[#7cd446]" },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-2">
                <div className={`${step.color} w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <span className="text-white text-[10px] md:text-xs font-bold">{step.num}</span>
                </div>
                <span className="text-black text-[10px] md:text-xs font-pixelify whitespace-nowrap">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Button & Toggle (Center on PC, Top on Mobile) */}
          <div className="order-1 md:order-2 flex flex-col items-center z-50 -mt-16 md:-mt-12 mb-2 md:mb-0">
            <button
              onClick={onStart}
              className="bg-[#7cd446] border-[3px] border-[#499b14] rounded-[14px] px-9 py-3.5 md:px-[68px] md:py-5 shadow-[inset_0px_20px_16px_-8px_rgba(255,255,255,0.5)] hover:brightness-105 active:scale-95 transition-all relative md:-top-[50px] md:mb-[-40px]"
            >
              <span
                className="text-white text-lg md:text-[40px] font-bold tracking-[-1px] font-[var(--font-nunito)] whitespace-nowrap"
                style={{ textShadow: '-2px -2px 0 #649037, 2px -2px 0 #649037, -2px 2px 0 #649037, 2px 2px 0 #649037, 0 -2px 0 #649037, 0 2px 0 #649037, -2px 0 0 #649037, 2px 0 0 #649037' }}
              >
                Begin Training
              </span>
            </button>

            <div className="flex items-center gap-2 mt-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
              <span className="text-black text-[10px] md:text-xs font-bold text-gray-500 whitespace-nowrap">
                speedrunner facecam
              </span>
              <button
                onClick={toggleCamera}
                className={`relative w-[36px] h-[20px] rounded-full transition-colors duration-300 ${isCameraEnabled ? 'bg-[#7cd446]' : 'bg-gray-300'
                  }`}
                aria-label="Toggle speedrunner facecam"
              >
                <div
                  className={`absolute top-[2px] w-[16px] h-[16px] bg-white rounded-full shadow-md transition-transform duration-300 ${isCameraEnabled ? 'translate-x-[18px]' : 'translate-x-[2px]'
                    }`}
                />
              </button>
            </div>
          </div>

          {/* Countdown (Right on PC, Middle on Mobile) */}
          <div className="flex flex-col items-center md:items-end order-2 md:order-3 w-full md:w-auto">
            <p className="text-black text-[10px] md:text-[10px] font-pixelify mb-1 text-center md:text-right uppercase tracking-widest opacity-60">
              Countdown till General Sale
            </p>
            <div className="flex gap-3 md:gap-4 bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
              {[
                { value: countdown?.hours, label: "HOURS" },
                { value: countdown?.minutes, label: "MIN" },
                { value: countdown?.seconds, label: "SEC" },
              ].map((item, i) => (
                <div key={item.label} className="flex flex-col items-center">
                  <div className="relative">
                    <p className="text-[#1f262d] text-xl md:text-2xl font-mono font-bold leading-none tracking-tighter">
                      {item.value !== undefined ? String(item.value).padStart(2, '0') : '--'}
                    </p>
                  </div>
                  <p className="text-gray-400 text-[8px] md:text-[9px] font-bold mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
