"use client"

import { useState, useMemo } from "react"
import { Clock, BookOpen, Briefcase, Users, PartyPopper, Dumbbell, Moon, ChevronRight, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatBars } from "./stat-bars"

export type WeeklySchedule = {
  study: number
  work: number
  socialize: number
  party: number
  exercise: number
  rest: number
}

interface SchedulePlannerProps {
  year: number
  initialStats: { happiness: number; gpa: number; money: number }
  onComplete: (schedule: WeeklySchedule) => void
}

const HOURS_PER_WEEK = 168
const FIXED_HOURS = 56 + 21 + 14
const AVAILABLE_HOURS = HOURS_PER_WEEK - FIXED_HOURS

const activities = [
  {
    key: "study" as const,
    label: "Study",
    icon: BookOpen,
    color: "bg-amber-500",
    description: "Library, homework, exam prep",
    effects: { happiness: -0.3, gpa: 1.5, money: -0.2 },
  },
  {
    key: "work" as const,
    label: "Part-time Job",
    icon: Briefcase,
    color: "bg-green-500",
    description: "Earn money, build experience",
    effects: { happiness: -0.2, gpa: -0.3, money: 1.5 },
  },
  {
    key: "socialize" as const,
    label: "Hang Out",
    icon: Users,
    color: "bg-sky-500",
    description: "Friends, clubs, campus events",
    effects: { happiness: 0.8, gpa: -0.2, money: -0.5 },
  },
  {
    key: "party" as const,
    label: "Party",
    icon: PartyPopper,
    color: "bg-pink-500",
    description: "Gage parties, Pit Night, events",
    effects: { happiness: 1.2, gpa: -0.8, money: -0.8 },
  },
  {
    key: "exercise" as const,
    label: "Exercise",
    icon: Dumbbell,
    color: "bg-orange-500",
    description: "BirdCoop, running, sports",
    effects: { happiness: 0.6, gpa: 0.2, money: -0.3 },
  },
  {
    key: "rest" as const,
    label: "Rest & Hobbies",
    icon: Moon,
    color: "bg-purple-500",
    description: "Gaming, Netflix, personal time",
    effects: { happiness: 0.9, gpa: -0.1, money: 0 },
  },
]

const yearThemes = [
  { name: "Year 1: Frosh Fog", subtitle: "Everything is new and exciting" },
  { name: "Year 2: Reality Hits", subtitle: "The honeymoon phase is over" },
  { name: "Year 3: Crisis Mode", subtitle: "Co-op, internships, and stress" },
  { name: "Year 4: Endgame", subtitle: "The final stretch" },
]

export function SchedulePlanner({ year, initialStats, onComplete }: SchedulePlannerProps) {
  const [schedule, setSchedule] = useState<WeeklySchedule>({
    study: 15,
    work: 10,
    socialize: 15,
    party: 5,
    exercise: 7,
    rest: 25,
  })

  const totalAllocated = Object.values(schedule).reduce((a, b) => a + b, 0)
  const remainingHours = AVAILABLE_HOURS - totalAllocated

  const projectedStats = useMemo(() => {
    let happiness = initialStats.happiness
    let gpa = initialStats.gpa
    let money = initialStats.money

    activities.forEach((activity) => {
      const hours = schedule[activity.key]
      happiness += hours * activity.effects.happiness
      gpa += hours * activity.effects.gpa
      money += hours * activity.effects.money
    })

    return {
      happiness: Math.min(100, Math.max(0, happiness)),
      gpa: Math.min(100, Math.max(0, gpa)),
      money: Math.min(100, Math.max(0, money)),
    }
  }, [schedule, initialStats])

  const adjustHours = (key: keyof WeeklySchedule, delta: number) => {
    setSchedule((prev) => {
      const newValue = prev[key] + delta
      if (newValue < 0) return prev
      if (delta > 0 && remainingHours <= 0) return prev
      return { ...prev, [key]: newValue }
    })
  }

  const canProceed = totalAllocated <= AVAILABLE_HOURS && totalAllocated >= 40

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      {/* Header */}
      <div className="bg-[#002145] border-b border-[#C4A747]/30 p-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-[#C4A747]" />
            <span className="text-[#C4A747] font-medium">Year {year} of 4</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{yearThemes[year - 1].name}</h1>
          <p className="text-white/60 text-sm">{yearThemes[year - 1].subtitle}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Hours indicator */}
          <div className="bg-[#002145]/50 rounded-xl p-4 border border-[#C4A747]/20">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/80 text-sm">Weekly Free Time</span>
              <span className={`font-bold ${remainingHours < 0 ? "text-red-400" : "text-[#C4A747]"}`}>
                {remainingHours} hours remaining
              </span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 rounded-full ${
                  remainingHours < 0 ? "bg-red-500" : "bg-[#C4A747]"
                }`}
                style={{ width: `${Math.min(100, (totalAllocated / AVAILABLE_HOURS) * 100)}%` }}
              />
            </div>
            <p className="text-white/50 text-xs mt-2">
              {AVAILABLE_HOURS} hours of free time per week (after sleep, classes, and meals)
            </p>
          </div>

          {/* Activity Sliders */}
          <div className="space-y-3">
            <h2 className="text-white font-semibold text-lg">Plan Your Week</h2>
            {activities.map((activity) => {
              const Icon = activity.icon
              const hours = schedule[activity.key]
              return (
                <div key={activity.key} className="bg-[#002145]/50 rounded-xl p-4 border border-[#C4A747]/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-2 rounded-lg ${activity.color}`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{activity.label}</h3>
                      <p className="text-white/50 text-xs">{activity.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#C4A747]/30 bg-transparent hover:bg-[#C4A747]/20"
                        onClick={() => adjustHours(activity.key, -5)}
                        disabled={hours <= 0}
                      >
                        <Minus className="w-4 h-4 text-white" />
                      </Button>
                      <span className="text-white font-bold w-12 text-center">{hours}h</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-[#C4A747]/30 bg-transparent hover:bg-[#C4A747]/20"
                        onClick={() => adjustHours(activity.key, 5)}
                        disabled={remainingHours <= 0}
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </Button>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${activity.color} transition-all duration-300 rounded-full`}
                      style={{ width: `${(hours / 40) * 100}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Projected Stats - now uses the white card StatBars */}
          <div className="space-y-2">
            <h2 className="text-white font-semibold">Projected Weekly Stats</h2>
            <StatBars {...projectedStats} />
            <p className="text-white/50 text-xs mt-2">
              These are your baseline stats for the year. Random events will modify them!
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#002145] border-t border-[#C4A747]/30 p-4">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={() => onComplete(schedule)}
            disabled={!canProceed}
            className="w-full bg-[#C4A747] hover:bg-[#C4A747]/80 text-[#002145] font-bold py-6 text-lg disabled:opacity-50"
          >
            Start {yearThemes[year - 1].name}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          {!canProceed && (
            <p className="text-red-400 text-sm text-center mt-2">
              {remainingHours < 0 ? "You've allocated too many hours!" : "Allocate at least 40 hours of activities"}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
