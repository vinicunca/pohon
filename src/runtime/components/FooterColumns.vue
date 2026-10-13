<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { IconProps } from './Icon.vue';
import type { LinkProps } from './Link.vue';
import theme from '#build/ui/footer-columns';

type FooterColumns = ComponentConfig<typeof theme, AppConfig, 'footerColumns'>;

export interface FooterColumnLink extends Omit<LinkProps, 'custom'> {
  label: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  class?: any;
  ui?: Partial<Pick<FooterColumns['slots'], 'item' | 'link' | 'linkLabel' | 'linkLabelExternalIcon' | 'linkLeadingIcon'>>;
}

export interface FooterColumn<T extends FooterColumnLink = FooterColumnLink> {
  label: string;
  children?: Array<T>;
}

export interface FooterColumnsProps<T extends FooterColumnLink = FooterColumnLink> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'nav'
   */
  as?: any | { root?: any; label?: any };
  class?: any;
  columns?: Array<FooterColumn<T>>;
  ui?: FooterColumns['slots'];
}

type SlotProps<T> = (props: { link: T; active: boolean; ui: FooterColumns['ui'] }) => Array<VNode>;

export interface FooterColumnsSlots<T extends FooterColumnLink = FooterColumnLink> {
  'left'?(props?: {}): Array<VNode>;
  'default'?(props?: {}): Array<VNode>;
  'right'?(props?: {}): Array<VNode>;
  'column-label'?: (props: { column: FooterColumn<T> }) => Array<VNode>;
  'link'?: SlotProps<T>;
  'link-leading'?: SlotProps<T>;
  'link-label'?(props: { link: T; active: boolean }): Array<VNode>;
  'link-trailing'?(props: { link: T; active: boolean }): Array<VNode>;
}
</script>

<script setup lang="ts" generic="T extends FooterColumnLink">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { resolveAs } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PIcon from './Icon.vue';
import PLink from './Link.vue';
import PLinkBase from './LinkBase.vue';

const _props = defineProps<FooterColumnsProps<T>>();
const slots = defineSlots<FooterColumnsSlots<T>>();

const props = useComponentProps<FooterColumnsProps<T>>('footerColumns', _props);

const appConfig = useAppConfig() as FooterColumns['AppConfig'];

const as = computed(() => resolveAs(props.as, { root: 'nav', label: 'h3' }));

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.footerColumns || {}) })());
</script>

<template>
  <Primitive :as="as.root" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.left" data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <slot name="left" />
    </div>

    <div v-if="!!slots.default || props.columns?.length" data-slot="center" :class="ui.center({ class: props.ui?.center })">
      <slot>
        <div v-for="(column, index) in props.columns" :key="index">
          <Primitive :as="as.label" data-slot="label" :class="ui.label({ class: props.ui?.label })">
            <slot name="column-label" :column="column">
              {{ column.label }}
            </slot>
          </Primitive>

          <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
            <li v-for="(link, linkIndex) in column.children" :key="linkIndex" data-slot="item" :class="ui.item({ class: [props.ui?.item, link.ui?.item] })">
              <PLink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
                <PLinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active })">
                  <slot name="link" :link="(link as T)" :active="active" :ui="ui">
                    <slot name="link-leading" :link="(link as T)" :active="active" :ui="ui">
                      <PIcon v-if="link.icon" :name="link.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
                    </slot>

                    <span v-if="link.label || !!slots['link-label']" data-slot="linkLabel" :class="ui.linkLabel({ class: [props.ui?.linkLabel, link.ui?.linkLabel], active })">
                      <slot name="link-label" :link="(link as T)" :active="active">
                        {{ (link as T).label }}
                      </slot>

                      <PIcon v-if="link.target === '_blank'" :name="appConfig.ui.icons.external" data-slot="linkLabelExternalIcon" :class="ui.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })" />
                    </span>

                    <slot name="link-trailing" :link="(link as T)" :active="active" />
                  </slot>
                </PLinkBase>
              </PLink>
            </li>
          </ul>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.right" data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />
    </div>
  </Primitive>
</template>
