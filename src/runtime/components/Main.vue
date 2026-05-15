<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/main';

type Main = ComponentConfig<typeof theme, AppConfig, 'main'>;

export interface MainProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'main'
   */
  as?: any;
  class?: any;
  ui?: { base?: any };
}

export interface MainSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

const _props = withDefaults(
  defineProps<MainProps>(),
  {
    as: 'main',
  },
);
defineSlots<MainSlots>();

const props = useComponentProps('main', _props);

const appConfig = useAppConfig() as Main['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.main || {}) }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
