<script setup lang="ts">
import type { ChatStatus, UIMessage } from 'ai';

const colors: Array<'neutral' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error'> = ['neutral', 'primary', 'secondary', 'success', 'info', 'warning', 'error'];
const messageVariants: Array<'naked' | 'solid' | 'outline' | 'soft' | 'subtle'> = ['naked', 'solid', 'outline', 'soft', 'subtle'];
const promptVariants: Array<'outline' | 'soft' | 'subtle'> = ['outline', 'soft', 'subtle'];

const messageColor = ref<(typeof colors)[number]>('primary');
const messageVariant = ref<(typeof messageVariants)[number]>('soft');
const promptColor = ref<(typeof colors)[number]>('primary');
const promptVariant = ref<(typeof promptVariants)[number]>('subtle');
const compact = ref(false);
const showIndicator = ref(false);
const toolLoading = ref(false);
const toolStreaming = ref(false);
const reasoningStreaming = ref(false);
const toolOpen = ref(false);
const reasoningOpen = ref(true);
const shimmerDuration = ref(2);
const shimmerSpread = ref(2);
const animationKey = ref(0);
const input = ref('');

const messages = computed<Array<UIMessage>>(() => [
  { id: 'prompt', role: 'user', parts: [{ type: 'text', text: 'Show me how the selected message treatment feels.' }] },
  { id: 'reply', role: 'assistant', parts: [{ type: 'text', text: 'Every control on this page is passed directly to a chat component.' }] },
]);

const status = computed<ChatStatus>(() => showIndicator.value ? 'submitted' : 'ready');

function replayAnimations() {
  animationKey.value += 1;
  showIndicator.value = false;
  toolLoading.value = false;
  toolStreaming.value = false;
  reasoningStreaming.value = false;
  toolOpen.value = false;
  reasoningOpen.value = false;

  nextTick(() => {
    showIndicator.value = true;
    toolLoading.value = true;
    toolStreaming.value = true;
    reasoningStreaming.value = true;
    toolOpen.value = true;
    reasoningOpen.value = true;
  });
}

function submit() {
  input.value = '';
}
</script>

<template>
  <Navbar>
    <PButton
      label="Replay animations"
      icon="i-lucide-play"
      color="neutral"
      variant="outline"
      @click="replayAnimations"
    />
    <PSwitch
      v-model="compact"
      label="Compact"
    />
    <PSwitch
      v-model="showIndicator"
      label="Typing"
    />
  </Navbar>

  <div class="px-4 py-6 gap-4 grid max-w-5xl w-full lg:grid-cols-[16rem_minmax(0,1fr)]">
    <aside class="flex flex-col gap-4">
      <PFormField label="Message color">
        <PSelect
          v-model="messageColor"
          :items="colors"
        />
      </PFormField>
      <PFormField label="Message variant">
        <PSelect
          v-model="messageVariant"
          :items="messageVariants"
        />
      </PFormField>
      <PFormField label="Prompt color">
        <PSelect
          v-model="promptColor"
          :items="colors"
        />
      </PFormField>
      <PFormField label="Prompt variant">
        <PSelect
          v-model="promptVariant"
          :items="promptVariants"
        />
      </PFormField>
      <PFormField
        label="Shimmer duration"
        orientation="horizontal"
      >
        <PInputNumber
          v-model="shimmerDuration"
          :min="0.5"
          :step="0.5"
          class="w-24"
        />
      </PFormField>
      <PFormField
        label="Shimmer spread"
        orientation="horizontal"
      >
        <PInputNumber
          v-model="shimmerSpread"
          :min="0"
          :step="1"
          class="w-24"
        />
      </PFormField>

      <PSeparator />

      <PSwitch
        v-model="toolLoading"
        label="Tool spin"
      />
      <PSwitch
        v-model="toolStreaming"
        label="Tool shimmer"
      />
      <PSwitch
        v-model="toolOpen"
        label="Tool collapse"
      />
      <PSwitch
        v-model="reasoningStreaming"
        label="Reasoning shimmer"
      />
      <PSwitch
        v-model="reasoningOpen"
        label="Reasoning collapse"
      />
    </aside>

    <PChatPalette
      :key="animationKey"
      class="rounded-lg min-h-[38rem] ring ring-ring overflow-hidden"
    >
      <PChatMessages
        :messages="messages"
        :status="status"
        :assistant="{ icon: 'i-lucide-sparkles', color: 'neutral', variant: 'naked' }"
        :user="{ color: messageColor, variant: messageVariant, side: 'right' }"
        :compact="compact"
      >
        <template #content="{ message }">
          <template v-if="message.id === 'reply'">
            <PChatReasoning
              v-model:open="reasoningOpen"
              text="Comparing the trigger, shimmer label, chevron rotation, and collapsible content."
              icon="i-lucide-brain"
              chevron="leading"
              :streaming="reasoningStreaming"
              :shimmer="{ duration: shimmerDuration, spread: shimmerSpread }"
            >
              The reasoning surface uses the same collapsible animation as the tool, with a separate shimmer label while streaming.
            </PChatReasoning>

            <p class="mt-4">
              Every control is passed directly to a chat component, so you can inspect the classes from <code>theme.chats.ts</code> in context.
            </p>

            <PChatTool
              v-model:open="toolOpen"
              class="mt-4"
              text="Inspect theme classes"
              suffix="theme.chats.ts"
              icon="i-lucide-palette"
              chevron="leading"
              variant="card"
              :loading="toolLoading"
              :streaming="toolStreaming"
              :shimmer="{ duration: shimmerDuration, spread: shimmerSpread }"
              :actions="[{ label: 'Approve', color: 'primary' }, { label: 'Deny', color: 'neutral', variant: 'soft' }]"
            >
              Toggle this section to inspect the <code>animate-collapsible-up</code> and <code>animate-collapsible-down</code> classes.
            </PChatTool>
          </template>
          <template v-else>
            {{ message.parts[0]?.type === 'text' ? message.parts[0].text : '' }}
          </template>
        </template>
      </PChatMessages>

      <template #prompt>
        <PChatPrompt
          v-model="input"
          :color="promptColor"
          :variant="promptVariant"
          placeholder="Focus here to inspect the prompt highlight…"
          @submit="submit"
        >
          <PChatPromptSubmit :color="promptColor" />
        </PChatPrompt>
      </template>
    </PChatPalette>
  </div>
</template>
