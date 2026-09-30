/** Every release of vinicunca/pohon, newest first, all published tags included. The notes are served per release by releases/[tag]. */
export default defineCachedEventHandler(async () => {
  return (await fetchReleases()).map(({ markdown, ...release }) => release)
}, {
  maxAge: 60 * 60,
  // the response carries `cache-control` and an etag, which the changelog on
  // every component page relies on
  getKey: () => 'releases-list'
})
