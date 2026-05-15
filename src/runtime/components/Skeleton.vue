<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/skeleton';

type Skeleton = ComponentConfig<typeof theme, AppConfig, 'skeleton'>;

export interface SkeletonProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: { base?: any };
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

const _props = defineProps<SkeletonProps>();

const props = useComponentProps('skeleton', _props);

const appConfig = useAppConfig() as Skeleton['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.skeleton || {}) }));
</script>

<template>
  <Primitive
    :as="props.as"
    aria-busy="true"
    aria-label="loading"
    aria-live="polite"
    role="alert"
    :class="ui({ class: [props.ui?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
