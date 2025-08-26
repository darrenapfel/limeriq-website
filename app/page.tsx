import Hero from '@/components/Hero'
import StatsBar from '@/components/StatsBar'
import ProblemSolution from '@/components/ProblemSolution'
import Terminal from '@/components/Terminal'
import WorkflowExample from '@/components/WorkflowExample'
import QuickStart from '@/components/QuickStart'
import VSCodeSection from '@/components/VSCodeSection'
import Community from '@/components/Community'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 border-b border-muted sticky top-0 bg-background/80 backdrop-blur-md z-50">
        <div className="h-8">
          <img 
            src="/images/limerIQ-wordmark.png" 
            alt="limerIQ" 
            className="h-full w-auto"
          />
        </div>
        <div className="flex gap-6">
          <a 
            href="https://github.com/limeriq/limeriq" 
            className="hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a 
            href="https://discord.gg/limeriq" 
            className="hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discord
          </a>
          <a 
            href="https://github.com/limeriq/limeriq/docs" 
            className="hover:text-accent transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Docs
          </a>
        </div>
      </nav>

      <Hero />
      <StatsBar />
      <ProblemSolution />
      
      {/* How It Works - Terminal Demo */}
      <section className="py-20 px-4 bg-code-bg">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-mono font-bold mb-8 text-center">
            How It Works
          </h2>
          <Terminal />
        </div>
      </section>

      <WorkflowExample />
      <QuickStart />
      <VSCodeSection />
      <Community />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-muted">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <img 
            src="/images/limerIQ-brandmark.png" 
            alt="limerIQ" 
            className="w-16 h-16 mb-4 opacity-60"
          />
          <p className="text-muted font-mono mb-2 text-center">
            Free forever for individuals • Apache 2.0 License
          </p>
          <p className="text-sm text-muted text-center">
            We built this for ourselves. Seems to work pretty well.
          </p>
        </div>
      </footer>
    </main>
  )
}