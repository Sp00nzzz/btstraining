"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useTicketingStore } from "@/store/useTicketingStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Info, Lock, Smartphone, Monitor, ShieldCheck, ArrowLeft, ArrowRight } from "lucide-react";


export default function QueuePage() {
    const router = useRouter();
    const queueState = useTicketingStore((state) => state.queue);
    const setQueue = useTicketingStore((state) => state.setQueue);

    // Initialize queue state on mount
    useEffect(() => {
        setQueue({
            position: 60,
            paused: false,
            etaSeconds: 300,
        });
    }, [setQueue]);

    // Live Queue Movement Simulation
    useEffect(() => {
        if (queueState.position <= 0) {
            const timer = setTimeout(() => router.push("/event/123/seats"), 2000);
            return () => clearTimeout(timer);
        }

        const interval = setInterval(() => {
            const drop = Math.floor(Math.random() * 15) + 5; // Drop 5-20 people per second
            setQueue((prev) => ({
                position: Math.max(0, prev.position - drop),
                etaSeconds: Math.max(0, prev.etaSeconds - 1)
            }));
        }, 1000);

        return () => clearInterval(interval);
    }, [queueState.position, setQueue, router]);

    const progress = Math.min(100, ((16640 - queueState.position) / 16640) * 100);
    const displayProgress = 15 + (progress * 0.75); // Map to 15% - 90% range for the visual bar 

    return (
        <div className="min-h-screen w-full bg-[#020202] text-white font-sans">
            {/* Top Header: Event Info (Ticketmaster style) */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#020202] border-b border-white/10 shadow-lg">
                <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-4 md:py-5">
                    <div className="flex items-center gap-4 md:gap-10">
                        {/* Logo */}
                        <div className="shrink-0">
                            <span className="text-xl md:text-2xl font-bold italic tracking-tighter text-white">ticketmaster</span>
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg md:text-2xl font-bold mb-0.5 truncate uppercase">BTS WORLD TOUR 'ARIRANG' IN TORONTO</h1>
                            <div className="flex flex-col md:flex-row md:items-center gap-y-1 md:gap-x-4 text-xs md:text-sm font-medium text-gray-400">
                                <span>Thu • Jan 22, 2026 • 7:00 pm</span>
                                <span className="hidden md:inline">|</span>
                                <span>Rogers Centre, Toronto, ON</span>
                            </div>
                        </div>

                        {/* Artist Image Fade */}
                        <div className="hidden lg:block relative w-[350px] h-[90px] opacity-40 shrink-0 -mr-16">
                            <div
                                className="absolute inset-0 bg-contain bg-center bg-no-repeat rounded"
                                style={{ backgroundImage: 'url("/BTS.jpg")' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#020202]" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent" />
                        </div>
                    </div>

                    {/* Progress Stepper - Integrated into Header */}
                    <div className="w-full max-w-[900px] mx-auto mt-6 md:mt-10 mb-2">
                        <div className="relative flex items-center justify-between text-[9px] md:text-[11px] font-bold tracking-widest text-[#444444] uppercase">
                            {/* Lines */}
                            <div className="absolute top-[5px] left-0 right-0 h-[2.5px] bg-[#222222] -z-0 rounded-full" />
                            <div className="absolute top-[5px] left-0 w-[75%] h-[2.5px] bg-white -z-0 rounded-full" />

                            {/* Step 1 */}
                            <div className="relative z-10 flex flex-col items-center gap-2.5">
                                <div className="w-3 h-3 rounded-full bg-white ring-[5px] ring-[#020202]" />
                                <span className="text-white">The Lobby</span>
                            </div>
                            {/* Step 2 */}
                            <div className="relative z-10 flex flex-col items-center gap-2.5">
                                <div className="w-3 h-3 rounded-full bg-white ring-[5px] ring-[#020202]" />
                                <span className="text-white">Waiting Room</span>
                            </div>
                            {/* Step 3 (Current) */}
                            <div className="relative z-10 flex flex-col items-center gap-2.5">
                                <div className="w-3 h-3 rounded-full bg-white ring-[5px] ring-[#020202]" />
                                <span className="text-white">Queue</span>
                            </div>
                            {/* Step 4 */}
                            <div className="relative z-10 flex flex-col items-center gap-2.5">
                                <div className="w-3 h-3 rounded-full bg-[#222222] ring-[5px] ring-[#020202]" />
                                <span>Pick Your Seats</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="pt-[220px] md:pt-[280px] pb-20 px-4 flex flex-col items-center justify-center">

                {/* Queue Status Card */}
                <div
                    className="w-full max-w-[800px] rounded-[3px] overflow-hidden shadow-2xl relative mb-12"
                    style={{ backgroundColor: '#f2f2f4', color: '#1f262d' }}
                >
                    <div className="h-2 bg-[#026cdf] w-full" /> {/* Top Blue Bar */}

                    <div className="p-6 md:p-14 flex flex-col items-center text-center">
                        <h2 className="text-xl md:text-2xl font-black mb-8 tracking-tight uppercase">You Are Now In The Queue</h2>
                        <div className="relative">
                            <span className="text-[50px] md:text-[90px] font-black text-[#026cdf] leading-none mb-3 block">
                                {(queueState?.position || 0).toLocaleString()}
                            </span>
                            <p className="text-[10px] md:text-[11px] font-extrabold tracking-[0.2em] text-gray-500 uppercase mb-12">People Ahead of You</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 h-[10px] rounded-full relative mb-14 overflow-visible">
                            <div
                                className="absolute top-0 left-0 h-full bg-[#026cdf] rounded-full transition-all duration-1000 ease-linear"
                                style={{ width: `${displayProgress}%` }}
                            />
                            <div
                                className="absolute top-1/2 -translate-y-1/2 w-9 h-9 bg-[#026cdf] rounded-full flex items-center justify-center text-white font-black italic border-[3px] border-white shadow-xl z-10 transition-all duration-1000 ease-linear"
                                style={{ left: `${displayProgress}%`, marginLeft: '-18px' }}
                            >
                                <span className="text-[22px] leading-none relative -top-[2px] -left-[1px]">t</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-300 w-full pt-6">
                            <p className="text-[10px] md:text-[11px] text-gray-400 font-mono tracking-widest uppercase">
                                QUEUE ID: 33031168-174D-4CFA-96AC-633C48859E07
                            </p>
                        </div>

                        <div className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 cursor-pointer">
                            <Info className="w-6 h-6" />
                        </div>
                    </div>
                </div>

                {/* Info Cards (Bottom) */}
                <div className="w-full max-w-[800px] grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {/* Card 1 */}
                    <div className="bg-[#1f262d] p-6 rounded-[2px] md:rounded-[4px] relative flex md:block items-center gap-4">
                        <div className="md:mb-4 bg-[#026cdf] p-2 rounded w-fit md:mx-0">
                            <Smartphone className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white mb-2">Stick To One Device</h3>
                            <p className="text-[11px] leading-tight text-gray-300">
                                Join the queue from one browser on one device. Additional attempts to join could kick you out of the queue.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-[#1f262d] p-6 rounded-[2px] md:rounded-[4px] relative flex md:block items-center gap-4">
                        <div className="md:mb-4 bg-transparent border border-[#026cdf] text-[#026cdf] p-2 rounded w-fit md:mx-0">
                            <Monitor className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white mb-2">One Tab Only</h3>
                            <p className="text-[11px] leading-tight text-gray-300">
                                Accessing the sale from multiple tabs may cause you to lose your place in line.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-[#1f262d] p-6 rounded-[2px] md:rounded-[4px] relative flex md:block items-center gap-4">
                        <div className="md:mb-4 bg-transparent border border-[#026cdf] text-[#026cdf] p-2 rounded w-fit md:mx-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-base font-bold text-white mb-2">Bot Detection Is Live</h3>
                            <p className="text-[11px] leading-tight text-gray-300">
                                Disable any browser extensions that may cause you to be flagged as a bot.
                            </p>
                        </div>
                        <div className="hidden md:flex absolute bottom-6 right-4 bg-[#026cdf] w-8 h-8 items-center justify-center rounded-[2px]">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Seat Map Section (Bottom) */}
                <div className="w-full mt-24 bg-white py-20 flex flex-col items-center">
                    <div className="max-w-[900px] w-full px-4">
                        <h2 className="text-xl font-bold text-[#1f262d] mb-8">Seat Map</h2>

                        <div className="mb-8 flex justify-center">
                            <Image
                                src="/map.svg"
                                alt="Venue Map"
                                width={900}
                                height={600}
                                className="w-full h-auto object-contain max-h-[600px]"
                                loading="lazy"
                            />
                        </div>

                        <div className="space-y-2">
                            <p className="text-[11px] font-bold text-[#1f262d]">
                                Map above does not reflect availability of tickets.
                            </p>
                            <p className="text-[11px] text-[#626569] leading-relaxed">
                                Seating charts reflect the general layout for the venue at this time. For some events, the layout and specific seat locations may vary without notice.
                            </p>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
