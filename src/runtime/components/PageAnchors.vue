<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { IconProps, LinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/page-anchors';

type PageAnchors = ComponentConfig<typeof theme, AppConfig, 'pageAnchors'>;

export interface PageAnchor extends Omit<LinkProps, 'custom'> {
  label: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  class?: any;
  ui?: Pick<PageAnchors['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeading' | 'linkLeadingIcon'>;
}

export interface PageAnchorsProps<T extends PageAnchor = PageAnchor> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any;
  links?: Array<T>;
  class?: any;
  ui?: PageAnchors['slots'];
}

type SlotProps<T> = (props: { link: T; active: boolean; ui: PageAnchors['ui'] }) => Array<VNode>;

export interface PageAnchorsSlots<T extends PageAnchor = PageAnchor> {
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-label'?(props: { link: T; active: boolean }): Array<VNode>;
  'link-trailing'?(props: { link: T; active: boolean }): Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends PageAnchor">
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
  defineProps<PageAnchorsProps<T>>(),
  {
    as: 'nav',
  },
);
const slots = defineSlots<PageAnchorsSlots<T>>();

const props = useComponentProps<PageAnchorsProps<T>>('pageAnchors', _props);

const appConfig = useAppConfig() as PageAnchors['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.pageAnchors || {}) })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <li v-for="(link, index) in props.links" :key="index" data-slot="item" :class="ui.item({ class: [props.ui?.item, link.ui?.item] })">
        <PLink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
          <PLinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active })">
            <slot name="link" :link="link" :active="active" :ui="ui">
              <div v-if="link.icon || !!slots['link-leading']" data-slot="linkLeading" :class="ui.linkLeading({ class: [props.ui?.linkLeading, link.ui?.linkLeading], active })">
                <slot name="link-leading" :link="link" :active="active" :ui="ui">
                  <PIcon v-if="link.icon" :name="link.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
                </slot>
              </div>

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
