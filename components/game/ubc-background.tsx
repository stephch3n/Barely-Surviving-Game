"use client"

interface UBCBackgroundProps {
  variant: "clocktower" | "library" | "nest" | "beach"
}

export function UBCBackground({ variant }: UBCBackgroundProps) {
  const gradients = {
    clocktower: "from-sky-300 via-sky-200 to-emerald-100",
    library: "from-amber-100 via-orange-100 to-rose-100",
    nest: "from-indigo-200 via-purple-100 to-pink-100",
    beach: "from-cyan-300 via-teal-200 to-amber-100",
  }

  return (
    <div className={`absolute inset-0 bg-gradient-to-b ${gradients[variant]}`}>
      {/* Clouds */}
      <div className="absolute top-10 left-10 w-20 h-8 bg-white/60 rounded-full blur-sm" />
      <div className="absolute top-8 left-16 w-12 h-6 bg-white/60 rounded-full blur-sm" />
      <div className="absolute top-16 right-20 w-24 h-10 bg-white/60 rounded-full blur-sm" />
      <div className="absolute top-12 right-28 w-14 h-6 bg-white/60 rounded-full blur-sm" />

      {/* Landmark silhouettes */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-1/3 opacity-20"
        viewBox="0 0 400 150"
        preserveAspectRatio="xMidYMax slice"
      >
        {variant === "clocktower" && (
          <>
            {/* Clock Tower */}
            <rect x="170" y="30" width="60" height="120" fill="#002145" />
            <polygon points="170,30 200,0 230,30" fill="#002145" />
            <circle cx="200" cy="50" r="15" fill="#C4A747" />
            {/* Buildings */}
            <rect x="50" y="80" width="80" height="70" fill="#002145" />
            <rect x="270" y="60" width="100" height="90" fill="#002145" />
          </>
        )}
        {variant === "library" && (
          <>
            {/* IKB Library silhouette */}
            <rect x="100" y="50" width="200" height="100" fill="#002145" />
            <rect x="120" y="70" width="160" height="80" fill="#001a38" />
            {/* Windows */}
            <rect x="140" y="80" width="30" height="40" fill="#C4A747" opacity="0.5" />
            <rect x="185" y="80" width="30" height="40" fill="#C4A747" opacity="0.5" />
            <rect x="230" y="80" width="30" height="40" fill="#C4A747" opacity="0.5" />
          </>
        )}
        {variant === "nest" && (
          <>
            {/* The Nest building */}
            <rect x="80" y="40" width="240" height="110" fill="#002145" />
            <polygon points="80,40 200,10 320,40" fill="#001a38" />
            <rect x="180" y="100" width="40" height="50" fill="#C4A747" opacity="0.5" />
          </>
        )}
        {variant === "beach" && (
          <>
            {/* Trees and beach */}
            <ellipse cx="60" cy="120" rx="40" ry="30" fill="#228B22" />
            <rect x="55" y="120" width="10" height="30" fill="#8B4513" />
            <ellipse cx="340" cy="110" rx="50" ry="40" fill="#228B22" />
            <rect x="335" y="110" width="10" height="40" fill="#8B4513" />
            {/* Beach waves */}
            <path d="M0 140 Q100 130 200 140 Q300 150 400 140 L400 150 L0 150 Z" fill="#006994" opacity="0.3" />
          </>
        )}
        {/* Ground */}
        <rect x="0" y="145" width="400" height="10" fill="#228B22" />
      </svg>

      {/* Location label */}
      <div className="absolute bottom-4 right-4 bg-ubc-blue/80 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
        {variant === "clocktower" && "📍 Main Mall"}
        {variant === "library" && "📍 IKB Library"}
        {variant === "nest" && "📍 The Nest"}
        {variant === "beach" && "📍 Wreck Beach"}
      </div>
    </div>
  )
}
