"use client"

import { Button } from "@/components/ui/button"
import { UBCCharacter } from "./ubc-character"
import { Play, GraduationCap, Heart, Users, BookOpen } from "lucide-react"

interface StartScreenProps {
  onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[#002145]">
      {/* UBC themed background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23C4A747' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

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
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-[#C4A747]/30">
          <p className="text-white/90 leading-relaxed mb-4">
            Survive <span className="font-bold text-[#C4A747]">4 years</span> of UBC! Balance your stats as you navigate
            college life. One clock rotation = one year.
          </p>

          {/* Stat explanations */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl">
              <Heart className="w-6 h-6 text-pink-400" />
              <span className="text-sm font-semibold text-white">Happiness</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl">
              <BookOpen className="w-6 h-6 text-[#C4A747]" />
              <span className="text-sm font-semibold text-white">GPA</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-xl">
              <Users className="w-6 h-6 text-sky-400" />
              <span className="text-sm font-semibold text-white">Social</span>
            </div>
          </div>
        </div>

        <Button
          onClick={onStart}
          size="lg"
          className="bg-[#C4A747] hover:bg-[#C4A747]/90 text-[#002145] text-xl px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold"
        >
          <Play className="w-6 h-6 mr-2" />
          Start Year 1
        </Button>
      </div>
    </div>
  )
}
