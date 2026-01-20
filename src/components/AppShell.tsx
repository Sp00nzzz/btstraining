"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientHydrate from "@/components/ClientHydrate";
import ResetDemoButton from "@/components/ResetDemoButton";
import Facecam from "@/components/Facecam";
import SpeedrunTimer from "@/components/SpeedrunTimer";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isQueuePage = pathname?.startsWith("/queue");
    const isSeatsPage = pathname?.includes("/seats");
    const isCheckoutPage = pathname?.startsWith("/checkout");
    const hideLayout = isQueuePage || isSeatsPage || isCheckoutPage;

    return (
        <div className="relative flex min-h-screen flex-col">
            <ClientHydrate />
            <Facecam />
            <SpeedrunTimer />
            {!hideLayout && <Navbar />}
            <main className="flex-1">{children}</main>
            {!hideLayout && <Footer />}
            {!hideLayout && <ResetDemoButton />}
        </div>
    );
}
