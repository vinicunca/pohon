<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/th';

type ProseTh = ComponentConfig<typeof theme, AppConfig, 'th', 'ui.prose'>;

export interface ProseThProps {
  align?: 'left' | 'center' | 'right';
  class?: any;
  ui?: { base?: any };
}

export interface ProseThSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseThProps>();

defineSlots<ProseThSlots>();

const props = useComponentProps('prose.th', _props);

const appConfig = useAppConfig() as ProseTh['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.th || {}) }));
</script>

<template>
  <th :class="ui({ align: props.align, class: [props.ui?.base, props.class] })">
    <slot />
  </th>
</template>
