import { queryCollection } from '@nuxt/content/server';
import { z } from 'zod';

export default defineMcpPrompt({
  description: 'Guide through setting up a new project with a Pohon template',
  inputSchema: {
    projectType: z.string().describe('Type of project (dashboard, landing page, admin panel, etc.)'),
  },
  async handler({ projectType }) {
    const event = useEvent();

    const templatesCollectionItems = await queryCollection(event, 'templates').first();

    const templates = templatesCollectionItems?.items || [];

    return {
      messages: [
        {
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Guide me through setting up a new ${projectType} project with Pohon. Here are available templates: ${JSON.stringify(templates, null, 2)}`,
          },
        },
      ],
    };
  },
});
