<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/page-list';

type PageList = ComponentConfig<typeof theme, AppConfig, 'pageList'>;

export interface PageListProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  divide?: boolean;
  class?: any;
  ui?: { base?: any };
}

export interface PageListSlots {
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
  defineProps<PageListProps>(),
  {
    divide: false,
  },
);
defineSlots<PageListSlots>();

const props = useComponentProps('pageList', _props);

const appConfig = useAppConfig() as PageList['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.pageList || {}) }));
</script>

<template>
  <Primitive :as="props.as" role="list" :class="ui({ class: [props.ui?.base, props.class], divide: props.divide })">
    <slot />
  </Primitive>
</template>
