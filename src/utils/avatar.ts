import React from "react";

/**
 * Generates a cartoon profile picture URL.
 * Uses DiceBear's cartoon avataaars/adventurer avatar API based on user's name/email/uid seed.
 */
export function getCartoonAvatar(seed?: string | null): string {
  const identifier = seed && seed.trim() ? seed.trim() : `cartoon-user-${Math.floor(Math.random() * 10000)}`;
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(identifier)}`;
}

/**
 * Clean inline cartoon avatar SVG (Data URL) as fallback when external images fail to load.
 */
export const FALLBACK_CARTOON_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="120" height="120">
  <rect width="100" height="100" rx="50" fill="#3B82F6"/>
  <!-- Hair -->
  <path d="M 25 38 C 25 15, 75 15, 75 38 C 75 25, 25 25, 25 38 Z" fill="#1E293B"/>
  <!-- Face -->
  <circle cx="50" cy="45" r="24" fill="#FFD180"/>
  <!-- Eyes -->
  <circle cx="41" cy="42" r="3.5" fill="#0F172A"/>
  <circle cx="59" cy="42" r="3.5" fill="#0F172A"/>
  <circle cx="42" cy="40.5" r="1" fill="#FFFFFF"/>
  <circle cx="60" cy="40.5" r="1" fill="#FFFFFF"/>
  <!-- Cheeks -->
  <circle cx="36" cy="48" r="3" fill="#F43F5E" opacity="0.3"/>
  <circle cx="64" cy="48" r="3" fill="#F43F5E" opacity="0.3"/>
  <!-- Smile -->
  <path d="M 42 52 Q 50 60 58 52" stroke="#0F172A" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- Clothes -->
  <path d="M 20 92 C 25 70, 75 70, 80 92 Z" fill="#1D4ED8"/>
  <path d="M 44 70 L 50 78 L 56 70 Z" fill="#FFFFFF"/>
</svg>
`)}`;

/**
 * React onError handler for <img> elements to replace broken images with a cartoon avatar.
 */
export function handleAvatarError(e: React.SyntheticEvent<HTMLImageElement, Event>, seed?: string | null) {
  const target = e.currentTarget;
  const cartoonUrl = getCartoonAvatar(seed || "user");
  if (target.src !== cartoonUrl && !target.src.startsWith("data:image/svg+xml")) {
    target.src = cartoonUrl;
  } else {
    target.src = FALLBACK_CARTOON_AVATAR;
  }
}
