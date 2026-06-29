<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/footer';

type Footer = ComponentConfig<typeof theme, AppConfig, 'footer'>;

export interface FooterProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'footer'
   */
  as?: any;
  class?: any;
  ui?: Footer['slots'];
}

export interface FooterSlots {
  left?(props?: {}): Array<VNode>;
  default?(props?: {}): Array<VNode>;
  right?(props?: {}): Array<VNode>;
  top?(props?: {}): Array<VNode>;
  bottom?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';
import PContainer from './Container.vue';

const _props = withDefaults(
  defineProps<FooterProps>(),
  {
    as: 'footer',
  },
);
const slots = defineSlots<FooterSlots>();

const props = useComponentProps('footer', _props);

const appConfig = useAppConfig() as Footer['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.footer || {}) })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.top" data-slot="top" :class="ui.top({ class: props.ui?.top })">
      <slot name="top" />
    </div>

    <PContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
        <slot name="right" />
      </div>

      <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
        <slot />
      </div>

      <div data-slot="left" :class="ui.left({ class: props.ui?.left })">
        <slot name="left" />
      </div>
    </PContainer>

    <div v-if="!!slots.bottom" data-slot="bottom" :class="ui.bottom({ class: props.ui?.bottom })">
      <slot name="bottom" />
    </div>
  </Primitive>
</template>
