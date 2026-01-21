"use client";

import { useState } from "react";
import { X } from "lucide-react";

type LeaderboardDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string) => Promise<void>;
  isSubmitting: boolean;
};

export default function LeaderboardDialog({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: LeaderboardDialogProps) {
  const [username, setUsername] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!username.trim()) return;
    await onSubmit(username.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 p-6 animate-in zoom-in-95 fade-in duration-200">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>

        {/* Content */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Publish Your Score
            </h2>
            <p className="text-gray-500">
              Enter a username to save your time to the global leaderboard
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              maxLength={20}
              autoFocus
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#026cdf] focus:outline-none text-lg text-center"
              onKeyDown={(e) => {
                if (e.key === "Enter" && username.trim()) handleSubmit();
                if (e.key === "Escape") onClose();
              }}
            />

            <button
              onClick={handleSubmit}
              disabled={!username.trim() || isSubmitting}
              className="w-full py-4 bg-[#026cdf] hover:bg-[#0256b1] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold text-lg rounded-lg transition-colors"
            >
              {isSubmitting ? "Saving..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
