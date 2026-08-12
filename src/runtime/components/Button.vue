<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { Ref, VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { ComponentConfig } from '../types/uv';
import type { AvatarProps } from './Avatar.vue';
import type { LinkProps } from './Link.vue';
import theme from '#build/ui/button';

type Button = ComponentConfig<typeof theme, AppConfig, 'button'>;

export interface ButtonProps extends UseComponentIconsProps, Omit<LinkProps, 'raw' | 'custom'> {
  label?: string;
  /**
   * @defaultValue 'primary'
   */
  color?: Button['variants']['color'];
  activeColor?: Button['variants']['color'];
  /**
   * @defaultValue 'solid'
   */
  variant?: Button['variants']['variant'];
  activeVariant?: Button['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: Button['variants']['size'];
  /** Render the button with equal padding on all sides. */
  square?: boolean;
  /** Render the button full width. */
  block?: boolean;
  /** Set loading state automatically based on the `@click` promise state */
  loadingAuto?: boolean;
  onClick?: ((event: MouseEvent) => void) | Array<((event: MouseEvent) => void)>;
  class?: any;
  ui?: Button['slots'];
}

export interface ButtonSlots {
  leading?(props: { ui: Button['ui'] }): Array<VNode>;
  default?(props: { ui: Button['ui'] }): Array<VNode>;
  trailing?(props: { ui: Button['ui'] }): Array<VNode>;
}
</script>

<script setup lang="ts">
import { defu } from 'defu';
import { computed, inject, ref } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentIcons } from '../composables/useComponentIcons';
import { useComponentProps } from '../composables/useComponentProps';
import { useFieldGroup } from '../composables/useFieldGroup';
import { formLoadingInjectionKey } from '../composables/useFormField';
import { useForwardProps } from '../composables/useForwardProps';
import { mergeClasses, omit } from '../utils';
import { pickLinkProps } from '../utils/link';
import { uv } from '../utils/uv';
import PAvatar from './Avatar.vue';
import PIcon from './Icon.vue';
import PLink from './Link.vue';
import PLinkBase from './LinkBase.vue';

const _props = defineProps<ButtonProps>();
const slots = defineSlots<ButtonSlots>();

const props = useComponentProps('button', _props);

const appConfig = useAppConfig() as Button['AppConfig'];
const { orientation, size: buttonSize } = useFieldGroup<ButtonProps>(_props);

// Memoized: `omit` iterates every forwarded key through three proxy layers
// (useForwardProps -> reactivePick -> useComponentProps), so doing it inline in
// the template re-paid that walk on every render.
const linkProps = useForwardProps(pickLinkProps(props));
const forwardedLinkProps = computed(() => omit(linkProps.value, ['type', 'disabled', 'onClick']));

const loadingAutoState = ref(false);
const formLoading = inject<Ref<boolean> | undefined>(formLoadingInjectionKey, undefined);

async function onClickWrapper(event: MouseEvent) {
  loadingAutoState.value = true;
  const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
  try {
    await Promise.all(callbacks.map((fn) => fn?.(event)));
  } finally {
    loadingAutoState.value = false;
  }
}

const isLoading = computed(() => {
  return props.loading || (props.loadingAuto && (loadingAutoState.value || (formLoading?.value && props.type === 'submit')));
});

// Pass only the props the composable reads: a `{ ...props }` spread would walk
// every prop through the `useComponentProps` proxy and subscribe this computed
// (and `ui`, which reads `isLeading`/`isTrailing`) to all of them, re-running
// the whole uv pipeline on unrelated prop changes like `class`.
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
  computed(() => ({
    icon: props.icon,
    leading: props.leading,
    leadingIcon: props.leadingIcon,
    trailing: props.trailing,
    trailingIcon: props.trailingIcon,
    loading: isLoading.value,
    loadingIcon: props.loadingIcon,
  })),
);

const ui = computed(() => uv({
  extend: theme,
  ...defu({
    variants: {
      active: {
        true: {
          base: mergeClasses(appConfig.ui?.button?.variants?.active?.true?.base, props.activeClass),
        },
        false: {
          base: mergeClasses(appConfig.ui?.button?.variants?.active?.false?.base, props.inactiveClass),
        },
      },
    },
  }, appConfig.ui?.button || {}),
})({
  color: props.color,
  variant: props.variant,
  size: buttonSize.value ?? props.size,
  loading: isLoading.value,
  block: props.block,
  square: props.square || (!slots.default && !props.label),
  leading: isLeading.value,
  trailing: isTrailing.value,
  fieldGroup: orientation.value,
}));
</script>

<template>
  <PLink
    v-slot="{ active, ...slotProps }"
    :type="props.type"
    :disabled="props.disabled || isLoading"
    v-bind="forwardedLinkProps"
    custom
  >
    <PLinkBase
      data-slot="base"
      v-bind="slotProps"
      :class="ui.base({
        class: [props.ui?.base, props.class],
        active,
        ...(active && props.activeVariant ? { variant: props.activeVariant } : {}),
        ...(active && props.activeColor ? { color: props.activeColor } : {}),
      })"
      @click="onClickWrapper"
    >
      <slot name="leading" :ui="ui">
        <PIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon, active })" />
        <PAvatar v-else-if="!!props.avatar" :size="((props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])" v-bind="props.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar, active })" />
      </slot>

      <slot :ui="ui">
        <span v-if="props.label !== undefined && props.label !== null" data-slot="label" :class="ui.label({ class: props.ui?.label, active })">
          {{ props.label }}
        </span>
      </slot>

      <slot name="trailing" :ui="ui">
        <PIcon v-if="isTrailing && trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon, active })" />
      </slot>
    </PLinkBase>
  </PLink>
</template>
