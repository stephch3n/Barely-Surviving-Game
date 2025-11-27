import type { LocationId } from "./campus-map"

export type LocationChoice = {
  id: string
  locationId: LocationId
  text: string
  emoji: string
  effects: {
    happiness: number
    gpa: number
    social: number
  }
}

export type LocationEvent = {
  id: string
  title: string
  description: string
  yearRange?: [number, number]
  choices: LocationChoice[]
}

export const locationEvents: LocationEvent[] = [
  // Study dilemmas
  {
    id: "study-spot",
    title: "Time to Study!",
    description: "You need to review for your upcoming midterm. Where do you go?",
    yearRange: [1, 4],
    choices: [
      {
        id: "ikb-study",
        locationId: "ikb",
        text: "IKB - Silent floor focus",
        emoji: "📚",
        effects: { happiness: -5, gpa: 15, social: -5 },
      },
      {
        id: "koerner-study",
        locationId: "koerner",
        text: "Koerner - Cozy vibes",
        emoji: "📖",
        effects: { happiness: 2, gpa: 12, social: 0 },
      },
      {
        id: "nest-study",
        locationId: "nest",
        text: "The Nest - Study with friends",
        emoji: "☕",
        effects: { happiness: 8, gpa: 5, social: 10 },
      },
    ],
  },
  // Social time
  {
    id: "friday-hangout",
    title: "Friday Vibes!",
    description: "Classes are done for the week. Where are you heading?",
    yearRange: [1, 4],
    choices: [
      {
        id: "nest-friday",
        locationId: "nest",
        text: "The Nest - Grab food with friends",
        emoji: "🍔",
        effects: { happiness: 15, gpa: -5, social: 20 },
      },
      {
        id: "residence-party",
        locationId: "residence",
        text: "Gage - Someone's hosting",
        emoji: "🎉",
        effects: { happiness: 20, gpa: -12, social: 25 },
      },
      {
        id: "gym-friday",
        locationId: "birdcoop",
        text: "BirdCoop - Friday pump",
        emoji: "💪",
        effects: { happiness: 10, gpa: 0, social: 8 },
      },
    ],
  },
  // Morning class
  {
    id: "morning-rush",
    title: "8 AM Class!",
    description: "You overslept and have 15 minutes to get to class!",
    yearRange: [1, 4],
    choices: [
      {
        id: "buchanan-rush",
        locationId: "buchanan",
        text: "Sprint to Buchanan",
        emoji: "🏃",
        effects: { happiness: -8, gpa: 10, social: 0 },
      },
      {
        id: "skip-class",
        locationId: "residence",
        text: "Stay in bed, watch recording later",
        emoji: "😴",
        effects: { happiness: 12, gpa: -15, social: 0 },
      },
      {
        id: "nest-breakfast",
        locationId: "nest",
        text: "Skip class, get breakfast",
        emoji: "🥐",
        effects: { happiness: 8, gpa: -12, social: 5 },
      },
    ],
  },
  // Sunny day
  {
    id: "sunny-vancouver",
    title: "Rare Sunny Day!",
    description: "The sun is actually out in Vancouver! Quick, what do you do?",
    yearRange: [1, 4],
    choices: [
      {
        id: "wreck-sun",
        locationId: "wreckBeach",
        text: "Wreck Beach trip!",
        emoji: "🏖️",
        effects: { happiness: 25, gpa: -15, social: 20 },
      },
      {
        id: "mainmall-sun",
        locationId: "mainMall",
        text: "Chill on Main Mall grass",
        emoji: "🌳",
        effects: { happiness: 15, gpa: -5, social: 15 },
      },
      {
        id: "ikb-sun",
        locationId: "ikb",
        text: "Study by the window at IKB",
        emoji: "📖",
        effects: { happiness: 5, gpa: 12, social: 0 },
      },
    ],
  },
  // Stress relief
  {
    id: "stressed-out",
    title: "Feeling Overwhelmed",
    description: "Midterm season is hitting hard. You need a break.",
    yearRange: [1, 4],
    choices: [
      {
        id: "gym-stress",
        locationId: "birdcoop",
        text: "Work it out at the gym",
        emoji: "🏋️",
        effects: { happiness: 12, gpa: 5, social: 5 },
      },
      {
        id: "nest-stress",
        locationId: "nest",
        text: "Comfort food at The Nest",
        emoji: "🍕",
        effects: { happiness: 15, gpa: -5, social: 10 },
      },
      {
        id: "koerner-stress",
        locationId: "koerner",
        text: "Power through at Koerner",
        emoji: "📚",
        effects: { happiness: -10, gpa: 18, social: -5 },
      },
    ],
  },
  // Group project
  {
    id: "group-meeting",
    title: "Group Project Meeting",
    description: "Your group needs to meet up. Where should everyone go?",
    yearRange: [1, 4],
    choices: [
      {
        id: "ikb-group",
        locationId: "ikb",
        text: "Book a room at IKB",
        emoji: "👥",
        effects: { happiness: 0, gpa: 15, social: 12 },
      },
      {
        id: "nest-group",
        locationId: "nest",
        text: "Casual meeting at The Nest",
        emoji: "☕",
        effects: { happiness: 8, gpa: 8, social: 15 },
      },
      {
        id: "residence-group",
        locationId: "residence",
        text: "Your place in Gage",
        emoji: "🏠",
        effects: { happiness: 5, gpa: 10, social: 10 },
      },
    ],
  },
  // Late night
  {
    id: "late-night",
    title: "It's 11 PM...",
    description: "Assignment due at midnight. What's the move?",
    yearRange: [1, 4],
    choices: [
      {
        id: "ikb-late",
        locationId: "ikb",
        text: "IKB 24hr section grind",
        emoji: "🌙",
        effects: { happiness: -12, gpa: 20, social: -5 },
      },
      {
        id: "residence-late",
        locationId: "residence",
        text: "Pull all-nighter in dorm",
        emoji: "💻",
        effects: { happiness: -8, gpa: 15, social: 0 },
      },
      {
        id: "submit-late",
        locationId: "nest",
        text: "Submit what you have, get food",
        emoji: "🤷",
        effects: { happiness: 10, gpa: -10, social: 5 },
      },
    ],
  },
  // Weekend morning
  {
    id: "weekend-morning",
    title: "Saturday Morning",
    description: "No classes today! How do you start your weekend?",
    yearRange: [1, 4],
    choices: [
      {
        id: "gym-morning",
        locationId: "birdcoop",
        text: "Early gym session",
        emoji: "💪",
        effects: { happiness: 10, gpa: 5, social: 5 },
      },
      {
        id: "brunch",
        locationId: "nest",
        text: "Brunch with friends",
        emoji: "🥞",
        effects: { happiness: 15, gpa: -3, social: 18 },
      },
      {
        id: "sleep-in",
        locationId: "residence",
        text: "Sleep in until noon",
        emoji: "😴",
        effects: { happiness: 12, gpa: 0, social: -5 },
      },
    ],
  },
  // Club event
  {
    id: "club-event",
    title: "Club Event Tonight!",
    description: "There's a big club event happening. Are you going?",
    yearRange: [1, 3],
    choices: [
      {
        id: "nest-club",
        locationId: "nest",
        text: "Attend at The Nest",
        emoji: "🎭",
        effects: { happiness: 12, gpa: -8, social: 22 },
      },
      {
        id: "study-instead",
        locationId: "ikb",
        text: "Skip it, study instead",
        emoji: "📖",
        effects: { happiness: -8, gpa: 15, social: -10 },
      },
      {
        id: "quick-appearance",
        locationId: "mainMall",
        text: "Show face then leave",
        emoji: "👋",
        effects: { happiness: 5, gpa: 0, social: 8 },
      },
    ],
  },
  // Coffee run
  {
    id: "caffeine-needed",
    title: "Need Caffeine!",
    description: "You're running on empty. Time for coffee.",
    yearRange: [1, 4],
    choices: [
      {
        id: "nest-coffee",
        locationId: "nest",
        text: "Starbucks at The Nest",
        emoji: "☕",
        effects: { happiness: 8, gpa: 5, social: 8 },
      },
      {
        id: "ikb-coffee",
        locationId: "ikb",
        text: "Quiet café in IKB",
        emoji: "📚",
        effects: { happiness: 5, gpa: 10, social: 0 },
      },
      {
        id: "residence-nap",
        locationId: "residence",
        text: "Actually, just nap instead",
        emoji: "😴",
        effects: { happiness: 10, gpa: -5, social: 0 },
      },
    ],
  },
  // Interview prep
  {
    id: "interview-prep",
    title: "Co-op Interview Tomorrow!",
    description: "Big interview coming up. How do you prepare?",
    yearRange: [2, 4],
    choices: [
      {
        id: "ikb-prep",
        locationId: "ikb",
        text: "Practice in IKB study room",
        emoji: "💼",
        effects: { happiness: -5, gpa: 10, social: 0 },
      },
      {
        id: "mock-friends",
        locationId: "nest",
        text: "Mock interview with friends",
        emoji: "👥",
        effects: { happiness: 5, gpa: 8, social: 12 },
      },
      {
        id: "wing-it",
        locationId: "residence",
        text: "Relax, wing it tomorrow",
        emoji: "🍀",
        effects: { happiness: 8, gpa: -8, social: 0 },
      },
    ],
  },
  // Rainy day
  {
    id: "rainy-day",
    title: "Classic Vancouver Rain",
    description: "It's pouring outside. What's your plan?",
    yearRange: [1, 4],
    choices: [
      {
        id: "koerner-cozy",
        locationId: "koerner",
        text: "Cozy up in Koerner",
        emoji: "🌧️",
        effects: { happiness: 8, gpa: 12, social: 0 },
      },
      {
        id: "nest-rain",
        locationId: "nest",
        text: "Hot chocolate at The Nest",
        emoji: "☕",
        effects: { happiness: 12, gpa: 0, social: 10 },
      },
      {
        id: "residence-stay",
        locationId: "residence",
        text: "Stay in, watch Netflix",
        emoji: "📺",
        effects: { happiness: 15, gpa: -8, social: -5 },
      },
    ],
  },
]

export function getRandomLocationEvent(excludeIds: string[] = [], year = 1): LocationEvent {
  const available = locationEvents.filter((e) => {
    const inYearRange = !e.yearRange || (year >= e.yearRange[0] && year <= e.yearRange[1])
    const notRecent = !excludeIds.includes(e.id)
    return inYearRange && notRecent
  })

  const pool =
    available.length > 0
      ? available
      : locationEvents.filter((e) => !e.yearRange || (year >= e.yearRange[0] && year <= e.yearRange[1]))
  return pool[Math.floor(Math.random() * pool.length)]
}
