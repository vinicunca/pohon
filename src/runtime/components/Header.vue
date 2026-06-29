<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { ButtonProps } from './Button.vue';
import type { DrawerProps } from './Drawer.vue';
import type { LinkPropsKeys } from './Link.vue';
import type { ModalProps } from './Modal.vue';
import type { SlideoverProps } from './Slideover.vue';
import theme from '#build/ui/header';

type Header = ComponentConfig<typeof theme, AppConfig, 'header'>;

type HeaderMode = 'modal' | 'slideover' | 'drawer';
type HeaderMenu<T> = T extends 'modal' ? ModalProps : T extends 'slideover' ? SlideoverProps : T extends 'drawer' ? DrawerProps : never;

export interface HeaderProps<T extends HeaderMode = HeaderMode> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'header'
   */
  as?: any;
  title?: string;
  to?: string;
  /**
   * The mode of the header menu.
   * @defaultValue 'modal'
   */
  mode?: T;
  /**
   * The props for the header menu component.
   */
  menu?: HeaderMenu<T>;
  /**
   * Customize the toggle button to open the header menu displayed when the `content` slot is used.
   * `{ color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   */
  toggle?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  /**
   * The side to render the toggle button on.
   * @defaultValue 'right'
   */
  toggleSide?: 'left' | 'right';
  /**
   * Automatically close when route changes.
   * @defaultValue true
   */
  autoClose?: boolean;
  class?: any;
  ui?: Header['slots'];
}

export interface HeaderSlots {
  title?(props?: {}): Array<VNode>;
  left?(props?: {}): Array<VNode>;
  default?(props?: {}): Array<VNode>;
  right?(props?: {}): Array<VNode>;
  toggle?(props: { open: boolean; toggle: () => void; ui: Header['ui'] }): Array<VNode>;
  top?(props?: {}): Array<VNode>;
  bottom?(props?: {}): Array<VNode>;
  body?(props?: {}): Array<VNode>;
  content?(props: { close?: () => void }): Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends HeaderMode">
import { createReusableTemplate } from '@vueuse/core';
import { Primitive } from 'akar';
import { defu } from 'defu';
import { computed, toRef, watch } from 'vue';
import { useAppConfig, useRoute } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useLocale } from '../composables/useLocale';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PButton from './Button.vue';
import PContainer from './Container.vue';
import PDrawer from './Drawer.vue';
import PLink from './Link.vue';
import PModal from './Modal.vue';
import PSlideover from './Slideover.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<HeaderProps<T>>(),
  {
    as: 'header',
    mode: 'modal' as never,
    autoClose: true,
    toggle: true,
    toggleSide: 'right',
    to: '/',
    title: 'Pohon UI',
  },
);
const slots = defineSlots<HeaderSlots>();

const props = useComponentProps<HeaderProps<T>>('header', _props);

const open = defineModel<boolean>('open', { default: false });

const route = useRoute();
const { t } = useLocale();
const appConfig = useAppConfig() as Header['AppConfig'];

const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Pohon UI').trim();
});

watch(() => route.fullPath, () => {
  if (!props.autoClose) {
    return;
  }

  open.value = false;
});

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.header || {}) })());

const Menu = computed(() => ({
  slideover: PSlideover,
  modal: PModal,
  drawer: PDrawer,
})[props.mode as HeaderMode]);

const menuProps = toRef(() => defu(props.menu, {}, props.mode === 'modal' ? { fullscreen: true, transition: false } : {}) as HeaderMenu<T>);

function toggleOpen() {
  open.value = !open.value;
}
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" :open="open" :toggle="toggleOpen" :ui="ui">
      <PButton
        v-if="props.toggle"
        color="neutral"
        variant="ghost"
        :aria-label="open ? t('header.close') : t('header.open')"
        :icon="open ? appConfig.ui.icons.close : appConfig.ui.icons.menu"
        v-bind="(typeof props.toggle === 'object' ? props.toggle : {})"
        data-slot="toggle"
        :class="ui.toggle({ class: props.ui?.toggle, toggleSide: props.toggleSide })"
        @click="toggleOpen"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineLeftTemplate>
    <div data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <ReuseToggleTemplate v-if="props.toggleSide === 'left'" />

      <slot name="left">
        <PLink :to="props.to" :aria-label="ariaLabel" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </PLink>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />

      <ReuseToggleTemplate v-if="props.toggleSide === 'right'" />
    </div>
  </DefineRightTemplate>

  <Primitive :as="props.as" v-bind="$attrs" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot name="top" />

    <PContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <ReuseLeftTemplate />

      <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
        <slot />
      </div>

      <ReuseRightTemplate />
    </PContainer>

    <slot name="bottom" />
  </Primitive>

  <Menu
    v-model:open="open"
    :title="t('header.title')"
    :description="t('header.description')"
    v-bind="menuProps"
    :ui="{
      overlay: ui.overlay({ class: props.ui?.overlay }),
      content: ui.content({ class: props.ui?.content }),
    }"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <div v-if="props.mode !== 'drawer'" data-slot="header" :class="ui.header({ class: props.ui?.header })">
          <ReuseLeftTemplate />

          <ReuseRightTemplate />
        </div>

        <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
          <slot name="body" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
