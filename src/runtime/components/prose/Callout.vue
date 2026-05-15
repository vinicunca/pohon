<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { IconProps, LinkProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/callout';

type ProseCallout = ComponentConfig<typeof theme, AppConfig, 'callout', 'ui.prose'>;

export interface ProseCalloutProps {
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  icon?: IconProps['name'];
  /**
   * @defaultValue 'neutral'
   */
  color?: ProseCallout['variants']['color'];
  class?: any;
  ui?: ProseCallout['slots'];
}

export interface ProseCalloutSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PIcon from '../Icon.vue';
import PLink from '../Link.vue';

defineOptions({ inheritAttrs: false });

const _props = defineProps<ProseCalloutProps>();

defineSlots<ProseCalloutSlots>();

const props = useComponentProps('prose.callout', _props);

const appConfig = useAppConfig() as ProseCallout['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.callout || {}) })({
  color: props.color,
  to: !!props.to,
}));

const target = computed(() => props.target || (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined));
</script>

<template>
  <div :class="ui.base({ class: [props.ui?.base, props.class] })">
    <PLink
      v-if="props.to"
      v-bind="{ to: props.to, target, ...$attrs }"
      class="focus:outline-none"
      raw
    >
      <span class="inset-0 absolute" aria-hidden="true" />
    </PLink>

    <PIcon v-if="props.icon" :name="props.icon" :class="ui.icon({ class: props.ui?.icon })" />
    <PIcon v-if="!!props.to && target === '_blank'" :name="appConfig.ui.icons.external" :class="ui.externalIcon({ class: props.ui?.externalIcon })" />

    <slot mdc-unwrap="p" />
  </div>
</template>
