"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTimerStore } from "@/store/useTimerStore";

export default function SpeedrunTimer() {
    const { startTime, stopTime, isRunning } = useTimerStore();
    const pathname = usePathname();
    const [displayTime, setDisplayTime] = useState("0:00.00");
    const requestRef = useRef<number | null>(null);

    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const hundredths = Math.floor((ms % 1000) / 10);

        return `${minutes}:${seconds.toString().padStart(2, "0")}.${hundredths.toString().padStart(2, "0")}`;
    };

    const animate = () => {
        if (isRunning && startTime) {
            setDisplayTime(formatTime(Date.now() - startTime));
            requestRef.current = requestAnimationFrame(animate);
        } else if (startTime && stopTime) {
            setDisplayTime(formatTime(stopTime - startTime));
        }
    };

    useEffect(() => {
        if (isRunning) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (startTime && stopTime) {
                setDisplayTime(formatTime(stopTime - startTime));
            }
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isRunning, startTime, stopTime]);

    // Hide on success page (time is shown prominently there)
    if (pathname === "/checkout/success") return null;

    // If timer hasn't started and no previous result, don't show or show 0:00
    if (!startTime && !isRunning) return null;

    return (
        <div className="fixed bottom-8 left-8 z-[200] bg-black/90 px-4 py-2 min-w-[150px]">
            <div
                className="text-4xl font-bold tabular-nums tracking-tighter"
                style={{
                    color: "#33ff5a",
                    fontFamily: "monospace"
                }}
            >
                {displayTime}
            </div>
        </div>
    );
}
