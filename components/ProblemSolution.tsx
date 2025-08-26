export default function ProblemSolution() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="font-mono text-error mb-4 text-xl">AI without <span className="text-accent-secondary">IQ</span>:</h3>
            <div className="text-3xl">💡→💭→🤔→😵→💥</div>
            <div className="mt-4 text-muted">
              <p>Hour 1: &ldquo;This is amazing!&rdquo;</p>
              <p>Hour 2: &ldquo;Wait, why is it repeating itself?&rdquo;</p>
              <p className="text-error">Hour 3: &ldquo;It&apos;s hallucinating functions that don&apos;t exist&rdquo;</p>
              <p>Hour 4: Manual cleanup</p>
            </div>
          </div>
          <div>
            <h3 className="font-mono text-brand-sage mb-4 text-xl">AI with limer<span className="text-accent-secondary">IQ</span>:</h3>
            <div className="text-3xl">💡→📝→✓→📦→🚀</div>
            <div className="mt-4 text-foreground">
              <p>Step 1 → Analyze requirements</p>
              <p>Step 2 → Validate approach</p>
              <p>Step 3 → Execute with consensus</p>
              <p>Step 4 → Ship working code</p>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-mono font-bold mb-8 text-center">
          Structure Beats Instructions
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-code-bg rounded-lg p-6 border border-muted">
            <p className="text-error mb-2 font-mono">Instead of:</p>
            <p className="text-muted">&ldquo;Here&apos;s 10,000 tokens, good luck!&rdquo;</p>
          </div>
          
          <div className="bg-code-bg rounded-lg p-6 border border-accent">
            <p className="text-accent mb-2 font-mono">We do:</p>
            <p className="text-foreground">Step 1 → Validate → Step 2 → Validate → Ship</p>
          </div>
        </div>

        <div className="mt-8 p-6 border-2 border-brand-sage rounded-lg bg-code-bg">
          <p className="font-mono text-brand-sage mb-3">Early metrics from our prototype:</p>
          <ul className="space-y-2 font-mono">
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>94% completion rate (vs 31% unstructured)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>30% fewer tokens used</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-accent">✓</span>
              <span>0 hallucinated functions</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}