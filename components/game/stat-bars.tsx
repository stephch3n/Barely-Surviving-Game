"use client"

import { Heart, BookOpen, Users } from "lucide-react"

interface StatBarsProps {
  happiness: number
  gpa: number
  social: number
}

export function StatBars({ happiness, gpa, social }: StatBarsProps) {
  const getBarColor = (value: number, type: "happiness" | "gpa" | "social") => {
    if (value < 20) return "bg-red-500"
    if (value < 40) return "bg-orange-400"

    switch (type) {
      case "happiness":
        return "bg-pink-500"
      case "gpa":
        return "bg-[#C4A747]"
      case "social":
        return "bg-sky-500"
    }
  }

  const stats = [
    { key: "happiness" as const, label: "Happiness", value: happiness, icon: Heart, color: "text-pink-500" },
    { key: "gpa" as const, label: "GPA", value: gpa, icon: BookOpen, color: "text-[#C4A747]" },
    { key: "social" as const, label: "Social", value: social, icon: Users, color: "text-sky-500" },
  ]

  return (
    <div className="space-y-2">
      {stats.map(({ key, label, value, icon: Icon, color }) => (
        <div key={key} className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <Icon className={`w-3.5 h-3.5 ${color}`} />
              <span className="font-semibold text-white/90">{label}</span>
            </div>
            <span className={`font-bold ${value < 20 ? "text-red-400 animate-pulse" : color}`}>
              {Math.round(value)}%
            </span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className={`h-full ${getBarColor(value, key)} transition-all duration-500 rounded-full`}
              style={{ width: `${value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
