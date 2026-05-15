<script setup lang="ts">
import type { UIMessage } from 'ai';
import { Chat } from '@ai-sdk/vue';
import { Comark } from '@comark/vue';
import highlight from '@comark/vue/plugins/highlight';
import { isTextUIPart } from 'ai';
import { isPartStreaming } from 'pohon-ui/utils/ai';

const open = ref(true);
const input = ref('');

const messages: Array<UIMessage> = [
  {
    id: '1',
    role: 'user',
    parts: [{ type: 'text', text: 'What is Pohon UI?' }],
  },
  {
    id: '2',
    role: 'assistant',
    parts: [{ type: 'text', text: 'Pohon UI is a Vue component library built on Akar, UnoCSS, and UnoCss Variants. It provides 125+ accessible components for building modern web apps.' }],
  },
];

const chat = new Chat({
  messages,
});

function onSubmit() {
  if (!input.value.trim()) {
    return;
  }

  chat.sendMessage({ text: input.value });

  input.value = '';
}

const ui = {
  prose: {
    p: { base: 'my-2 text-sm/6' },
    li: { base: 'my-0.5 text-sm/6' },
    ul: { base: 'my-2' },
    ol: { base: 'my-2' },
    h1: { base: 'text-xl mb-4' },
    h2: { base: 'text-lg mt-6 mb-3' },
    h3: { base: 'text-base mt-4 mb-2' },
    h4: { base: 'text-sm mt-3 mb-1.5' },
    code: { base: 'text-xs' },
    pre: { root: 'my-2', base: 'text-xs/5' },
    table: { root: 'my-2' },
    hr: { base: 'my-4' },
  },
};
</script>

<template>
  <div class="flex flex-1">
    <div class="flex flex-1 flex-col">
      <div class="border-default px-4 border-b flex shrink-0 h-$ui-header-height items-center justify-end">
        <PButton
          icon="i-lucide-panel-right"
          color="neutral"
          variant="ghost"
          aria-label="Toggle sidebar"
          @click="open = !open"
        />
      </div>

      <div class="p-4 flex-1">
        <Placeholder class="size-full" />
      </div>
    </div>

    <PSidebar
      v-model:open="open"
      side="right"
      title="AI Chat"
      close
      :style="{ '--sidebar-width': '20rem' }"
      :ui="{ container: 'h-full' }"
    >
      <PTheme :ui="ui">
        <PChatMessages
          :messages="chat.messages"
          :status="chat.status"
          compact
          class="px-0"
        >
          <template #content="{ message }">
            <template
              v-for="(part, index) in message.parts"
              :key="`${message.id}-${part.type}-${index}`"
            >
              <template v-if="isTextUIPart(part)">
                <Comark
                  v-if="message.role === 'assistant'"
                  :markdown="part.text"
                  :streaming="isPartStreaming(part)"
                  :plugins="[highlight()]"
                  class="*:first:mt-0 *:last:mb-0"
                />
                <p
                  v-else-if="message.role === 'user'"
                  class="text-sm/6 whitespace-pre-wrap"
                >
                  {{ part.text }}
                </p>
              </template>
            </template>
          </template>
        </PChatMessages>
      </PTheme>

      <template #footer>
        <PChatPrompt
          v-model="input"
          :error="chat.error"
          :autofocus="false"
          variant="subtle"
          size="sm"
          :ui="{ base: 'px-0' }"
          @submit="onSubmit"
        >
          <PChatPromptSubmit
            size="sm"
            :status="chat.status"
            @stop="chat.stop()"
            @reload="chat.regenerate()"
          />
        </PChatPrompt>
      </template>
    </PSidebar>
  </div>
</template>
