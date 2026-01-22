"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFacecamStore } from "@/components/Facecam";
import LeaderboardBanner from "@/components/LeaderboardBanner";

// Image assets from public/splash folder
const imgBackground = "/splash/background.png";
const imgImage30 = "/splash/image30.png";
const imgImage23 = "/splash/image23.png";
const imgImage22 = "/splash/image22.png";
const imgTicket1 = "/splash/ticket1.png";
const imgImage26 = "/splash/image26.png";
const imgImage27 = "/splash/image27.png";
const imgInstc1 = "/splash/instc1.png";
const imgImage17 = "/splash/image17.png";
const imgInstc2 = "/splash/instc2.png";
const imgImage19 = "/splash/image19.png";
const imgInstc3 = "/splash/instc3.png";
const imgImage18 = "/splash/image18.png";
const imgInstc4 = "/splash/instc4.png";
const imgImage16 = "/splash/image16.png";
const imgInstc5 = "/splash/instc5.png";
const imgImage14 = "/splash/image14.png";
const imgInstc6 = "/splash/instc6.png";
const imgImage13 = "/splash/image13.png";
const imgInstc7 = "/splash/instc7.png";
const imgImage15 = "/splash/image15.png";
const imgImage29 = "/splash/image29.png";
const imgBTSLogo = "/splash/bts-logo.png";
const imgBias = "/splash/bias.png";
const imgEllipse = "/splash/ellipse.svg";

interface SplashScreenProps {
  onStart: () => void;
}

export default function SplashScreen({ onStart }: SplashScreenProps) {
  const { isCameraEnabled, enableCamera } = useFacecamStore();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      {/* Background - Cork board texture */}
      <div className="absolute inset-0">
        <img
          src={imgBackground}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Leaderboard Banner - Top */}
      <div className="absolute top-0 left-0 right-0 z-50">
        <LeaderboardBanner />
      </div>

      {/* Decorative elements - Left side */}
      {/* Top left magazine/calendar */}
      <motion.div
        className="absolute hidden md:block"
        style={{ left: "-84px", top: "-77px", rotate: 13.69 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <img src={imgImage23} alt="" className="w-[396px] h-[288px] object-cover" />
      </motion.div>

      {/* Ticket */}
      <motion.div
        className="absolute hidden md:block"
        style={{ left: "-54px", top: "137px", rotate: -11 }}
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={imgTicket1} alt="" className="w-[373px] h-[141px] object-cover" />
      </motion.div>

      {/* Left side photo */}
      <motion.div
        className="absolute hidden md:block"
        style={{ left: "-19px", top: "288px", rotate: -4.77 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <img src={imgImage30} alt="" className="w-[196px] h-[309px] object-cover" />
      </motion.div>

      {/* Paper clip photos - left bottom */}
      <motion.div
        className="absolute hidden md:block"
        style={{ left: "-10px", top: "403px", rotate: -55.96 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        <img src={imgImage27} alt="" className="w-[130px] h-[195px] object-cover" />
      </motion.div>

      <motion.div
        className="absolute hidden md:block"
        style={{ left: "56px", top: "471px", rotate: 22.61 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <img src={imgImage27} alt="" className="w-[130px] h-[195px] object-cover" />
      </motion.div>

      {/* Bottom left magazine */}
      <motion.div
        className="absolute hidden md:block"
        style={{ left: "-84px", top: "498px", rotate: -17 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <img src={imgImage26} alt="" className="w-[200px] h-[449px] object-cover" />
      </motion.div>

      {/* Top right ticket */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ right: "-134px", top: "-137px", rotate: -17.27 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img src={imgImage22} alt="" className="w-[447px] h-[183px] object-cover" />
      </motion.div>

      {/* Bottom character stickers */}
      <motion.div
        className="absolute hidden md:block"
        style={{ left: "107px", bottom: "-30px", rotate: 3.56 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <img src={imgImage29} alt="" className="w-[640px] h-[146px] object-cover" />
      </motion.div>

      {/* "Choose Your Bias" sticker - top right */}
      <motion.div
        className="absolute hidden lg:block"
        style={{ right: "39px", top: "61px" }}
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, delay: 0.4, type: "spring", stiffness: 200 }}
      >
        <img src={imgBias} alt="Choose Your Bias" className="w-[323px] h-[90px] object-contain" />
      </motion.div>

      {/* Polaroid photos grid - right side */}
      <motion.div
        className="absolute hidden lg:flex flex-wrap gap-0 items-center justify-center pointer-events-none"
        style={{ right: "-20px", top: "143px", width: "446px", padding: "20px" }}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Row 1 */}
        <div
          onClick={() => setSelectedCard(selectedCard === 1 ? null : 1)}
          className={`relative inline-block transition-transform duration-200 cursor-pointer origin-right pointer-events-auto ${selectedCard === 1 ? "scale-125 z-10" : "hover:scale-125 hover:z-10 z-[1]"}`}
        >
          <img src={imgInstc1} alt="" className="w-[119px] h-[178px] object-cover pointer-events-none" />
          <img src={imgImage17} alt="" className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-[36px] h-[24px] object-cover pointer-events-none" />
          {selectedCard === 1 && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">♥</span>
            </div>
          )}
        </div>
        <div
          onClick={() => setSelectedCard(selectedCard === 2 ? null : 2)}
          className={`relative inline-block transition-transform duration-200 cursor-pointer origin-center pointer-events-auto ${selectedCard === 2 ? "scale-125 z-10" : "hover:scale-125 hover:z-10 z-[1]"}`}
        >
          <img src={imgInstc2} alt="" className="w-[119px] h-[178px] object-cover pointer-events-none" />
          <img src={imgImage19} alt="" className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[44px] h-[28px] object-cover pointer-events-none" />
          {selectedCard === 2 && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">♥</span>
            </div>
          )}
        </div>
        <div
          onClick={() => setSelectedCard(selectedCard === 3 ? null : 3)}
          className={`relative inline-block transition-transform duration-200 cursor-pointer origin-left pointer-events-auto ${selectedCard === 3 ? "scale-125 z-10" : "hover:scale-125 hover:z-10 z-[1]"}`}
        >
          <img src={imgInstc3} alt="" className="w-[119px] h-[178px] object-cover pointer-events-none" />
          <img src={imgImage18} alt="" className="absolute bottom-[17px] left-1/2 -translate-x-1/2 w-[52px] h-[42px] object-cover pointer-events-none" />
          {selectedCard === 3 && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">♥</span>
            </div>
          )}
        </div>

        {/* Row 2 */}
        <div
          onClick={() => setSelectedCard(selectedCard === 4 ? null : 4)}
          className={`relative inline-block transition-transform duration-200 cursor-pointer origin-right pointer-events-auto ${selectedCard === 4 ? "scale-125 z-10" : "hover:scale-125 hover:z-10 z-[1]"}`}
        >
          <img src={imgInstc4} alt="" className="w-[123px] h-[184px] object-cover pointer-events-none" />
          <img
            src={imgImage16}
            alt=""
            className="absolute bottom-[7px] left-1/2 -translate-x-1/2 w-[75px] h-[75px] object-cover pointer-events-none"
            style={{ transform: "translateX(-50%) rotate(5.4deg)" }}
          />
          {selectedCard === 4 && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">♥</span>
            </div>
          )}
        </div>
        <div
          onClick={() => setSelectedCard(selectedCard === 5 ? null : 5)}
          className={`relative inline-block transition-transform duration-200 cursor-pointer origin-center pointer-events-auto ${selectedCard === 5 ? "scale-125 z-10" : "hover:scale-125 hover:z-10 z-[1]"}`}
        >
          <img src={imgInstc5} alt="" className="w-[123px] h-[185px] object-cover pointer-events-none" />
          <img src={imgImage14} alt="" className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[56px] h-[30px] object-cover pointer-events-none" />
          {selectedCard === 5 && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">♥</span>
            </div>
          )}
        </div>
        <div
          onClick={() => setSelectedCard(selectedCard === 6 ? null : 6)}
          className={`relative inline-block transition-transform duration-200 cursor-pointer origin-left pointer-events-auto ${selectedCard === 6 ? "scale-125 z-10" : "hover:scale-125 hover:z-10 z-[1]"}`}
        >
          <img src={imgInstc6} alt="" className="w-[119px] h-[178px] object-cover pointer-events-none" />
          <img src={imgImage13} alt="" className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-[67px] h-[38px] object-cover pointer-events-none" />
          {selectedCard === 6 && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">♥</span>
            </div>
          )}
        </div>

        {/* Row 3 - partial */}
        <div
          onClick={() => setSelectedCard(selectedCard === 7 ? null : 7)}
          className={`relative inline-block transition-transform duration-200 cursor-pointer origin-center pointer-events-auto ${selectedCard === 7 ? "scale-125 z-10" : "hover:scale-125 hover:z-10 z-[1]"}`}
        >
          <img src={imgInstc7} alt="" className="w-[124px] h-[186px] object-cover pointer-events-none" />
          <img src={imgImage15} alt="" className="absolute bottom-[9px] left-1/2 -translate-x-1/2 w-[49px] h-[28px] object-cover pointer-events-none" />
          {selectedCard === 7 && (
            <div className="absolute top-2 left-2 w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white text-xs">♥</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main content - Center (shifted left by 300px on desktop) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pl-8 pr-4 md:px-4 md:-translate-x-[300px]">
        {/* Continuous grouping wrapper to keep elements together */}
        <div className="flex flex-col items-center relative">
          {/* BTS Logo circle */}
          <div className="relative z-10 md:mb-[-190px] md:-translate-y-[70px]">
            <img src={imgEllipse} alt="" className="w-[170px] h-[170px] md:w-[290px] md:h-[290px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src={imgBTSLogo}
                alt="BTS"
                className="w-[120px] md:w-[170px] h-auto object-contain"
              />
            </div>
          </div>

          {/* Yellow banner with title */}
          <div className="relative z-0 mt-[-40px] md:mt-0 pt-8 md:pt-10">
            {/* Yellow background */}
            <div className="bg-[#faed3d] rounded-[50px] md:rounded-[90px] px-6 md:px-14 py-6 md:py-10">
              {/* Border */}
              <div className="border-[4px] md:border-[7px] border-[#474545] rounded-[38px] md:rounded-[70px] px-5 md:px-10 py-5 md:py-8">
                <h1 className="text-[#474545] text-center text-xl md:text-[50px] leading-tight tracking-tighter">
                  <span className="md:hidden" style={{ fontFamily: "Arial, sans-serif" }}>
                    CONCERT TICKET<br />TRAINING
                  </span>
                  <span className="hidden md:inline" style={{ fontFamily: "'Nashira Free', 'Comic Sans MS', cursive" }}>
                    CONCERT TICKET<br />TRAINING
                  </span>
                </h1>
              </div>
            </div>
          </div>

          {/* Buttons row */}
          <div className="relative mt-6 md:-mt-[70px] z-20 flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <button
              onClick={onStart}
              className="bg-white rounded-[18px] md:rounded-[19px] px-8 md:px-12 py-3 md:py-4 shadow-lg hover:shadow-xl transition-shadow active:scale-95"
            >
              <span className="text-base md:text-[20px] font-normal whitespace-nowrap" style={{ color: '#2B54A4' }}>
                <span className="md:hidden" style={{ fontFamily: "Arial, sans-serif" }}>
                  Start the Timer
                </span>
                <span className="hidden md:inline" style={{ fontFamily: "'Nashira Free', 'Comic Sans MS', cursive" }}>
                  Start the Timer
                </span>
              </span>
            </button>

            {!isCameraEnabled && (
              <button
                onClick={enableCamera}
                className="bg-[#eb69a9] rounded-[18px] md:rounded-[18px] px-6 md:px-10 py-3 md:py-4 shadow-lg hover:shadow-xl hover:bg-[#e05a9c] transition-all active:scale-95"
              >
                <span className="text-white text-base md:text-[18px] font-normal whitespace-nowrap">
                  <span className="md:hidden" style={{ fontFamily: "Arial, sans-serif" }}>
                    Turn on speedrunner camera
                  </span>
                  <span className="hidden md:inline" style={{ fontFamily: "'Nashira Free', 'Comic Sans MS', cursive" }}>
                    Turn on speedrunner camera
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white/70 font-bold text-sm md:text-lg z-20 drop-shadow-md">
        @immike_wing
      </div>
    </div>
  );
}
