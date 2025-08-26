'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const terminalLines = [
  { type: 'command', text: '$ limeriq run deploy-feature.yaml', delay: 0 },
  { type: 'success', text: '✓ Step 1: Analyzing requirements', delay: 1000 },
  { type: 'success', text: '✓ Step 2: Creating implementation plan', delay: 2000 },
  { type: 'success', text: '✓ Step 3: Writing code (consensus: 4/5 agents agree)', delay: 3000 },
  { type: 'success', text: '✓ Step 4: Validation passed', delay: 4000 },
  { type: 'success', text: '✓ Step 5: Tests written and passing', delay: 5000 },
  { type: 'info', text: '📦 Workflow completed in 3m 27s', delay: 6000 },
  { type: 'info', text: '💾 31% fewer tokens than unstructured approach', delay: 6500 },
]

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState<typeof terminalLines>([])

  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    setVisibleLines([])
    
    terminalLines.forEach((line) => {
      const timer = setTimeout(() => {
        setVisibleLines(prev => [...prev, line])
      }, line.delay)
      timers.push(timer)
    })

    return () => timers.forEach(clearTimeout)
  }, [])

  const getLineColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-accent'
      case 'error': return 'text-error'
      case 'info': return 'text-blue-400'
      default: return 'text-foreground'
    }
  }

  return (
    <div className="bg-code-bg rounded-lg p-6 font-mono text-sm overflow-x-auto border border-muted">
      <div className="flex gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      
      <div className="space-y-1">
        {visibleLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={getLineColor(line.type)}
          >
            {line.text}
          </motion.div>
        ))}
        {visibleLines.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="inline-block w-2 h-4 bg-accent ml-1"
          />
        )}
      </div>
    </div>
  )
}