'use client'

interface CodeBlockProps {
  code: string
  language: string
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <div className="code-block border border-muted">
      <div className="flex justify-between items-center px-4 py-2 bg-background border-b border-muted">
        <span className="text-muted text-sm font-mono">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="text-muted hover:text-foreground transition-colors text-sm"
        >
          Copy
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  )
}