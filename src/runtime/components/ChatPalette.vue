<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/chat-palette';

type ChatPalette = ComponentConfig<typeof theme, AppConfig, 'chatPalette'>;

export interface ChatPaletteProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: ChatPalette['slots'];
}

export interface ChatPaletteSlots {
  default?(props?: {}): Array<VNode>;
  prompt?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive, Slot } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

const _props = defineProps<ChatPaletteProps>();
const slots = defineSlots<ChatPaletteSlots>();

const props = useComponentProps('chatPalette', _props);

const appConfig = useAppConfig() as ChatPalette['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.chatPalette || {}) })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <Slot compact>
        <slot />
      </Slot>
    </div>

    <Slot v-if="!!slots.prompt" data-slot="prompt" :class="ui.prompt({ class: props.ui?.prompt })">
      <slot name="prompt" />
    </Slot>
  </Primitive>
</template>
