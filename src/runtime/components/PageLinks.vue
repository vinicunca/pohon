<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { IconProps, LinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/page-links';

type PageLinks = ComponentConfig<typeof theme, AppConfig, 'pageLinks'>;

export interface PageLink extends Omit<LinkProps, 'custom'> {
  label: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  class?: any;
  ui?: Pick<PageLinks['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>;
}

export interface PageLinksProps<T extends PageLink = PageLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  title?: string;
  links?: Array<T>;
  class?: any;
  ui?: PageLinks['slots'];
}

type SlotProps<T> = (props: { link: T; active: boolean; ui: PageLinks['ui'] }) => Array<VNode>;

export interface PageLinksSlots<T extends PageLink = PageLink> {
  'title'?(props?: {}): Array<VNode>;
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-label'?(props: { link: T; active: boolean }): Array<VNode>;
  'link-trailing'?(props: { link: T; active: boolean }): Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends PageLink">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PIcon from './Icon.vue';
import PLink from './Link.vue';
import PLinkBase from './LinkBase.vue';

const _props = withDefaults(
  defineProps<PageLinksProps<T>>(),
  {
    as: 'nav',
  },
);
const slots = defineSlots<PageLinksSlots<T>>();

const props = useComponentProps<PageLinksProps<T>>('pageLinks', _props);

const appConfig = useAppConfig() as PageLinks['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.pageLinks || {}) })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <p v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
      <slot name="title">
        {{ props.title }}
      </slot>
    </p>

    <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <li v-for="(link, index) in props.links" :key="index" data-slot="item" :class="ui.item({ class: [props.ui?.item, link.ui?.item] })">
        <PLink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
          <PLinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active })">
            <slot name="link" :link="link" :active="active" :ui="ui">
              <slot name="link-leading" :link="link" :active="active" :ui="ui">
                <PIcon v-if="link.icon" :name="link.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
              </slot>

              <span v-if="link.label || !!slots['link-label']" data-slot="linkLabel" :class="ui.linkLabel({ class: [props.ui?.linkLabel, link.ui?.linkLabel], active })">
                <slot name="link-label" :link="link" :active="active">
                  {{ link.label }}
                </slot>

                <PIcon v-if="link.target === '_blank'" :name="appConfig.ui.icons.external" data-slot="linkLabelExternalIcon" :class="ui.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })" />
              </span>

              <slot name="link-trailing" :link="link" :active="active" />
            </slot>
          </PLinkBase>
        </PLink>
      </li>
    </ul>
  </Primitive>
</template>
