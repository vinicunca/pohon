<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/a';

type ProseA = ComponentConfig<typeof theme, AppConfig, 'a', 'ui.prose'>;

export interface ProseAProps {
  href?: string;
  target?: '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined;
  class?: any;
  ui?: { base?: any };
}

export interface ProseASlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PLink from '../Link.vue';

const _props = defineProps<ProseAProps>();

defineSlots<ProseASlots>();

const props = useComponentProps('prose.a', _props);

const appConfig = useAppConfig() as ProseA['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.a || {}) }));
</script>

<template>
  <PLink :href="props.href" :target="props.target" :class="ui({ class: [props.ui?.base, props.class] })" raw>
    <slot />
  </PLink>
</template>
