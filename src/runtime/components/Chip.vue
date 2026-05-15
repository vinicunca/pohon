<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/chip';

type Chip = ComponentConfig<typeof theme, AppConfig, 'chip'>;

export interface ChipProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /** Display some text inside the chip. */
  text?: string | number;
  /**
   * @defaultValue 'primary'
   */
  color?: Chip['variants']['color'];
  /**
   * @defaultValue 'md'
   */
  size?: Chip['variants']['size'];
  /**
   * The position of the chip.
   * @defaultValue 'top-right'
   */
  position?: Chip['variants']['position'];
  /** When `true`, keep the chip inside the component for rounded elements. */
  inset?: boolean;
  /** When `true`, render the chip relatively to the parent. */
  standalone?: boolean;
  class?: any;
  ui?: Chip['slots'];
}

export interface ChipEmits {
  'update:show': [value: boolean];
}

export interface ChipSlots {
  default?(props?: {}): Array<VNode>;
  content?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive, Slot } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useAvatarGroup } from '../composables/useAvatarGroup';
import { useComponentProps } from '../composables/useComponentProps';
import { uv } from '../utils/uv';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<ChipProps>(),
  {
    inset: false,
    standalone: false,
  },
);
defineSlots<ChipSlots>();

const props = useComponentProps('chip', _props);

const show = defineModel<boolean>('show', { default: true });

const { size } = useAvatarGroup(_props);
const appConfig = useAppConfig() as Chip['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.chip || {}) })({
  color: props.color,
  size: size.value ?? props.size,
  position: props.position,
  inset: props.inset,
  standalone: props.standalone,
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <Slot v-bind="$attrs">
      <slot />
    </Slot>

    <span v-if="show" data-slot="base" :class="ui.base({ class: props.ui?.base })">
      <slot name="content">
        {{ props.text }}
      </slot>
    </span>
  </Primitive>
</template>
