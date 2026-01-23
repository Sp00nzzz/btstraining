"use client";

import { useState, useEffect } from "react";
import { useFacecamStore } from "@/components/Facecam";
import LeaderboardBanner from "@/components/LeaderboardBanner";

// Image assets from public/splash folder
const imgBTSGroup = "/splash/bts-group.png";
const imgBTSLogo = "/splash2/bts-logo-white.png";
const imgTicketTrainerText = "/splash2/header-text.png";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const { isCameraEnabled, toggleCamera } = useFacecamStore();

  // Countdown timer state - countdown to a target time
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 30, seconds: 10 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-white">
      {/* Blue Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-[70px] md:h-[100px] bg-[#0059e3] z-10">
        {/* BTS Logo + Text Container */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex items-center gap-3 md:gap-4 h-[45px] md:h-[70px]">
          {/* BTS Logo */}
          <img
            src={imgBTSLogo}
            alt="BTS"
            className="h-full w-auto object-contain"
          />
          {/* BTS TICKET TRAINER Text */}
          <img
            src={imgTicketTrainerText}
            alt="BTS TICKET TRAINER"
            className="h-full w-auto object-contain"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute top-[70px] md:top-[100px] left-0 right-0 bottom-0 flex flex-col">
        {/* BTS Group Photo */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src={imgBTSGroup}
            alt="BTS Group"
            className="w-full h-full object-cover" style={{ objectPosition: 'center -120px' }}
          />
        </div>

        {/* Bottom Section with controls */}
        <div className="relative bg-white px-4 md:px-6 py-2 md:py-1">
          {/* Green Begin Training Button - Centered */}
          <div className="flex flex-col items-center mb-4 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[-50px]">
            <button
              onClick={onStart}
              className="bg-[#7cd446] border-[3px] border-[#499b14] rounded-[19px] px-12 md:px-20 py-4 md:py-6 shadow-[inset_0px_24px_18px_-8px_rgba(255,255,255,0.5)] hover:brightness-105 active:scale-95 transition-all"
            >
              <span
                className="text-white text-xl md:text-[40px] font-bold tracking-[-1.5px] font-nunito"
                style={{
                  WebkitTextStroke: '4px #649037',
                  paintOrder: 'stroke fill'
                }}
              >
                Begin Training
              </span>
            </button>
            {/* Speedrunner Facecam Toggle */}
            <div className="flex items-center gap-3 mt-3">
              <span className="text-black text-sm md:text-[20px] opacity-20">
                speedrunner facecam
              </span>
              <button
                onClick={toggleCamera}
                className={`relative w-[42px] h-[25px] rounded-full transition-colors ${
                  isCameraEnabled ? 'bg-[#7cd446]' : 'bg-gray-300'
                }`}
                aria-label="Toggle speedrunner facecam"
              >
                <div
                  className={`absolute top-[2px] w-[21px] h-[21px] bg-white rounded-full shadow transition-transform ${
                    isCameraEnabled ? 'left-[19px]' : 'left-[2px]'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Two Column Layout for Bottom */}
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-2 md:gap-0">
            {/* Left: Steps List */}
            <div className="order-2 md:order-1">
              <ol className="text-black text-sm md:text-[18px] leading-relaxed list-decimal list-inside space-y-0 font-pixelify">
                <li>WAIT IN LINE</li>
                <li>SELECT SEATS</li>
                <li>CHECKOUT</li>
                <li>WIN</li>
              </ol>
            </div>

            {/* Right: Countdown Timer */}
            <div className="order-3 text-center relative -top-[35px]">
              <p className="text-black text-xs md:text-[12px] font-bold mb-1 font-inter">
                Countdown till General Sale
              </p>
              <div className="flex gap-4 md:gap-6 justify-center font-pixelify">
                <div className="text-center">
                  <p className="text-black text-2xl md:text-[32px]">{countdown.hours}</p>
                  <p className="text-black text-xs md:text-[18px]">hours</p>
                </div>
                <div className="text-center">
                  <p className="text-black text-2xl md:text-[32px]">{countdown.minutes}</p>
                  <p className="text-black text-xs md:text-[18px]">minutes</p>
                </div>
                <div className="text-center">
                  <p className="text-black text-2xl md:text-[32px]">{countdown.seconds}</p>
                  <p className="text-black text-xs md:text-[18px]">seconds</p>
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
