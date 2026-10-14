<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/drawer-provider';

type DrawerProviderConfig = ComponentConfig<typeof theme, AppConfig, 'drawerProvider'>;

export interface DrawerProviderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * Scale the page content while a descendant drawer is open.
   * @defaultValue false
   */
  scale?: boolean;
  class?: any;
  ui?: DrawerProviderConfig['slots'];
}

export interface DrawerProviderSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { DrawerIndent, DrawerIndentBackground, DrawerProvider, Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

defineOptions({ inheritAttrs: false });
const _props = withDefaults(defineProps<DrawerProviderProps>(), { scale: false });
defineSlots<DrawerProviderSlots>();
const props = useComponentProps('drawerProvider', _props);
const appConfig = useAppConfig() as DrawerProviderConfig['AppConfig'];
const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.drawerProvider || {}) })({ scale: props.scale }));
</script>

<template>
  <DrawerProvider>
    <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
      <DrawerIndentBackground v-if="props.scale" data-slot="background" :class="ui.background({ class: props.ui?.background })" />
      <DrawerIndent data-slot="content" :class="ui.content({ class: props.ui?.content })">
        <slot />
      </DrawerIndent>
    </Primitive>
  </DrawerProvider>
</template>

<style scoped>
.pohon-drawer-indent {
  --pohon-indent-progress: var(--drawer-swipe-progress, 0);
  transform-origin: center top;
  transition-property: transform, border-radius;
  transition-duration: calc(var(--pohon-indent-duration, 0ms) * (1 - clamp(0, var(--pohon-indent-progress) * 100000, 1)));
  transition-timing-function: cubic-bezier(0.32, 0.72, 0, 1);
}
.pohon-drawer-indent-transition {
  --pohon-indent-duration: 450ms;
}
.pohon-drawer-indent[data-active] {
  transform: scale(calc(0.96 + 0.04 * var(--pohon-indent-progress))) translateY(calc(0.5rem * (1 - var(--pohon-indent-progress))));
  border-radius: calc(1rem * (1 - var(--pohon-indent-progress)));
}
@media (prefers-reduced-motion: reduce) {
  .pohon-drawer-indent {
    transition: none;
  }
}
</style>
