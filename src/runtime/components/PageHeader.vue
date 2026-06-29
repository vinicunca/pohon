<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { ButtonProps } from './Button.vue';
import theme from '#build/ui/page-header';

type PageHeader = ComponentConfig<typeof theme, AppConfig, 'pageHeader'>;

export interface PageHeaderProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  headline?: string;
  title?: string;
  description?: string;
  /**
   * Display a list of Button next to the title.
   * `{ color: 'neutral', variant: 'outline' }`{lang="ts-type"}
   */
  links?: Array<ButtonProps>;
  class?: any;
  ui?: PageHeader['slots'];
}

export interface PageHeaderSlots {
  headline?(props?: {}): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  links?(props?: {}): Array<VNode>;
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';
import PButton from './Button.vue';

const _props = defineProps<PageHeaderProps>();
const slots = defineSlots<PageHeaderSlots>();

const props = useComponentProps('pageHeader', _props);

const appConfig = useAppConfig() as PageHeader['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.pageHeader || {}) })({
  title: !!props.title || !!slots.title,
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="props.headline || !!slots.headline" data-slot="headline" :class="ui.headline({ class: props.ui?.headline })">
      <slot name="headline">
        {{ props.headline }}
      </slot>
    </div>

    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <h1 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h1>

        <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: props.ui?.links })">
          <slot name="links">
            <PButton v-for="(link, index) in props.links" :key="index" color="neutral" variant="outline" v-bind="link" />
          </slot>
        </div>
      </div>

      <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <slot />
    </div>
  </Primitive>
</template>
