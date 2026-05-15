<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/h2';

type ProseH2 = ComponentConfig<typeof theme, AppConfig, 'h2', 'ui.prose'>;

export interface ProseH2Props {
  id?: string;
  class?: any;
  ui?: ProseH2['slots'];
}

export interface ProseH2Slots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig, useRuntimeConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PIcon from '../Icon.vue';

const _props = defineProps<ProseH2Props>();

defineSlots<ProseH2Slots>();

const props = useComponentProps('prose.h2', _props);

const appConfig = useAppConfig() as ProseH2['AppConfig'];
const { headings } = useRuntimeConfig().public?.mdc || {};

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.h2 || {}) })());

const generate = computed(() => props.id && typeof headings?.anchorLinks === 'object' && headings.anchorLinks.h2);
</script>

<template>
  <h2 :id="props.id" :class="ui.base({ class: [props.ui?.base, props.class] })">
    <a v-if="props.id && generate" :href="`#${props.id}`" :class="ui.link({ class: props.ui?.link })">
      <span :class="ui.leading({ class: props.ui?.leading })">
        <PIcon :name="appConfig.ui.icons.hash" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
      </span>

      <slot />
    </a>
    <slot v-else />
  </h2>
</template>
