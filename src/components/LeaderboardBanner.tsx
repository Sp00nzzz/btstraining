"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/supabase";
import { Trophy } from "lucide-react";

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
}

export default function LeaderboardBanner() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      const data = await getLeaderboard();
      setEntries(data);
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#1f262d] text-white py-0.5 md:py-2 px-1 md:px-4">
        <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-1 md:gap-2">
          <Trophy className="w-2.5 h-2.5 md:w-4 md:h-4 text-yellow-400" />
          <span className="text-[10px] md:text-sm font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#1f262d] text-white py-0.5 md:py-2 px-1 md:px-4 overflow-hidden">
      <div className="max-w-[1440px] mx-auto flex items-center gap-1.5 md:gap-4">
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-bold uppercase tracking-wider">Top Times</span>
        </div>
        <Trophy className="w-2.5 h-2.5 md:hidden text-yellow-400 shrink-0" />

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-2 md:gap-6 animate-marquee">
            {entries.slice(0, 10).map((entry, index) => (
              <div key={entry.id} className="flex items-center gap-0.5 md:gap-2 shrink-0">
                <span className={`text-[8px] md:text-xs font-bold px-0.5 md:px-1.5 py-0 md:py-0.5 rounded ${
                  index === 0 ? "bg-yellow-400 text-yellow-900" :
                  index === 1 ? "bg-gray-300 text-gray-700" :
                  index === 2 ? "bg-orange-400 text-orange-900" :
                  "bg-gray-600 text-gray-200"
                }`}>
                  #{index + 1}
                </span>
                <span className="text-[10px] md:text-sm font-medium text-gray-300">{entry.username}</span>
                <span className="text-[10px] md:text-sm font-mono font-bold text-[#026cdf]">{formatTime(entry.time_ms)}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {entries.slice(0, 10).map((entry, index) => (
              <div key={`dup-${entry.id}`} className="flex items-center gap-0.5 md:gap-2 shrink-0">
                <span className={`text-[8px] md:text-xs font-bold px-0.5 md:px-1.5 py-0 md:py-0.5 rounded ${
                  index === 0 ? "bg-yellow-400 text-yellow-900" :
                  index === 1 ? "bg-gray-300 text-gray-700" :
                  index === 2 ? "bg-orange-400 text-orange-900" :
                  "bg-gray-600 text-gray-200"
                }`}>
                  #{index + 1}
                </span>
                <span className="text-[10px] md:text-sm font-medium text-gray-300">{entry.username}</span>
                <span className="text-[10px] md:text-sm font-mono font-bold text-[#026cdf]">{formatTime(entry.time_ms)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
