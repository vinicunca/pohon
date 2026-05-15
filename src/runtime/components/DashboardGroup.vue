<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { UseResizableProps } from '../composables/useResizable';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/dashboard-group';

type DashboardGroup = ComponentConfig<typeof theme, AppConfig, 'dashboardGroup'>;

export interface DashboardGroupProps extends Pick<UseResizableProps, 'storage' | 'storageKey' | 'storageOptions' | 'persistent' | 'unit'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: { base?: any };
}

export interface DashboardGroupSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed, ref } from 'vue';
import { useAppConfig, useNuxtApp } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { provideDashboardContext } from '../utils/dashboard';
import { uv } from '../utils/uv';

const _props = withDefaults(
  defineProps<DashboardGroupProps>(),
  {
    storage: 'cookie',
    storageKey: 'dashboard',
    persistent: true,
    unit: '%',
  },
);
defineSlots<DashboardGroupSlots>();

const props = useComponentProps('dashboardGroup', _props);

const nuxtApp = useNuxtApp();
const appConfig = useAppConfig() as DashboardGroup['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.dashboardGroup || {}) }));

const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);

provideDashboardContext({
  storage: props.storage,
  storageKey: props.storageKey,
  storageOptions: props.storageOptions,
  persistent: props.persistent,
  unit: props.unit,
  sidebarOpen,
  toggleSidebar: () => {
    nuxtApp.hooks.callHook('dashboard:sidebar:toggle');
  },
  sidebarCollapsed,
  collapseSidebar: (collapsed: boolean) => {
    nuxtApp.hooks.callHook('dashboard:sidebar:collapse', collapsed);
  },
  toggleSearch: () => {
    nuxtApp.hooks.callHook('dashboard:search:toggle');
  },
});
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
