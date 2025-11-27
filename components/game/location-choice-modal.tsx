"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Heart, BookOpen, Users } from "lucide-react"
import type { LocationEvent, LocationChoice } from "./game-events"
import { CAMPUS_LOCATIONS } from "./campus-map"

interface LocationChoiceModalProps {
  event: LocationEvent
  onChoice: (choice: LocationChoice) => void
  onTimeout: () => void
  timeLimit?: number // in seconds
}

export function LocationChoiceModal({ event, onChoice, onTimeout, timeLimit = 5 }: LocationChoiceModalProps) {
  const [timeLeft, setTimeLeft] = useState(timeLimit)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeout()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeout])

  const renderEffect = (value: number, icon: React.ReactNode) => {
    if (value === 0) return null
    const sign = value > 0 ? "+" : ""
    return (
      <span className={`flex items-center gap-0.5 text-xs ${value > 0 ? "text-green-400" : "text-red-400"}`}>
        {icon}
        {sign}
        {value}
      </span>
    )
  }

  // Calculate timer color based on time left
  const timerColor = timeLeft <= 2 ? "bg-red-500" : timeLeft <= 3 ? "bg-yellow-500" : "bg-[#C4A747]"
  const timerWidth = (timeLeft / timeLimit) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#1a1a2e] border-2 border-[#C4A747] rounded-2xl p-6 max-w-lg w-full shadow-2xl">
        {/* Timer bar at top */}
        <div className="w-full h-2 bg-[#002145] rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full ${timerColor} transition-all duration-1000 ease-linear`}
            style={{ width: `${timerWidth}%` }}
          />
        </div>

        {/* Timer countdown */}
        <div className="flex justify-center mb-4">
          <div
            className={`${timerColor} text-[#002145] w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${timeLeft <= 2 ? "animate-pulse" : ""}`}
          >
            <span className="text-2xl font-bold">{timeLeft}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-white text-center mb-2">{event.title}</h2>
        <p className="text-white/70 text-center text-sm mb-6">{event.description}</p>

        <p className="text-[#C4A747] text-center text-xs mb-4 uppercase tracking-wide">Choose a location!</p>

        <div className="space-y-3">
          {event.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              className="w-full p-4 bg-[#002145]/50 hover:bg-[#002145] border border-[#C4A747]/30 hover:border-[#C4A747] rounded-xl transition-all group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{choice.emoji}</span>
                <div className="flex-1 text-left">
                  <p className="text-white font-medium group-hover:text-[#C4A747] transition-colors">{choice.text}</p>
                  <p className="text-white/50 text-xs mt-0.5">{CAMPUS_LOCATIONS[choice.locationId].label}</p>
                  <div className="flex gap-3 mt-2">
                    {renderEffect(choice.effects.happiness, <Heart className="w-3 h-3" />)}
                    {renderEffect(choice.effects.gpa, <BookOpen className="w-3 h-3" />)}
                    {renderEffect(choice.effects.social, <Users className="w-3 h-3" />)}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-red-400/70 text-center text-xs mt-4">No choice? All stats will decrease!</p>
      </div>
    </div>
  )
}
