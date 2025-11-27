"use client"

import type React from "react"

interface UBCCharacterProps {
  mood: "happy" | "neutral" | "sad"
  size?: "sm" | "md" | "lg"
  position?: { x: number; y: number }
  isWalking?: boolean
  direction?: "left" | "right"
}

export function UBCCharacter({
  mood,
  size = "md",
  position,
  isWalking = false,
  direction = "right",
}: UBCCharacterProps) {
  const sizeClasses = {
    sm: "w-16 h-24",
    md: "w-24 h-36",
    lg: "w-32 h-48",
  }

  const eyeExpressions = {
    happy: { left: "◠", right: "◠" },
    neutral: { left: "●", right: "●" },
    sad: { left: "╥", right: "╥" },
  }

  const mouthExpressions = {
    happy: "◡",
    neutral: "—",
    sad: "︵",
  }

  const style: React.CSSProperties = position
    ? {
        position: "absolute",
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translateX(-50%) translateY(-100%) ${direction === "left" ? "scaleX(-1)" : ""}`,
        transition: "left 0.5s ease-out, top 0.5s ease-out",
      }
    : {
        transform: direction === "left" ? "scaleX(-1)" : undefined,
      }

  return (
    <div className={`${sizeClasses[size]} relative ${isWalking ? "animate-bounce" : ""}`} style={style}>
      <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-lg">
        {/* Legs with walking animation */}
        <g className={isWalking ? "animate-walk" : ""}>
          <rect x="30" y="110" width="12" height="25" rx="4" fill="#1a365d" />
          <rect x="58" y="110" width="12" height="25" rx="4" fill="#1a365d" />
        </g>

        {/* Shoes */}
        <ellipse cx="36" cy="133" rx="10" ry="5" fill="#2d3748" />
        <ellipse cx="64" cy="133" rx="10" ry="5" fill="#2d3748" />

        {/* Hoodie body */}
        <path
          d="M25 55 Q25 45 35 45 L65 45 Q75 45 75 55 L75 115 Q75 120 70 120 L30 120 Q25 120 25 115 Z"
          fill="#002145"
        />

        {/* Hoodie pocket */}
        <path d="M32 85 L68 85 L68 100 Q50 105 32 100 Z" fill="#001a38" opacity="0.5" />

        {/* UBC text on hoodie */}
        <text x="50" y="75" textAnchor="middle" fill="#C4A747" fontSize="12" fontWeight="bold" fontFamily="sans-serif">
          UBC
        </text>

        {/* Hood */}
        <path d="M30 48 Q30 35 50 35 Q70 35 70 48" fill="#002145" stroke="#001a38" strokeWidth="2" />

        {/* Arms */}
        <path d="M25 58 Q15 65 18 85" fill="none" stroke="#002145" strokeWidth="12" strokeLinecap="round" />
        <path d="M75 58 Q85 65 82 85" fill="none" stroke="#002145" strokeWidth="12" strokeLinecap="round" />

        {/* Hands */}
        <circle cx="18" cy="88" r="6" fill="#f4d9c6" />
        <circle cx="82" cy="88" r="6" fill="#f4d9c6" />

        {/* Head */}
        <circle cx="50" cy="28" r="22" fill="#f4d9c6" />

        {/* Hair */}
        <path d="M30 20 Q35 8 50 8 Q65 8 70 20 Q72 25 70 28 Q65 15 50 15 Q35 15 30 28 Q28 25 30 20" fill="#4a3728" />

        {/* Ears */}
        <ellipse cx="28" cy="28" rx="4" ry="5" fill="#f4d9c6" />
        <ellipse cx="72" cy="28" rx="4" ry="5" fill="#f4d9c6" />

        {/* Eyes */}
        <text x="42" y="30" fontSize="8" textAnchor="middle" fill="#333">
          {eyeExpressions[mood].left}
        </text>
        <text x="58" y="30" fontSize="8" textAnchor="middle" fill="#333">
          {eyeExpressions[mood].right}
        </text>

        {/* Eyebrows */}
        {mood === "sad" && (
          <>
            <line x1="38" y1="20" x2="46" y2="22" stroke="#4a3728" strokeWidth="2" />
            <line x1="54" y1="22" x2="62" y2="20" stroke="#4a3728" strokeWidth="2" />
          </>
        )}
        {mood === "happy" && (
          <>
            <line x1="38" y1="22" x2="46" y2="20" stroke="#4a3728" strokeWidth="2" />
            <line x1="54" y1="20" x2="62" y2="22" stroke="#4a3728" strokeWidth="2" />
          </>
        )}

        {/* Mouth */}
        <text x="50" y="40" fontSize="10" textAnchor="middle" fill="#333">
          {mouthExpressions[mood]}
        </text>

        {/* Blush (when happy) */}
        {mood === "happy" && (
          <>
            <ellipse cx="36" cy="34" rx="4" ry="2" fill="#ffb6c1" opacity="0.5" />
            <ellipse cx="64" cy="34" rx="4" ry="2" fill="#ffb6c1" opacity="0.5" />
          </>
        )}
      </svg>
    </div>
  )
}
