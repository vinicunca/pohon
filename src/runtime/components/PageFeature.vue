<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { IconProps } from './Icon.vue';
import type { LinkProps } from './Link.vue';
import theme from '#build/ui/page-feature';

type PageFeature = ComponentConfig<typeof theme, AppConfig, 'pageFeature'>;

export interface PageFeatureProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed next to the title when `orientation` is `horizontal` and above the title when `orientation` is `vertical`.
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  title?: string;
  description?: string;
  /**
   * The orientation of the page feature.
   * @defaultValue 'horizontal'
   */
  orientation?: PageFeature['variants']['orientation'];
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  onClick?: (event: MouseEvent) => void;
  class?: any;
  ui?: PageFeature['slots'];
}

export interface PageFeatureSlots {
  leading?(props: { ui: PageFeature['ui'] }): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PIcon from './Icon.vue';
import PLink from './Link.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<PageFeatureProps>(),
  {
    orientation: 'horizontal',
  },
);
const slots = defineSlots<PageFeatureSlots>();

const props = useComponentProps('pageFeature', _props);

const appConfig = useAppConfig() as PageFeature['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.pageFeature || {}) })({
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
  to: !!props.to || !!props.onClick,
}));

const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Feature link').trim();
});
</script>

<template>
  <Primitive
    :as="props.as"
    v-bind="!props.to ? $attrs : {}"
    :data-orientation="props.orientation"
    :data-slot="($attrs['data-slot'] as string | undefined) ?? 'root'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @click="props.onClick"
  >
    <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" :ui="ui">
        <PIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
      </slot>
    </div>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <PLink
        v-if="props.to"
        :aria-label="ariaLabel"
        v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': undefined }"
        class="peer focus:outline-none"
        raw
      >
        <span class="inset-0 absolute" aria-hidden="true" />
      </PLink>

      <slot>
        <div v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>
      </slot>
    </div>
  </Primitive>
</template>
