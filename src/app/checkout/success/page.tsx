"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTimerStore } from "@/store/useTimerStore";
import confetti from "canvas-confetti";

export default function SuccessPage() {
    const router = useRouter();
    const { startTime, stopTime, resetTimer } = useTimerStore();
    const [mounted, setMounted] = useState(false);

    // Calculate duration derived from store state
    const duration = (stopTime && startTime) ? stopTime - startTime : 0;
    // 60000ms = 1 minute
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

    return (
        <div
            className="min-h-screen bg-white flex flex-col items-center justify-center p-4 text-center"
            style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
            <div className="max-w-2xl w-full flex flex-col items-center gap-8">

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
        </div>
    );
}
