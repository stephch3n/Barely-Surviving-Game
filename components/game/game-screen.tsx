"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { UBCCharacter } from "./ubc-character"
import { CampusMap, CAMPUS_LOCATIONS, type LocationId } from "./campus-map"
import { StatBars } from "./stat-bars"
import { GameClock } from "./game-clock"
import { LocationChoiceModal } from "./location-choice-modal"
import { ActionBar, type ActionItem } from "./action-bar"
import { getRandomLocationEvent, type LocationEvent, type LocationChoice } from "./game-events"
import type { GameOverReason } from "@/app/page"

interface GameScreenProps {
  year: number
  initialStats: { happiness: number; gpa: number; money: number }
  onYearComplete: (stats: { happiness: number; gpa: number; money: number }) => void
  onGameOver: (reason: GameOverReason, year: number) => void
}

const YEAR_DURATION = 45000
const EVENT_INTERVAL = 7000

export function GameScreen({ year, initialStats, onYearComplete, onGameOver }: GameScreenProps) {
  const [stats, setStats] = useState(initialStats)
  const [yearProgress, setYearProgress] = useState(0)
  const [currentEvent, setCurrentEvent] = useState<LocationEvent | null>(null)
  const [characterPos, setCharacterPos] = useState({ x: 85, y: 40 })
  const [currentLocation, setCurrentLocation] = useState<LocationId>("residence")
  const [isWalking, setIsWalking] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("left")
  const [recentEvents, setRecentEvents] = useState<string[]>([])
  const [highlightedLocations, setHighlightedLocations] = useState<string[]>([])

  const isPaused = currentEvent !== null
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const eventTimerRef = useRef<NodeJS.Timeout | null>(null)
  const yearCompletedRef = useRef(false)

  const avgStats = (stats.happiness + stats.gpa + stats.money) / 3
  const mood = avgStats > 60 ? "happy" : avgStats < 35 ? "sad" : "neutral"

  useEffect(() => {
    setYearProgress(0)
    yearCompletedRef.current = false
  }, [year])

  useEffect(() => {
    if (stats.happiness <= 0) onGameOver("happiness", year)
    else if (stats.gpa <= 0) onGameOver("gpa", year)
    else if (stats.money <= 0) onGameOver("money", year)
  }, [stats, year, onGameOver])

  useEffect(() => {
    if (isPaused) return

    const tick = 100
    const progressPerTick = (tick / YEAR_DURATION) * 100

    gameLoopRef.current = setInterval(() => {
      setYearProgress((prev) => {
        const next = prev + progressPerTick
        if (next >= 100 && !yearCompletedRef.current) {
          yearCompletedRef.current = true
          setTimeout(() => onYearComplete(stats), 100)
          return 100
        }
        return Math.min(next, 100)
      })
    }, tick)

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
    }
  }, [isPaused, onYearComplete, stats])

  useEffect(() => {
    if (isPaused || yearCompletedRef.current) return

    const scheduleNextEvent = () => {
      const event = getRandomLocationEvent(recentEvents, year)
      setRecentEvents((prev) => [...prev.slice(-3), event.id])
      setHighlightedLocations(event.choices.map((c) => c.locationId))
      setCurrentEvent(event)
    }

    eventTimerRef.current = setTimeout(scheduleNextEvent, EVENT_INTERVAL)

    return () => {
      if (eventTimerRef.current) clearTimeout(eventTimerRef.current)
    }
  }, [isPaused, recentEvents, year, currentEvent])

  const handleChoice = useCallback(
    (choice: LocationChoice) => {
      const targetLocation = CAMPUS_LOCATIONS[choice.locationId]

      setDirection(targetLocation.x > characterPos.x ? "right" : "left")
      setIsWalking(true)
      setCharacterPos({ x: targetLocation.x, y: targetLocation.y + 15 })
      setCurrentLocation(choice.locationId)

      setTimeout(() => setIsWalking(false), 800)

      setStats((prev) => ({
        happiness: Math.min(100, Math.max(0, prev.happiness + choice.effects.happiness)),
        gpa: Math.min(100, Math.max(0, prev.gpa + choice.effects.gpa)),
        money: Math.min(100, Math.max(0, prev.money + choice.effects.money)),
      }))

      setHighlightedLocations([])
      setCurrentEvent(null)
    },
    [characterPos.x],
  )

  const handleTimeout = useCallback(() => {
    setStats((prev) => ({
      happiness: Math.max(0, prev.happiness - 10),
      gpa: Math.max(0, prev.gpa - 10),
      money: Math.max(0, prev.money - 10),
    }))
    setHighlightedLocations([])
    setCurrentEvent(null)
  }, [])

  const handleAction = useCallback(
    (action: ActionItem) => {
      const targetLocation = CAMPUS_LOCATIONS[action.locationId]

      setDirection(targetLocation.x > characterPos.x ? "right" : "left")
      setIsWalking(true)
      setCharacterPos({ x: targetLocation.x, y: targetLocation.y + 15 })
      setCurrentLocation(action.locationId)

      setTimeout(() => setIsWalking(false), 800)

      setStats((prev) => ({
        happiness: Math.min(100, Math.max(0, prev.happiness + action.effects.happiness)),
        gpa: Math.min(100, Math.max(0, prev.gpa + action.effects.gpa)),
        money: Math.min(100, Math.max(0, prev.money + action.effects.money)),
      }))
    },
    [characterPos.x],
  )

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 z-0" />

      <div className="absolute inset-0 z-10">
        <CampusMap characterPosition={characterPos} highlightedLocations={highlightedLocations} />
      </div>

      <UBCCharacter mood={mood} size="md" position={characterPos} isWalking={isWalking} direction={direction} />

      <div className="absolute top-4 left-4 z-20">
        <GameClock year={year} progress={yearProgress} isPaused={isPaused} />
      </div>

      <div className="absolute top-4 right-4 z-20 w-56">
        <StatBars {...stats} />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
          <span className="text-white text-sm font-medium">📍 {CAMPUS_LOCATIONS[currentLocation].label}</span>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 z-20">
        <ActionBar onAction={handleAction} disabled={isPaused} />
      </div>

      {currentEvent && (
        <LocationChoiceModal event={currentEvent} onChoice={handleChoice} onTimeout={handleTimeout} timeLimit={5} />
      )}
    </div>
  )
}
