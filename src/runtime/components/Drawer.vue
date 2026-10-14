<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { DrawerContentEmits, DrawerContentProps, DrawerOpenChangeDetails, DrawerRootEmits, DrawerRootProps } from 'akar';
import type { VNode } from 'vue';
import type { EmitsToProps } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import type { ButtonProps } from './Button.vue';
import type { IconProps } from './Icon.vue';
import type { LinkPropsKeys } from './Link.vue';
import theme from '#build/ui/drawer';

type Drawer = ComponentConfig<typeof theme, AppConfig, 'drawer'>;

export interface DrawerProps extends Omit<DrawerRootProps, 'swipeDirection'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The edge from which the drawer opens.
   * @defaultValue 'bottom'
   */
  direction?: 'top' | 'right' | 'bottom' | 'left';
  /**
   * Allow dismissal by swiping, pressing Escape, or interacting outside.
   * @defaultValue true
   */
  dismissible?: boolean;
  /**
   * Animate the drawer and overlay.
   * @defaultValue true
   */
  transition?: boolean;
  title?: string;
  description?: string;
  /**
   * Whether to inset the drawer from the edges.
   * @defaultValue false
   */
  inset?: boolean;
  /** The content of the drawer. */
  content?: Omit<DrawerContentProps, 'as' | 'asChild' | 'forceMount'> & Partial<EmitsToProps<DrawerContentEmits>>;
  /**
   * Render an overlay behind the drawer.
   * @defaultValue true
   */
  overlay?: boolean;
  /**
   * Render a handle on the drawer.
   * @defaultValue true
   */
  handle?: boolean;
  /**
   * Render the drawer in a portal.
   * @defaultValue true
   */
  portal?: boolean | string | HTMLElement;
  /**
   * Display a close button to dismiss the drawer.
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @defaultValue false
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  /**
   * The icon displayed in the close button.
   * @defaultValue appConfig.ui.icons.close
   * @IconifyIcon
   */
  closeIcon?: IconProps['name'];
  class?: any;
  ui?: Drawer['slots'];
}

export type DrawerEmits = DrawerRootEmits & {
  'after:leave': [];
  'after:enter': [];
  'close:prevent': [];
};

export interface DrawerSlots {
  default?(props?: {}): Array<VNode>;
  content?(props?: {}): Array<VNode>;
  header?(props?: {}): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  actions?(props?: {}): Array<VNode>;
  close?(props: { ui: Drawer['ui'] }): Array<VNode>;
  body?(props?: {}): Array<VNode>;
  footer?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core';
import { DrawerClose, DrawerContent, DrawerDescription, DrawerHandle, DrawerOverlay, DrawerPortal, DrawerRoot, DrawerTitle, DrawerTrigger, VisuallyHidden } from 'akar';
import { computed, toRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { FieldGroupReset } from '../composables/useFieldGroup';
import { useForwardProps } from '../composables/useForwardProps';
import { useLocale } from '../composables/useLocale';
import { usePortal } from '../composables/usePortal';
import { pointerDownOutside } from '../utils/overlay';
import { uv } from '../utils/uv';
import PButton from './Button.vue';

const _props = withDefaults(
  defineProps<DrawerProps>(),
  {
    direction: 'bottom',
    portal: true,
    overlay: true,
    handle: true,
    modal: true,
    dismissible: true,
    transition: true,
  },
);
const emits = defineEmits<DrawerEmits>();
const slots = defineSlots<DrawerSlots>();

const props = useComponentProps('drawer', _props);

const { t } = useLocale();
const appConfig = useAppConfig() as Drawer['AppConfig'];

const rootProps = useForwardProps(reactivePick(props, 'modal', 'open', 'defaultOpen', 'snapPoints', 'snapPoint', 'defaultSnapPoint', 'snapToSequentialPoints'));
const swipeDirection = computed(() => ({ top: 'up', bottom: 'down', left: 'left', right: 'right' } as const)[props.direction]);

function onOpenChange(open: boolean, details: DrawerOpenChangeDetails) {
  if (!open && !props.dismissible && ['swipe', 'escape-key', 'outside-press'].includes(details.reason ?? '')) {
    details.cancel();
    emits('close:prevent');
    return;
  }
  emits('update:open', open, details);
}

const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ['interactOutside', 'escapeKeyDown'];

    return events.reduce((acc, curr) => {
      acc[curr] = (e: Event) => {
        e.preventDefault();
        emits('close:prevent');
      };
      return acc;
    }, {} as Record<typeof events[number], (e: Event) => void>);
  }

  return {
    pointerDownOutside,
  };
});

// Akar's completion event and the popup animation can both report a close.
// The popup event also covers entering a newly mounted DrawerContent.
let completedOpen = false;
function onOpenComplete(open: boolean) {
  if (completedOpen === open) {
    return;
  }
  completedOpen = open;
  emits('update:openComplete', open);
  if (open) {
    emits('after:enter');
  } else {
    emits('after:leave');
  }
}

function onAnimationEnd(event: AnimationEvent) {
  if (event.target !== event.currentTarget) {
    return;
  }
  onOpenComplete((event.currentTarget as HTMLElement).dataset.state === 'open');
}

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.drawer || {}) })({
  direction: props.direction,
  inset: props.inset,
  transition: props.transition,
  snapPoints: props.snapPoints && props.snapPoints.length > 0,
}));
</script>

<template>
  <DrawerRoot v-bind="rootProps" :swipe-direction="swipeDirection" @update:open="onOpenChange" @update:snap-point="emits('update:snapPoint', $event)" @update:open-complete="onOpenComplete">
    <DrawerTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot />
    </DrawerTrigger>

    <DrawerPortal v-bind="portalProps">
      <FieldGroupReset>
        <DrawerOverlay v-if="props.modal === true" data-slot="overlay" :class="ui.overlay({ class: [props.ui?.overlay, !props.overlay && 'hidden'] })" />

        <DrawerContent
          :as="props.as"
          data-slot="content"
          :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })"
          v-bind="contentProps"
          v-on="contentEvents"
          @animationend="onAnimationEnd"
        >
          <DrawerHandle v-if="props.handle" data-slot="handle" :class="ui.handle({ class: props.ui?.handle })" />

          <VisuallyHidden v-if="(!props.title && !slots.title) || (!props.description && !slots.description) || !!slots.content">
            <DrawerTitle v-if="!props.title && !slots.title" />
            <DrawerTitle v-else-if="!!slots.content">
              <slot name="title">
                {{ props.title }}
              </slot>
            </DrawerTitle>

            <DrawerDescription v-if="!props.description && !slots.description" />
            <DrawerDescription v-else-if="!!slots.content">
              <slot name="description">
                {{ props.description }}
              </slot>
            </DrawerDescription>
          </VisuallyHidden>

          <slot name="content">
            <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
              <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description) || (props.close || !!slots.close) || !!slots.actions" data-slot="header" :class="ui.header({ class: props.ui?.header })">
                <slot name="header">
                  <div v-if="props.title || !!slots.title || props.description || !!slots.description" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
                    <DrawerTitle v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
                      <slot name="title">
                        {{ props.title }}
                      </slot>
                    </DrawerTitle>

                    <DrawerDescription v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
                      <slot name="description">
                        {{ props.description }}
                      </slot>
                    </DrawerDescription>
                  </div>

                  <div v-if="!!slots.actions || props.close || !!slots.close" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
                    <slot name="actions" />

                    <DrawerClose v-if="props.close || !!slots.close" as-child>
                      <slot name="close" :ui="ui">
                        <PButton
                          v-if="props.close"
                          :icon="props.closeIcon || appConfig.ui.icons.close"
                          color="neutral"
                          variant="ghost"
                          :aria-label="t('drawer.close')"
                          v-bind="(typeof props.close === 'object' ? props.close : {})"
                          data-slot="close"
                          :class="ui.close({ class: props.ui?.close })"
                        />
                      </slot>
                    </DrawerClose>
                  </div>
                </slot>
              </div>

              <div v-if="!!slots.body" data-slot="body" :class="ui.body({ class: props.ui?.body })">
                <slot name="body" />
              </div>

              <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
                <slot name="footer" />
              </div>
            </div>
          </slot>
        </DrawerContent>
      </FieldGroupReset>
    </DrawerPortal>
  </DrawerRoot>
</template>

<style scoped>
.pohon-drawer-content {
  --pohon-drawer-closed-x: 0px;
  --pohon-drawer-closed-y: 0px;
  --pohon-drawer-offset-x: 0px;
  --pohon-drawer-offset-y: 0px;
  --pohon-drawer-x: calc(var(--drawer-swipe-movement-x, 0px) + var(--pohon-drawer-offset-x, 0px));
  --pohon-drawer-y: calc(var(--drawer-swipe-movement-y, 0px) + var(--pohon-drawer-offset-y, 0px));
  transform: translate3d(var(--pohon-drawer-x), var(--pohon-drawer-y), 0);
  transition: transform var(--pohon-drawer-duration, 1ms) cubic-bezier(0.32, 0.72, 0, 1);
  animation-duration: calc(var(--pohon-drawer-duration, 1ms) * var(--drawer-swipe-strength, 1));
  animation-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
}
.pohon-drawer-content.pohon-drawer-transition,
.pohon-drawer-overlay.pohon-drawer-transition {
  --pohon-drawer-duration: 450ms;
}
.pohon-drawer-content[data-swipe-direction="down"] {
  --pohon-drawer-y: max(0px, calc(var(--drawer-swipe-movement-y, 0px) + var(--pohon-drawer-offset-y, 0px)));
  --pohon-drawer-closed-y: calc(100% + 1.5rem);
  --pohon-drawer-offset-y: var(--drawer-snap-point-offset, 0px);
}
.pohon-drawer-content[data-swipe-direction="up"] {
  --pohon-drawer-y: min(0px, calc(var(--drawer-swipe-movement-y, 0px) + var(--pohon-drawer-offset-y, 0px)));
  --pohon-drawer-closed-y: calc(-100% - 1.5rem);
  --pohon-drawer-offset-y: var(--drawer-snap-point-offset, 0px);
}
.pohon-drawer-content[data-swipe-direction="right"] {
  --pohon-drawer-x: max(0px, calc(var(--drawer-swipe-movement-x, 0px) + var(--pohon-drawer-offset-x, 0px)));
  --pohon-drawer-closed-x: calc(100% + 1.5rem);
  --pohon-drawer-offset-x: var(--drawer-snap-point-offset, 0px);
}
.pohon-drawer-content[data-swipe-direction="left"] {
  --pohon-drawer-x: min(0px, calc(var(--drawer-swipe-movement-x, 0px) + var(--pohon-drawer-offset-x, 0px)));
  --pohon-drawer-closed-x: calc(-100% - 1.5rem);
  --pohon-drawer-offset-x: var(--drawer-snap-point-offset, 0px);
}
.pohon-drawer-content[data-state="open"] {
  animation-name: drawer-in;
}
.pohon-drawer-content[data-state="closed"] {
  animation-name: drawer-out;
}
.pohon-drawer-content[data-swiping] {
  transition-duration: 0ms;
  user-select: none;
}
.pohon-drawer-content[data-nested-drawer-open] {
  transform: translate3d(var(--pohon-drawer-x), var(--pohon-drawer-y), 0) scale(clamp(0.9, calc(1 - 0.02 * var(--nested-drawers, 1) * (1 - var(--drawer-swipe-progress, 0))), 1));
}
.pohon-drawer-overlay {
  animation-duration: var(--pohon-drawer-duration, 1ms);
  animation-timing-function: ease-out;
}
.pohon-drawer-overlay[data-state="open"] {
  animation-name: drawer-fade-in;
}
.pohon-drawer-overlay[data-state="closed"] {
  animation-name: drawer-fade-out;
}
@keyframes drawer-in {
  from {
    translate: calc(var(--pohon-drawer-closed-x, 0px) - var(--pohon-drawer-x)) calc(var(--pohon-drawer-closed-y, 0px) - var(--pohon-drawer-y));
  }
  to { translate: 0 0; }
}
@keyframes drawer-out {
  from { translate: 0 0; }
  to {
    translate: calc(var(--pohon-drawer-closed-x, 0px) - var(--pohon-drawer-x)) calc(var(--pohon-drawer-closed-y, 0px) - var(--pohon-drawer-y));
  }
}
@keyframes drawer-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes drawer-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .pohon-drawer-content.pohon-drawer-transition,
  .pohon-drawer-overlay.pohon-drawer-transition {
    --pohon-drawer-duration: 1ms;
  }
}
</style>
