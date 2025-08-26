import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For now, return mock data
    // In production, this would fetch from GitHub API and cache in Redis
    const stats = {
      githubStars: 127,
      contributors: 12,
      weeklyWorkflows: 847,
      discordMembers: 89,
    }

    // If we have GitHub token configured, fetch real data
    if (process.env.GITHUB_TOKEN && process.env.GITHUB_TOKEN !== 'your_github_token') {
      try {
        const headers = {
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        }

        const repoResponse = await fetch(
          `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}`,
          { headers, next: { revalidate: 300 } } // Cache for 5 minutes
        )
        
        if (repoResponse.ok) {
          const repoData = await repoResponse.json()
          stats.githubStars = repoData.stargazers_count || stats.githubStars
          
          const contributorsResponse = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_REPO_OWNER}/${process.env.GITHUB_REPO_NAME}/contributors`,
            { headers, next: { revalidate: 300 } }
          )
          
          if (contributorsResponse.ok) {
            const contributorsData = await contributorsResponse.json()
            stats.contributors = contributorsData.length || stats.contributors
          }
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        // Fall back to mock data
      }
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json({
      githubStars: 0,
      contributors: 0,
      weeklyWorkflows: 0,
      discordMembers: 0,
    })
  }
}