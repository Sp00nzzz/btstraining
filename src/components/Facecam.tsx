"use client";

import { useEffect, useRef, useState } from "react";
import { create } from "zustand";

interface FacecamStore {
    isCameraEnabled: boolean;
    enableCamera: () => void;
    disableCamera: () => void;
}

export const useFacecamStore = create<FacecamStore>((set) => ({
    isCameraEnabled: false,
    enableCamera: () => set({ isCameraEnabled: true }),
    disableCamera: () => set({ isCameraEnabled: false }),
}));

export default function Facecam() {
    const { isCameraEnabled } = useFacecamStore();
    const [stream, setStream] = useState<MediaStream | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let currentStream: MediaStream | null = null;

        async function startCamera() {
            try {
                const s = await navigator.mediaDevices.getUserMedia({
                    video: { width: 1280, height: 720 },
                    audio: false
                });
                setStream(s);
                currentStream = s;
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                }
            } catch (err) {
                console.error("Camera access denied", err);
            }
        }

        if (isCameraEnabled) {
            startCamera();
        } else {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                setStream(null);
            }
        }

        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraEnabled]);

    useEffect(() => {
        if (stream && videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    if (!isCameraEnabled) return null;

    return (
        <div className="fixed top-8 left-8 z-[200] w-[200px] h-[150px] bg-black overflow-hidden shadow-2xl pointer-events-none">
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover -scale-x-100"
            />
        </div>
    );
}
