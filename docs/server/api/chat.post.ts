import { gateway } from '@ai-sdk/gateway';
import { convertToModelMessages, streamText } from 'ai';

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  return streamText({
    model: gateway('anthropic/claude-haiku-4.5'),
    system: 'You are a helpful assistant for Pohon UI, a UI library for Nuxt and Vue.',
    messages: await convertToModelMessages(messages),
  }).toUIMessageStreamResponse();
});
