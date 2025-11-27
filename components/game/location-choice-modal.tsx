"use client"

import { useState, useEffect } from "react"
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

  // Calculate timer color based on time left
  const timerColor = timeLeft <= 2 ? "bg-red-500" : timeLeft <= 3 ? "bg-yellow-500" : "bg-teal-500"
  const timerWidth = (timeLeft / timeLimit) * 100

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
        {/* Timer bar at top */}
        <div className="w-full h-2 bg-gray-300 rounded-full mb-4 overflow-hidden">
          <div
            className={`h-full ${timerColor} transition-all duration-1000 ease-linear`}
            style={{ width: `${timerWidth}%` }}
          />
        </div>

        {/* Timer countdown */}
        <div className="flex justify-center mb-4">
          <div
            className={`${timerColor} text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${timeLeft <= 2 ? "animate-pulse" : ""}`}
          >
            <span className="text-2xl font-bold">{timeLeft}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-2">{event.title}</h2>
        <p className="text-gray-600 text-center text-sm mb-6">{event.description}</p>

        <p className="text-teal-600 text-center text-xs mb-4 uppercase tracking-wide font-semibold">
          Choose a location!
        </p>

        <div className="space-y-3">
          {event.choices.map((choice) => (
            <button
              key={choice.id}
              onClick={() => onChoice(choice)}
              className="w-full p-4 bg-white/70 hover:bg-white border border-gray-200 hover:border-teal-400 rounded-xl transition-all group hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{choice.emoji}</span>
                <div className="flex-1 text-left">
                  <p className="text-gray-800 font-medium group-hover:text-teal-600 transition-colors">{choice.text}</p>
                  <p className="text-gray-500 text-xs mt-1">{CAMPUS_LOCATIONS[choice.locationId].label}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-red-500 text-center text-xs mt-4">No choice? All stats will decrease!</p>
      </div>
    </div>
  )
}
