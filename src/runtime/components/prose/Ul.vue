<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/ul';

type ProseUl = ComponentConfig<typeof theme, AppConfig, 'ul', 'ui.prose'>;

export interface ProseUlProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseUlSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseUlProps>();

defineSlots<ProseUlSlots>();

const props = useComponentProps('prose.ul', _props);

const appConfig = useAppConfig() as ProseUl['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.ul || {}) }));
</script>

<template>
  <ul :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </ul>
</template>
