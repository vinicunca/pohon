import type { GatewayProviderOptions } from '@ai-sdk/gateway';
import { convertToModelMessages, createUIMessageStreamResponse, streamText, toUIMessageStream } from 'ai';

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  const result = streamText({
    model: 'anthropic/claude-haiku-4.5',
    instructions: 'You are a helpful assistant for Pohon, a UI library for Nuxt and Vue.',
    messages: await convertToModelMessages(messages),
    providerOptions: {
      gateway: {
        caching: 'auto',
        user: getChatUser(event),
        tags: ['docs-chat-example'],
      } satisfies GatewayProviderOptions,
    },
  });

  const stream = toUIMessageStream({ stream: result.stream });
  return createUIMessageStreamResponse({ stream });
});
