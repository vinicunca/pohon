interface GitHubRepository {
  stargazers_count: number
}

interface NpmDownloads {
  downloads: number
}

export default defineCachedEventHandler(async () => {
  const [repository, npm] = await Promise.all([
    $fetch<GitHubRepository>('https://api.github.com/repos/vinicunca/pohon', {
      headers: { 'User-Agent': 'pohon-ui-docs' }
    }).catch(() => null),
    $fetch<NpmDownloads>('https://api.npmjs.org/downloads/point/last-month/pohon-ui').catch(() => null)
  ])

  return {
    stats: {
      downloads: npm?.downloads ?? 0,
      stars: repository?.stargazers_count ?? 0
    }
  }
}, {
  maxAge: 60 * 60,
  shouldBypassCache: () => !!import.meta.dev,
  getKey: () => 'module'
})
