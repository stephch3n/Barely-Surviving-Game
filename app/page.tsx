"use client"

import { useState } from "react"
import { StartScreen } from "@/components/game/start-screen"
import { SchedulePlanner, type WeeklySchedule } from "@/components/game/schedule-planner"
import { GameScreen } from "@/components/game/game-screen"
import { GameOverScreen } from "@/components/game/game-over-screen"

export type GameState = "start" | "schedule" | "playing" | "gameover" | "victory"
export type GameOverReason = "happiness" | "gpa" | "social" | null

export default function HappySappyGame() {
  const [gameState, setGameState] = useState<GameState>("start")
  const [gameOverReason, setGameOverReason] = useState<GameOverReason>(null)
  const [finalYear, setFinalYear] = useState(1)
  const [currentYear, setCurrentYear] = useState(1)
  const [schedule, setSchedule] = useState<WeeklySchedule | null>(null)
  const [currentStats, setCurrentStats] = useState({ happiness: 50, gpa: 50, social: 50 })

  const startGame = () => {
    setCurrentYear(1)
    setCurrentStats({ happiness: 50, gpa: 50, social: 50 })
    setGameState("schedule")
    setGameOverReason(null)
  }

  const handleScheduleComplete = (newSchedule: WeeklySchedule) => {
    setSchedule(newSchedule)
    setGameState("playing")
  }

  const handleYearComplete = (stats: { happiness: number; gpa: number; social: number }) => {
    setCurrentStats(stats)
    if (currentYear >= 4) {
      // Game won!
      setFinalYear(4)
      setGameState("victory")
    } else {
      // Move to next year schedule planning
      setCurrentYear((y) => y + 1)
      setGameState("schedule")
    }
  }

  const endGame = (reason: GameOverReason, year: number) => {
    setGameOverReason(reason)
    setFinalYear(year)
    setGameState(reason === null ? "victory" : "gameover")
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {gameState === "start" && <StartScreen onStart={startGame} />}
      {gameState === "schedule" && (
        <SchedulePlanner year={currentYear} initialStats={currentStats} onComplete={handleScheduleComplete} />
      )}
      {gameState === "playing" && schedule && (
        <GameScreen
          year={currentYear}
          schedule={schedule}
          initialStats={currentStats}
          onYearComplete={handleYearComplete}
          onGameOver={endGame}
        />
      )}
      {(gameState === "gameover" || gameState === "victory") && (
        <GameOverScreen reason={gameOverReason} year={finalYear} onRestart={startGame} />
      )}
    </main>
  )
}
