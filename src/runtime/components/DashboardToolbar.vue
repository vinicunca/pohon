<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/dashboard-toolbar';

type DashboardToolbar = ComponentConfig<typeof theme, AppConfig, 'dashboardToolbar'>;

export interface DashboardToolbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: DashboardToolbar['slots'];
}

export interface DashboardToolbarSlots {
  default?(props?: {}): Array<VNode>;
  left?(props?: {}): Array<VNode>;
  right?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

const _props = defineProps<DashboardToolbarProps>();

defineSlots<DashboardToolbarSlots>();

const props = useComponentProps('dashboardToolbar', _props);

const appConfig = useAppConfig() as DashboardToolbar['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.dashboardToolbar || {}) })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot>
      <div data-slot="left" :class="ui.left({ class: [props.ui?.left] })">
        <slot name="left" />
      </div>

      <div data-slot="right" :class="ui.right({ class: [props.ui?.right] })">
        <slot name="right" />
      </div>
    </slot>
  </Primitive>
</template>
