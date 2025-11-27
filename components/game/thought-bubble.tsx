"use client"

interface ThoughtBubbleProps {
  question: string
}

export function ThoughtBubble({ question }: ThoughtBubbleProps) {
  return (
    <div className="absolute -top-24 left-1/2 -translate-x-1/2 animate-bounce-slow">
      <div className="relative bg-card rounded-2xl p-4 shadow-lg border-2 border-ubc-blue/20 max-w-xs">
        <p className="text-foreground text-center font-medium text-sm">{question}</p>
        {/* Bubble tail */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <div className="w-4 h-4 bg-card border-b-2 border-r-2 border-ubc-blue/20 rotate-45 transform" />
        </div>
      </div>
      {/* Thought dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="w-2 h-2 bg-card rounded-full border border-ubc-blue/20" />
        <div className="w-1.5 h-1.5 bg-card rounded-full border border-ubc-blue/20" />
      </div>
    </div>
  )
}
