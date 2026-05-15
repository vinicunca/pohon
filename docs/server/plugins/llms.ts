import type { PageCollectionItemBase } from '@nuxt/content';
import type { H3Event } from 'h3';

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('content:llms:generate:document', async (event: H3Event, doc: PageCollectionItemBase) => {
    await transformMDC(event, doc as any);
  });

  nitroApp.hooks.hook('llms:generate', (_, { sections }) => {
    sections.forEach((section) => {
      if (section.title !== 'Documentation Sets') {
        section.links = section.links.map((link) => ({
          ...link,
          href: transformRawLink(link.href),
        }));
      }
    });

    const docSetIdx = sections.findIndex((s) => s.title === 'Documentation Sets');
    if (docSetIdx !== -1) {
      const [docSet] = sections.splice(docSetIdx, 1);
      sections.push(docSet);
    }
  });
});

function transformRawLink(href: string) {
  return `${href.replace(/^https:\/\/pohon.vinicunca.dev/, 'https://pohon.vinicunca.dev/raw')}.md`;
}
