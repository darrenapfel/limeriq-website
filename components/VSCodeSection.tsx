export default function VSCodeSection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-mono font-bold mb-8">
          Visual Workflow Designer
        </h2>
        <p className="text-xl text-muted mb-8">
          Design workflows visually in VSCode, execute with confidence
        </p>
        
        <div className="bg-code-bg rounded-lg p-8 mb-8 border border-muted">
          <div className="bg-background rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl mb-4">🎨</p>
              <p className="text-muted font-mono">VSCode Extension Preview</p>
              <p className="text-sm text-muted mt-2">Screenshot placeholder - 1920x1080</p>
            </div>
          </div>
        </div>
        
        <div className="bg-code-bg rounded-lg px-6 py-3 inline-flex items-center gap-4 border border-muted">
          <code className="font-mono text-accent">
            ext install limeriq.vscode-limeriq
          </code>
          <button 
            className="text-muted hover:text-foreground transition-colors"
            onClick={() => navigator.clipboard.writeText('ext install limeriq.vscode-limeriq')}
          >
            📋
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div>
            <p className="text-2xl mb-2">📝</p>
            <h3 className="font-mono text-lg mb-2">Visual Builder</h3>
            <p className="text-sm text-muted">Drag and drop workflow creation</p>
          </div>
          <div>
            <p className="text-2xl mb-2">🔄</p>
            <h3 className="font-mono text-lg mb-2">Live Preview</h3>
            <p className="text-sm text-muted">See your workflow execute in real-time</p>
          </div>
          <div>
            <p className="text-2xl mb-2">🎯</p>
            <h3 className="font-mono text-lg mb-2">IntelliSense</h3>
            <p className="text-sm text-muted">Full autocomplete and validation</p>
          </div>
        </div>
      </div>
    </section>
  )
}