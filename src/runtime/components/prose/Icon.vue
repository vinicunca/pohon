<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/icon';

type ProseIcon = ComponentConfig<typeof theme, AppConfig, 'icon', 'ui.prose'>;

export interface ProseIconProps {
  name: string;
  class?: any;
  ui?: { base?: any };
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PIcon from '../Icon.vue';

const _props = defineProps<ProseIconProps>();

const props = useComponentProps('prose.icon', _props);

const appConfig = useAppConfig() as ProseIcon['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.icon || {}) }));
</script>

<template>
  <PIcon :name="props.name" :class="ui({ class: [props.ui?.base, props.class] })" />
</template>
