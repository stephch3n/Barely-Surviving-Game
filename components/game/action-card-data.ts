export type ActionOption = {
  text: string
  outcome: string
  effects: {
    happiness?: number
    gpa?: number // Mapping "Success" (S) to GPA
    social?: number
    money?: number // Placeholder for future use
  }
}

export type ActionCard = {
  id: number
  title: string
  topic: string
  options: ActionOption[]
}

export const ACTION_CARDS: ActionCard[] = [
  {
    id: 1,
    title: "Midterm Week Party",
    topic: "Your friend Thunderbird is throwing a big birthday party during midterm week.",
    options: [
      {
        text: "Attend the party",
        outcome: "Who studying? Definitely not me.",
        effects: { happiness: 5, gpa: -5 },
      },
      {
        text: "Say no and lock in",
        outcome: "LOCKED IN.",
        effects: { happiness: -5, gpa: 8 },
      },
    ],
  },
  {
    id: 2,
    title: "Group Project Panic",
    topic: "The project is due tomorrow and two members have ghosted.",
    options: [
      {
        text: "Do all the work yourself",
        outcome: "The hero no one asked for.",
        effects: { happiness: -5, gpa: 10 },
      },
      {
        text: "Spam the group chat",
        outcome: "Left on read.",
        effects: { happiness: -5 },
      },
      {
        text: "Give up and submit whatever",
        outcome: "Faith is the strategy.",
        effects: { happiness: 3, gpa: -8 },
      },
    ],
  },
  {
    id: 3,
    title: "Job Fair",
    topic: "A campus career fair is happening today.",
    options: [
      {
        text: "Go network. Dress nicely.",
        outcome: "Handshake game: immaculate.",
        effects: { happiness: 2, gpa: 5 },
      },
      {
        text: "Skip it and sleep",
        outcome: "Zzz > LinkedIn.",
        effects: { happiness: 3, gpa: -3 },
      },
    ],
  },
  {
    id: 4,
    title: "Expensive Cafeteria Ramen",
    topic: "New “premium ramen bowl” drops for $18.",
    options: [
      {
        text: "Buy it. Treat yourself.",
        outcome: "Wallet cries. Stomach sings.",
        effects: { happiness: 8 },
      },
      {
        text: "Eat instant noodles at home",
        outcome: "yea… not in this economy",
        effects: { happiness: -2 },
      },
    ],
  },
  {
    id: 5,
    title: "Assignment All-Nighter",
    topic: "Assignment due tomorrow; you’re behind.",
    options: [
      {
        text: "Pull an all-nighter",
        outcome: "Brain.exe not responding.",
        effects: { happiness: -6, gpa: 8 },
      },
      {
        text: "Sleep now, work early morning",
        outcome: "Risky but civilized.",
        effects: { happiness: 2, gpa: -3 },
      },
    ],
  },
  {
    id: 6,
    title: "Gym Commitment",
    topic: "You promised you'd start working out this week.",
    options: [
      {
        text: "Actually go to the gym",
        outcome: "New PR lets go",
        effects: { happiness: 5, gpa: 1 },
      },
      {
        text: "Stay home and watch Netflix",
        outcome: "Health can wait; new season can’t.",
        effects: { happiness: 3, gpa: -2 },
      },
    ],
  },
  {
    id: 7,
    title: "Free Pizza Event",
    topic: "Free pizza event on campus.",
    options: [
      {
        text: "Sprint to get a slice",
        outcome: "You got the last slice.",
        effects: { happiness: 6 },
      },
      {
        text: "Skip it to keep studying",
        outcome: "Discipline hurts.",
        effects: { happiness: -2, gpa: 3 },
      },
    ],
  },
  {
    id: 8,
    title: "Crush Sits Next to You",
    topic: "Your crush sits beside you in lecture.",
    options: [
      {
        text: "Talk to them",
        outcome: "Rizz levels rising.",
        effects: { happiness: 7, gpa: 3 },
      },
      {
        text: "Freeze and pretend to read notes",
        outcome: "0/10 the book was held upside down...",
        effects: { happiness: -2, gpa: 1 },
      },
    ],
  },
  {
    id: 9,
    title: "Tutor Session",
    topic: "A last-minute tutor session is available before exams.",
    options: [
      {
        text: "Sign up. Study intensely.",
        outcome: "Brain power +20.",
        effects: { happiness: -5, gpa: 8 },
      },
      {
        text: "Skip; you’ll figure it out",
        outcome: "You ended up taking a nap",
        effects: { happiness: 5, gpa: -5 },
      },
    ],
  },
  {
    id: 10,
    title: "Group Chat Drama",
    topic: "Your friend group is arguing.",
    options: [
      {
        text: "Mute the chat",
        outcome: "Peace restored.",
        effects: { happiness: 3, gpa: 1 },
      },
      {
        text: "Send a meme to break tension",
        outcome: "You are the diplomat now.",
        effects: { happiness: 4, gpa: 0 },
      },
    ],
  },
]