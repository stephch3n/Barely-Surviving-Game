"use client"

import { Button } from "@/components/ui/button"
import { UBCCharacter } from "./ubc-character"
import { Play, GraduationCap, DollarSign } from "lucide-react"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        {/* Title */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3">
            <GraduationCap className="w-10 h-10 text-[#C4A747]" />
            <h1 className="text-5xl md:text-7xl font-black text-white drop-shadow-lg">Happy Sappy</h1>
            <GraduationCap className="w-10 h-10 text-[#C4A747]" />
          </div>
          <p className="text-xl md:text-2xl text-[#C4A747] font-semibold">UBC Student Life RPG</p>
        </div>

        {/* Character */}
        <div className="flex justify-center">
          <UBCCharacter mood="happy" size="lg" />
        </div>

        {/* Game explanation */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <p className="text-white leading-relaxed mb-4">
            Survive <span className="font-bold text-[#C4A747]">4 years</span> of UBC! Balance your stats as you navigate
            college life. One clock rotation = one year.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
              <span className="text-2xl">😊</span>
              <span className="text-sm font-semibold text-white">Happy</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
              <span className="text-2xl">🔒</span>
              <span className="text-sm font-semibold text-white">Locked In</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/10 rounded-xl">
              <div className="bg-green-100 p-1.5 rounded-full">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm font-semibold text-white">Money</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="bg-[#C4A747] hover:bg-[#C4A747]/90 text-[#002145] text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold"
        >
          <Play className="w-6 h-6 mr-2" />
          Start Year 1: Frosh Fog
        </Button>
      </div>
    </div>
  )
}
