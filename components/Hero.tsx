'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
      {/* Subtle brandmark in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
        <img 
          src="/images/limerIQ-brandmark.png" 
          alt="" 
          className="w-[600px] h-[600px] object-contain"
        />
      </div>
      <motion.h1 
        className="text-5xl md:text-7xl font-mono font-bold mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        The IQ Behind Your AI
      </motion.h1>
      
      <motion.p 
        className="text-xl md:text-2xl text-muted mb-8 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Open source workflow composer that makes AI agents actually complete their work
      </motion.p>
      
      <motion.div
        className="bg-code-bg rounded-lg px-6 py-3 flex items-center gap-4 mb-8 border border-muted"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <code className="font-mono text-accent">$ npm install -g limeriq</code>
        <button 
          className="text-muted hover:text-foreground transition-colors"
          onClick={() => navigator.clipboard.writeText('npm install -g limeriq')}
        >
          📋
        </button>
      </motion.div>

      <motion.p 
        className="text-lg text-foreground mb-4 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        You know that moment when Claude forgets what it&apos;s building mid-task?
      </motion.p>
      
      <motion.p 
        className="text-lg text-accent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Yeah, we&apos;re fixing that.
      </motion.p>
      
      <motion.div 
        className="mt-12 text-sm text-muted font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p>Orchestrating Haiku → Sonnet → Opus</p>
        <p className="text-xs mt-1 opacity-60">Because even AI needs poetry in motion</p>
      </motion.div>
    </section>
  )
}