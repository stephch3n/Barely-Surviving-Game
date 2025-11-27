"use client"

import { useEffect, useState } from "react"

interface GameClockProps {
  year: number
  progress: number // 0-100, percentage through the year
  isPaused: boolean
}

const YEAR_CAPTIONS: Record<number, string> = {
  1: "Frosh Fog",
  2: "Reality Hits",
  3: "Crisis Mode",
  4: "Endgame",
}

export function GameClock({ year, progress, isPaused }: GameClockProps) {
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => setPulse((p) => !p), 1000)
      return () => clearInterval(interval)
    }
  }, [isPaused])

  // Calculate clock hand rotation (0-360 degrees based on progress)
  const rotation = (progress / 100) * 360

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="bg-[#002145] px-3 py-1 rounded-full text-center">
        <span className="text-[#C4A747] font-bold text-sm">
          Year {year}: {YEAR_CAPTIONS[year]}
        </span>
      </div>

      {/* Clock face */}
      <div className="relative w-20 h-20">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-[#002145] bg-white shadow-lg">
          {/* Hour markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-2 bg-[#002145]/60 rounded-full"
              style={{
                top: "8%",
                left: "50%",
                transformOrigin: "50% 400%",
                transform: `translateX(-50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}

          {/* Clock hand */}
          <div
            className="absolute left-1/2 top-1/2 w-1 h-7 bg-[#C4A747] rounded-full origin-bottom transition-transform duration-1000"
            style={{
              transform: `translateX(-50%) translateY(-100%) rotate(${rotation}deg)`,
            }}
          />

          {/* Center dot */}
          <div className="absolute left-1/2 top-1/2 w-3 h-3 bg-[#002145] rounded-full -translate-x-1/2 -translate-y-1/2" />

          {/* Semester labels */}
          <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#002145]">W1</span>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[8px] font-bold text-[#002145]">W2</span>
          <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#002145]">S</span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[8px] font-bold text-[#002145]">F</span>
        </div>

        {/* Pulse indicator when running */}
        {!isPaused && (
          <div
            className={`absolute inset-0 rounded-full border-2 border-[#C4A747] transition-opacity duration-500 ${pulse ? "opacity-50" : "opacity-0"}`}
          />
        )}
      </div>
    </div>
  )
}
