<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { PropType, VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import type { IconProps } from '../Icon.vue';
import theme from '#build/ui/content/content-surround';

type ContentSurround = ComponentConfig<typeof theme, AppConfig, 'contentSurround'>;

export interface ContentSurroundLink extends ContentNavigationItem {
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  class?: any;
  ui?: Pick<ContentSurround['slots'], 'link' | 'linkLeading' | 'linkLeadingIcon' | 'linkTitle' | 'linkDescription'>;
}

export interface ContentSurroundProps<T extends ContentSurroundLink = ContentSurroundLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed in the prev link.
   * @defaultValue appConfig.ui.icons.arrowLeft
   * @IconifyIcon
   */
  prevIcon?: IconProps['name'];
  /**
   * The icon displayed in the next link.
   * @defaultValue appConfig.ui.icons.arrowRight
   * @IconifyIcon
   */
  nextIcon?: IconProps['name'];
  surround?: Array<T>;
  class?: any;
  ui?: ContentSurround['slots'];
}

type SlotProps<T> = (props: { link: T; ui: ContentSurround['ui'] }) => Array<VNode>;

export interface ContentSurroundSlots<T extends ContentSurroundLink = ContentSurroundLink> {
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-title'?: SlotProps<T>;
  'link-description'?: SlotProps<T>;
}
</script>

<script setup lang="ts" generic="T extends ContentSurroundLink">
import { createReusableTemplate } from '@vueuse/core';
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { useLocale } from '../../composables/useLocale';
import { uv } from '../../utils/uv';
import PIcon from '../Icon.vue';
import PLink from '../Link.vue';

defineOptions({ inheritAttrs: false });

const _props = defineProps<ContentSurroundProps<T>>();

defineSlots<ContentSurroundSlots<T>>();

const props = useComponentProps<ContentSurroundProps<T>>('contentSurround', _props);

const { dir } = useLocale();
const appConfig = useAppConfig() as ContentSurround['AppConfig'];

const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate<{ link?: ContentSurroundLink; icon: IconProps['name']; direction: 'left' | 'right' }>({
  props: {
    link: Object,
    icon: String,
    direction: String as PropType<'left' | 'right'>,
  },
});

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.contentSurround || {}) })());

const prevIcon = computed(() => props.prevIcon || (dir.value === 'rtl' ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));

const nextIcon = computed(() => props.nextIcon || (dir.value === 'rtl' ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, icon, direction }">
    <PLink v-if="link" :to="link.path" raw data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], direction })">
      <slot name="link" :link="(link as T)" :ui="ui">
        <div data-slot="linkLeading" :class="ui.linkLeading({ class: [props.ui?.linkLeading, link.ui?.linkLeading] })">
          <slot name="link-leading" :link="(link as T)" :ui="ui">
            <PIcon :name="link.icon || icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], direction })" />
          </slot>
        </div>

        <p data-slot="linkTitle" :class="ui.linkTitle({ class: [props.ui?.linkTitle, link.ui?.linkTitle] })">
          <slot name="link-title" :link="(link as T)" :ui="ui">
            {{ link.title }}
          </slot>
        </p>

        <p data-slot="linkDescription" :class="ui.linkDescription({ class: [props.ui?.linkDescription, link.ui?.linkDescription] })">
          <slot name="link-description" :link="(link as T)" :ui="ui">
            {{ link.description }}
          </slot>
        </p>
      </slot>
    </PLink>
    <span v-else class="hidden sm:block">&nbsp;</span>
  </DefineLinkTemplate>

  <Primitive v-if="props.surround" :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ReuseLinkTemplate :link="props.surround[0]" :icon="prevIcon" direction="left" />
    <ReuseLinkTemplate :link="props.surround[1]" :icon="nextIcon" direction="right" />
  </Primitive>
</template>
