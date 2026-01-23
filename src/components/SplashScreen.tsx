"use client";

import { useState, useEffect } from "react";
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

  // Countdown timer state - countdown to Sat, Jan 24 @ 1:00 PM EST
  // EST is UTC-5, so 1:00 PM EST = 18:00 UTC
  const TARGET_DATE = new Date('2026-01-24T18:00:00Z');

  const [countdown, setCountdown] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  const handleCharacterSelect = (index: number, name: string) => {
    setSelectedCharacter(index);
    setSelectedName(name);
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    // Set initial value on client
    setCountdown(calculateTimeRemaining());

    const timer = setInterval(() => {
      setCountdown(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white">
      {/* Header Bar */}
      <header className="flex-shrink-0 h-[100px] md:h-[150px] bg-[#0059e3] flex items-center px-6 md:px-12">
        <div className="flex items-center gap-4 md:gap-8 w-full">
          <img
            src={imgBTSLogo}
            alt="BTS"
            className="h-[65px] md:h-[110px] w-auto flex-shrink-0"
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
      <main className="relative flex-1 min-h-0 overflow-hidden">
        <CharacterSelect
          onSelect={handleCharacterSelect}
          selectedCharacter={selectedCharacter}
        />
      </main>

      {/* Button & Toggle - positioned absolutely, separate from footer */}
      <div className="absolute bottom-[120px] md:bottom-[140px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        {/* Begin Training Button */}
        <button
          onClick={onStart}
          className="bg-[#7cd446] border-[3px] border-[#499b14] rounded-[12px] md:rounded-[16px] px-6 md:px-16 py-2.5 md:py-5 shadow-[inset_0px_20px_16px_-8px_rgba(255,255,255,0.5)] hover:brightness-105 active:scale-95 transition-all"
        >
          <span
            className="text-white text-base md:text-[32px] font-bold tracking-[-0.5px] md:tracking-[-1px] font-[var(--font-nunito)] whitespace-nowrap"
            style={{ textShadow: '-2px -2px 0 #649037, 2px -2px 0 #649037, -2px 2px 0 #649037, 2px 2px 0 #649037, 0 -2px 0 #649037, 0 2px 0 #649037, -2px 0 0 #649037, 2px 0 0 #649037' }}
          >
            Begin Training
          </span>
        </button>

        {/* Facecam Toggle */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-black text-[10px] md:text-sm opacity-30 whitespace-nowrap">
            speedrunner facecam
          </span>
          <button
            onClick={toggleCamera}
            className={`relative w-[32px] md:w-[40px] h-[18px] md:h-[22px] rounded-full transition-colors ${
              isCameraEnabled ? 'bg-[#7cd446]' : 'bg-gray-300'
            }`}
            aria-label="Toggle speedrunner facecam"
          >
            <div
              className={`absolute top-[2px] w-[14px] md:w-[18px] h-[14px] md:h-[18px] bg-white rounded-full shadow-sm transition-transform ${
                isCameraEnabled ? 'left-[16px] md:left-[20px]' : 'left-[2px]'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Footer Section - just steps and countdown */}
      <footer className="flex-shrink-0 bg-white px-4 md:px-8 py-4 md:py-6 pb-safe">
        {/* Two Column Layout */}
        <div className="flex items-center justify-between">
          {/* Left: Steps */}
          <div className="flex flex-col gap-1 md:gap-2">
            {[
              { num: 1, label: "WAIT IN LINE", color: "bg-[#0059e3]" },
              { num: 2, label: "SELECT SEATS", color: "bg-[#0059e3]" },
              { num: 3, label: "CHECKOUT", color: "bg-[#0059e3]" },
              { num: 4, label: "WIN", color: "bg-[#7cd446]" },
            ].map((step) => (
              <div key={step.num} className="flex items-center gap-2">
                <div className={`${step.color} w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-[10px] md:text-sm font-bold">{step.num}</span>
                </div>
                <span className="text-black text-[10px] md:text-sm font-pixelify whitespace-nowrap">{step.label}</span>
              </div>
            ))}
          </div>

          {/* Right: Countdown */}
          <div className="flex flex-col items-end">
            <p className="text-black text-[10px] md:text-xs font-pixelify mb-1 md:mb-2">
              Countdown till General Sale
            </p>
            <div className="flex gap-4 md:gap-6">
              {[
                { value: countdown?.hours, label: "hours" },
                { value: countdown?.minutes, label: "min" },
                { value: countdown?.seconds, label: "sec" },
              ].map((item) => (
                <div key={item.label} className="text-center">
                  <p className="text-black text-xl md:text-[28px] font-pixelify leading-none">
                    {item.value !== undefined ? String(item.value).padStart(2, '0') : '--'}
                  </p>
                  <p className="text-black/60 text-[9px] md:text-xs font-pixelify mt-0.5">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
