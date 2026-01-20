import { ChevronDown, Info, Menu, User, Search } from "lucide-react";
import Image from "next/image";

export default function EventHeader() {
    return (
        <header className="bg-[#1f262d] text-white border-b border-gray-700">
            {/* Top Bar with Logo and User Controls */}
            <div className="flex items-center justify-between px-4 h-14 md:px-6">
                <div className="flex items-center gap-4">
                    <button className="p-1 hover:bg-white/10 rounded">
                        <Menu className="w-6 h-6 text-white" />
                    </button>
                    <span className="text-xl font-bold italic tracking-tighter text-white">ticketmaster</span>
                </div>

                <div className="flex items-center gap-4 text-sm font-medium">
                    <div className="hidden md:flex items-center gap-2 cursor-pointer hover:text-gray-300">
                        <div className="w-5 h-5 rounded-full overflow-hidden relative">
                            {/* Flag placeholder - using a simple div for now or text */}
                            <span className="text-[10px]">🇨🇦</span>
                        </div>
                        <span>EN</span>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                        <User className="w-5 h-5" />
                        <span className="hidden sm:inline">Hi, Mike</span>
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Breadcrumbs and Event Title Row */}
            <div className="px-4 py-4 md:px-6 border-t border-white/10">
                <div className="flex flex-wrap gap-1 text-xs text-gray-400 mb-2">
                    <span className="hover:underline cursor-pointer">Home</span> /
                    <span className="hover:underline cursor-pointer">Concert Tickets</span> /
                    <span className="hover:underline cursor-pointer">Pop</span> /
                    <span className="text-white">BTS</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Artist Image Thumbnail */}
                    <div className="w-[80px] h-[50px] relative rounded overflow-hidden shrink-0 hidden md:block">
                        <div className="absolute inset-0 bg-gray-600 animate-pulse" /> {/* Placeholder while loading or if image missing */}
                        <img src="/BTS.jpg" className="absolute inset-0 w-full h-full object-cover" alt="Event" />
                    </div>

                    <div className="flex-1">
                        <div className="flex items-center gap-3">
                            <h1 className="text-xl md:text-2xl font-bold leading-tight">BTS WORLD TOUR 'ARIRANG' IN TORONTO</h1>
                            <button className="hidden sm:flex items-center gap-1 px-3 py-1 rounded-full border border-gray-500 text-xs hover:border-white transition shrink-0">
                                <Info className="w-3 h-3" />
                                More Info
                            </button>
                        </div>
                        <div className="text-sm text-gray-300 mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span>Sun • Jan 25 • 7:00 PM</span>
                            <span className="hidden sm:inline text-gray-500">|</span>
                            <span className="underline hover:no-underline cursor-pointer">Rogers Centre, Toronto, ON</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
