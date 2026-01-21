"use client";

import { useEffect, useState } from "react";
import { getLeaderboard, type LeaderboardEntry } from "@/lib/supabase";

function formatTime(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
}

export default function Leaderboard({ highlightUsername }: { highlightUsername?: string }) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      const data = await getLeaderboard(10);
      setEntries(data);
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Leaderboard</h3>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto">
        <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Leaderboard</h3>
        <p className="text-gray-500 text-center">No scores yet. Be the first!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-xl font-bold text-gray-700 mb-4 text-center">Leaderboard</h3>
      <div className="space-y-2">
        {entries.map((entry, index) => {
          const isHighlighted = highlightUsername && entry.username === highlightUsername;
          const rankColors = [
            "bg-yellow-100 border-yellow-400",
            "bg-gray-100 border-gray-400",
            "bg-orange-100 border-orange-400",
          ];
          const bgClass = index < 3 ? rankColors[index] : "bg-white border-gray-200";

          return (
            <div
              key={entry.id}
              className={`flex items-center justify-between p-3 rounded-lg border-2 ${bgClass} ${
                isHighlighted ? "ring-2 ring-[#026cdf] ring-offset-2" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 flex items-center justify-center font-bold text-lg">
                  {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : `#${index + 1}`}
                </span>
                <span className={`font-semibold ${isHighlighted ? "text-[#026cdf]" : "text-gray-800"}`}>
                  {entry.username}
                </span>
              </div>
              <span className="font-mono font-bold text-[#026cdf]">{formatTime(entry.time_ms)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
