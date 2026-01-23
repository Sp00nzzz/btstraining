"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFacecamStore } from "@/components/Facecam";

// Image assets from public/splash folder
const imgBTSGroup = "/splash/bts-group.png";
const imgBTSLogo = "/splash2/bts-logo-white.png";
const imgTicketTrainerText = "/splash2/header-text.png";

interface SplashScreenProps {
  onStart: () => void;
}

// Helper to zero-pad numbers
const padNumber = (num: number): string => num.toString().padStart(2, "0");

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const { isCameraEnabled, toggleCamera } = useFacecamStore();
  const [isLoaded, setIsLoaded] = useState(false);

  // Countdown timer state
  const [countdown, setCountdown] = useState({ hours: 2, minutes: 30, seconds: 10 });

  // Set loaded state after mount for entrance animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
    <div className="fixed inset-0 z-[100] flex flex-col overflow-hidden bg-gradient-to-b from-[#0059e3] to-[#003d9e]">
      {/* Blue Header Bar */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-20 flex h-[70px] flex-shrink-0 items-center justify-center bg-[#0059e3] shadow-lg md:h-[100px]"
      >
        <div className="flex h-[45px] items-center gap-3 md:h-[70px] md:gap-4">
          <img
            src={imgBTSLogo}
            alt="BTS Logo"
            className="h-full w-auto object-contain drop-shadow-md"
          />
          <img
            src={imgTicketTrainerText}
            alt="BTS Ticket Trainer"
            className="h-full w-auto object-contain drop-shadow-md"
          />
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* BTS Group Photo Background */}
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={imgBTSGroup}
            alt="BTS Group"
            className="h-full w-full object-cover object-top"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-1 flex-col justify-end">
          {/* Center CTA Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col items-center px-4 pb-4 md:pb-6"
          >
            {/* Begin Training Button */}
            <button
              onClick={onStart}
              className="group relative rounded-2xl bg-[#7cd446] px-10 py-4 shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl active:scale-95 md:px-16 md:py-5"
              style={{
                border: "3px solid #499b14",
                boxShadow: "inset 0px 20px 16px -8px rgba(255,255,255,0.5), 0 8px 24px rgba(73, 155, 20, 0.4)",
              }}
              aria-label="Begin Training - Start the ticket purchasing simulation"
            >
              <span
                className="text-xl font-bold tracking-tight text-white md:text-4xl"
                style={{
                  WebkitTextStroke: "3px #649037",
                  paintOrder: "stroke fill",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                }}
              >
                Begin Training
              </span>
            </button>

            {/* Speedrunner Facecam Toggle */}
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm text-gray-500 md:text-base">
                Speedrunner facecam
              </span>
              <button
                onClick={toggleCamera}
                role="switch"
                aria-checked={isCameraEnabled}
                aria-label={`Speedrunner facecam is ${isCameraEnabled ? "on" : "off"}`}
                className={`relative h-7 w-12 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#7cd446] focus:ring-offset-2 ${
                  isCameraEnabled ? "bg-[#7cd446]" : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ${
                    isCameraEnabled ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Bottom Info Section */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={isLoaded ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
            className="bg-white/95 backdrop-blur-sm"
          >
            <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 py-4 md:flex-row md:gap-8 md:px-6 md:py-5">
              {/* Steps List */}
              <nav aria-label="Training steps">
                <ol className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm font-medium text-gray-700 md:flex-col md:gap-y-0.5 md:text-base">
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0059e3] text-xs font-bold text-white md:h-6 md:w-6 md:text-sm">1</span>
                    <span>Wait in line</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0059e3] text-xs font-bold text-white md:h-6 md:w-6 md:text-sm">2</span>
                    <span>Select seats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0059e3] text-xs font-bold text-white md:h-6 md:w-6 md:text-sm">3</span>
                    <span>Checkout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#7cd446] text-xs font-bold text-white md:h-6 md:w-6 md:text-sm">4</span>
                    <span>Win!</span>
                  </li>
                </ol>
              </nav>

              {/* Countdown Timer */}
              <div className="text-center" role="timer" aria-label="Countdown to general sale">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500 md:text-sm">
                  Countdown till General Sale
                </p>
                <div className="flex justify-center gap-3 md:gap-4">
                  <div className="flex flex-col items-center rounded-lg bg-gray-100 px-3 py-2 md:px-4 md:py-3">
                    <span className="text-2xl font-bold tabular-nums text-gray-900 md:text-3xl">
                      {padNumber(countdown.hours)}
                    </span>
                    <span className="text-xs text-gray-500 md:text-sm">hours</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-gray-100 px-3 py-2 md:px-4 md:py-3">
                    <span className="text-2xl font-bold tabular-nums text-gray-900 md:text-3xl">
                      {padNumber(countdown.minutes)}
                    </span>
                    <span className="text-xs text-gray-500 md:text-sm">mins</span>
                  </div>
                  <div className="flex flex-col items-center rounded-lg bg-gray-100 px-3 py-2 md:px-4 md:py-3">
                    <span className="text-2xl font-bold tabular-nums text-gray-900 md:text-3xl">
                      {padNumber(countdown.seconds)}
                    </span>
                    <span className="text-xs text-gray-500 md:text-sm">secs</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
