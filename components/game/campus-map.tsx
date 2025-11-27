"use client"

import { UBCCharacter } from "./ubc-character"

interface CampusMapProps {
  characterPosition: { x: number; y: number }
  highlightedLocations?: string[]
}

export const CAMPUS_LOCATIONS = {
  ikb: { x: 85, y: 40, label: "IKB Library", image: "/images/ikb.png" },
  nest: { x: 15, y: 55, label: "The Nest" },
  residence: { x: 8, y: 25, label: "Gage Residence", image: "/images/gage.png" },
  mainMall: { x: 50, y: 75, label: "Main Mall", image: "/images/main-mall.png" },
  birdcoop: { x: 25, y: 30, label: "SRC", image: "/images/src.png" },
  wreckBeach: { x: 92, y: 85, label: "Wreck Beach", image: "/images/wreck-beach.png" },
  buchanan: { x: 65, y: 35, label: "Buchanan Tower", image: "/images/buchanan.png" },
  koerner: { x: 40, y: 50, label: "Koerner Library", image: "/images/koerner.png" },
} as const

export type LocationId = keyof typeof CAMPUS_LOCATIONS

export function CampusMap({ characterPosition, highlightedLocations = [] }: CampusMapProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-lg">
      <img src="/images/image.png" alt="UBC Campus" className="absolute inset-0 w-full h-full object-cover" />

      {/* Dark overlay for better visibility of UI elements */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Location markers with labels */}
      {Object.entries(CAMPUS_LOCATIONS).map(([id, loc]) => (
        <div
          key={id}
          className="absolute flex flex-col items-center gap-1"
          style={{
            left: `${loc.x}%`,
            top: `${loc.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          {"image" in loc && loc.image ? (
            <>
              <img
                src={loc.image || "/placeholder.svg"}
                alt={loc.label}
                className={`w-20 h-14 object-cover rounded-lg border-2 shadow-lg transition-all duration-300 ${
                  highlightedLocations.includes(id)
                    ? "border-[#C4A747] scale-110 ring-2 ring-[#C4A747]"
                    : "border-white"
                }`}
              />
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap transition-all duration-300 ${
                  highlightedLocations.includes(id) ? "bg-[#C4A747] text-[#002145]" : "bg-[#002145]/80 text-white"
                }`}
              >
                {loc.label}
              </span>
            </>
          ) : (
            <>
              {/* Location label */}
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap transition-all duration-300 ${
                  highlightedLocations.includes(id)
                    ? "bg-[#C4A747] text-[#002145] scale-110"
                    : "bg-[#002145]/80 text-white"
                }`}
              >
                {loc.label}
              </span>

              {/* Pulsing marker dot */}
              <div
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 ${
                  highlightedLocations.includes(id) ? "bg-[#C4A747] animate-ping" : "bg-[#002145]"
                }`}
              />

              {/* Static marker underneath for visibility during ping */}
              {highlightedLocations.includes(id) && (
                <div
                  className="absolute w-4 h-4 rounded-full bg-[#C4A747] border-2 border-white shadow-lg"
                  style={{ top: "calc(100% - 16px)" }}
                />
              )}
            </>
          )}
        </div>
      ))}

      <div
        className="absolute transition-all duration-700 ease-in-out z-20"
        style={{
          left: `${characterPosition.x}%`,
          top: `${characterPosition.y}%`,
          transform: "translate(-50%, -100%)",
        }}
      >
        <UBCCharacter mood="happy" size="sm" />
      </div>
    </div>
  )
}
