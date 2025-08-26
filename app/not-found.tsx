export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-mono font-bold mb-8">404</h1>
        
        <div className="font-mono text-lg mb-8 space-y-1 max-w-md mx-auto">
          <p>There once was a page that you sought,</p>
          <p>But sadly it seems it is not,</p>
          <p className="ml-8">The route has gone missing,</p>
          <p className="ml-8">No use reminiscing,</p>
          <p>Head home for the workflows we&apos;ve got.</p>
        </div>
        
        <div className="space-x-4">
          <a href="/" className="text-accent hover:underline">Go Home</a>
          <span className="text-muted">•</span>
          <a 
            href="https://github.com/limeriq/limeriq" 
            className="text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View GitHub
          </a>
        </div>
      </div>
    </div>
  )
}