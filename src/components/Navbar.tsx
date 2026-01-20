import Link from "next/link";
import { Search, User, MapPin, Calendar, ChevronDown, Monitor } from "lucide-react";

export default function Navbar() {
    return (
        <div className="flex flex-col w-full font-sans">
            {/* Top Black Bar */}
            <div className="bg-[#1f262d] text-white text-[11px] font-medium tracking-wide">
                <div className="mx-auto flex h-[36px] max-w-[1440px] items-center justify-between px-6">
                    {/* Left Side: Region/Lang */}
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 opacity-90 hover:opacity-100">
                            <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border border-white/30 bg-red-600">
                                <div className="h-1.5 w-1.5 bg-white rounded-full"></div>{/* Simple CA flag mock */}
                            </div>
                            <span>CA</span>
                        </button>
                        <span className="text-gray-600">|</span>
                        <button className="flex items-center gap-1 opacity-90 hover:opacity-100">
                            <span className="text-[10px] grid place-items-center border border-white/60 w-3.5 h-3.5 rounded-sm">EN</span>
                            <span>EN</span>
                        </button>
                    </div>

                    {/* Right Side: Links */}
                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-gray-300">Hotels</Link>
                        <Link href="#" className="hover:text-gray-300">Sell</Link>
                        <Link href="#" className="flex items-center gap-1 hover:text-gray-300">
                            <Monitor className="w-3 h-3" /> {/* Gift Card Icon Mock */}
                            Gift Cards
                        </Link>
                        <Link href="#" className="hover:text-gray-300">Help</Link>
                        <Link href="#" className="hover:text-gray-300">VIP</Link>
                        <div className="flex items-center gap-1 ml-2">
                            <span className="font-bold italic text-white text-xs">PayPal</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Blue Header */}
            <header className="bg-[#0059e3] text-white pb-8">
                <div className="mx-auto max-w-[1440px] px-8">
                    {/* Top Row: Logo & Nav & Account */}
                    <div className="flex h-[84px] items-center justify-between">
                        <div className="flex items-center gap-10">
                            {/* Logo */}
                            <Link href="/" className="flex items-center group">
                                <span className="text-[28px] font-bold tracking-tighter italic">ticketmaster</span>
                                <span className="text-[10px] relative -top-3 ml-0.5">®</span>
                            </Link>

                            {/* Main Navigation */}
                            <nav className="hidden lg:flex items-center gap-7 text-[16px] font-semibold">
                                <Link href="#" className="hover:opacity-80">Concerts</Link>
                                <Link href="#" className="hover:opacity-80">Sports</Link>
                                <Link href="#" className="hover:opacity-80">Arts, Theatre & Comedy</Link>
                                <Link href="#" className="hover:opacity-80">Family</Link>
                                <Link href="#" className="hover:opacity-80">Cities</Link>
                            </nav>
                        </div>

                        {/* Account */}
                        <div className="flex items-center gap-2 hover:opacity-80 cursor-pointer">
                            <User className="w-6 h-6 border-2 border-transparent rounded-full" />
                            <span className="text-[16px] font-semibold">My Account</span>
                        </div>
                    </div>

                    {/* Bottom Row: Search Bar */}
                    <div className="flex w-full h-[64px] bg-white rounded-[4px] overflow-hidden text-[#1f262d] shadow-sm items-center px-1" style={{ fontFamily: "Averta, helvetica, arial, sans-serif" }}>
                        {/* Location Segment */}
                        <div className="flex-1 flex items-center px-6 h-full border-r border-gray-200 cursor-pointer group">
                            <MapPin className="w-6 h-6 text-[#0059e3] mr-4 opacity-80" />
                            <div className="flex flex-col justify-center">
                                <span className="text-[11px] font-extrabold tracking-wider text-[#1f262d] uppercase">Location</span>
                                <span className="text-[15px] text-gray-500 font-medium">City or Postal Code</span>
                            </div>
                        </div>

                        {/* Dates Segment */}
                        <div className="w-[240px] flex items-center px-6 h-full border-r border-gray-200 cursor-pointer group">
                            <Calendar className="w-6 h-6 text-[#0059e3] mr-4 opacity-80" />
                            <div className="flex flex-col justify-center flex-1">
                                <span className="text-[11px] font-extrabold tracking-wider text-[#1f262d] uppercase">Dates</span>
                                <span className="text-[15px] text-gray-500 font-medium whitespace-nowrap">All Dates</span>
                            </div>
                            <ChevronDown className="w-5 h-5 text-gray-400 ml-2" />
                        </div>

                        {/* Search Input Segment */}
                        <div className="flex-[1.5] flex items-center px-6 h-full">
                            <Search className="w-6 h-6 text-[#0059e3] mr-4 opacity-80" />
                            <div className="flex flex-col justify-center w-full">
                                <span className="text-[11px] font-extrabold tracking-wider text-[#1f262d] uppercase">Search</span>
                                <input
                                    type="text"
                                    placeholder="Artist, Event or Venue"
                                    className="text-[15px] text-gray-800 placeholder:text-gray-400 w-full border-none p-0 focus:ring-0 h-5 font-medium"
                                />
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="bg-[#1055d4] text-white font-bold h-[48px] px-10 rounded-[4px] text-sm hover:bg-[#0d46b0] transition-colors mr-1">
                            Search
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
}
