<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import type { IconProps } from '../Icon.vue';
import type { LinkProps } from '../Link.vue';
import theme from '#build/ui/prose/card';

type ProseCard = ComponentConfig<typeof theme, AppConfig, 'card', 'ui.prose'>;

export interface ProseCardProps {
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  icon?: IconProps['name'];
  title?: string;
  description?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: ProseCard['variants']['color'];
  class?: any;
  ui?: ProseCard['slots'];
}

export interface ProseCardSlots {
  default(props?: {}): Array<VNode>;
  title(props?: {}): Array<VNode>;
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

const _props = defineProps<ProseCardProps>();
const slots = defineSlots<ProseCardSlots>();

const props = useComponentProps('prose.card', _props);

const appConfig = useAppConfig() as ProseCard['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.card || {}) })({
  color: props.color,
  to: !!props.to,
  title: !!props.title,
}));

const target = computed(() => props.target || (!!props.to && typeof props.to === 'string' && props.to.startsWith('http') ? '_blank' : undefined));

const ariaLabel = computed(() => (props.title || 'Card link').trim());
</script>

<template>
  <div v-bind="!props.to ? $attrs : {}" :class="ui.base({ class: [props.ui?.base, props.class] })">
    <PLink
      v-if="props.to"
      :aria-label="ariaLabel"
      v-bind="{ to: props.to, target, ...$attrs }"
      class="focus:outline-none"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </PLink>

    <PIcon v-if="props.icon" :name="props.icon" :class="ui.icon({ class: props.ui?.icon })" />
    <PIcon v-if="!!props.to && target === '_blank'" :name="appConfig.ui.icons.external" :class="ui.externalIcon({ class: props.ui?.externalIcon })" />

    <p v-if="props.title || !!slots.title" :class="ui.title({ class: props.ui?.title })">
      <slot name="title" mdc-unwrap="p">
        {{ props.title }}
      </slot>
    </p>

    <div v-if="!!slots.default" :class="ui.description({ class: props.ui?.description })">
      <slot>
        {{ props.description }}
      </slot>
    </div>
  </div>
</template>
