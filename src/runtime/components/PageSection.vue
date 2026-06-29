<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { ButtonProps } from './Button.vue';
import type { IconProps } from './Icon.vue';
import type { PageFeatureProps } from './PageFeature.vue';
import theme from '#build/ui/page-section';

type PageSection = ComponentConfig<typeof theme, AppConfig, 'pageSection'>;

export interface PageSectionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'section'
   */
  as?: any;
  /**
   * The headline displayed above the title.
   */
  headline?: string;
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  title?: string;
  description?: string;
  /**
   * Display a list of Button under the description.
   * `{ size: 'lg' }`{lang="ts-type"}
   */
  links?: Array<ButtonProps>;
  /**
   * Display a list of PageFeature under the description.
   */
  features?: Array<PageFeatureProps>;
  /**
   * The orientation of the section.
   * @defaultValue 'vertical'
   */
  orientation?: PageSection['variants']['orientation'];
  /**
   * Reverse the order of the default slot.
   * @defaultValue false
   */
  reverse?: boolean;
  class?: any;
  ui?: PageSection['slots'];
}

export interface PageSectionSlots {
  top?(props?: {}): Array<VNode>;
  header?(props?: {}): Array<VNode>;
  leading?(props: { ui: PageSection['ui'] }): Array<VNode>;
  headline?(props?: {}): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  body?(props?: {}): Array<VNode>;
  features?(props?: {}): Array<VNode>;
  footer?(props?: {}): Array<VNode>;
  links?(props?: {}): Array<VNode>;
  default?(props?: {}): Array<VNode>;
  bottom?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';
import PButton from './Button.vue';
import PContainer from './Container.vue';
import PIcon from './Icon.vue';
import PPageFeature from './PageFeature.vue';

const _props = withDefaults(
  defineProps<PageSectionProps>(),
  {
    as: 'section',
    orientation: 'vertical',
  },
);
const slots = defineSlots<PageSectionSlots>();

const props = useComponentProps('pageSection', _props);

const appConfig = useAppConfig() as PageSection['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.pageSection || {}) })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
  description: !!props.description || !!slots.description,
  body: !!slots.body || (!!props.features?.length || !!slots.features),
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot name="top" />

    <PContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.header || (props.icon || !!slots.leading) || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.body || (props.features?.length || !!slots.features) || !!slots.footer || (props.links?.length || !!slots.links)" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <div v-if="!!slots.header || (props.icon || !!slots.leading) || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
          <slot name="header">
            <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
              <slot name="leading" :ui="ui">
                <PIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
              </slot>
            </div>

            <div v-if="props.headline || !!slots.headline" data-slot="headline" :class="ui.headline({ class: props.ui?.headline, headline: !slots.headline })">
              <slot name="headline">
                {{ props.headline }}
              </slot>
            </div>

            <h2 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
              <slot name="title">
                {{ props.title }}
              </slot>
            </h2>

            <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
              <slot name="description">
                {{ props.description }}
              </slot>
            </div>
          </slot>
        </div>

        <div v-if="!!slots.body || (props.features?.length || !!slots.features)" data-slot="body" :class="ui.body({ class: props.ui?.body })">
          <slot name="body">
            <ul v-if="props.features?.length || !!slots.features" data-slot="features" :class="ui.features({ class: props.ui?.features })">
              <slot name="features">
                <PPageFeature
                  v-for="(feature, index) in props.features"
                  :key="index"
                  as="li"
                  v-bind="feature"
                />
              </slot>
            </ul>
          </slot>
        </div>

        <div v-if="!!slots.footer || (props.links?.length || !!slots.links)" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
          <slot name="footer">
            <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: props.ui?.links })">
              <slot name="links">
                <PButton v-for="(link, index) in props.links" :key="index" size="lg" v-bind="link" />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div v-else-if="props.orientation === 'horizontal'" class="hidden lg:block" />
    </PContainer>

    <slot name="bottom" />
  </Primitive>
</template>
