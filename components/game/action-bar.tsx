"use client"

import type React from "react"

import { BookOpen, Dumbbell, Users, Briefcase, Coffee, Bed, Music, Bus } from "lucide-react"
import type { LocationId } from "./campus-map"

export interface ActionItem {
  id: string
  label: string
  icon: React.ReactNode
  locationId: LocationId
  effects: {
    happiness: number
    gpa: number
    money: number
  }
}

export const ACTIONS: ActionItem[] = [
  {
    id: "study",
    label: "STUDY",
    icon: <BookOpen className="w-6 h-6" />,
    locationId: "ikb",
    effects: { happiness: -5, gpa: 10, money: 0 },
  },
  {
    id: "gym",
    label: "GYM",
    icon: <Dumbbell className="w-6 h-6" />,
    locationId: "birdcoop",
    effects: { happiness: 8, gpa: 0, money: -5 },
  },
  {
    id: "socialize",
    label: "SOCIAL",
    icon: <Users className="w-6 h-6" />,
    locationId: "nest",
    effects: { happiness: 10, gpa: -5, money: -5 },
  },
  {
    id: "work",
    label: "WORK",
    icon: <Briefcase className="w-6 h-6" />,
    locationId: "buchanan",
    effects: { happiness: -8, gpa: 0, money: 15 },
  },
  {
    id: "coffee",
    label: "COFFEE",
    icon: <Coffee className="w-6 h-6" />,
    locationId: "koerner",
    effects: { happiness: 5, gpa: 3, money: -3 },
  },
  {
    id: "sleep",
    label: "SLEEP",
    icon: <Bed className="w-6 h-6" />,
    locationId: "residence",
    effects: { happiness: 5, gpa: 5, money: 0 },
  },
  {
    id: "party",
    label: "PARTY",
    icon: <Music className="w-6 h-6" />,
    locationId: "wreckBeach",
    effects: { happiness: 15, gpa: -10, money: -8 },
  },
  {
    id: "commute",
    label: "BUS",
    icon: <Bus className="w-6 h-6" />,
    locationId: "mainMall",
    effects: { happiness: -3, gpa: 0, money: -2 },
  },
]

interface ActionBarProps {
  onAction: (action: ActionItem) => void
  disabled?: boolean
}

export function ActionBar({ onAction, disabled }: ActionBarProps) {
  const buttonColors = [
    "bg-gradient-to-r from-[#fdba74] to-[#fb7185]", // pink-orange (happy)
    "bg-gradient-to-r from-[#5eead4] to-[#2dd4bf]", // turquoise (locked in)
    "bg-gradient-to-r from-[#fcd34d] to-[#fbbf24]", // gold (money)
    "bg-gradient-to-r from-[#a5b4fc] to-[#818cf8]", // purple accent
  ]

  return (
    <div className="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-white/30 min-w-[340px] w-fit">
      <div className="grid grid-cols-2 gap-4">
        {ACTIONS.map((action, index) => (
          <button
            key={action.id}
            onClick={() => onAction(action)}
            disabled={disabled}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full ${buttonColors[index % buttonColors.length]} hover:opacity-90 active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed shadow-md`}
          >
            <span className="text-white drop-shadow-sm">{action.icon}</span>
            <span className="text-sm font-bold text-white tracking-wide drop-shadow-sm whitespace-nowrap">
              {action.label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-3 text-center">
        <span className="text-[10px] font-bold text-gray-600 tracking-widest">ACTIONS</span>
      </div>
    </div>
  )
}
