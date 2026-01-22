"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTimerStore } from "@/store/useTimerStore";
import { submitScore } from "@/lib/supabase";
import Leaderboard from "@/components/Leaderboard";
import LeaderboardDialog from "@/components/LeaderboardDialog";
import confetti from "canvas-confetti";

export default function SuccessPage() {
    const router = useRouter();
    const { startTime, stopTime, resetTimer } = useTimerStore();
    const [mounted, setMounted] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [submittedUsername, setSubmittedUsername] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [leaderboardKey, setLeaderboardKey] = useState(0);

    const duration = (stopTime && startTime) ? stopTime - startTime : 0;
    const isGoodTime = duration > 0 && duration <= 60000;

    useEffect(() => {
        setMounted(true);
        if (isGoodTime) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    }, [isGoodTime]);

    if (!mounted) return null;

    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
    };

    const handleSubmitScore = async (username: string) => {
        if (!username || duration <= 0) return;

        setIsSubmitting(true);
        const result = await submitScore(username, duration);
        setIsSubmitting(false);

        if (result) {
            setSubmittedUsername(username);
            setIsDialogOpen(false);
            setLeaderboardKey(prev => prev + 1);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center dynamic-comic-font">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-12 items-center lg:items-start justify-center">

                {/* Left Column: Result & Actions */}
                <div className="flex-1 flex flex-col items-center gap-8 w-full max-w-2xl">
                    {/* Time Display */}
                    <div className="space-y-4">
                        <h1 className="text-2xl font-bold uppercase tracking-wide text-gray-500">Total Time</h1>
                        <p className="text-7xl font-bold text-[#026cdf]">
                            {formatTime(duration)}
                        </p>
                    </div>

                    {/* Conditional Content */}
                    {isGoodTime ? (
                        <div className="space-y-6 flex flex-col items-center animate-in fade-in zoom-in duration-500">
                            <h2 className="text-4xl font-black italic tracking-tighter text-[#1f8c2e]">YOU ARE PREPPED SOLDIER</h2>
                            <div className="relative w-80 h-80">
                                <Image
                                    src="/soldier.webp"
                                    alt="Soldier"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500 py-8">
                            <h2 className="text-3xl font-bold text-[#d10000]">you need to try faster than that</h2>
                        </div>
                    )}

                    {/* Publish Button */}
                    {duration > 0 && !submittedUsername && (
                        <button
                            onClick={() => setIsDialogOpen(true)}
                            className="px-8 py-4 bg-[#1f8c2e] hover:bg-[#177023] text-white font-bold text-lg rounded-lg shadow-md transition-all hover:scale-105 animate-in fade-in duration-500"
                        >
                            Publish to Leaderboard
                        </button>
                    )}

                    {submittedUsername && (
                        <p className="text-[#1f8c2e] font-bold animate-in fade-in duration-300">
                            Score published as &quot;{submittedUsername}&quot;!
                        </p>
                    )}

                    {/* Action Button */}
                    <button
                        onClick={() => {
                            resetTimer();
                            router.push("/");
                        }}
                        className="mt-4 px-8 py-4 bg-[#026cdf] hover:bg-[#0256b1] text-white font-bold text-lg rounded-[2px] shadow-md transition-all hover:scale-105"
                    >
                        try to get a better time
                    </button>
                </div>

                {/* Right Column: Leaderboard */}
                <div className="flex-1 w-full max-w-xl">
                    <Leaderboard key={leaderboardKey} highlightUsername={submittedUsername || undefined} />
                </div>
            </div>

            {/* Dialog */}
            <LeaderboardDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSubmit={handleSubmitScore}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}
