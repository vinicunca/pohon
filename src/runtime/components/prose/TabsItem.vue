<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/tabs-item';

type ProseTabsItem = ComponentConfig<typeof theme, AppConfig, 'tabsItem', 'ui.prose'>;

export interface ProseTabsItemProps {
  label: string;
  description?: string;
  class?: any;
  ui?: { base?: any };
}

export interface ProseTabsItemSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseTabsItemProps>();

defineSlots<ProseTabsItemSlots>();

const props = useComponentProps('prose.tabsItem', _props);

const appConfig = useAppConfig() as ProseTabsItem['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.tabsItem || {}) }));
</script>

<template>
  <div :class="ui({ class: [props.ui?.base, props.class] })">
    <slot>
      {{ props.description }}
    </slot>
  </div>
</template>
