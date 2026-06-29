<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/page';

type Page = ComponentConfig<typeof theme, AppConfig, 'page'>;

export interface PageProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: Page['slots'];
}

export interface PageSlots {
  left?(props?: {}): Array<VNode>;
  default?(props?: {}): Array<VNode>;
  right?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive, Slot } from 'akar';
import { computed, onBeforeUpdate, shallowRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

const _props = defineProps<PageProps>();
const slots = defineSlots<PageSlots>();

const props = useComponentProps('page', _props);

const appConfig = useAppConfig() as Page['AppConfig'];

const hasLeft = shallowRef(!!slots.left);
const hasRight = shallowRef(!!slots.right);

onBeforeUpdate(() => {
  hasLeft.value = !!slots.left;
  hasRight.value = !!slots.right;
});

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.page || {}) })({
  left: hasLeft.value,
  right: hasRight.value,
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <Slot v-if="!!slots.left" data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <slot name="left" />
    </Slot>

    <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
      <slot />
    </div>

    <Slot v-if="!!slots.right" data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />
    </Slot>
  </Primitive>
</template>
