export interface Release {
  tag: string
  /** The release name, its tag when it has none. */
  title: string
  date: string
  url: string
  /** The release notes, Markdown as GitHub stores them. */
  markdown: string
}

interface GitHubRelease {
  tag_name: string
  name: string | null
  published_at: string
  html_url: string
  body: string | null
  draft: boolean
  prerelease: boolean
}

/** Pages of 100, with room for recent releases and prereleases. */
const MAX_PAGES = 3

/** Fetch published Pohon UI releases from GitHub. */
export const fetchReleases = defineCachedFunction(async (): Promise<Release[]> => {
  const headers = {
    'Accept': 'application/vnd.github+json',
    // GitHub rejects requests without one
    'User-Agent': 'pohon-ui-docs',
    ...(process.env.NUXT_GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.NUXT_GITHUB_TOKEN}` } : {})
  }

  const releases: GitHubRelease[] = []

  for (let page = 1; page <= MAX_PAGES; page++) {
    const batch = await $fetch<GitHubRelease[]>('https://api.github.com/repos/vinicunca/pohon/releases', {
      query: { per_page: 100, page },
      headers
    })

    releases.push(...batch)

    // A short page is the last one
    if (batch.length < 100) {
      break
    }
  }

  return releases
    .filter(release => !release.draft)
    .map(release => ({
      tag: release.tag_name,
      title: release.name || release.tag_name,
      date: release.published_at,
      url: release.html_url,
      markdown: release.body || ''
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}, {
  maxAge: 60 * 60,
  name: 'releases',
  getKey: () => 'pohon-ui'
})
