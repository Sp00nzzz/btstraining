"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientHydrate from "@/components/ClientHydrate";
import ResetDemoButton from "@/components/ResetDemoButton";
import Facecam from "@/components/Facecam";
import SpeedrunTimer from "@/components/SpeedrunTimer";
import { useTicketingStore } from "@/store/useTicketingStore";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const resetDemo = useTicketingStore((state) => state.resetDemo);

    // Global refresh handler - forces redirect to splash screen on refresh
    useEffect(() => {
        if (typeof window !== "undefined") {
            const navigationEntries = window.performance.getEntriesByType("navigation");
            if (navigationEntries.length > 0) {
                const navigationEntry = navigationEntries[0] as PerformanceNavigationTiming;
                // If the page was accessed via reload/refresh
                if (navigationEntry.type === 'reload') {
                    resetDemo();
                    // If we're not already at root, go there
                    if (window.location.pathname !== '/') {
                        router.push('/');
                    }
                }
            }
        }
    }, [resetDemo, router]);
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
