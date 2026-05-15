<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/badge';

type ProseBadge = ComponentConfig<typeof theme, AppConfig, 'badge', 'ui.prose'>;

export interface ProseBadgeProps {
  class?: any;
  ui?: { base?: any };
}

export interface ProseBadgeSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PBadge from '../Badge.vue';

const _props = defineProps<ProseBadgeProps>();

defineSlots<ProseBadgeSlots>();

const props = useComponentProps('prose.badge', _props);

const appConfig = useAppConfig() as ProseBadge['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.badge || {}) }));
</script>

<template>
  <PBadge color="primary" variant="subtle" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot mdc-unwrap="p" />
  </PBadge>
</template>
