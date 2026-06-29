<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ChatStatus, UIDataTypes, UIMessage, UITools } from 'ai';
import type { ComponentPublicInstance, VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { ButtonProps } from './Button.vue';
import type { ChatMessageProps, ChatMessageSlots } from './ChatMessage.vue';
import type { IconProps } from './Icon.vue';
import type { LinkPropsKeys } from './Link.vue';
import theme from '#build/ui/chat-messages';

type ChatMessages = ComponentConfig<typeof theme, AppConfig, 'chatMessages'>;

type MessageBase<T extends Array<UIMessage>>
  = T[number] extends UIMessage<infer M, infer D, infer U>
    ? UIMessage<M, D, U>
    : UIMessage<unknown, UIDataTypes, UITools>;

type PropsBase<T extends Array<UIMessage>>
  = MessageBase<T> extends UIMessage<infer M, infer D, infer U>
    ? ChatMessageProps<M, D, U>
    : never;

export interface ChatMessagesProps<T extends Array<UIMessage> = Array<UIMessage>> {
  messages?: T;
  status?: ChatStatus;
  /**
   * Whether to automatically scroll to the bottom when a message is streaming.
   * @defaultValue false
   */
  shouldAutoScroll?: boolean;
  /**
   * Whether to scroll to the bottom on mounted.
   * @defaultValue true
   */
  shouldScrollToBottom?: boolean;
  /**
   * Display an auto scroll button.
   * `{ size: 'md', color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   * @defaultValue true
   */
  autoScroll?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  /**
   * The icon displayed in the auto scroll button.
   * @defaultValue appConfig.ui.icons.arrowDown
   * @IconifyIcon
   */
  autoScrollIcon?: IconProps['name'];
  /**
   * The `user` messages props.
   * `{ side: 'right', variant: 'soft' }`{lang="ts-type"}
   */
  user?: Pick<PropsBase<T>, 'icon' | 'avatar' | 'variant' | 'side' | 'actions' | 'ui'>;
  /**
   * The `assistant` messages props.
   * `{ side: 'left', variant: 'naked' }`{lang="ts-type"}
   */
  assistant?: Pick<PropsBase<T>, 'icon' | 'avatar' | 'variant' | 'side' | 'actions' | 'ui'>;
  /**
   * Render the messages in a compact style.
   * This is done automatically when used inside a `PChatPalette`{lang="ts-type"}.
   * @defaultValue false
   */
  compact?: boolean;
  /**
   * The spacing offset for the last message in px. Can be useful when the prompt is sticky for example.
   * @defaultValue 0
   */
  spacingOffset?: number;
  class?: any;
  ui?: ChatMessages['slots'];
}

export type ChatMessagesSlots<T extends Array<UIMessage> = Array<UIMessage>> = {
  default?(props: { registerMessageRef: (id: string, element: ComponentPublicInstance | null) => void }): Array<VNode>;
  indicator?(props: { ui: ChatMessages['ui'] }): Array<VNode>;
  viewport?(props: { ui: ChatMessages['ui']; onClick: () => void }): Array<VNode>;
} & {
  [K in keyof ChatMessageSlots]?: NonNullable<ChatMessageSlots[K]> extends (props: infer P) => Array<VNode>
    ? (props: P & { message: MessageBase<T> }) => Array<VNode>
    : never
};
</script>

<script setup lang="ts" generic="T extends UIMessage[] = UIMessage[]">
import { useElementBounding, useEventListener, useMutationObserver, watchThrottled } from '@vueuse/core';
import { Presence } from 'akar';
import { defu } from 'defu';
import { computed, nextTick, onMounted, ref, toRef, watch } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PButton from './Button.vue';
import PChatMessage from './ChatMessage.vue';

const _props = withDefaults(
  defineProps<ChatMessagesProps<T>>(),
  {
    autoScroll: true,
    shouldAutoScroll: false,
    shouldScrollToBottom: true,
    spacingOffset: 0,
  },
);
const slots = defineSlots<ChatMessagesSlots<T>>();

const props = useComponentProps<ChatMessagesProps<T>>('chatMessages', _props);

const getProxySlots = () => omit(slots, ['default', 'indicator', 'viewport']);

const showIndicator = computed(() => {
  if (props.status === 'submitted') {
    return true;
  }
  if (props.status !== 'streaming') {
    return false;
  }

  const lastMessage = props.messages?.[props.messages.length - 1];
  return lastMessage?.role === 'assistant' && !lastMessage.parts?.length;
});

const appConfig = useAppConfig() as ChatMessages['AppConfig'];

const userProps = toRef(() => defu(props.user, { side: 'right' as const, variant: 'soft' as const }));
const assistantProps = toRef(() => defu(props.assistant, { side: 'left' as const, variant: 'naked' as const }));

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.chatMessages || {}) })({
  compact: props.compact,
}));

const el = ref<HTMLElement | null>(null);
const parent = ref<HTMLElement | null>(null);
const messagesRefs = ref(new Map<string, HTMLElement>());

const showAutoScroll = ref(false);
const lastMessageHeight = ref(0);
const lastMessageSubmitted = ref(false);
const lastScrollTop = ref(0);
const userScrolledUp = ref(false);

function registerMessageRef(id: string, element: ComponentPublicInstance | null) {
  const elInstance = element?.$el;
  if (elInstance) {
    messagesRefs.value.set(id, elInstance);
  }
}

function scrollToMessage(id: string) {
  const element = messagesRefs.value.get(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToBottom(smooth: boolean = true) {
  if (!parent.value) {
    return;
  }

  if (smooth) {
    parent.value.scrollTo({ top: parent.value.scrollHeight, behavior: 'smooth' });
  } else {
    parent.value.scrollTop = parent.value.scrollHeight;
  }
}

watchThrottled([() => props.messages, () => props.status], ([_, status]) => {
  if (!props.messages?.length) {
    showAutoScroll.value = false;
    userScrolledUp.value = false;
    lastScrollTop.value = 0;
    messagesRefs.value.clear();
    return;
  }

  if (status !== 'streaming') {
    return;
  }

  checkScrollPosition();
}, { deep: true, throttle: 50, leading: true });

watch(() => props.status, (status) => {
  if (status !== 'submitted') {
    return;
  }

  const lastMessage = props.messages?.[props.messages.length - 1];
  if (!lastMessage || lastMessage.role !== 'user') {
    return;
  }

  userScrolledUp.value = false;

  nextTick(() => {
    lastMessageSubmitted.value = true;

    updateLastMessageHeight();

    nextTick(() => {
      scrollToMessage(lastMessage.id);
    });
  });
});

function checkScrollPosition() {
  if (!parent.value) {
    return;
  }

  const scrollPosition = parent.value.scrollTop + parent.value.clientHeight;
  const scrollHeight = parent.value.scrollHeight;
  const threshold = 100;

  showAutoScroll.value = (scrollHeight - scrollPosition) >= threshold;

  // Detect user scrolling up
  if (parent.value.scrollTop < lastScrollTop.value) {
    userScrolledUp.value = true;
  } else if ((scrollHeight - scrollPosition) < threshold) {
    userScrolledUp.value = false;
  }

  lastScrollTop.value = parent.value.scrollTop;
}

function onAutoScrollClick() {
  userScrolledUp.value = false;
  scrollToBottom();
}

function getScrollParent(node: HTMLElement | null): HTMLElement {
  if (!node) {
    return document.documentElement;
  }

  const overflowRegex = /auto|scroll/;

  let current: HTMLElement | null = node;
  while (current && current !== document.body && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    if (overflowRegex.test(style.overflowY)) {
      return current;
    }

    current = current.parentElement;
  }

  return document.documentElement;
}

function updateLastMessageHeight() {
  if (!el.value || !parent.value || !props.messages?.length || !lastMessageSubmitted.value) {
    return;
  }

  const { height: parentHeight } = useElementBounding(parent.value);

  const lastMessage = props.messages.findLast((m) => m.role === 'user');
  if (!lastMessage) {
    return;
  }

  const lastMessageEl = messagesRefs.value.get(lastMessage.id);
  if (!lastMessageEl) {
    return;
  }

  let spacingOffset = props.spacingOffset || 0;
  const elComputedStyle = window.getComputedStyle(el.value);
  const parentComputedStyle = window.getComputedStyle(parent.value);

  spacingOffset += Number.parseFloat(elComputedStyle.rowGap) || Number.parseFloat(elComputedStyle.gap) || 0;
  spacingOffset += Number.parseFloat(parentComputedStyle.paddingTop) || 0;
  spacingOffset += Number.parseFloat(parentComputedStyle.paddingBottom) || 0;

  lastMessageHeight.value = Math.max(parentHeight.value - lastMessageEl.offsetHeight - spacingOffset, 0);
}

onMounted(() => {
  // Find first scrollable parent element
  parent.value = getScrollParent(el.value);
  if (!parent.value) {
    return;
  }

  lastScrollTop.value = parent.value.scrollTop;

  if (props.shouldScrollToBottom) {
    // Scroll to bottom immediately to avoid flash, then again after a delay to account for async content
    scrollToBottom(false);
    setTimeout(() => {
      scrollToBottom(false);
    }, 100);
  } else {
    nextTick(() => {
      checkScrollPosition();
    });
  }

  // Add event listener to check scroll position to show the auto scroll button
  useEventListener(parent, 'scroll', checkScrollPosition);

  // Add event listener to update the last message height when the window is resized
  useEventListener(window, 'resize', () => nextTick(updateLastMessageHeight));

  // Watch for DOM changes (e.g. async code block rendering) and scroll to bottom
  if (el.value) {
    useMutationObserver(el, () => {
      if (props.shouldAutoScroll && props.status === 'streaming' && !userScrolledUp.value) {
        scrollToBottom(false);
      }
    }, { childList: true, subtree: true });
  }
});

defineExpose({
  registerMessageRef,
});
</script>

<template>
  <div
    ref="el"
    :data-status="props.status"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="{ '--last-message-height': `${lastMessageHeight}px` }"
  >
    <slot :register-message-ref="registerMessageRef">
      <template v-for="message in props.messages" :key="message.id">
        <PChatMessage
          v-if="message.parts?.length"
          v-bind="{ ...(message.role === 'user' ? userProps : assistantProps), ...message }"
          :ref="el => registerMessageRef(message.id, el as ComponentPublicInstance)"
          :compact="props.compact"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
            <slot :name="name" v-bind="{ ...(slotData as any), message }" />
          </template>
        </PChatMessage>
      </template>
    </slot>

    <PChatMessage
      v-if="showIndicator"
      id="indicator"
      role="assistant"
      v-bind="{ ...assistantProps, actions: undefined, parts: [] }"
      :compact="props.compact"
    >
      <template #content>
        <slot name="indicator" :ui="ui">
          <div data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })">
            <span />
            <span />
            <span />
          </div>
        </slot>
      </template>
    </PChatMessage>

    <Presence :present="showAutoScroll">
      <div :data-state="showAutoScroll ? 'open' : 'closed'" data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
        <slot name="viewport" :ui="ui" :on-click="onAutoScrollClick">
          <PButton
            v-if="props.autoScroll"
            :icon="props.autoScrollIcon || appConfig.ui.icons.arrowDown"
            color="neutral"
            variant="outline"
            v-bind="(typeof props.autoScroll === 'object' ? props.autoScroll : {})"
            data-slot="autoScroll"
            :class="ui.autoScroll({ class: props.ui?.autoScroll })"
            @click="onAutoScrollClick"
          />
        </slot>
      </div>
    </Presence>
  </div>
</template>
