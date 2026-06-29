<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import type { ButtonProps } from './Button.vue';
import type { LinkPropsKeys } from './Link.vue';
import theme from '#build/ui/dashboard-sidebar-toggle';

type DashboardSidebarToggle = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebarToggle'>;

export interface DashboardSidebarToggleProps extends Omit<ButtonProps, LinkPropsKeys | 'color' | 'variant'> {
  /**
   * @defaultValue 'neutral'
   */
  color?: ButtonProps['color'];
  /**
   * @defaultValue 'ghost'
   */
  variant?: ButtonProps['variant'];
  /**
   * The side of the sidebar to toggle.
   * @defaultValue 'left'
   */
  side?: 'left' | 'right';
  ui?: { base?: any };
}
</script>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { computed, ref } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useForwardProps } from '../composables/useForwardProps';
import { useLocale } from '../composables/useLocale';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PButton from './Button.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<DashboardSidebarToggleProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
    side: 'left',
  },
);

const props = useComponentProps('dashboardSidebarToggle', _props);

const buttonProps = useForwardProps(reactiveOmit(props, 'icon', 'side', 'class'));

const { t } = useLocale();
const appConfig = useAppConfig() as DashboardSidebarToggle['AppConfig'];
const { sidebarOpen, toggleSidebar } = useDashboard({ sidebarOpen: ref(false), toggleSidebar: () => {} });

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.dashboardSidebarToggle || {}) }));
</script>

<template>
  <PButton
    v-bind="{
      ...buttonProps,
      'icon': props.icon || (sidebarOpen ? appConfig.ui.icons.close : appConfig.ui.icons.menu),
      'aria-label': sidebarOpen ? t('dashboardSidebarToggle.close') : t('dashboardSidebarToggle.open'),
      ...$attrs,
    }"
    :class="ui({ class: [props.ui?.base, props.class], side: props.side })"
    @click="toggleSidebar"
  />
</template>
