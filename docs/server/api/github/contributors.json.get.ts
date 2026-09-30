import { Octokit } from '@octokit/rest'

/** A row of the team page: the GitHub count plus whatever the profile makes public. */
export interface Contributor {
  username: string
  contributions: number
  name?: string
  location?: string
  websiteUrl?: string
  /** Provider lowercased, `x` normalised to `twitter` (`bluesky`, `linkedin`, ...). */
  socialAccounts?: { provider: string, url: string }[]
  sponsorsListing?: string
}

export interface Contributors {
  /** Every human contributor on GitHub, null when the server has no token to count them. */
  total: number | null
  /** The most active ones, most contributions first. */
  contributors: Contributor[]
}

/** How many contributors the page profiles, the rest are a link away on GitHub. */
const LIMIT = 24

const REPO = { owner: 'vinicunca', repo: 'pohon' }

interface Profile {
  name: string | null
  location: string | null
  websiteUrl: string | null
  socialAccounts: { nodes: { provider: string, url: string }[] }
  /** `sponsorsListing` itself is only readable by its owner, the flag is public. */
  hasSponsorsListing: boolean
}

/** Website URLs come back as typed into the profile, often without a scheme. */
function absolute(url?: string | null) {
  if (!url) return undefined
  return /^https?:\/\//.test(url) ? url : `https://${url}`
}

/** Free text, and a few profiles joke with the field. */
function location(value?: string | null) {
  return value && !['undefined', 'null'].includes(value.trim().toLowerCase()) ? value : undefined
}

/** Both sources feed the same icon map, so `x` and `X` land on `twitter`. */
function normalizeProvider(provider: string) {
  const name = provider.toLowerCase()
  return name === 'x' ? 'twitter' : name
}

/** One GraphQL query for the whole batch, an alias per login. */
async function fetchProfiles(octokit: Octokit, logins: string[]) {
  const query = `query { ${logins.map((login, index) => `u${index}: user(login: ${JSON.stringify(login)}) { ...Profile }`).join(' ')} }
fragment Profile on User { name location websiteUrl socialAccounts(first: 10) { nodes { provider url } } hasSponsorsListing }`

  let data: Record<string, Profile | null>
  try {
    data = await octokit.graphql<Record<string, Profile | null>>(query)
  } catch (error) {
    // a deleted account fails its own alias only, the rest still resolve, so
    // keep the partial payload when there is one and let a real failure through
    const partial = (error as { data?: Record<string, Profile | null> }).data
    if (!partial) {
      throw error
    }
    data = partial
  }

  return Object.fromEntries(logins.map((login, index) => [login, data[`u${index}`] ?? null]))
}

async function fromGitHub(token?: string): Promise<Contributors> {
  const octokit = new Octokit(token ? { auth: token } : {})

  const all = await octokit.paginate(octokit.rest.repos.listContributors, { ...REPO, per_page: 100 })
  const humans = all.filter(contributor => contributor.type === 'User' && contributor.login)
  const top = humans.slice(0, LIMIT)
  const profiles = token ? await fetchProfiles(octokit, top.map(contributor => contributor.login!)) : {}

  return {
    total: humans.length,
    contributors: top.map((contributor) => {
      const profile = profiles[contributor.login!]

      return {
        username: contributor.login!,
        contributions: contributor.contributions,
        name: profile?.name || undefined,
        location: location(profile?.location),
        websiteUrl: absolute(profile?.websiteUrl),
        socialAccounts: profile?.socialAccounts.nodes.map(account => ({ provider: normalizeProvider(account.provider), url: account.url })),
        sponsorsListing: profile?.hasSponsorsListing ? `https://github.com/sponsors/${contributor.login}` : undefined
      }
    })
  }
}

const cachedFromGitHub = defineCachedFunction(fromGitHub, {
  maxAge: 60 * 60,
  name: 'contributors',
  getKey: (token?: string) => token ? 'authenticated' : 'public'
})

export default defineEventHandler(async (event): Promise<Contributors> => {
  try {
    const contributors = await cachedFromGitHub(process.env.NUXT_GITHUB_TOKEN)
    setResponseHeader(event, 'cache-control', 'max-age=3600')
    return contributors
  } catch (error) {
    console.error('[api/github/contributors] GitHub request failed', error)
    setResponseHeader(event, 'cache-control', 'max-age=60')
    return { total: null, contributors: [] }
  }
})
