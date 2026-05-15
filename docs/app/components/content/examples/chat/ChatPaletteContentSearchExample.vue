<script setup lang="ts">
import type { UIMessage } from 'ai';
import { Chat } from '@ai-sdk/vue';
import { Comark } from '@comark/vue';
import highlight from '@comark/vue/plugins/highlight';
import { isTextUIPart } from 'ai';
import { isPartStreaming } from 'pohon-ui/utils/ai';

const messages: Array<UIMessage> = [];
const input = ref('');

const ai = ref(false);
const searchTerm = ref('');

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

function onClose(e: Event) {
  e.preventDefault();

  ai.value = false;
}

const groups = computed(() => [{
  id: 'ai',
  ignoreFilter: true,
  items: [{
    label: searchTerm.value ? `Ask AI for “${searchTerm.value}”` : 'Ask AI',
    icon: 'i-lucide-bot',
    onSelect: (e: any) => {
      e.preventDefault();

      ai.value = true;

      if (searchTerm.value) {
        messages.push({
          id: '1',
          role: 'user',
          parts: [{ type: 'text', text: searchTerm.value }],
        });

        chat.regenerate();
      }
    },
  }],
}]);

const ui = {
  prose: {
    p: { base: 'my-2 leading-6' },
    li: { base: 'my-0.5 leading-6' },
    ul: { base: 'my-2' },
    ol: { base: 'my-2' },
    h1: { base: 'text-xl my-2' },
    h2: { base: 'text-lg my-2' },
    h3: { base: 'text-base my-2' },
    h4: { base: 'text-sm my-2' },
    pre: { root: 'my-2' },
    table: { root: 'my-2' },
    hr: { base: 'my-2' },
  },
};
</script>

<template>
  <PContentSearch
    v-model:search-term="searchTerm"
    open
    :groups="groups"
  >
    <template
      v-if="ai"
      #content
    >
      <PTheme :ui="ui">
        <PChatPalette>
          <PChatMessages
            :messages="chat.messages"
            :status="chat.status"
            :user="{ side: 'left', variant: 'naked', avatar: { src: 'https://github.com/benjamincanac.png', loading: 'lazy' as const } }"
            :assistant="{ icon: 'i-lucide-bot' }"
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
                    class="leading-6 whitespace-pre-wrap"
                  >
                    {{ part.text }}
                  </p>
                </template>
              </template>
            </template>
          </PChatMessages>

          <template #prompt>
            <PChatPrompt
              v-model="input"
              icon="i-lucide-search"
              variant="naked"
              :error="chat.error"
              @submit="onSubmit"
              @close="onClose"
            />
          </template>
        </PChatPalette>
      </PTheme>
    </template>
  </PContentSearch>
</template>
