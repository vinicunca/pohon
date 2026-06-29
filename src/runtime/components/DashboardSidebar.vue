<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { UseResizableProps } from '../composables/useResizable';
import type { ComponentConfig } from '../types/uv';
import type { ButtonProps } from './Button.vue';
import type { DrawerProps } from './Drawer.vue';
import type { LinkPropsKeys } from './Link.vue';
import type { ModalProps } from './Modal.vue';
import type { SlideoverProps } from './Slideover.vue';
import theme from '#build/ui/dashboard-sidebar';

type DashboardSidebar = ComponentConfig<typeof theme, AppConfig, 'dashboardSidebar'>;

type DashboardSidebarMode = 'modal' | 'slideover' | 'drawer';
type DashboardSidebarMenu<T> = T extends 'modal' ? ModalProps : T extends 'slideover' ? SlideoverProps : T extends 'drawer' ? DrawerProps : never;

export interface DashboardSidebarProps<T extends DashboardSidebarMode = DashboardSidebarMode> extends Pick<UseResizableProps, 'id' | 'side' | 'minSize' | 'maxSize' | 'defaultSize' | 'resizable' | 'collapsible' | 'collapsedSize'> {
  /**
   * The mode of the sidebar menu.
   * @defaultValue 'slideover'
   */
  mode?: T;
  /**
   * The props for the sidebar menu component.
   */
  menu?: DashboardSidebarMenu<T>;
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
  /**
   * Automatically close when route changes.
   * @defaultValue true
   */
  autoClose?: boolean;
  class?: any;
  ui?: DashboardSidebar['slots'];
}

export interface DashboardSidebarSlots {
  'header'?(props: { collapsed: boolean; collapse: (value: boolean) => void }): Array<VNode>;
  'default'?(props: { collapsed: boolean; collapse: (value: boolean) => void }): Array<VNode>;
  'footer'?(props: { collapsed: boolean; collapse: (value: boolean) => void }): Array<VNode>;
  'toggle'?(props: { open: boolean; toggle: () => void; ui: DashboardSidebar['ui'] }): Array<VNode>;
  'content'?(props: { close?: () => void }): Array<VNode>;
  'resize-handle'?(props: { onMouseDown: (e: MouseEvent) => void; onTouchStart: (e: TouchEvent) => void; onDoubleClick: (e: MouseEvent) => void; ui: DashboardSidebar['ui'] }): Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends DashboardSidebarMode">
import { createReusableTemplate } from '@vueuse/core';
import { defu } from 'defu';
import { computed, ref, toRef, useId, watch } from 'vue';
import { useAppConfig, useRoute, useRuntimeHook } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useLocale } from '../composables/useLocale';
import { useResizable } from '../composables/useResizable';
import { useDashboard } from '../utils/dashboard';
import { uv } from '../utils/uv';
import PDashboardResizeHandle from './DashboardResizeHandle.vue';
import PDashboardSidebarToggle from './DashboardSidebarToggle.vue';
import PDrawer from './Drawer.vue';
import PModal from './Modal.vue';
import PSlideover from './Slideover.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<DashboardSidebarProps<T>>(),
  {
    side: 'left',
    mode: 'slideover' as never,
    autoClose: true,
    toggle: true,
    toggleSide: 'left',
    minSize: 10,
    maxSize: 20,
    defaultSize: 15,
    resizable: false,
    collapsible: false,
    collapsedSize: 0,
  },
);
const slots = defineSlots<DashboardSidebarSlots>();

const props = useComponentProps<DashboardSidebarProps<T>>('dashboardSidebar', _props);

const open = defineModel<boolean>('open', { default: false });
const collapsed = defineModel<boolean>('collapsed', { default: false });

const route = useRoute();
const { t } = useLocale();
const appConfig = useAppConfig() as DashboardSidebar['AppConfig'];

const dashboardContext = useDashboard({
  storageKey: 'dashboard',
  unit: '%',
  sidebarOpen: ref(false),
  sidebarCollapsed: ref(false),
});

const id = `${dashboardContext.storageKey}-sidebar-${props.id || useId()}`;

const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })), { collapsed });

const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate();

useRuntimeHook('dashboard:sidebar:toggle', () => {
  open.value = !open.value;
});

useRuntimeHook('dashboard:sidebar:collapse', (value: boolean) => {
  isCollapsed.value = value;
});

watch(
  open,
  () => {
    dashboardContext.sidebarOpen!.value = open.value;
  },
  { immediate: true },
);
watch(
  isCollapsed,
  () => {
    dashboardContext.sidebarCollapsed!.value = isCollapsed.value;
  },
  { immediate: true },
);

watch(() => route.fullPath, () => {
  if (!props.autoClose) {
    return;
  }

  open.value = false;
});

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.dashboardSidebar || {}) })({
  side: props.side,
}));

const Menu = computed(() => ({
  slideover: PSlideover,
  modal: PModal,
  drawer: PDrawer,
})[props.mode as DashboardSidebarMode]);

const menuProps = toRef(() => defu(props.menu, {}, props.mode === 'modal' ? { fullscreen: true, transition: false } : props.mode === 'slideover' ? { side: 'left' } : {}) as DashboardSidebarMenu<T>);

function toggleOpen() {
  open.value = !open.value;
}
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" :open="open" :toggle="toggleOpen" :ui="ui">
      <PDashboardSidebarToggle
        v-if="props.toggle"
        v-bind="(typeof props.toggle === 'object' ? props.toggle : {})"
        :side="props.toggleSide"
        data-slot="toggle"
        :class="ui.toggle({ class: props.ui?.toggle, toggleSide: props.toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineResizeHandleTemplate>
    <slot name="resize-handle" :on-mouse-down="onMouseDown" :on-touch-start="onTouchStart" :on-double-click="onDoubleClick" :ui="ui">
      <PDashboardResizeHandle
        v-if="props.resizable"
        :aria-controls="id"
        data-slot="handle"
        :class="ui.handle({ class: props.ui?.handle })"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @dblclick="onDoubleClick"
      />
    </slot>
  </DefineResizeHandleTemplate>

  <ReuseResizeHandleTemplate v-if="props.side === 'right'" />

  <div
    :id="id"
    ref="el"
    v-bind="$attrs"
    :data-collapsed="isCollapsed"
    :data-dragging="isDragging"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="{ '--width': `${size || 0}${dashboardContext.unit}` }"
  >
    <div v-if="!!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" :collapsed="isCollapsed" :collapse="collapse" />
    </div>
  </div>

  <ReuseResizeHandleTemplate v-if="props.side === 'left'" />

  <Menu
    v-model:open="open"
    :title="t('dashboardSidebar.title')"
    :description="t('dashboardSidebar.description')"
    v-bind="menuProps"
    :ui="{
      overlay: ui.overlay({ class: props.ui?.overlay }),
      content: ui.content({ class: props.ui?.content }),
    }"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <div v-if="!!slots.header || props.mode !== 'drawer'" data-slot="header" :class="ui.header({ class: props.ui?.header, menu: true })">
          <ReuseToggleTemplate v-if="props.mode !== 'drawer' && props.toggleSide === 'left'" />

          <slot name="header" :collapsed="false" :collapse="() => {}" />

          <ReuseToggleTemplate v-if="props.mode !== 'drawer' && props.toggleSide === 'right'" />
        </div>

        <div data-slot="body" :class="ui.body({ class: props.ui?.body, menu: true })">
          <slot :collapsed="false" :collapse="() => {}" />
        </div>

        <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer, menu: true })">
          <slot name="footer" :collapsed="false" :collapse="() => {}" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
