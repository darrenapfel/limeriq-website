'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Stats {
  githubStars: number
  contributors: number
  weeklyWorkflows: number
  discordMembers: number
}

export default function StatsBar() {
  const [stats, setStats] = useState<Stats>({
    githubStars: 0,
    contributors: 0,
    weeklyWorkflows: 0,
    discordMembers: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        setStats(data)
      } catch (error) {
        console.error('Failed to fetch stats:', error)
        // Use placeholder data for now
        setStats({
          githubStars: 127,
          contributors: 12,
          weeklyWorkflows: 847,
          discordMembers: 89,
        })
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 60000)
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`
    return num.toString()
  }

  return (
    <div className="flex justify-center gap-6 md:gap-8 py-4 font-mono text-sm flex-wrap">
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span>⭐</span>
        <span className="text-accent font-bold">{formatNumber(stats.githubStars)}</span>
        <span className="text-muted">stars</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span>👥</span>
        <span className="text-accent font-bold">{formatNumber(stats.contributors)}</span>
        <span className="text-muted">contributors</span>
      </motion.div>
      
      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <span>🚀</span>
        <span className="text-accent font-bold">{formatNumber(stats.weeklyWorkflows)}</span>
        <span className="text-muted">this week</span>
      </motion.div>

      <motion.div 
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span>💬</span>
        <span className="text-accent font-bold">{formatNumber(stats.discordMembers)}</span>
        <span className="text-muted">discord</span>
      </motion.div>
    </div>
  )
}