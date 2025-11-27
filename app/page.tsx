"use client"

import { useState } from "react"
import { StartScreen } from "@/components/game/start-screen"
import { GameScreen } from "@/components/game/game-screen"
import { GameOverScreen } from "@/components/game/game-over-screen"

export type GameState = "start" | "playing" | "gameover" | "victory"
export type GameOverReason = "happiness" | "gpa" | "money" | null

export default function HappySappyGame() {
  const [gameState, setGameState] = useState<GameState>("start")
  const [gameOverReason, setGameOverReason] = useState<GameOverReason>(null)
  const [finalYear, setFinalYear] = useState(1)
  const [currentYear, setCurrentYear] = useState(1)
  const [currentStats, setCurrentStats] = useState({ happiness: 50, gpa: 50, money: 50 })

  const startGame = () => {
    setCurrentYear(1)
    setCurrentStats({ happiness: 50, gpa: 50, money: 50 })
    setGameState("playing")
    setGameOverReason(null)
  }

  const handleYearComplete = (stats: { happiness: number; gpa: number; money: number }) => {
    setCurrentStats(stats)
    if (currentYear >= 4) {
      setFinalYear(4)
      setGameState("victory")
    } else {
      setCurrentYear((y) => y + 1)
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
      {gameState === "playing" && (
        <GameScreen
          year={currentYear}
          initialStats={currentStats}
          onYearComplete={handleYearComplete}
          onGameOver={endGame}
        />
      )}
      {(gameState === "gameover" || gameState === "victory") && (
        <GameOverScreen reason={gameOverReason} year={finalYear} stats={currentStats} onRestart={startGame} />
      )}
    </main>
  )
}
