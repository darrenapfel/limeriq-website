export default function Community() {
  return (
    <section className="py-20 px-4 bg-code-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-mono font-bold mb-8">
          Built by Developers, for Developers
        </h2>
        
        <p className="text-xl text-muted mb-12 max-w-2xl mx-auto">
          Join a community that&apos;s tired of AI promises and ready for AI reality
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <a 
            href="https://github.com/limeriq/limeriq" 
            className="bg-background rounded-lg p-6 border border-muted hover:border-accent transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-4xl mb-4">🐙</div>
            <h3 className="font-mono text-lg mb-2 group-hover:text-accent transition-colors">GitHub</h3>
            <p className="text-sm text-muted">Star us, contribute, report issues</p>
          </a>

          <a 
            href="https://discord.gg/limeriq" 
            className="bg-background rounded-lg p-6 border border-muted hover:border-accent transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="font-mono text-lg mb-2 group-hover:text-accent transition-colors">Discord</h3>
            <p className="text-sm text-muted">Get help, share workflows, chat</p>
          </a>

          <a 
            href="https://github.com/limeriq/limeriq/docs" 
            className="bg-background rounded-lg p-6 border border-muted hover:border-accent transition-colors group"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="text-4xl mb-4">📚</div>
            <h3 className="font-mono text-lg mb-2 group-hover:text-accent transition-colors">Documentation</h3>
            <p className="text-sm text-muted">Learn everything about limerIQ</p>
          </a>
        </div>

        <div className="mt-16 p-6 bg-background rounded-lg border border-accent">
          <h3 className="font-mono text-xl mb-4 text-accent">Community Workflows</h3>
          <p className="text-muted mb-6">
            Browse and contribute workflows that solve real problems
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
            <div className="bg-code-bg rounded p-3">
              <p className="font-mono text-sm text-accent mb-1">code-review.yaml</p>
              <p className="text-xs text-muted">Multi-agent code review with consensus</p>
            </div>
            <div className="bg-code-bg rounded p-3">
              <p className="font-mono text-sm text-accent mb-1">test-generation.yaml</p>
              <p className="text-xs text-muted">Generate comprehensive test suites</p>
            </div>
            <div className="bg-code-bg rounded p-3">
              <p className="font-mono text-sm text-accent mb-1">refactor-safely.yaml</p>
              <p className="text-xs text-muted">Refactor with validation at each step</p>
            </div>
            <div className="bg-code-bg rounded p-3">
              <p className="font-mono text-sm text-accent mb-1">bug-fix.yaml</p>
              <p className="text-xs text-muted">Systematic bug identification and fixing</p>
            </div>
            <div className="bg-code-bg rounded p-3">
              <p className="font-mono text-sm text-accent mb-1">api-client.yaml</p>
              <p className="text-xs text-muted">Generate type-safe API clients</p>
            </div>
            <div className="bg-code-bg rounded p-3">
              <p className="font-mono text-sm text-accent mb-1">migrate-db.yaml</p>
              <p className="text-xs text-muted">Safe database migration workflows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}