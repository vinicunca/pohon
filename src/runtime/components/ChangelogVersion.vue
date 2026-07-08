<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ImgHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import type { BadgeProps } from './Badge.vue';
import type { LinkProps } from './Link.vue';
import type { UserProps } from './User.vue';
import theme from '#build/ui/changelog-version';

type ChangelogVersion = ComponentConfig<typeof theme, AppConfig, 'changelogVersion'>;

export interface ChangelogVersionProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any;
  title?: string;
  description?: string;
  /** The date of the changelog version. Can be a string or a Date object. */
  date?: string | Date;
  /**
   * Display a badge on the changelog version.
   * Can be a string or an object.
   * `{ color: 'neutral', variant: 'solid' }`{lang="ts-type"}
   */
  badge?: string | BadgeProps;
  /** The authors of the changelog version. */
  authors?: Array<UserProps>;
  /** The image of the changelog version. Can be a string or an object. */
  image?: string | (Partial<ImgHTMLAttributes> & { [key: string]: any });
  /**
   * Display an indicator dot on the left.
   * @defaultValue true
   */
  indicator?: boolean;
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  onClick?: (event: MouseEvent) => void;
  class?: any;
  ui?: ChangelogVersion['slots'];
}

export interface ChangelogVersionSlots {
  header?(props?: {}): Array<VNode>;
  badge?(props: { ui: ChangelogVersion['ui'] }): Array<VNode>;
  date?(props?: {}): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  image?(props: { ui: ChangelogVersion['ui'] }): Array<VNode>;
  body?(props?: {}): Array<VNode>;
  footer?(props?: {}): Array<VNode>;
  authors?(props?: {}): Array<VNode>;
  actions?(props?: {}): Array<VNode>;
  indicator?(props: { ui: ChangelogVersion['ui'] }): Array<VNode>;
}
</script>

<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import { Primitive, useDateFormatter } from 'akar';
import { computed } from 'vue';
import ImageComponent from '#build/ui-image-component';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useLocale } from '../composables/useLocale';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PBadge from './Badge.vue';
import PLink from './Link.vue';
import PUser from './User.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<ChangelogVersionProps>(),
  {
    as: 'article',
    indicator: true,
  },
);
const slots = defineSlots<ChangelogVersionSlots>();

const props = useComponentProps('changelogVersion', _props);

const { locale } = useLocale();
const appConfig = useAppConfig() as ChangelogVersion['AppConfig'];
const formatter = useDateFormatter(locale.value.code);

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
const [DefineDateTemplate, ReuseDateTemplate] = createReusableTemplate<{ hidden?: boolean }>({
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
});

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.changelogVersion || {}) })({
  to: !!props.to || !!props.onClick,
}));

const date = computed(() => {
  if (!props.date) {
    return;
  }

  try {
    return formatter.custom(new Date(props.date), { dateStyle: 'medium' });
  } catch {
    return props.date;
  }
});
const datetime = computed(() => {
  if (!props.date) {
    return;
  }

  try {
    return new Date(props.date)?.toISOString();
  } catch {
    return undefined;
  }
});
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Version link').trim();
});
</script>

<template>
  <DefineLinkTemplate>
    <PLink
      v-if="props.to"
      :aria-label="ariaLabel"
      v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': undefined }"
      class="focus:outline-none peer"
      raw
    >
      <span class="absolute inset-0" aria-hidden="true" />
    </PLink>
  </DefineLinkTemplate>

  <DefineDateTemplate v-slot="{ hidden }">
    <time v-if="date" :datetime="datetime" data-slot="date" :class="ui.date({ class: props.ui?.date, hidden })">
      <slot name="date">
        {{ date }}
      </slot>
    </time>
  </DefineDateTemplate>

  <Primitive :as="props.as" v-bind="!props.to ? $attrs : {}" :data-slot="($attrs['data-slot'] as string | undefined) ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })" @click="props.onClick">
    <div v-if="!!props.indicator || !!slots.indicator" data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })">
      <slot name="indicator" :ui="ui">
        <ReuseDateTemplate />

        <div data-slot="dot" :class="ui.dot({ class: props.ui?.dot })">
          <div data-slot="dotInner" :class="ui.dotInner({ class: props.ui?.dotInner })" />
        </div>
      </slot>
    </div>

    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.header || (date || !!slots.date) || (props.badge || !!slots.badge) || (props.title || !!slots.title) || (props.description || !!slots.description) || (props.image || !!slots.image)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
        <slot name="header">
          <div v-if="(date || !!slots.date) || (props.badge || !!slots.badge)" data-slot="meta" :class="ui.meta({ class: props.ui?.meta, badge: (!!props.badge || !!slots.badge) || !props.indicator })">
            <slot name="badge" :ui="ui">
              <PBadge
                v-if="props.badge"
                color="neutral"
                variant="solid"
                v-bind="typeof props.badge === 'string' ? { label: props.badge } : props.badge"
                data-slot="badge"
                :class="ui.badge({ class: props.ui?.badge })"
              />
            </slot>

            <ReuseDateTemplate :hidden="!!props.indicator" />
          </div>

          <h2 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
            <ReuseLinkTemplate />

            <slot name="title">
              {{ props.title }}
            </slot>
          </h2>

          <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
            <slot name="description">
              {{ props.description }}
            </slot>
          </div>

          <div v-if="props.image || !!slots.image" data-slot="imageWrapper" :class="ui.imageWrapper({ class: props.ui?.imageWrapper })">
            <slot name="image" :ui="ui">
              <component
                :is="ImageComponent"
                v-if="props.image"
                v-bind="typeof props.image === 'string' ? { src: props.image, alt: props.title } : { alt: props.title, ...props.image }"
                data-slot="image"
                :class="ui.image({ class: props.ui?.image, to: !!props.to })"
              />
            </slot>

            <ReuseLinkTemplate />
          </div>
        </slot>
      </div>

      <slot name="body" />

      <div v-if="!!slots.footer || (props.authors?.length || !!slots.authors) || !!slots.actions" data-slot="footer" :class="ui.footer({ class: props.ui?.footer, body: !!slots.body })">
        <slot name="footer">
          <div v-if="props.authors?.length || !!slots.authors" data-slot="authors" :class="ui.authors({ class: props.ui?.authors })">
            <slot name="authors">
              <PUser
                v-for="(author, index) in props.authors"
                :key="index"
                v-bind="author"
              />
            </slot>
          </div>

          <slot name="actions" />
        </slot>
      </div>
    </div>
  </Primitive>
</template>
