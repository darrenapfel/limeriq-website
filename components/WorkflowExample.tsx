import CodeBlock from './CodeBlock'

export default function WorkflowExample() {
  const workflowYaml = `name: deploy-feature
description: Deploy a new feature with validation and testing

steps:
  - name: analyze_requirements
    type: task
    prompt: "Analyze the feature requirements and create a plan"
    validation:
      consensus: 4/5  # 4 out of 5 agents must agree
      
  - name: implement
    type: code
    language: typescript
    validate_syntax: true
    context_from: [analyze_requirements]
    
  - name: write_tests
    type: task
    prompt: "Write comprehensive tests for the implementation"
    parallel: true  # Run in parallel with implementation
    
  - name: validate
    type: validation
    check_tests: true
    check_types: true
    
  - name: deploy
    type: deterministic
    command: npm run deploy
    when: validation.passed == true`

  return (
    <section className="py-20 px-4 bg-code-bg">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-mono font-bold mb-8 text-center">
          Define. Validate. Execute.
        </h2>
        
        <p className="text-center text-muted mb-8 max-w-2xl mx-auto">
          Workflows are just YAML files that define structured, validated steps. 
          No magic, just orchestration that works.
        </p>

        <CodeBlock code={workflowYaml} language="yaml" />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-background rounded-lg p-4 border border-muted">
            <h3 className="font-mono text-accent mb-2">Multi-Agent Consensus</h3>
            <p className="text-sm text-muted">Multiple agents validate critical decisions</p>
          </div>
          <div className="bg-background rounded-lg p-4 border border-muted">
            <h3 className="font-mono text-accent mb-2">Parallel Execution</h3>
            <p className="text-sm text-muted">Speed up workflows with parallel steps</p>
          </div>
          <div className="bg-background rounded-lg p-4 border border-muted">
            <h3 className="font-mono text-accent mb-2">Context Preservation</h3>
            <p className="text-sm text-muted">Each step gets exactly the context it needs</p>
          </div>
        </div>
      </div>
    </section>
  )
}