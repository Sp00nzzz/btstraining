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
    <div className="fixed inset-0 z-[100] overflow-hidden bg-white">
      {/* Blue Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-[40px] md:h-[95px] bg-[#0059e3] z-10">
        {/* Centered Logo + Text Container */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-4">
          {/* BTS Logo */}
          <div className="h-[20px] md:h-[70px] w-[13px] md:w-[45px]">
            <img
              src={imgBTSLogo}
              alt="BTS"
              className="h-full w-full object-contain"
            />
          </div>

          {/* BTS TICKET TRAINER Text */}
          <div className="h-[25px] md:h-[60px] w-auto">
            <img
              src={imgTicketTrainerText}
              alt="BTS TICKET TRAINER"
              className="h-full w-auto object-contain mix-blend-plus-lighter"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute top-[40px] md:top-[95px] left-0 right-0 bottom-0 flex flex-col">
        {/* Character Select - Takes remaining space, centered vertically on mobile */}
        <div className="relative flex-1 overflow-hidden flex items-start md:items-center justify-center mb-[-100px] md:mb-0">
          <div className="w-full h-auto md:h-full md:-translate-y-[100px]">
            <CharacterSelect
              onSelect={handleCharacterSelect}
              selectedCharacter={selectedCharacter}
            />
          </div>
        </div>

        {/* Bottom Section with controls */}
        <div className="relative bg-white px-3 md:px-6 py-3 md:py-3 pb-safe">
          {/* Green Begin Training Button + Facecam Toggle - Centered */}
          <div className="flex flex-col items-center mb-3 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[-50px]">
            <button
              onClick={onStart}
              className="bg-[#7cd446] border-[3px] border-[#499b14] rounded-[15px] md:rounded-[19px] px-8 md:px-20 py-3 md:py-6 shadow-[inset_0px_24px_18px_-8px_rgba(255,255,255,0.5)] hover:brightness-105 active:scale-95 transition-all"
            >
              <span
                className="text-white text-lg md:text-[40px] font-bold tracking-[-1px] md:tracking-[-1.5px] font-[var(--font-nunito)]"
                style={{ textShadow: '-2px -2px 0 #649037, 2px -2px 0 #649037, -2px 2px 0 #649037, 2px 2px 0 #649037, 0 -2px 0 #649037, 0 2px 0 #649037, -2px 0 0 #649037, 2px 0 0 #649037' }}
              >
                Begin Training
              </span>
            </button>

            {/* Speedrunner Facecam Toggle */}
            <div className="flex items-center gap-2 mt-2 md:mt-3">
              <span className="text-black text-xs md:text-[20px] opacity-20">
                speedrunner facecam
              </span>
              <button
                onClick={toggleCamera}
                className={`relative w-[36px] md:w-[42px] h-[22px] md:h-[25px] rounded-full transition-colors ${
                  isCameraEnabled ? 'bg-[#7cd446]' : 'bg-gray-300'
                }`}
                aria-label="Toggle speedrunner facecam"
              >
                <div
                  className={`absolute top-[2px] w-[18px] md:w-[21px] h-[18px] md:h-[21px] bg-white rounded-full shadow transition-transform ${
                    isCameraEnabled ? 'left-[16px] md:left-[19px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Two Column Layout for Bottom - Steps and Countdown */}
          <div className="flex items-center justify-between gap-2 md:gap-0">
            {/* Left: Steps List - More compact on mobile */}
            <div className="flex-shrink-0">
              <div className="flex flex-col gap-0.5 md:gap-1">
                {[
                  { num: 1, label: "WAIT IN LINE", color: "bg-[#0059e3]" },
                  { num: 2, label: "SELECT SEATS", color: "bg-[#0059e3]" },
                  { num: 3, label: "CHECKOUT", color: "bg-[#0059e3]" },
                  { num: 4, label: "WIN", color: "bg-[#7cd446]" },
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-1.5 md:gap-2">
                    <div className={`${step.color} w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center`}>
                      <span className="text-white text-[10px] md:text-sm font-bold">{step.num}</span>
                    </div>
                    <span className="text-black text-[10px] md:text-sm font-pixelify">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Countdown Timer - More compact on mobile */}
            <div className="text-center flex-shrink-0">
              <p className="text-black text-[10px] md:text-[12px] font-bold mb-0.5 md:mb-1 font-sans">
                Countdown till General Sale
              </p>
              <div className="flex gap-3 md:gap-6 justify-center">
                <div className="text-center">
                  <p className="text-black text-lg md:text-[32px] font-pixelify leading-tight">{countdown?.hours ?? '--'}</p>
                  <p className="text-black text-[10px] md:text-[18px] font-sans">hours</p>
                </div>
                <div className="text-center">
                  <p className="text-black text-lg md:text-[32px] font-pixelify leading-tight">{countdown?.minutes ?? '--'}</p>
                  <p className="text-black text-[10px] md:text-[18px] font-sans">minutes</p>
                </div>
                <div className="text-center">
                  <p className="text-black text-lg md:text-[32px] font-pixelify leading-tight">{countdown?.seconds ?? '--'}</p>
                  <p className="text-black text-[10px] md:text-[18px] font-sans">seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Banner - Top overlay */}
      <div className="absolute top-0 left-0 right-0 z-50 hidden">
        <LeaderboardBanner />
      </div>
    </div>
  );
}
