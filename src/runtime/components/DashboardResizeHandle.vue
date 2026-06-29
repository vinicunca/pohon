<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/dashboard-resize-handle';

type DashboardResizeHandle = ComponentConfig<typeof theme, AppConfig, 'dashboardResizeHandle'>;

export interface DashboardResizeHandleProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: { base?: any };
}

export interface DashboardResizeHandleSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

const _props = defineProps<DashboardResizeHandleProps>();

defineSlots<DashboardResizeHandleSlots>();

const props = useComponentProps('dashboardResizeHandle', _props);

const appConfig = useAppConfig() as DashboardResizeHandle['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.dashboardResizeHandle || {}) }));
</script>

<template>
  <Primitive
    :as="props.as"
    role="separator"
    :class="ui({ class: [props.ui?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
