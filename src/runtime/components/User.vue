<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { AvatarProps, ChipProps, LinkProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/user';

type User = ComponentConfig<typeof theme, AppConfig, 'user'>;

export interface UserProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  name?: string;
  description?: string;
  avatar?: Omit<AvatarProps, 'size'> & { [key: string]: any };
  chip?: boolean | Omit<ChipProps, 'size' | 'inset'>;
  /**
   * @defaultValue 'md'
   */
  size?: User['variants']['size'];
  /**
   * The orientation of the user.
   * @defaultValue 'horizontal'
   */
  orientation?: User['variants']['orientation'];
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  ui?: User['slots'];
}

export interface UserSlots {
  avatar?(props: { ui: User['ui'] }): Array<VNode>;
  name?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  default?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';
import PAvatar from './Avatar.vue';
import PChip from './Chip.vue';
import PLink from './Link.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<UserProps>(),
  {
    orientation: 'horizontal',
  },
);
const slots = defineSlots<UserSlots>();

const props = useComponentProps('user', _props);

const appConfig = useAppConfig() as User['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.user || {}) })({
  size: props.size,
  orientation: props.orientation,
  to: !!props.to || !!props.onClick,
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })" @click="props.onClick">
    <slot name="avatar" :ui="ui">
      <PChip v-if="props.chip && props.avatar" inset v-bind="typeof props.chip === 'object' ? props.chip : {}" :size="props.size">
        <PAvatar :alt="props.name" v-bind="props.avatar" :size="props.size" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
      </PChip>
      <PAvatar
        v-else-if="props.avatar"
        :alt="props.name"
        v-bind="props.avatar"
        :size="props.size"
        data-slot="avatar"
        :class="ui.avatar({ class: props.ui?.avatar })"
      />
    </slot>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <PLink
        v-if="props.to"
        :aria-label="props.name"
        v-bind="{ to: props.to, target: props.target, ...$attrs }"
        class="peer focus:outline-none"
        raw
      >
        <span class="inset-0 absolute" aria-hidden="true" />
      </PLink>

      <slot>
        <p v-if="props.name || !!slots.name" data-slot="name" :class="ui.name({ class: props.ui?.name })">
          <slot name="name">
            {{ props.name }}
          </slot>
        </p>
        <p v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </p>
      </slot>
    </div>
  </Primitive>
</template>
