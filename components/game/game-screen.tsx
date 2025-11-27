"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { UBCCharacter } from "./ubc-character"
import { CampusMap, CAMPUS_LOCATIONS, type LocationId } from "./campus-map"
import { StatBars } from "./stat-bars"
import { GameClock } from "./game-clock"
import { LocationChoiceModal } from "./location-choice-modal"
import { getRandomLocationEvent, type LocationEvent, type LocationChoice } from "./game-events"
import { ActionCardModal } from "./action-card-modal"
import { ACTION_CARDS, type ActionCard } from "./action-card-data"
import type { GameOverReason } from "@/app/page"
import type { WeeklySchedule } from "./schedule-planner"

interface GameScreenProps {
  year: number
  schedule: WeeklySchedule
  initialStats: { happiness: number; gpa: number; social: number }
  onYearComplete: (stats: { happiness: number; gpa: number; social: number }) => void
  onGameOver: (reason: GameOverReason, year: number) => void
}

const YEAR_DURATION = 30000 // 30 seconds per year
const EVENT_INTERVAL = 6000 // Event every 6 seconds
const ACTION_CARD_INTERVAL = 15000 // Action card every 15 seconds

const activities = [
  { key: "study" as const, effects: { happiness: -0.3, gpa: 1.5, social: -0.2 } },
  { key: "work" as const, effects: { happiness: -0.2, gpa: -0.3, social: 0.3 } },
  { key: "socialize" as const, effects: { happiness: 0.8, gpa: -0.2, social: 1.2 } },
  { key: "party" as const, effects: { happiness: 1.2, gpa: -0.8, social: 0.8 } },
  { key: "exercise" as const, effects: { happiness: 0.6, gpa: 0.2, social: 0.3 } },
  { key: "rest" as const, effects: { happiness: 0.9, gpa: -0.1, social: -0.3 } },
]

function calculateBaselineStats(
  schedule: WeeklySchedule,
  initialStats: { happiness: number; gpa: number; social: number },
) {
  let happiness = initialStats.happiness
  let gpa = initialStats.gpa
  let social = initialStats.social

  activities.forEach((activity) => {
    const hours = schedule[activity.key]
    happiness += hours * activity.effects.happiness
    gpa += hours * activity.effects.gpa
    social += hours * activity.effects.social
  })

  return {
    happiness: Math.min(100, Math.max(0, happiness)),
    gpa: Math.min(100, Math.max(0, gpa)),
    social: Math.min(100, Math.max(0, social)),
  }
}

export function GameScreen({ year, schedule, initialStats, onYearComplete, onGameOver }: GameScreenProps) {
  const baselineStats = useMemo(() => calculateBaselineStats(schedule, initialStats), [schedule, initialStats])

  const [stats, setStats] = useState(baselineStats)
  const [yearProgress, setYearProgress] = useState(0)
  
  // Existing Event State
  const [currentEvent, setCurrentEvent] = useState<LocationEvent | null>(null)
  
  // New Action Card State
  const [currentActionCard, setCurrentActionCard] = useState<ActionCard | null>(null)

  const [characterPos, setCharacterPos] = useState({ x: 85, y: 40 })
  const [currentLocation, setCurrentLocation] = useState<LocationId>("residence")
  const [isWalking, setIsWalking] = useState(false)
  const [direction, setDirection] = useState<"left" | "right">("left")
  const [recentEvents, setRecentEvents] = useState<string[]>([])
  const [highlightedLocations, setHighlightedLocations] = useState<string[]>([])

  // Pause if either standard event OR action card is active
  const isPaused = currentEvent !== null || currentActionCard !== null
  
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null)
  const eventTimerRef = useRef<NodeJS.Timeout | null>(null)
  const actionCardTimerRef = useRef<NodeJS.Timeout | null>(null)
  const yearCompletedRef = useRef(false)

  // Calculate mood based on average stats
  const avgStats = (stats.happiness + stats.gpa + stats.social) / 3
  const mood = avgStats > 60 ? "happy" : avgStats < 35 ? "sad" : "neutral"

  // Reset stats when baseline changes (new year)
  useEffect(() => {
    setStats(baselineStats)
    yearCompletedRef.current = false
  }, [baselineStats])

  // Game over check
  useEffect(() => {
    if (stats.happiness <= 0) onGameOver("happiness", year)
    else if (stats.gpa <= 0) onGameOver("gpa", year)
    else if (stats.social <= 0) onGameOver("social", year)
  }, [stats, year, onGameOver])

  // Main game loop - progress time
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

  // Standard Event Loop (Every 6s)
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
  }, [isPaused, recentEvents, year])

  // NEW: Action Card Loop (Every 15s)
  useEffect(() => {
    if (isPaused || yearCompletedRef.current) return

    const scheduleNextActionCard = () => {
      // Pick a random card from the list
      const randomCard = ACTION_CARDS[Math.floor(Math.random() * ACTION_CARDS.length)]
      setCurrentActionCard(randomCard)
    }

    actionCardTimerRef.current = setTimeout(scheduleNextActionCard, ACTION_CARD_INTERVAL)

    return () => {
      if (actionCardTimerRef.current) clearTimeout(actionCardTimerRef.current)
    }
  }, [isPaused, yearCompletedRef])

  const handleChoice = useCallback(
    (choice: LocationChoice) => {
      const targetLocation = CAMPUS_LOCATIONS[choice.locationId]

      // Move character to chosen location
      setDirection(targetLocation.x > characterPos.x ? "right" : "left")
      setIsWalking(true)
      setCharacterPos({ x: targetLocation.x, y: targetLocation.y + 15 })
      setCurrentLocation(choice.locationId)

      setTimeout(() => setIsWalking(false), 800)

      // Apply stat effects
      setStats((prev) => ({
        happiness: Math.min(100, Math.max(0, prev.happiness + choice.effects.happiness)),
        gpa: Math.min(100, Math.max(0, prev.gpa + choice.effects.gpa)),
        social: Math.min(100, Math.max(0, prev.social + choice.effects.social)),
      }))

      setHighlightedLocations([])
      setCurrentEvent(null)
    },
    [characterPos.x],
  )

  // Handle Standard Event Timeout
  const handleTimeout = useCallback(() => {
    setStats((prev) => ({
      happiness: Math.max(0, prev.happiness - 10),
      gpa: Math.max(0, prev.gpa - 10),
      social: Math.max(0, prev.social - 10),
    }))
    setHighlightedLocations([])
    setCurrentEvent(null)
  }, [])

  // NEW: Handle Action Card Completion
  const handleActionCardComplete = (effects: { happiness?: number; gpa?: number; social?: number }) => {
    setStats((prev) => ({
      happiness: Math.min(100, Math.max(0, prev.happiness + (effects.happiness || 0))),
      gpa: Math.min(100, Math.max(0, prev.gpa + (effects.gpa || 0))),
      social: Math.min(100, Math.max(0, prev.social + (effects.social || 0))),
    }))
    setCurrentActionCard(null)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#1a1a2e]">
      {/* Campus Map */}
      <div className="absolute inset-0">
        <CampusMap characterPosition={characterPos} highlightedLocations={highlightedLocations} />
      </div>

      {/* Character */}
      <UBCCharacter mood={mood} size="md" position={characterPos} isWalking={isWalking} direction={direction} />

      {/* UI Overlay - Top Left: Clock */}
      <div className="absolute top-4 left-4 z-20">
        <GameClock year={year} progress={yearProgress} isPaused={isPaused} />
      </div>

      {/* UI Overlay - Top Right: Stats */}
      <div className="absolute top-4 right-4 z-20 w-48">
        <div className="bg-[#002145]/90 backdrop-blur-sm rounded-xl p-3 border border-[#C4A747]/30">
          <StatBars {...stats} />
        </div>
      </div>

      {/* Current location indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-[#002145]/90 backdrop-blur-sm px-4 py-2 rounded-full border border-[#C4A747]/30">
          <span className="text-white text-sm font-medium">📍 {CAMPUS_LOCATIONS[currentLocation].label}</span>
        </div>
      </div>

      {/* Standard Event Modal */}
      {currentEvent && !currentActionCard && (
        <LocationChoiceModal event={currentEvent} onChoice={handleChoice} onTimeout={handleTimeout} timeLimit={5} />
      )}

      {/* NEW: Action Card Modal */}
      {currentActionCard && (
        <ActionCardModal card={currentActionCard} onComplete={handleActionCardComplete} />
      )}
    </div>
  )
}
