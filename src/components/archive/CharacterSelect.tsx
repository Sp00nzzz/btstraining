"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHARACTER_NAMES = [
  "Jungkook",
  "Suga",
  "Jin",
  "V",
  "RM",
  "Jimin",
  "J-Hope",
];

// Approximate horizontal positions (as percentage from left) for each character's name tag
const CHARACTER_POSITIONS = [
  { x: 7, y: 15 },   // Jungkook
  { x: 20, y: 15 },  // Suga
  { x: 33, y: 12 },  // Jin
  { x: 46, y: 10 },  // V
  { x: 59, y: 12 },  // RM
  { x: 72, y: 15 },  // Jimin
  { x: 88, y: 15 },  // J-Hope
];

const CHARACTER_COUNT = 7;
const ALPHA_THRESHOLD = 50; // Pixel is considered non-transparent if alpha > this

interface CharacterSelectProps {
  onSelect?: (characterIndex: number, characterName: string) => void;
  selectedCharacter?: number | null;
}

export default function CharacterSelect({
  onSelect,
  selectedCharacter: controlledSelected
}: CharacterSelectProps) {
  const [internalSelected, setInternalSelected] = useState<number | null>(null);
  const [hoveredCharacter, setHoveredCharacter] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const imageDataRefs = useRef<(ImageData | null)[]>([]);
  const imageDimensions = useRef<{ width: number; height: number } | null>(null);

  const selectedCharacter = controlledSelected !== undefined ? controlledSelected : internalSelected;

  // Load images into canvases for pixel detection
  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = Array.from({ length: CHARACTER_COUNT }, (_, i) => {
        return new Promise<{ index: number; imageData: ImageData; width: number; height: number }>((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) {
              reject(new Error("Could not get canvas context"));
              return;
            }
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, img.width, img.height);
            resolve({ index: i, imageData, width: img.width, height: img.height });
          };
          img.onerror = reject;
          img.src = `/characters/${i + 1}.png`;
        });
      });

      try {
        const results = await Promise.all(loadPromises);
        results.forEach(({ index, imageData, width, height }) => {
          imageDataRefs.current[index] = imageData;
          if (!imageDimensions.current) {
            imageDimensions.current = { width, height };
          }
        });
        setImagesLoaded(true);
      } catch (error) {
        console.error("Failed to load character images:", error);
      }
    };

    loadImages();
  }, []);

  // Check if pixel at position is non-transparent for a given character
  const isPixelVisible = useCallback((characterIndex: number, x: number, y: number): boolean => {
    const imageData = imageDataRefs.current[characterIndex];
    if (!imageData || !imageDimensions.current) return false;

    const { width, height } = imageDimensions.current;

    // Clamp coordinates
    const pixelX = Math.floor(Math.max(0, Math.min(width - 1, x)));
    const pixelY = Math.floor(Math.max(0, Math.min(height - 1, y)));

    // Get alpha value (4th byte in RGBA)
    const alphaIndex = (pixelY * width + pixelX) * 4 + 3;
    const alpha = imageData.data[alphaIndex];

    return alpha > ALPHA_THRESHOLD;
  }, []);

  // Find which character was clicked based on transparency
  const findClickedCharacter = useCallback((clientX: number, clientY: number): number | null => {
    if (!containerRef.current || !imageDimensions.current || !imagesLoaded) return null;

    const rect = containerRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;

    // Convert to image coordinates
    const scaleX = imageDimensions.current.width / rect.width;
    const scaleY = imageDimensions.current.height / rect.height;
    const imgX = relX * scaleX;
    const imgY = relY * scaleY;

    // Check from top layer (index 6 = image 7) to bottom (index 0 = image 1)
    for (let i = CHARACTER_COUNT - 1; i >= 0; i--) {
      if (isPixelVisible(i, imgX, imgY)) {
        return i;
      }
    }
    return null;
  }, [imagesLoaded, isPixelVisible]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const clickedIndex = findClickedCharacter(e.clientX, e.clientY);
    if (clickedIndex !== null) {
      setInternalSelected(clickedIndex);
      onSelect?.(clickedIndex, CHARACTER_NAMES[clickedIndex]);
    }
  }, [findClickedCharacter, onSelect]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const hoveredIndex = findClickedCharacter(e.clientX, e.clientY);
    setHoveredCharacter(hoveredIndex);
  }, [findClickedCharacter]);

  const handleMouseLeave = useCallback(() => {
    setHoveredCharacter(null);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-pointer"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background image */}
      <img
        src="/characters/bg.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        draggable={false}
      />

      {/* Stack all character images */}
      {[1, 2, 3, 4, 5, 6, 7].map((num, index) => {
        const isSelected = selectedCharacter === index;
        const isHovered = hoveredCharacter === index;
        const hasSelection = selectedCharacter !== null;

        return (
          <div
            key={num}
            className="absolute inset-0 pointer-events-none"
          >
            {/* Base character image */}
            <img
              src={`/characters/${num}.png`}
              alt={CHARACTER_NAMES[index]}
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-200"
              style={{
                // Dim non-selected characters when one is selected
                filter: hasSelection && !isSelected
                  ? "brightness(0.5) grayscale(0.5)"
                  : isHovered && !isSelected
                    ? "brightness(1.15) drop-shadow(0 0 8px rgba(255,255,255,0.5))"
                    : "none",
              }}
              draggable={false}
            />

            {/* Color highlight overlay for selected character */}
            {isSelected && (
              <img
                src={`/characters/${num}.png`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{
                  filter: "brightness(1.2) sepia(1) saturate(4) hue-rotate(260deg)",
                  mixBlendMode: "overlay",
                  opacity: 0.7,
                }}
                draggable={false}
              />
            )}

            {/* Glow effect for selected */}
            {isSelected && (
              <img
                src={`/characters/${num}.png`}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{
                  filter: "brightness(1.5) blur(10px) sepia(1) saturate(3) hue-rotate(260deg)",
                  mixBlendMode: "screen",
                  opacity: 0.4,
                }}
                draggable={false}
              />
            )}
          </div>
        );
      })}

      {/* Character name display */}
      {(selectedCharacter !== null || hoveredCharacter !== null) && (
        <div className="absolute bottom-[120px] left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full font-[var(--font-nunito)] text-base md:text-2xl font-bold pointer-events-none whitespace-nowrap">
          {CHARACTER_NAMES[selectedCharacter ?? hoveredCharacter!]}
        </div>
      )}

      {/* Loading indicator */}
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50">
          <div className="text-lg font-bold text-gray-600">Loading...</div>
        </div>
      )}
    </div>
  );
}
