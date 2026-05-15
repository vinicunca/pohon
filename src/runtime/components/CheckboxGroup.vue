<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { CheckboxGroupRootEmits, CheckboxGroupRootProps } from 'akar';
import type { VNode } from 'vue';
import type { CheckboxProps } from '../types';
import type { AcceptableValue, GetItemKeys, GetModelValue, GetModelValueEmits } from '../types/utils';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/checkbox-group';

type CheckboxGroup = ComponentConfig<typeof theme, AppConfig, 'checkboxGroup'>;

export type CheckboxGroupValue = AcceptableValue;

export type CheckboxGroupItem = CheckboxGroupValue | {
  label?: string;
  description?: string;
  disabled?: boolean;
  value?: string;
  class?: any;
  ui?: Pick<CheckboxGroup['slots'], 'item'> & Omit<Required<CheckboxProps>['ui'], 'root'>;
  [key: string]: any;
};

export interface CheckboxGroupProps<T extends Array<CheckboxGroupItem> = Array<CheckboxGroupItem>, VK extends GetItemKeys<T> = 'value'> extends Pick<CheckboxGroupRootProps, 'disabled' | 'loop' | 'name' | 'required'>, Pick<CheckboxProps, 'color' | 'indicator' | 'icon' | 'highlight'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  legend?: string;
  /**
   * When `items` is an array of objects, select the field to use as the value.
   * @defaultValue 'value'
   */
  valueKey?: VK;
  /**
   * When `items` is an array of objects, select the field to use as the label.
   * @defaultValue 'label'
   */
  labelKey?: GetItemKeys<T>;
  /**
   * When `items` is an array of objects, select the field to use as the description.
   * @defaultValue 'description'
   */
  descriptionKey?: GetItemKeys<T>;
  items?: T;
  /** The controlled value of the CheckboxGroup. Can be bind as `v-model`. */
  modelValue?: GetModelValue<T, VK, true>;
  /** The value of the CheckboxGroup when initially rendered. Use when you do not need to control the state of the CheckboxGroup. */
  defaultValue?: GetModelValue<T, VK, true>;
  /**
   * @defaultValue 'md'
   */
  size?: CheckboxGroup['variants']['size'];
  /**
   * @defaultValue 'list'
   */
  variant?: CheckboxGroup['variants']['variant'];
  /**
   * The orientation the checkbox buttons are laid out.
   * @defaultValue 'vertical'
   */
  orientation?: CheckboxGroup['variants']['orientation'];
  class?: any;
  ui?: CheckboxGroup['slots'] & CheckboxProps['ui'];
}

export type CheckboxGroupEmits<T extends Array<CheckboxGroupItem> = Array<CheckboxGroupItem>, VK extends GetItemKeys<T> = 'value'> = Omit<CheckboxGroupRootEmits, 'update:modelValue'> & {
  change: [event: Event];
} & GetModelValueEmits<T, VK, true>;

type SlotProps<T extends CheckboxGroupItem> = (props: { item: T & { id: string } }) => Array<VNode>;

export interface CheckboxGroupSlots<T extends Array<CheckboxGroupItem> = Array<CheckboxGroupItem>> {
  legend?(props?: {}): Array<VNode>;
  label?: SlotProps<T[number]>;
  description?: SlotProps<T[number]>;
}
</script>

<script setup lang="ts" generic="T extends CheckboxGroupItem[], VK extends GetItemKeys<T> = 'value'">
import { reactivePick } from '@vueuse/core';
import { CheckboxGroupRoot } from 'akar';
import { computed, useId } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useFormField } from '../composables/useFormField';
import { useForwardProps } from '../composables/useForwardProps';
import { get, omit } from '../utils';
import { uv } from '../utils/uv';
import PCheckbox from './Checkbox.vue';

const _props = withDefaults(
  defineProps<CheckboxGroupProps<T, VK>>(),
  {
    labelKey: 'label',
    descriptionKey: 'description',
    valueKey: 'value' as never,
    orientation: 'vertical',
  },
);
const emits = defineEmits<CheckboxGroupEmits<T, VK>>();
const slots = defineSlots<CheckboxGroupSlots<T>>();

const props = useComponentProps<CheckboxGroupProps<T, VK>>('checkboxGroup', _props);

const appConfig = useAppConfig() as CheckboxGroup['AppConfig'];

const rootProps = useForwardProps(reactivePick(props, 'as', 'modelValue', 'defaultValue', 'orientation', 'loop', 'required'), emits);
const checkboxProps = useForwardProps(reactivePick(props, 'variant', 'indicator', 'icon'));
const getProxySlots = () => omit(slots, ['legend']);

const { emitFormChange, emitFormInput, color, highlight, name, size, id: _id, disabled, ariaAttrs } = useFormField<CheckboxGroupProps<T>>(_props, { bind: false });
const id = _id.value ?? useId();

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.checkboxGroup || {}) })({
  size: size.value ?? props.size,
  required: props.required,
  orientation: props.orientation,
  color: color.value ?? props.color,
  variant: props.variant,
  disabled: disabled.value,
}));

function normalizeItem(item: any) {
  if (item === null) {
    return {
      id: `${id}:null`,
      value: undefined,
      label: undefined,
    };
  }

  if (typeof item === 'string' || typeof item === 'number') {
    return {
      id: `${id}:${item}`,
      value: String(item),
      label: String(item),
    };
  }

  const value = get(item, props.valueKey as string);
  const label = get(item, props.labelKey as string);
  const description = get(item, props.descriptionKey as string);

  return {
    ...item,
    value,
    label,
    description,
    id: `${id}:${value}`,
  };
}

const normalizedItems = computed(() => {
  if (!props.items) {
    return [];
  }
  return props.items.map(normalizeItem);
});

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
  emitFormInput();
}
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <CheckboxGroupRoot
    :id="id"
    v-bind="(rootProps as any)"
    :name="name"
    :disabled="disabled"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <fieldset data-slot="fieldset" :class="ui.fieldset({ class: props.ui?.fieldset })" v-bind="ariaAttrs">
      <legend v-if="props.legend || !!slots.legend" data-slot="legend" :class="ui.legend({ class: props.ui?.legend })">
        <slot name="legend">
          {{ props.legend }}
        </slot>
      </legend>

      <PCheckbox
        v-for="item in normalizedItems"
        :key="item.value"
        v-bind="{ ...item, ...checkboxProps }"
        :color="color"
        :highlight="highlight"
        :size="size"
        :name="name"
        :disabled="item.disabled || disabled"
        :ui="{ ...(props.ui ? omit(props.ui, ['root']) : undefined), ...(item.ui || {}) }"
        data-slot="item"
        :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class], disabled: item.disabled || disabled })"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]>
          <slot :name="(name as keyof CheckboxGroupSlots<T>)" :item="item" />
        </template>
      </PCheckbox>
    </fieldset>
  </CheckboxGroupRoot>
</template>
