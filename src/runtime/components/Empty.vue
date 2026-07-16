<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { AvatarProps } from './Avatar.vue';
import type { ButtonProps } from './Button.vue';
import type { IconProps } from './Icon.vue';
import theme from '#build/ui/empty';

type Empty = ComponentConfig<typeof theme, AppConfig, 'empty'>;

export interface EmptyProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The icon displayed above the title.
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  avatar?: AvatarProps;
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean;
  /**
   * The icon when the `loading` prop is `true`.
   * @defaultValue appConfig.ui.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: IconProps['name'];
  title?: string;
  description?: string;
  /**
   * Display a list of Button in the body.
   */
  actions?: Array<ButtonProps>;
  /**
   * @defaultValue 'outline'
   */
  variant?: Empty['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Empty['variants']['size'];
  class?: any;
  ui?: Empty['slots'];
}

export interface EmptySlots {
  header?(props?: {}): Array<VNode>;
  leading?(props: { ui: Empty['ui'] }): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  body?(props?: {}): Array<VNode>;
  actions?(props?: {}): Array<VNode>;
  footer?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';
import UAvatar from './Avatar.vue';
import UButton from './Button.vue';

const _props = defineProps<EmptyProps>();
const slots = defineSlots<EmptySlots>();

const props = useComponentProps('empty', _props);

const appConfig = useAppConfig() as Empty['AppConfig'];

const iconName = computed(() => props.loading ? (props.loadingIcon || appConfig.ui.icons.loading) : props.icon);

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.empty || {}) })({
  variant: props.variant,
  size: props.size,
  loading: props.loading,
}));
</script>

<template>
  <Primitive :as="props.as" :aria-busy="props.loading ? 'true' : undefined" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.header || (iconName || props.avatar || !!slots.leading) || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header">
        <slot name="leading" :ui="ui">
          <UAvatar v-if="iconName || props.avatar" :icon="iconName" v-bind="typeof props.avatar === 'object' ? props.avatar : {}" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
        </slot>

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

    <div v-if="!!slots.body || (props.actions?.length || !!slots.actions)" data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot name="body">
        <div v-if="props.actions?.length || !!slots.actions" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
          <slot name="actions">
            <UButton v-for="(action, index) in props.actions" :key="index" :size="props.size" v-bind="action" />
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
