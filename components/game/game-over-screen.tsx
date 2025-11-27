"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { UBCCharacter } from "./ubc-character"
import { RotateCcw, Trophy, GraduationCap, DollarSign } from "lucide-react"
import type { GameOverReason } from "@/app/page"

interface GameOverScreenProps {
  reason: GameOverReason
  year: number
  stats: { happiness: number; gpa: number; money: number }
  onRestart: () => void
}

export function GameOverScreen({ reason, year, stats, onRestart }: GameOverScreenProps) {
  const isVictory = reason === null

  const failureMessages: Record<string, { icon: React.ReactNode; title: string; subtitle: string; message: string }> = {
    happiness: {
      icon: <span className="text-4xl">😔</span>,
      title: "Burnout!",
      subtitle: "touch grass bestie",
      message: "All work and no play? Bold strategy. Didn't work though.",
    },
    gpa: {
      icon: <span className="text-4xl">📚</span>,
      title: "Academic Probation!",
      subtitle: "the library misses you",
      message: "Turns out showing up to class actually matters. Who knew?",
    },
    money: {
      icon: <DollarSign className="w-10 h-10 text-green-500" />,
      title: "Broke!",
      subtitle: "ramen budget exceeded",
      message: "Turns out you can't survive on vibes alone. Get a job maybe?",
    },
  }

  const failure = reason ? failureMessages[reason] : null

  const StatsDisplay = () => (
    <div className="bg-white rounded-2xl p-5 shadow-lg">
      <h3 className="text-gray-500 text-sm mb-4 uppercase tracking-wide font-medium">Final Stats</h3>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-3xl mb-2">😊</div>
          <div className="text-gray-800 font-bold text-xl">{Math.max(0, Math.round(stats.happiness))}%</div>
          <div className="text-gray-500 text-sm">Happy</div>
        </div>
        <div className="text-center">
          <div className="text-3xl mb-2">🔒</div>
          <div className="text-gray-800 font-bold text-xl">{Math.max(0, Math.round(stats.gpa))}%</div>
          <div className="text-gray-500 text-sm">Locked In</div>
        </div>
        <div className="text-center">
          <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-gray-800 font-bold text-xl">${Math.max(0, Math.round(stats.money))}</div>
          <div className="text-gray-500 text-sm">Money</div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center space-y-6 max-w-lg">
        {isVictory ? (
          <>
            <div className="flex justify-center">
              <div className="bg-[#C4A747] rounded-full p-6 shadow-xl">
                <GraduationCap className="w-16 h-16 text-[#002145]" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-[#C4A747]">You Did It!</h1>
              <p className="text-lg text-white/80 italic">main character energy unlocked</p>
              <p className="text-xl text-white">Class of UBC</p>
            </div>

            <UBCCharacter mood="happy" size="lg" />

            <StatsDisplay />

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-[#C4A747]/30">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-[#C4A747]" />
              </div>
              <p className="text-white leading-relaxed">
                4 years. Countless all-nighters. Survived it all. Go flex that degree.
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <div className="bg-red-500/20 rounded-full p-6 border-2 border-red-500">{failure?.icon}</div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-red-400">{failure?.title}</h1>
              <p className="text-lg text-white/80 italic">{failure?.subtitle}</p>
              <p className="text-sm text-white/60">Year {year} of 4</p>
            </div>

            <UBCCharacter mood="sad" size="lg" />

            <StatsDisplay />

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/30">
              <p className="text-white leading-relaxed">{failure?.message}</p>
            </div>
          </>
        )}

        <Button
          onClick={onRestart}
          size="lg"
          className={`${
            isVictory
              ? "bg-[#C4A747] hover:bg-[#C4A747]/90 text-[#002145]"
              : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
          } text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 font-bold`}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          {isVictory ? "Play Again" : "Try Again"}
        </Button>
      </div>
    </div>
  )
}
