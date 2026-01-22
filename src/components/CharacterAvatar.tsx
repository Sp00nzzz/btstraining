"use client";

import { useFacecamStore, characterCards } from "@/components/Facecam";

interface CharacterAvatarProps {
  size?: number;
  className?: string;
}

export default function CharacterAvatar({ size = 24, className = "" }: CharacterAvatarProps) {
  const selectedCharacter = useFacecamStore((state) => state.selectedCharacter);

  if (!selectedCharacter) return null;

  const imageSrc = characterCards[selectedCharacter];
  if (!imageSrc) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-full ${className}`}
      style={{ width: size, height: size }}
    >
      {/* The polaroid images have the character photo in the upper portion,
          so we scale and position to show just the face area */}
      <img
        src={imageSrc}
        alt="Selected character"
        className="absolute object-cover"
        style={{
          width: size * 3,
          height: size * 3,
          top: `-${size * 0.3}px`,
          left: `50%`,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}
