<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/accordion-item';

type ProseAccordionItem = ComponentConfig<typeof theme, AppConfig, 'accordionItem', 'ui.prose'>;

export interface ProseAccordionItemProps {
  label: string;
  description?: string;
  class?: any;
  ui?: { base?: any };
}

export interface ProseAccordionItemSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseAccordionItemProps>();

defineSlots<ProseAccordionItemSlots>();

const props = useComponentProps('prose.accordionItem', _props);

const appConfig = useAppConfig() as ProseAccordionItem['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.accordionItem || {}) }));
</script>

<template>
  <div :class="ui({ class: [props.ui?.base, props.class] })">
    <slot>
      {{ props.description }}
    </slot>
  </div>
</template>
