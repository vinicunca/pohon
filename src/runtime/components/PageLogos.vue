<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { MarqueeProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/page-logos';

type PageLogos = ComponentConfig<typeof theme, AppConfig, 'pageLogos'>;

type PageLogosItem = {
  src: string;
  alt: string;
} | string;

export interface PageLogosProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  title?: string;
  items?: Array<PageLogosItem>;
  marquee?: boolean | MarqueeProps;
  class?: any;
  ui?: PageLogos['slots'];
}

export interface PageLogosSlots {
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';
import PAvatar from './Avatar.vue';
import PIcon from './Icon.vue';
import PMarquee from './Marquee.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<PageLogosProps>(),
  {
    marquee: false,
  },
);

const slots = defineSlots<PageLogosSlots>();

const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();

const props = useComponentProps('pageLogos', _props);

const appConfig = useAppConfig() as PageLogos['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.pageLogos || {}) })());
</script>

<template>
  <DefineCreateItemTemplate>
    <slot v-if="!!slots.default" />
    <template v-else-if="props.items?.length">
      <template v-for="(item, index) in props.items" :key="index">
        <PAvatar
          v-if="typeof item === 'object'"
          :src="item.src"
          :alt="item.alt"
          data-slot="logo"
          :class="ui.logo({ class: props.ui?.logo })"
        />
        <PIcon
          v-else
          :name="item"
          data-slot="logo"
          :class="ui.logo({ class: props.ui?.logo })"
        />
      </template>
    </template>
  </DefineCreateItemTemplate>

  <Primitive :as="props.as" v-bind="$attrs" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <h2 v-if="props.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
      {{ props.title }}
    </h2>

    <PMarquee
      v-if="props.marquee"
      v-bind="typeof props.marquee === 'object' ? props.marquee : {}"
      data-slot="logos"
      :class="ui.logos({ class: props.ui?.logos, marquee: true })"
    >
      <ReuseCreateItemTemplate :items="props.items" />
    </PMarquee>
    <div v-else data-slot="logos" :class="ui.logos({ class: props.ui?.logos })">
      <ReuseCreateItemTemplate :items="props.items" />
    </div>
  </Primitive>
</template>
