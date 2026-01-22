"use client";

import { useEffect, useState, useRef } from "react";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const userScrolledRef = useRef(false);
  const userScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchLeaderboard() {
      setLoading(true);
      const data = await getLeaderboard();
      setEntries(data);
      setLoading(false);
    }
    fetchLeaderboard();
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, []);

  // Handle user scroll detection
  const handleUserScroll = () => {
    userScrolledRef.current = true;
    // Clear any existing timeout
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    // Reset the flag after user stops scrolling for 3 seconds
    userScrollTimeoutRef.current = setTimeout(() => {
      userScrolledRef.current = false;
    }, 3000);
  };

  // Auto-scroll effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || loading || entries.length <= 5 || isPaused) return;

    const scrollSpeed = 0.5; // pixels per frame
    let animationId: number;

    const scroll = () => {
      if (container.scrollTop + container.clientHeight >= container.scrollHeight) {
        // Only reset to top if user hasn't manually scrolled
        if (!userScrolledRef.current) {
          container.scrollTop = 0;
        }
      } else if (!userScrolledRef.current) {
        container.scrollTop += scrollSpeed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Start scrolling after a short delay
    const timeout = setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 2000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(animationId);
    };
  }, [loading, entries.length, isPaused]);

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
      <div
        ref={scrollContainerRef}
        className="space-y-2 max-h-[320px] md:max-h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onWheel={handleUserScroll}
        onTouchMove={handleUserScroll}
        style={{ scrollBehavior: 'auto' }}
      >
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
                <span className={`w-8 h-8 flex items-center justify-center font-bold text-lg rounded-full ${
                    index === 0 ? "bg-yellow-400 text-yellow-900" :
                    index === 1 ? "bg-gray-300 text-gray-700" :
                    index === 2 ? "bg-orange-400 text-orange-900" :
                    "text-gray-500"
                  }`}>
                  {index + 1}
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
      {entries.length > 5 && (
        <p className="text-xs text-gray-400 text-center mt-2">Hover to pause scrolling</p>
      )}
    </div>
  );
}
