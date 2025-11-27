"use client"

import { DollarSign } from "lucide-react"

interface StatBarsProps {
  happiness: number
  gpa: number
  money: number
}

export function StatBars({ happiness, gpa, money }: StatBarsProps) {
  const getHappyColor = (value: number) => {
    if (value < 20) return "bg-red-400"
    if (value < 40) return "bg-orange-300"
    return "bg-gradient-to-r from-pink-300 to-orange-300" // pastel pink-orange
  }

  const getLockedInColor = (value: number) => {
    if (value < 20) return "bg-red-400"
    if (value < 40) return "bg-orange-300"
    return "bg-teal-400" // pastel turquoise
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow-lg space-y-4">
      {/* Happy Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">😊</span>
            <span className="font-bold text-gray-700">Happy</span>
          </div>
          <span className={`font-bold ${happiness < 20 ? "text-red-500 animate-pulse" : "text-pink-500"}`}>
            {Math.round(happiness)}%
          </span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getHappyColor(happiness)} transition-all duration-500 rounded-full`}
            style={{ width: `${happiness}%` }}
          />
        </div>
      </div>

      {/* Locked In Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span className="font-bold text-gray-700">Locked In</span>
          </div>
          <span className={`font-bold ${gpa < 20 ? "text-red-500 animate-pulse" : "text-teal-500"}`}>
            {Math.round(gpa)}%
          </span>
        </div>
        <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full ${getLockedInColor(gpa)} transition-all duration-500 rounded-full`}
            style={{ width: `${gpa}%` }}
          />
        </div>
      </div>

      {/* Money - just icon and number */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 p-1.5 rounded-full">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <span className="font-bold text-gray-700">Money</span>
        </div>
        <span className={`font-bold text-lg ${money < 20 ? "text-red-500 animate-pulse" : "text-green-600"}`}>
          ${Math.round(money)}
        </span>
      </div>
    </div>
  )
}
