"use client"

import { Button } from "@/components/ui/button"

type Activity = {
  id: string
  name: string
  icon: string
  happyChange: number
  sappyChange: number
  description: string
}

interface ActivityChoiceProps {
  choices: Activity[]
  onSelect: (activity: Activity) => void
}

export function ActivityChoice({ choices, onSelect }: ActivityChoiceProps) {
  const getChangeIndicator = (value: number) => {
    if (value > 0) return <span className="text-emerald-500">+{value}</span>
    if (value < 0) return <span className="text-destructive">{value}</span>
    return <span className="text-muted-foreground">0</span>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {choices.map((choice) => (
        <Button
          key={choice.id}
          variant="outline"
          className="h-auto p-4 flex flex-col items-center gap-2 bg-card/95 hover:bg-card border-2 border-ubc-blue/20 hover:border-ubc-blue/40 transition-all hover:scale-105 shadow-lg"
          onClick={() => onSelect(choice)}
        >
          <span className="text-3xl">{choice.icon}</span>
          <span className="font-bold text-foreground">{choice.name}</span>
          <span className="text-xs text-muted-foreground text-center">{choice.description}</span>
          <div className="flex gap-4 text-xs font-medium mt-1">
            <div className="flex items-center gap-1">
              <span>😊</span>
              {getChangeIndicator(choice.happyChange)}
            </div>
            <div className="flex items-center gap-1">
              <span>📈</span>
              {getChangeIndicator(choice.sappyChange)}
            </div>
          </div>
        </Button>
      ))}
    </div>
  )
}
