"use client";

import { useRouter } from "next/navigation";
import { useTimerStore } from "@/store/useTimerStore";
import { useTicketingStore } from "@/store/useTicketingStore";
import SplashScreen from "@/components/SplashScreen";

export default function SplashPage() {
  const router = useRouter();
  const startTimer = useTimerStore((state) => state.startTimer);
  const resetDemo = useTicketingStore((state) => state.resetDemo);

  const handleStart = () => {
    resetDemo();
    startTimer();
    sessionStorage.setItem("training_started", "true");
    sessionStorage.setItem("training_start_time", Date.now().toString());
    sessionStorage.removeItem("training_end_time");
    router.push("/home");
  };

  return <SplashScreen onStart={handleStart} />;
}
