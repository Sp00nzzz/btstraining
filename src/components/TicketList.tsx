"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal, ChevronsUpDown, Info, X, ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTicketingStore } from "@/store/useTicketingStore";

export default function TicketList({
    externalSelection,
    ticketCount,
    onTicketCountChange,
    maxPrice,
    onMaxPriceChange,
    sectionAvailability
}: {
    externalSelection?: any,
    ticketCount: number,
    onTicketCountChange: (count: number) => void,
    maxPrice: number,
    onMaxPriceChange: (price: number) => void,
    sectionAvailability?: Record<string, number>
}) {
    const router = useRouter();
    const [isTicketCountOpen, setIsTicketCountOpen] = useState(false);
    const [sort, setSort] = useState<"lowest" | "best">("lowest");
    const [selectedTicket, setSelectedTicket] = useState<any | null>(null);
    const { setCartHold, setSeatQuantity } = useTicketingStore(state => ({
        setCartHold: state.setCartHold,
        setSeatQuantity: state.setSeatQuantity
    }));

    useEffect(() => {
        if (externalSelection !== undefined) {
            setSelectedTicket(externalSelection);
        }
    }, [externalSelection]);

    const allTickets = [
        { id: 1, sec: "W101", row: "7", price: 549.50, fee: 109.90, type: "Standard Ticket" },
        { id: 2, sec: "W102", row: "8", price: 549.50, fee: 109.90, type: "Standard Ticket" },
        { id: 3, sec: "N113", row: "12", price: 450.00, fee: 75.20, type: "Resale Ticket" },
        { id: 4, sec: "N114", row: "15", price: 420.50, fee: 70.10, type: "Standard Ticket" },
        { id: 5, sec: "E120", row: "22", price: 380.00, fee: 65.50, type: "Standard Ticket" },
        { id: 6, sec: "S130", row: "5", price: 143.00, fee: 25.00, type: "Standard Ticket" },
        { id: 7, sec: "S128", row: "6", price: 143.00, fee: 25.00, type: "Standard Ticket" },
    ];

    const tickets = allTickets.filter(t => {
        // Price Filter
        if (t.price > maxPrice) return false;

        // Decay Filter (Simulation)
        // If availability is provided, check if the section is sold out
        // We can also make individual tickets 'sell out' probabilistically based on section availability
        if (sectionAvailability) {
            const avail = sectionAvailability[t.sec] ?? 1.0;
            if (avail <= 0) return false; // Section Sold Out

            // Probabilistic decay: 
            // If section is 50% sold, this ticket has 50% chance of being gone (stable random)
            // Using a simple stable hash for this ticket based on ID
            const stableRandom = ((t.id * 9301 + 49297) % 233280) / 233280;
            if (stableRandom > avail) return false;
        }

        return true;
    }).sort((a, b) => {
        if (sort === "lowest") return a.price - b.price;
        return 0; // "Best Seats" logic would go here
    });

    const subtotal = selectedTicket ? selectedTicket.price + selectedTicket.fee : 0;

    const handleNext = () => {
        if (!selectedTicket) return;
        setCartHold();
        router.push("/checkout");
    };

    return (
        <div className="flex flex-col h-full bg-white relative overflow-hidden">
            <AnimatePresence mode="wait">
                {!selectedTicket ? (
                    <motion.div
                        key="list"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex flex-col h-full"
                    >
                        {/* Filters Header */}
                        <div className="p-4 border-b border-gray-200">
                            <div className="flex gap-2 mb-4 relative z-50">
                                <div className="flex-1 relative">
                                    <button
                                        onClick={() => setIsTicketCountOpen(!isTicketCountOpen)}
                                        className="w-full flex items-center justify-between px-3 py-2 border border-black rounded hover:bg-gray-50 text-sm font-medium bg-white"
                                    >
                                        {ticketCount} Tickets
                                        <ChevronsUpDown className="w-4 h-4" />
                                    </button>

                                    <AnimatePresence>
                                        {isTicketCountOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-xl rounded-md py-1 z-[100]"
                                            >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                                                    <button
                                                        key={num}
                                                        onClick={() => {
                                                            onTicketCountChange(num);
                                                            setSeatQuantity(num);
                                                            setIsTicketCountOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 transition-colors ${ticketCount === num ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-700'}`}
                                                    >
                                                        {num} Ticket{num > 1 ? 's' : ''}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-black rounded hover:bg-gray-50 text-sm font-medium">
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Filters
                                </button>
                            </div>

                            {/* Price Slider mockup */}
                            <div className="flex items-center gap-3 mb-6 px-1">
                                <div className="border rounded px-2 py-1 text-xs font-semibold whitespace-nowrap bg-gray-50">CA $143</div>
                                <div className="flex-1 relative flex items-center h-8">
                                    <input
                                        type="range"
                                        min="143"
                                        max="1221"
                                        value={maxPrice}
                                        onChange={(e) => onMaxPriceChange(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
                                        style={{
                                            background: `linear-gradient(to right, black 0%, black ${((maxPrice - 143) / (1221 - 143)) * 100}%, #e5e7eb ${((maxPrice - 143) / (1221 - 143)) * 100}%, #e5e7eb 100%)`
                                        }}
                                    />
                                    <div
                                        className="absolute pointer-events-none"
                                        style={{ left: `calc(${((maxPrice - 143) / (1221 - 143)) * 100}% - 8px)` }}
                                    >
                                        {/* Mock handle position indicator or something subtle can go here if needed */}
                                    </div>
                                </div>
                                <div className="border rounded px-2 py-1 text-xs font-semibold whitespace-nowrap bg-gray-50">CA ${maxPrice.toLocaleString()}+</div>
                            </div>

                            {/* Sort Tabs */}
                            <div className="flex border-b-2 border-gray-100">
                                <button
                                    onClick={() => setSort("lowest")}
                                    className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wide transition-colors ${sort === "lowest" ? "border-b-4 border-blue-600 text-black translate-y-[2px]" : "text-gray-500 hover:text-black"}`}
                                >
                                    Lowest Price
                                </button>
                                <button
                                    onClick={() => setSort("best")}
                                    className={`flex-1 pb-2 text-xs font-bold uppercase tracking-wide transition-colors ${sort === "best" ? "border-b-4 border-blue-600 text-black translate-y-[2px]" : "text-gray-500 hover:text-black"}`}
                                >
                                    Best Seats
                                </button>
                            </div>
                        </div>

                        {/* Ticket List */}
                        <div className="flex-1 overflow-y-auto">
                            {tickets.length > 0 ? (
                                tickets.map((ticket) => (
                                    <div
                                        key={ticket.id}
                                        onClick={() => setSelectedTicket(ticket)}
                                        className="flex gap-4 p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer group animate-in fade-in slide-in-from-bottom-2 duration-300"
                                    >
                                        {/* Mini Map Thumbnail */}
                                        <div className="w-14 h-14 shrink-0 rounded overflow-hidden bg-gray-100 flex items-center justify-center relative">
                                            <img
                                                src="/map.svg"
                                                alt="Section"
                                                className="w-full h-full object-contain opacity-60"
                                            />
                                            <div className="absolute w-2 h-2 bg-[#026cdf] rounded-full" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="font-bold text-[#1f262d] text-sm">Sec {ticket.sec} • Row {ticket.row}</h3>
                                                    <p className="text-xs text-gray-500 mt-0.5">Verified Resale Ticket</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-[#026cdf]">CA ${ticket.price.toFixed(2)}</div>
                                                    <div className="text-[10px] text-gray-400 mt-1 leading-tight">
                                                        (CA ${(ticket.price - ticket.fee).toFixed(2)}<br />
                                                        + CA ${ticket.fee.toFixed(2)} fees,<br />
                                                        including taxes)
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-10 text-center text-gray-500">
                                    <p className="font-bold mb-2">No tickets found in this price range.</p>
                                    <button onClick={() => onMaxPriceChange(1221)} className="text-blue-600 font-bold text-sm underline">Reset Range</button>
                                </div>
                            )}

                            {/* Footer disclaimer in list */}
                            <div className="p-4 bg-gray-50 text-[10px] text-gray-500 text-center leading-normal">
                                Prices include estimated fees. <br />
                                <span className="underline cursor-pointer">Learn more</span>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="summary"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 40, stiffness: 400 }}
                        className="absolute inset-0 z-50 flex flex-col h-full bg-white text-[#1f262d]"
                    >
                        {/* Summary Header */}
                        <div className="flex items-center justify-center relative p-8 border-b border-gray-100">
                            <h2 className="font-bold text-[18px] text-center">Sec {selectedTicket.sec}, Row {selectedTicket.row}</h2>
                            <button
                                onClick={() => setSelectedTicket(null)}
                                className="absolute right-4 p-1 hover:bg-gray-100 rounded"
                            >
                                <X className="w-6 h-6 text-gray-800" />
                            </button>
                        </div>

                        {/* Arena Map Thumbnail */}
                        <div className="bg-[#f2f2f4] flex items-center justify-center py-6 border-b border-gray-200">
                            <div className="w-[180px] h-[100px] opacity-30">
                                <svg viewBox="0 0 100 60" className="w-full h-full">
                                    <path d="M20,10 L80,10 L90,30 L80,50 L20,50 L10,30 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <rect x="40" y="20" width="20" height="20" fill="currentColor" />
                                    <rect x="25" y="25" width="10" height="15" fill="currentColor" />
                                    <rect x="65" y="25" width="10" height="15" fill="currentColor" />
                                </svg>
                            </div>
                        </div>

                        {/* Subtotal Section */}
                        <div className="p-5 flex-1 overflow-y-auto">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-1 bg-black rounded-full" />
                            </div>

                            <div className="flex justify-between items-start mb-1">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">Subtotal</h3>
                                    <p className="text-base font-bold text-gray-800">1 Ticket</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-black">CA ${subtotal.toFixed(2)}</span>
                                    <ChevronDown className="w-5 h-5 border border-gray-300 rounded-full p-0.5 text-gray-600" />
                                </div>
                            </div>

                            <p className="text-xs text-gray-600 mb-8">
                                Tickets: CA ${subtotal.toFixed(2)} + Order Processing Fee: CA $0.00
                            </p>

                            {/* Breakdown */}
                            <div className="space-y-4 pt-4 border-t border-gray-50">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1 text-gray-500 font-medium">
                                        Face Value <HelpCircle className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <div className="font-medium text-[15px]">CA ${selectedTicket.price.toFixed(2)}</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1 text-gray-500 font-medium">
                                        Service Fee <HelpCircle className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <div className="font-medium text-[15px]">CA ${selectedTicket.fee.toFixed(2)}</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1 text-gray-500 font-medium">
                                        Order Processing Fee <HelpCircle className="w-4 h-4 text-gray-300" />
                                    </div>
                                    <div className="font-medium text-[15px]">CA $0.00</div>
                                </div>
                            </div>
                        </div>

                        {/* Next Button Footer */}
                        <div className="p-5 border-t border-gray-100">
                            <button
                                onClick={handleNext}
                                className="w-full bg-[#008248] hover:bg-[#006e3d] text-white py-4 rounded-[4px] font-bold text-lg transition shadow-md"
                            >
                                Next
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
