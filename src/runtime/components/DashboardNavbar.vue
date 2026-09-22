<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { DashboardContext } from '../utils/dashboard';
import type { ButtonProps } from './Button.vue';
import type { IconProps } from './Icon.vue';
import type { LinkPropsKeys } from './Link.vue';
import theme from '#build/ui/dashboard-navbar';

type DashboardNavbar = ComponentConfig<typeof theme, AppConfig, 'dashboardNavbar'>;

export interface DashboardNavbarProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed next to the title.
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  title?: string;
  /**
   * Customize the toggle button to open the sidebar.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue true
   */
  toggle?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  /**
   * The side to render the toggle button on.
   * @defaultValue 'left'
   */
  toggleSide?: 'left' | 'right';
  class?: any;
  ui?: DashboardNavbar['slots'];
}

type DashboardNavbarSlotsProps = Omit<DashboardContext, 'storage' | 'storageKey' | 'persistent' | 'unit'>;

export interface DashboardNavbarSlots {
  title?(props?: {}): Array<VNode>;
  leading?(props: DashboardNavbarSlotsProps & { ui: DashboardNavbar['ui'] }): Array<VNode>;
  trailing?(props: DashboardNavbarSlotsProps & { ui: DashboardNavbar['ui'] }): Array<VNode>;
  left?(props: DashboardNavbarSlotsProps): Array<VNode>;
  default?(props: DashboardNavbarSlotsProps): Array<VNode>;
  right?(props: DashboardNavbarSlotsProps): Array<VNode>;
  toggle?(props: DashboardNavbarSlotsProps & { ui: DashboardNavbar['ui'] }): Array<VNode>;
}
</script>

<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PDashboardSidebarToggle from './DashboardSidebarToggle.vue';
import PIcon from './Icon.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<DashboardNavbarProps>(),
  {
    toggle: true,
    toggleSide: 'left',
  },
);
const slots = defineSlots<DashboardNavbarSlots>();

const props = useComponentProps('dashboardNavbar', _props);

const appConfig = useAppConfig() as DashboardNavbar['AppConfig'];
const dashboardContext = useDashboard({});

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.dashboardNavbar || {}) })());
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" v-bind="{ ...dashboardContext, ui }">
      <PDashboardSidebarToggle
        v-if="props.toggle"
        v-bind="(typeof props.toggle === 'object' ? props.toggle : {})"
        :side="props.toggleSide"
        data-slot="toggle"
        :class="ui.toggle({ class: props.ui?.toggle, toggleSide: props.toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <ReuseToggleTemplate v-if="props.toggleSide === 'left'" />

      <slot name="left" v-bind="dashboardContext">
        <slot name="leading" v-bind="{ ...dashboardContext, ui }">
          <PIcon v-if="props.icon" :name="props.icon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
        </slot>

        <h1 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h1>

        <slot name="trailing" v-bind="{ ...dashboardContext, ui }" />
      </slot>
    </div>

    <div v-if="!!slots.default" data-slot="center" :class="ui.center({ class: props.ui?.center })">
      <slot v-bind="dashboardContext" />
    </div>

    <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" v-bind="dashboardContext" />

      <ReuseToggleTemplate v-if="props.toggleSide === 'right'" />
    </div>
  </Primitive>
</template>
