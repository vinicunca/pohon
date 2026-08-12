<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import { isBoolean } from '@vinicunca/perkakas';
import theme from '#build/ui/prose/h3';

type ProseH3 = ComponentConfig<typeof theme, AppConfig, 'h3', 'ui.prose'>;

export interface ProseH3Props {
  id?: string;
  /**
   * Wrap the heading in an anchor link when an `id` is present.
   * `@nuxt/content` and `@nuxtjs/mdc` enable this for H2–H4 by default.
   * @defaultValue false
   */
  anchor?: boolean;
  class?: any;
  ui?: ProseH3['slots'];
}

export interface ProseH3Slots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig, useRuntimeConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PIcon from '../Icon.vue';

const _props = defineProps<ProseH3Props>();

defineSlots<ProseH3Slots>();

const props = useComponentProps('prose.h3', _props);

const appConfig = useAppConfig() as ProseH3['AppConfig'];

// NOTE: the `mdc.headings.anchorLinks` fallback is deprecated, remove in v5 in favor of the `anchor` prop.
const { headings } = useRuntimeConfig().public?.mdc || {};

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.h3 || {}) })());

const generate = computed(() => props.id && (props.anchor ?? (isBoolean(headings?.anchorLinks) ? headings.anchorLinks : headings?.anchorLinks?.h3) ?? false));
</script>

<template>
  <h3 :id="props.id" :class="ui.base({ class: [props.ui?.base, props.class] })">
    <a v-if="props.id && generate" :href="`#${props.id}`" :class="ui.link({ class: props.ui?.link })">
      <span :class="ui.leading({ class: props.ui?.leading })">
        <PIcon :name="appConfig.ui.icons.hash" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
      </span>

      <slot />
    </a>
    <slot v-else />
  </h3>
</template>
