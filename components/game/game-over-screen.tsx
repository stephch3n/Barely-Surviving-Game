"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { UBCCharacter } from "./ubc-character"
import { RotateCcw, Heart, BookOpen, Users, Trophy, GraduationCap } from "lucide-react"
import type { GameOverReason } from "@/app/page"

interface GameOverScreenProps {
  reason: GameOverReason
  year: number
  onRestart: () => void
}

export function GameOverScreen({ reason, year, onRestart }: GameOverScreenProps) {
  const isVictory = reason === null

  const failureMessages: Record<string, { icon: React.ReactNode; title: string; message: string }> = {
    happiness: {
      icon: <Heart className="w-10 h-10 text-pink-500" />,
      title: "Burnout!",
      message:
        "You weren't happy enough... College isn't just about grades! Remember to take breaks, enjoy campus life, and do things that make you smile.",
    },
    gpa: {
      icon: <BookOpen className="w-10 h-10 text-[#C4A747]" />,
      title: "Academic Probation!",
      message:
        "Your GPA dropped too low... Maybe you should've tried a bit harder? Balance is key - don't forget to study and attend those lectures!",
    },
    social: {
      icon: <Users className="w-10 h-10 text-sky-500" />,
      title: "Isolated!",
      message:
        "You lost touch with everyone... University is about connections too! Join clubs, make friends, and don't be a hermit in your dorm.",
    },
  }

  const failure = reason ? failureMessages[reason] : null

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-[#002145]">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23C4A747' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 text-center space-y-6 max-w-lg">
        {isVictory ? (
          <>
            {/* Victory Screen */}
            <div className="flex justify-center">
              <div className="bg-[#C4A747] rounded-full p-6 shadow-xl">
                <GraduationCap className="w-16 h-16 text-[#002145]" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-[#C4A747]">Congratulations!</h1>
              <p className="text-xl text-white/80">You graduated from UBC!</p>
            </div>

            <UBCCharacter mood="happy" size="lg" />

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-[#C4A747]/30">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Trophy className="w-8 h-8 text-[#C4A747]" />
              </div>
              <p className="text-white/90 leading-relaxed">
                You successfully balanced your happiness, academics, and social life through 4 years of university!
                You're ready to take on the world, Thunderbird!
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Game Over Screen */}
            <div className="flex justify-center">
              <div className="bg-red-500/20 rounded-full p-6 border-2 border-red-500">{failure?.icon}</div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-black text-red-400">{failure?.title}</h1>
              <p className="text-lg text-white/60">Year {year} of 4</p>
            </div>

            <UBCCharacter mood="sad" size="lg" />

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
              <p className="text-white/90 leading-relaxed">{failure?.message}</p>
            </div>

            <p className="text-white/50 text-sm">Tip: Try to keep all three bars above 20%!</p>
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
