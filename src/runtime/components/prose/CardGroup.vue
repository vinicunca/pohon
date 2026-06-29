<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/card-group';

type ProseCardGroup = ComponentConfig<typeof theme, AppConfig, 'cardGroup', 'ui.prose'>;

export interface ProseCardGroupProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseCardGroupSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseCardGroupProps>();

defineSlots<ProseCardGroupSlots>();

const props = useComponentProps('prose.cardGroup', _props);

const appConfig = useAppConfig() as ProseCardGroup['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.cardGroup || {}) }));
</script>

<template>
  <div :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </div>
</template>
