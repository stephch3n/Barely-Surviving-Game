"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card" // Assuming you have shadcn Card
import { ActionCard, ActionOption } from "./action-card-data"
import { motion, AnimatePresence } from "framer-motion"

interface ActionCardModalProps {
  card: ActionCard
  onComplete: (effects: ActionOption['effects']) => void
}

export function ActionCardModal({ card, onComplete }: ActionCardModalProps) {
  const [selectedOption, setSelectedOption] = useState<ActionOption | null>(null)

  const handleChoice = (option: ActionOption) => {
    setSelectedOption(option)
  }

  const handleContinue = () => {
    if (selectedOption) {
      onComplete(selectedOption.effects)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <AnimatePresence mode="wait">
        {!selectedOption ? (
          <motion.div
            key="choice"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="w-full max-w-md"
          >
            <div className="bg-[#1a1a2e] border-2 border-[#C4A747] rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-[#002145] p-4 text-center">
                <h2 className="text-xl font-bold text-white tracking-wide uppercase">{card.title}</h2>
              </div>
              
              <div className="p-6 space-y-6">
                <p className="text-lg text-white/90 text-center font-medium leading-relaxed">
                  {card.topic}
                </p>

                <div className="grid gap-3">
                  {card.options.map((option, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleChoice(option)}
                      className="w-full h-auto py-4 text-base bg-[#002145] hover:bg-[#002145]/80 border border-white/10 text-wrap"
                      variant="secondary"
                    >
                      {option.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="outcome"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-[#1a1a2e] border-2 border-[#C4A747] rounded-xl overflow-hidden shadow-2xl">
              <div className="bg-[#002145] p-4 text-center">
                <h2 className="text-xl font-bold text-white tracking-wide">RESULT</h2>
              </div>
              
              <div className="p-8 text-center space-y-6">
                <p className="text-2xl font-bold text-[#C4A747] italic">
                  "{selectedOption.outcome}"
                </p>

                <div className="flex justify-center gap-4 text-sm font-mono text-white/80">
                  {Object.entries(selectedOption.effects).map(([stat, val]) => (
                     <span key={stat} className={val > 0 ? "text-green-400" : "text-red-400"}>
                       {stat.toUpperCase()} {val > 0 ? "+" : ""}{val}
                     </span>
                  ))}
                </div>

                <Button 
                  onClick={handleContinue}
                  className="w-full bg-[#C4A747] hover:bg-[#C4A747]/90 text-[#002145] font-bold"
                >
                  CONTINUE
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}