"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CharacterSelect from "@/components/CharacterSelect";

const imgBTSLogo = "/splash/bts-logo-blue.png";
const imgTicketTrainerText = "/splash/bts-ticket-trainer-text.png";

export default function CharacterSelectPage() {
  const router = useRouter();
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [selectedName, setSelectedName] = useState<string>("");

  const handleSelect = (index: number, name: string) => {
    setSelectedCharacter(index);
    setSelectedName(name);
  };

  const handleContinue = () => {
    if (selectedCharacter !== null) {
      // Store selected character in sessionStorage
      sessionStorage.setItem("selected_character", selectedCharacter.toString());
      sessionStorage.setItem("selected_character_name", selectedName);
      router.push("/");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden bg-white flex flex-col">
      {/* Blue Header Bar */}
      <div className="relative h-[90px] md:h-[145px] bg-[#0059e3] flex-shrink-0">
        {/* BTS Logo */}
        <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-[50px] md:h-[100px] w-[32px] md:w-[65px]">
          <img
            src={imgBTSLogo}
            alt="BTS"
            className="h-full w-full object-contain"
          />
        </div>

        {/* BTS TICKET TRAINER Text */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 h-[40px] md:h-[78px] w-auto">
          <img
            src={imgTicketTrainerText}
            alt="BTS TICKET TRAINER"
            className="h-full w-auto object-contain mix-blend-plus-lighter"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Title */}
        <div className="text-center py-4 md:py-6">
          <h1 className="text-2xl md:text-4xl font-bold text-black font-[var(--font-pixelify-sans)]">
            SELECT YOUR BIAS
          </h1>
          <p className="text-sm md:text-lg text-gray-600 mt-1">
            Click on a member to select
          </p>
        </div>

        {/* Character Select Area */}
        <div className="flex-1 flex items-center justify-center px-4 overflow-hidden">
          <div className="w-full max-w-6xl">
            <CharacterSelect
              onSelect={handleSelect}
              selectedCharacter={selectedCharacter}
            />
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="flex-shrink-0 bg-white px-4 md:px-6 py-4 md:py-6 flex justify-center">
          <button
            onClick={handleContinue}
            disabled={selectedCharacter === null}
            className={`rounded-[19px] px-12 md:px-20 py-4 md:py-6 transition-all ${
              selectedCharacter !== null
                ? "bg-[#7cd446] border-[3px] border-[#499b14] shadow-[inset_0px_24px_18px_-8px_rgba(255,255,255,0.5)] hover:brightness-105 active:scale-95"
                : "bg-gray-300 border-[3px] border-gray-400 cursor-not-allowed"
            }`}
          >
            <span className={`text-xl md:text-[40px] font-bold tracking-[-1.5px] font-[var(--font-nunito)] ${
              selectedCharacter !== null ? "text-white" : "text-gray-500"
            }`}>
              {selectedCharacter !== null ? `Continue with ${selectedName}` : "Select a Member"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
