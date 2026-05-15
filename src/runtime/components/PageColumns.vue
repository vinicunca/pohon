<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/page-columns';

type PageColumns = ComponentConfig<typeof theme, AppConfig, 'pageColumns'>;

export interface PageColumnsProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: { base?: any };
}

export interface PageColumnsSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

const _props = defineProps<PageColumnsProps>();

defineSlots<PageColumnsSlots>();

const props = useComponentProps('pageColumns', _props);

const appConfig = useAppConfig() as PageColumns['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.pageColumns || {}) }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
