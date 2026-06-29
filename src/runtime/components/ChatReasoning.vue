<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { CollapsibleRootProps } from 'akar';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { ChatShimmerProps } from './ChatShimmer.vue';
import type { IconProps } from './Icon.vue';
import theme from '#build/ui/chat-reasoning';

type ChatReasoning = ComponentConfig<typeof theme, AppConfig, 'chatReasoning'>;

export interface ChatReasoningProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The reasoning text content to display.
   */
  text?: string;
  /**
   * Whether the reasoning content is currently streaming.
   * @defaultValue false
   */
  streaming?: boolean;
  /**
   * The duration in seconds that the AI spent reasoning.
   * If not provided, it will be calculated automatically based on streaming time.
   */
  duration?: number;
  /**
   * The icon displayed next to the trigger.
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  /**
   * The position of the chevron icon.
   * @defaultValue 'trailing'
   */
  chevron?: 'leading' | 'trailing';
  /**
   * The icon displayed as the chevron.
   * @defaultValue appConfig.ui.icons.chevronDown
   * @IconifyIcon
   */
  chevronIcon?: IconProps['name'];
  /**
   * The delay in milliseconds before auto-closing when streaming ends.
   * Set to `0` to disable auto-close.
   * @defaultValue 500
   */
  autoCloseDelay?: number;
  /**
   * Customize the [`ChatShimmer`](https://pohon.vinicunca.dev/docs/components/chat-shimmer) component when streaming.
   */
  shimmer?: Partial<Omit<ChatShimmerProps, 'text'>>;
  class?: any;
  ui?: ChatReasoning['slots'];
}

export interface ChatReasoningEmits {
  'update:open': [value: boolean];
}

export interface ChatReasoningSlots {
  default?(props: { open: boolean }): Array<VNode>;
}
</script>

<script setup lang="ts">
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'akar';
import { computed, nextTick, onUnmounted, ref, useTemplateRef, watch } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useLocale } from '../composables/useLocale';
import { useScrollShadow } from '../composables/useScrollShadow';
import { uv } from '../utils/uv';
import PChatShimmer from './ChatShimmer.vue';
import PIcon from './Icon.vue';

const _props = withDefaults(
  defineProps<ChatReasoningProps>(),
  {
    open: undefined,
    streaming: false,
    chevron: 'trailing',
    unmountOnHide: false,
    autoCloseDelay: 500,
  },
);
const emits = defineEmits<ChatReasoningEmits>();

defineSlots<ChatReasoningSlots>();

const props = useComponentProps('chatReasoning', _props);

const { t, code } = useLocale();
const appConfig = useAppConfig() as ChatReasoning['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.chatReasoning || {}) })({
  chevron: props.chevron,
}));

const isControlled = computed(() => props.open !== undefined);
const internalOpen = ref(props.defaultOpen ?? props.streaming);
const startTime = ref<number | null>(props.streaming ? Date.now() : null);
const internalDuration = ref<number | undefined>(undefined);
const autoCloseTimeout = ref<ReturnType<typeof setTimeout> | null>(null);

watch(() => props.streaming, (streaming, wasStreaming) => {
  if (streaming) {
    if (autoCloseTimeout.value) {
      clearTimeout(autoCloseTimeout.value);
      autoCloseTimeout.value = null;
    }
    if (!wasStreaming) {
      setOpen(true);
      startTime.value = Date.now();
    }
  } else if (wasStreaming) {
    if (startTime.value !== null) {
      internalDuration.value = Math.ceil((Date.now() - startTime.value) / 1000);
      startTime.value = null;
    }
    if (props.autoCloseDelay > 0) {
      autoCloseTimeout.value = setTimeout(() => {
        setOpen(false);
      }, props.autoCloseDelay);
    }
  }
}, { immediate: true });

const actualDuration = computed(() => props.duration ?? internalDuration.value);

const thinkingText = computed(() => {
  if (props.streaming || actualDuration.value === 0) {
    return t('chatReasoning.thinking');
  }
  if (actualDuration.value === undefined) {
    return t('chatReasoning.thought');
  }

  const d = actualDuration.value;
  const unit = d < 60 ? 'second' : 'minute';
  const value = d < 60 ? d : Math.floor(d / 60);
  const duration = new Intl.NumberFormat(code.value, { style: 'unit', unit, unitDisplay: 'long' }).format(value);

  return t('chatReasoning.thoughtFor', { duration });
});

const resolvedOpen = computed(() => isControlled.value ? props.open : internalOpen.value);

function setOpen(value: boolean) {
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value);
    autoCloseTimeout.value = null;
  }
  internalOpen.value = value;
  emits('update:open', value);
}

onUnmounted(() => {
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value);
  }
});

const hasContent = computed(() => !!props.text || props.streaming);

const chevronIconName = computed(() => props.chevronIcon || appConfig.ui.icons?.chevronDown);

const bodyRef = useTemplateRef('bodyRef');
const { style: scrollShadowStyle } = useScrollShadow(bodyRef);

watch(() => props.text, () => {
  if (!props.streaming || !bodyRef.value) {
    return;
  }

  const el = bodyRef.value;
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;

  if (distanceFromBottom < 50) {
    nextTick(() => {
      el.scrollTop = el.scrollHeight;
    });
  }
});
</script>

<template>
  <CollapsibleRoot
    v-if="hasContent"
    v-slot="{ open: isOpen }"
    :open="resolvedOpen"
    :disabled="props.disabled"
    :unmount-on-hide="props.unmountOnHide"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:open="setOpen"
  >
    <CollapsibleTrigger as-child :disabled="!hasContent">
      <button
        type="button"
        data-slot="trigger"
        :class="ui.trigger({ class: props.ui?.trigger })"
      >
        <span v-if="props.icon || (hasContent && props.chevron === 'leading')" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
          <PIcon
            v-if="props.icon"
            :name="props.icon"
            data-slot="leadingIcon"
            :class="ui.leadingIcon({ class: props.ui?.leadingIcon, alone: !(hasContent && props.chevron === 'leading') })"
          />
          <PIcon
            v-if="hasContent && props.chevron === 'leading'"
            :name="chevronIconName"
            data-slot="chevronIcon"
            :class="ui.chevronIcon({ class: props.ui?.chevronIcon, alone: !props.icon })"
          />
        </span>

        <PChatShimmer v-if="props.streaming" :text="thinkingText" v-bind="props.shimmer" data-slot="label" :class="ui.label({ class: props.ui?.label })" />
        <span v-else data-slot="label" :class="ui.label({ class: props.ui?.label })">{{ thinkingText }}</span>

        <PIcon
          v-if="hasContent && props.chevron === 'trailing'"
          :name="chevronIconName"
          data-slot="trailingIcon"
          :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
        />
      </button>
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <div ref="bodyRef" data-slot="body" :class="ui.body({ class: props.ui?.body })" :style="scrollShadowStyle">
        <slot :open="isOpen">
          {{ props.text }}
        </slot>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
