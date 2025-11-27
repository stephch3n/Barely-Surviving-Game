"use client"

interface CampusMapProps {
  characterPosition: { x: number; y: number }
  highlightedLocations?: string[]
}

export const CAMPUS_LOCATIONS = {
  ikb: { x: 25, y: 35, label: "Irving K. Barber Library" },
  nest: { x: 55, y: 60, label: "The Nest" },
  residence: { x: 85, y: 25, label: "Gage Residence" },
  mainMall: { x: 45, y: 30, label: "Main Mall" },
  birdcoop: { x: 15, y: 65, label: "BirdCoop Gym" },
  wreckBeach: { x: 10, y: 85, label: "Wreck Beach" },
  buchanan: { x: 65, y: 35, label: "Buchanan Tower" },
  koerner: { x: 35, y: 55, label: "Koerner Library" },
} as const

export type LocationId = keyof typeof CAMPUS_LOCATIONS

export function CampusMap({ characterPosition, highlightedLocations = [] }: CampusMapProps) {
  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 500 350" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        {/* Sky gradient */}
        <defs>
          <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#E0F4FF" />
          </linearGradient>
          <linearGradient id="grassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4CAF50" />
            <stop offset="100%" stopColor="#388E3C" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect x="0" y="0" width="500" height="200" fill="url(#skyGradient)" />
        {/* Mountains in background */}
        <polygon points="0,180 60,100 120,180" fill="#6B8E7B" />
        <polygon points="80,180 150,80 220,180" fill="#7A9E8B" />
        <polygon points="180,180 260,60 340,180" fill="#6B8E7B" />
        <polygon points="300,180 380,90 460,180" fill="#7A9E8B" />
        <polygon points="400,180 480,110 500,140 500,180" fill="#6B8E7B" />
        {/* Snow caps */}
        <polygon points="150,80 135,100 165,100" fill="white" />
        <polygon points="260,60 240,85 280,85" fill="white" />
        {/* Ground/grass */}
        <rect x="0" y="180" width="500" height="170" fill="url(#grassGradient)" />
        {/* Paths */}
        <rect x="220" y="180" width="20" height="170" fill="#D4C4A8" /> {/* Main Mall */}
        <rect x="100" y="250" width="300" height="12" fill="#D4C4A8" /> {/* Cross path */}
        <rect x="50" y="200" width="150" height="10" fill="#D4C4A8" /> {/* Path to IKB */}
        <rect x="300" y="200" width="150" height="10" fill="#D4C4A8" /> {/* Path to Buchanan */}
        {/* Trees scattered around */}
        {[
          { x: 30, y: 195 },
          { x: 170, y: 200 },
          { x: 280, y: 195 },
          { x: 380, y: 200 },
          { x: 450, y: 220 },
          { x: 100, y: 280 },
          { x: 400, y: 280 },
        ].map((tree, i) => (
          <g key={i}>
            <rect x={tree.x - 3} y={tree.y} width="6" height="20" fill="#5D4037" />
            <circle cx={tree.x} cy={tree.y - 10} r="15" fill="#2E7D32" />
            <circle cx={tree.x - 8} cy={tree.y - 5} r="10" fill="#388E3C" />
            <circle cx={tree.x + 8} cy={tree.y - 5} r="10" fill="#388E3C" />
          </g>
        ))}
        {/* IKB Library - Left side */}
        <g className={highlightedLocations.includes("ikb") ? "animate-pulse" : ""}>
          <rect x="80" y="100" width="80" height="70" fill="#E8E0D5" stroke="#002145" strokeWidth="2" />
          <rect x="85" y="110" width="20" height="30" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="110" y="110" width="20" height="30" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="135" y="110" width="20" height="30" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="100" y="150" width="30" height="20" fill="#5D4037" /> {/* Door */}
          <text x="120" y="95" textAnchor="middle" fill="#002145" fontSize="8" fontWeight="bold">
            IKB Library
          </text>
        </g>
        {/* Clock Tower / Main Mall center */}
        <g className={highlightedLocations.includes("mainMall") ? "animate-pulse" : ""}>
          <rect x="215" y="60" width="30" height="100" fill="#E8E0D5" stroke="#002145" strokeWidth="2" />
          <circle cx="230" cy="75" r="12" fill="white" stroke="#002145" strokeWidth="2" />
          <line x1="230" y1="75" x2="230" y2="68" stroke="#002145" strokeWidth="2" />
          <line x1="230" y1="75" x2="236" y2="75" stroke="#002145" strokeWidth="1.5" />
          <polygon points="215,60 230,40 245,60" fill="#C4A747" />
          <text x="230" y="35" textAnchor="middle" fill="#002145" fontSize="7" fontWeight="bold">
            Clock Tower
          </text>
        </g>
        {/* Buchanan Tower - Right side */}
        <g className={highlightedLocations.includes("buchanan") ? "animate-pulse" : ""}>
          <rect x="320" y="80" width="60" height="90" fill="#D4C4A8" stroke="#002145" strokeWidth="2" />
          <rect x="325" y="90" width="15" height="20" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="345" y="90" width="15" height="20" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="365" y="90" width="10" height="20" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="325" y="115" width="15" height="20" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="345" y="115" width="15" height="20" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="340" y="150" width="20" height="20" fill="#5D4037" />
          <text x="350" y="75" textAnchor="middle" fill="#002145" fontSize="7" fontWeight="bold">
            Buchanan
          </text>
        </g>
        {/* The Nest - Center bottom */}
        <g className={highlightedLocations.includes("nest") ? "animate-pulse" : ""}>
          <rect x="250" y="220" width="70" height="50" fill="#002145" stroke="#C4A747" strokeWidth="2" />
          <rect x="260" y="230" width="15" height="15" fill="#C4A747" />
          <rect x="295" y="230" width="15" height="15" fill="#C4A747" />
          <rect x="275" y="255" width="20" height="15" fill="#5D4037" />
          <text x="285" y="215" textAnchor="middle" fill="#002145" fontSize="8" fontWeight="bold">
            The Nest
          </text>
        </g>
        {/* Gage Residence - Top right */}
        <g className={highlightedLocations.includes("residence") ? "animate-pulse" : ""}>
          <rect x="400" y="70" width="80" height="80" fill="#B0A090" stroke="#002145" strokeWidth="2" />
          <rect x="410" y="80" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="430" y="80" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="450" y="80" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="410" y="100" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="430" y="100" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="450" y="100" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="430" y="130" width="20" height="20" fill="#5D4037" />
          <text x="440" y="65" textAnchor="middle" fill="#002145" fontSize="7" fontWeight="bold">
            Gage Residence
          </text>
        </g>
        {/* BirdCoop Gym - Left bottom */}
        <g className={highlightedLocations.includes("birdcoop") ? "animate-pulse" : ""}>
          <rect x="30" y="230" width="60" height="45" fill="#5D4E37" stroke="#002145" strokeWidth="2" />
          <rect x="40" y="240" width="20" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="50" y="260" width="15" height="15" fill="#5D4037" />
          <text x="60" y="225" textAnchor="middle" fill="#002145" fontSize="7" fontWeight="bold">
            BirdCoop
          </text>
        </g>
        {/* Koerner Library - Center left */}
        <g className={highlightedLocations.includes("koerner") ? "animate-pulse" : ""}>
          <rect x="150" y="200" width="55" height="40" fill="#E8E0D5" stroke="#002145" strokeWidth="2" />
          <rect x="155" y="210" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="170" y="210" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <rect x="185" y="210" width="12" height="15" fill="#87CEEB" stroke="#002145" strokeWidth="1" />
          <text x="178" y="195" textAnchor="middle" fill="#002145" fontSize="7" fontWeight="bold">
            Koerner
          </text>
        </g>
        {/* Wreck Beach - Bottom left corner */}
        <g className={highlightedLocations.includes("wreckBeach") ? "animate-pulse" : ""}>
          <ellipse cx="30" cy="320" rx="40" ry="25" fill="#F5DEB3" />
          <ellipse cx="50" cy="330" rx="30" ry="15" fill="#87CEEB" />
          <text x="35" y="305" textAnchor="middle" fill="#002145" fontSize="7" fontWeight="bold">
            Wreck Beach
          </text>
        </g>
        {/* Clouds */}
        <ellipse cx="80" cy="30" rx="25" ry="12" fill="white" opacity="0.9" />
        <ellipse cx="200" cy="25" rx="30" ry="15" fill="white" opacity="0.9" />
        <ellipse cx="350" cy="35" rx="28" ry="13" fill="white" opacity="0.9" />
        <ellipse cx="450" cy="20" rx="22" ry="10" fill="white" opacity="0.9" />
      </svg>

      {/* Location markers that pulse when highlighted */}
      {Object.entries(CAMPUS_LOCATIONS).map(([id, loc]) => (
        <div
          key={id}
          className={`absolute w-3 h-3 rounded-full transition-all duration-300 ${
            highlightedLocations.includes(id) ? "bg-[#C4A747] animate-ping" : "bg-[#002145]/50"
          }`}
          style={{
            left: `${loc.x}%`,
            top: `${loc.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  )
}
