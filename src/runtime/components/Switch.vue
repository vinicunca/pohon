<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SwitchRootEmits, SwitchRootProps } from 'akar';
import type { VNode } from 'vue';
import type { IconProps } from '../types';
import type { ButtonHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/switch';

type Switch = ComponentConfig<typeof theme, AppConfig, 'switch'>;

export interface SwitchProps<T = boolean> extends Pick<SwitchRootProps<T>, 'disabled' | 'id' | 'name' | 'required' | 'value' | 'defaultValue' | 'modelValue' | 'trueValue' | 'falseValue'>, /** @vue-ignore */ Omit<ButtonHTMLAttributes, 'type' | 'disabled' | 'name'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'primary'
   */
  color?: Switch['variants']['color'];
  /**
   * @defaultValue 'md'
   */
  size?: Switch['variants']['size'];
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /** When `true`, the loading icon will be displayed. */
  loading?: boolean;
  /**
   * The icon when the `loading` prop is `true`.
   * @defaultValue appConfig.ui.icons.loading
   * @IconifyIcon
   */
  loadingIcon?: IconProps['name'];
  /**
   * Display an icon when the switch is checked.
   * @IconifyIcon
   */
  checkedIcon?: IconProps['name'];
  /**
   * Display an icon when the switch is unchecked.
   * @IconifyIcon
   */
  uncheckedIcon?: IconProps['name'];
  label?: string;
  description?: string;
  class?: any;
  ui?: Switch['slots'];
}

export interface SwitchEmits<T = boolean> extends SwitchRootEmits<T> {
  change: [event: Event];
}

export interface SwitchSlots {
  label?(props: { label: string | undefined }): Array<VNode>;
  description?(props: { description: string | undefined }): Array<VNode>;
}
</script>

<script setup lang="ts" generic="T = boolean">
import { reactivePick } from '@vueuse/core';
import { Label, Primitive, SwitchRoot, SwitchThumb } from 'akar';
import { computed, useAttrs, useId } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useFormField } from '../composables/useFormField';
import { useForwardProps } from '../composables/useForwardProps';
import { uv } from '../utils/uv';
import PIcon from './Icon.vue';

defineOptions({ inheritAttrs: false });

const _props = defineProps<SwitchProps<T>>();
const emits = defineEmits<SwitchEmits<T>>();
const slots = defineSlots<SwitchSlots>();
const props = useComponentProps<SwitchProps<T>>('switch', _props);

const appConfig = useAppConfig() as Switch['AppConfig'];

const rootProps = useForwardProps(reactivePick(props, 'required', 'value', 'defaultValue', 'modelValue', 'trueValue', 'falseValue'), emits);

const { id: _id, emitFormChange, emitFormInput, size, color, highlight, name, disabled, ariaAttrs } = useFormField<SwitchProps<T>>(_props);
const id = _id.value ?? useId();

const attrs = useAttrs();
// Omit `data-state` to prevent conflicts with parent components (e.g. TooltipTrigger)
const forwardedAttrs = computed(() => {
  const { 'data-state': _, ...rest } = attrs;
  return rest;
});

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.switch || {}) })({
  size: size.value ?? props.size,
  color: color.value ?? props.color,
  highlight: highlight.value ?? props.highlight,
  required: props.required,
  loading: props.loading,
  disabled: disabled.value || props.loading,
}));

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <SwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        :name="name"
        :disabled="disabled || props.loading"
        data-slot="base"
        :class="ui.base({ class: props.ui?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb data-slot="thumb" :class="ui.thumb({ class: props.ui?.thumb })">
          <PIcon v-if="props.loading" :name="props.loadingIcon || appConfig.ui.icons.loading" data-slot="icon" :class="ui.icon({ class: props.ui?.icon, checked: true, unchecked: true })" />
          <template v-else>
            <PIcon v-if="props.checkedIcon" :name="props.checkedIcon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon, checked: true })" />
            <PIcon v-if="props.uncheckedIcon" :name="props.uncheckedIcon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon, unchecked: true })" />
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="(props.label || !!slots.label) || (props.description || !!slots.description)" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <Label v-if="props.label || !!slots.label" :for="id" data-slot="label" :class="ui.label({ class: props.ui?.label })">
        <slot name="label" :label="props.label">
          {{ props.label }}
        </slot>
      </Label>
      <p v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
