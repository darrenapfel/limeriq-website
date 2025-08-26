'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
      {/* Brandmark watermark in background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none">
        <img 
          src="/images/limerIQ-brandmark.png" 
          alt="" 
          className="w-[500px] h-[500px] object-contain"
        />
      </div>
      <motion.h1 
        className="text-5xl md:text-7xl font-brand font-bold mb-6 relative z-10 flex items-center justify-center flex-wrap gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-accent-secondary">The</span>
        <img 
          src="/images/limerIQ-IQ-brandmark.png" 
          alt="IQ" 
          className="inline-block h-[1em] w-auto align-middle"
          style={{ height: '0.9em', marginTop: '-0.05em' }}
        />
        <span className="text-accent-secondary">Behind Your AI</span>
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
        className="bg-code-bg rounded-lg px-6 py-3 flex items-center gap-4 mb-8 border-2 border-brand-sage"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <code className="font-mono">
          <span className="text-accent">$</span> <span className="text-foreground">npm install -g</span> <span className="text-accent-secondary">limeriq</span>
        </code>
        <button 
          className="text-brand-sage hover:text-accent-secondary transition-colors"
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