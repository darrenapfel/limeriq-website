import CodeBlock from './CodeBlock'

export default function QuickStart() {
  const quickStartCode = `# Install limerIQ globally
npm install -g limeriq

# Initialize in your project
limeriq init

# Run your first workflow
limeriq workflow.orchestrator.yaml --prompt "Add dark mode to my app"`

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-8 text-center">
          Quick Start
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="text-4xl mb-4">1️⃣</div>
            <h3 className="font-mono text-lg mb-2">Install</h3>
            <p className="text-muted">One command to get started</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">2️⃣</div>
            <h3 className="font-mono text-lg mb-2">Configure</h3>
            <p className="text-muted">Use your Claude API key</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">3️⃣</div>
            <h3 className="font-mono text-lg mb-2">Execute</h3>
            <p className="text-muted">Run workflows that work</p>
          </div>
        </div>

        <CodeBlock code={quickStartCode} language="bash" />

        <div className="mt-8 text-center">
          <p className="text-muted mb-4">Or use the VSCode extension for a visual experience:</p>
          <div className="bg-code-bg rounded-lg px-6 py-3 inline-flex items-center gap-4 border border-muted">
            <code className="font-mono text-accent">ext install limeriq.vscode-limeriq</code>
            <button 
              className="text-muted hover:text-foreground transition-colors"
              onClick={() => navigator.clipboard.writeText('ext install limeriq.vscode-limeriq')}
            >
              📋
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}