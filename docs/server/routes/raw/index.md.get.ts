import { queryCollection } from '@nuxt/content/server';

const DOMAIN = 'https://pohon.vinicunca.dev';

export default defineCachedEventHandler(async (event) => {
  const page = await queryCollection(event, 'index').first() as any;

  const title = page?.title || 'Pohon UI';
  const description = page?.description || 'A comprehensive Vue UI component library (Nuxt optional) with 125+ accessible, UnoCSS components for building modern web applications.';

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `canonical_url: ${JSON.stringify(DOMAIN)}`,
    `last_updated: ${JSON.stringify(new Date().toISOString().split('T')[0])}`,
    '---',
    '\n',
  ].join('\n');

  const body = `# ${title}

${description}

## About

Pohon UI is a free and open source Vue UI library powered by [Akar](https://akar.com/) and [UnoCSS](https://unocss.dev/). It works with both Nuxt and plain Vue applications.

- 125+ accessible, production-ready components
- Built on Akar (WAI-ARIA compliant primitives)
- UnoCSS theming with CSS variables and UnoCss Variants
- TypeScript support with full auto-completion
- Server-side rendering (SSR) compatible
- Dark mode support and 50+ languages via i18n
- Figma Kit included

## Installation

- Nuxt: <${DOMAIN}/raw/docs/getting-started/installation/nuxt.md>
- Vue: <${DOMAIN}/raw/docs/getting-started/installation/vue.md>

## Explore

- Documentation: <${DOMAIN}/docs>
- Components: <${DOMAIN}/raw/docs/components.md>
- Composables: <${DOMAIN}/raw/docs/composables/define-shortcuts.md>
- Typography: <${DOMAIN}/raw/docs/typography.md>
- Sitemap (XML): <${DOMAIN}/sitemap.xml>
- Sitemap (Markdown): <${DOMAIN}/sitemap.md>
- LLMs index: <${DOMAIN}/llms.txt>
- Full LLMs documentation: <${DOMAIN}/llms-full.txt>

## Resources for Agents

- MCP Server Card: <${DOMAIN}/.well-known/mcp/server-card.json>
- MCP endpoint: <${DOMAIN}/mcp>
- API Catalog: <${DOMAIN}/.well-known/api-catalog>
- Agent Skill: <${DOMAIN}/.well-known/skills/pohon-ui/SKILL.md>
- Skills index: <${DOMAIN}/.well-known/skills/index.json>

## Links

- Website: <${DOMAIN}>
- GitHub: <https://github.com/vinicunca/pohon>
- Discord: <https://discord.gg/ps2h6QT>
- X (Twitter): <https://x.com/nuxt_js>
`;

  setResponseHeader(event, 'Content-Type', 'text/markdown; charset=utf-8');
  setResponseHeader(event, 'Link', [
    `<${DOMAIN}>; rel="canonical"`,
    `<${DOMAIN}>; rel="alternate"; type="text/html"`,
  ].join(', '));
  return frontmatter + body;
}, {
  swr: true,
  maxAge: 60 * 60,
});
