import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#1f262d] text-white pt-12 pb-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 border-b border-gray-700 pb-12">
                    {/* Helpful Links */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Helpful Links</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white">Help/FAQ</Link></li>
                            <li><Link href="#" className="hover:text-white">Sell</Link></li>
                            <li><Link href="#" className="hover:text-white">My Account</Link></li>
                            <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                            <li><Link href="#" className="hover:text-white">Gift Cards</Link></li>
                            <li><Link href="#" className="hover:text-white">Do Not Sell or Share My Personal Information</Link></li>
                        </ul>
                    </div>

                    {/* About Us */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">About Us</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white">Who We Are</Link></li>
                            <li><Link href="#" className="hover:text-white">Ticketmaster Blog</Link></li>
                            <li><Link href="#" className="hover:text-white">Ticketing 101</Link></li>
                            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white">Work With Us</Link></li>
                        </ul>
                    </div>

                    {/* Friends & Partners */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Friends & Partners</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="#" className="hover:text-white">American Express</Link></li>
                            <li><Link href="#" className="hover:text-white">Allianz</Link></li>
                            <li><Link href="#" className="hover:text-white">AWS</Link></li>
                        </ul>
                    </div>


                    {/* Download App & Social */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-2">
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Download the App</h3>
                        <p className="text-sm text-gray-400 mb-6">Manage your tickets with the Ticketmaster App.</p>

                        <button className="bg-white text-black font-bold py-2 px-4 rounded mb-8 w-full sm:w-auto">
                            Get the App
                        </button>

                        <h3 className="text-sm font-bold uppercase tracking-wider mb-4">Connect With Us</h3>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-white">
                                <span className="sr-only">YouTube</span>
                                <Youtube className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                    <p>&copy; 1999-2024 Ticketmaster. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white">Terms of Use</Link>
                        <Link href="#" className="hover:text-white">Purchase Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
