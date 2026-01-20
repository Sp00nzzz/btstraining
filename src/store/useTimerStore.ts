"use client";

import { create } from "zustand";

interface TimerStore {
    startTime: number | null;
    stopTime: number | null;
    isRunning: boolean;
    startTimer: () => void;
    stopTimer: () => void;
    resetTimer: () => void;
}

export const useTimerStore = create<TimerStore>((set) => ({
    startTime: null,
    stopTime: null,
    isRunning: false,
    startTimer: () => set({
        startTime: Date.now(),
        stopTime: null,
        isRunning: true
    }),
    stopTimer: () => set((state) => ({
        stopTime: state.isRunning ? Date.now() : state.stopTime,
        isRunning: false
    })),
    resetTimer: () => set({
        startTime: null,
        stopTime: null,
        isRunning: false
    }),
}));
