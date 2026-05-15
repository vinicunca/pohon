<script setup lang="ts">
import type { UIMessage } from 'ai';
import { Chat } from '@ai-sdk/vue';
import { Comark } from '@comark/vue';
import highlight from '@comark/vue/plugins/highlight';
import { getToolName, isReasoningUIPart, isTextUIPart, isToolUIPart } from 'ai';
import { isPartStreaming, isToolStreaming } from 'pohon-ui/utils/ai';

const toast = useToast();

const messages: Array<UIMessage> = [];
const input = ref('');

const chat = new Chat({
  messages,
  onError(error) {
    let message = error.message;
    try {
      if (typeof message === 'string' && message[0] === '{') {
        message = JSON.parse(message).message || message;
      }
    } catch { /* keep original */ }

    toast.add({
      description: message,
      icon: 'i-lucide-alert-circle',
      color: 'error',
      duration: 0,
    });
  },
});

function onSubmit() {
  if (!input.value.trim()) {
    return;
  }

  chat.sendMessage({ text: input.value });

  input.value = '';
}

function clearMessages() {
  if (chat.status === 'streaming') {
    chat.stop();
  }
  chat.messages = [];
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  return `https://www.google.com/s2/favicons?sz=32&domain=${getDomain(url)}`;
}
</script>

<template>
  <PDashboardNavbar class="border-b-0 inset-x-0 top-0 absolute z-5 lg:pointer-events-none">
    <template #right>
      <PButton
        v-if="chat.messages.length"
        icon="i-lucide-list-x"
        color="neutral"
        variant="ghost"
        class="pointer-events-auto"
        @click="clearMessages"
      />
    </template>
  </PDashboardNavbar>

  <div class="mx-auto flex flex-1 flex-col gap-4 max-w-xl min-h-0 w-full sm:gap-6">
    <PChatMessages
      should-auto-scroll
      :messages="chat.messages"
      :status="chat.status"
      :spacing-offset="72"
      :assistant="{ actions: [{ label: 'Edit', icon: 'i-lucide-pencil', onClick: () => console.log('edit') }] }"
    >
      <template #content="{ message }">
        <template
          v-for="(part, index) in message.parts"
          :key="`${message.id}-${part.type}-${index}`"
        >
          <PChatReasoning
            v-if="isReasoningUIPart(part)"
            :text="part.text"
            :streaming="isPartStreaming(part)"
            chevron="leading"
          >
            <Comark
              :markdown="part.text"
              :streaming="isPartStreaming(part)"
              :plugins="[highlight()]"
              class="*:first:mt-0 *:last:mb-0"
            />
          </PChatReasoning>

          <template v-else-if="isTextUIPart(part)">
            <Comark
              v-if="message.role === 'assistant'"
              :markdown="part.text"
              :streaming="isPartStreaming(part)"
              :plugins="[highlight()]"
              class="*:first:mt-0 *:last:mb-0"
            />
            <p
              v-else-if="message.role === 'user'"
              class="whitespace-pre-wrap"
            >
              {{ part.text }}
            </p>
          </template>

          <PChatTool
            v-else-if="isToolUIPart(part) && getToolName(part) === 'web_search'"
            :text="isToolStreaming(part) ? 'Searching the web...' : 'Searched the web'"
            :suffix="(part.input as { query?: string })?.query"
            :streaming="isToolStreaming(part)"
            chevron="leading"
          >
            <div
              v-if="part.output && (part.output as any[]).length"
              class="border-default p-1 border rounded-md max-h-40 overflow-y-auto"
            >
              <a
                v-for="source in (part.output as any[])"
                :key="source.url"
                :href="source.url"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-default hover:bg-elevated/50 text-sm color-text-muted px-2 py-1 rounded-md flex gap-2 min-w-0 transition-colors items-center"
              >
                <img
                  :src="getFaviconUrl(source.url)"
                  :alt="getDomain(source.url)"
                  class="rounded-sm shrink-0 size-4"
                  loading="lazy"
                  @error="($event.target as HTMLImageElement).style.display = 'none'"
                >
                <span class="truncate">{{ source.title || source.url }}</span>
                <span class="text-dimmed text-xs ms-auto shrink-0">{{ getDomain(source.url) }}</span>
              </a>
            </div>
          </PChatTool>
        </template>
      </template>
    </PChatMessages>

    <PChatPrompt
      v-model="input"
      :error="chat.error"
      variant="subtle"
      class="bottom-0 sticky"
      @submit="onSubmit"
    >
      <PChatPromptSubmit
        :status="chat.status"
        @stop="chat.stop()"
        @reload="chat.regenerate()"
      />
    </PChatPrompt>
  </div>
</template>
