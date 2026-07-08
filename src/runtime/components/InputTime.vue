<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SegmentPart, TimeFieldRootEmits, TimeFieldRootProps, TimeRangeFieldRootEmits, TimeRangeFieldRootProps, TimeValue } from 'akar';
import type { ComponentPublicInstance, VNode } from 'vue';
import type { UseComponentIconsProps } from '../composables/useComponentIcons';
import type { ComponentConfig } from '../types/uv';
import type { AvatarProps } from './Avatar.vue';
import type { IconProps } from './Icon.vue';
import theme from '#build/ui/input-time';

type InputTime = ComponentConfig<typeof theme, AppConfig, 'inputTime'>;

type InputTimeDefaultValue<R extends boolean = false> = R extends true
  ? TimeRangeFieldRootProps['defaultValue']
  : TimeFieldRootProps['defaultValue'];

type InputTimeModelValue<R extends boolean = false> = (R extends true
  ? TimeRangeFieldRootProps['modelValue']
  : TimeFieldRootProps['modelValue']) | undefined;

type _TimeFieldRootProps = Omit<TimeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir'>;
type _TimeRangeFieldRootProps = Omit<TimeRangeFieldRootProps, 'as' | 'asChild' | 'modelValue' | 'defaultValue' | 'dir'>;

export interface InputTimeProps<R extends boolean = false> extends UseComponentIconsProps, _TimeFieldRootProps, _TimeRangeFieldRootProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'primary'
   */
  color?: InputTime['variants']['color'];
  /**
   * @defaultValue 'outline'
   */
  variant?: InputTime['variants']['variant'];
  /**
   * @defaultValue 'md'
   */
  size?: InputTime['variants']['size'];
  /** Highlight the ring color like a focus state. */
  highlight?: boolean;
  /** Keep the mobile text size on all breakpoints. */
  fixed?: boolean;
  autofocus?: boolean;
  autofocusDelay?: number;
  /**
   * The icon to use as a range separator.
   * @defaultValue appConfig.ui.icons.minus
   * @IconifyIcon
   */
  separatorIcon?: IconProps['name'];
  /**
   * Enable time range selection.
   * @defaultValue false
   */
  range?: R & boolean;
  /** The value of the input when initially rendered. Use when you do not need to control the state of the input. */
  defaultValue?: InputTimeDefaultValue<R>;
  /** The controlled value of the input. Can be bind as `v-model`. */
  modelValue?: InputTimeModelValue<R>;
  class?: any;
  ui?: InputTime['slots'];
}

export interface InputTimeEmits<R extends boolean = false> extends Omit<TimeFieldRootEmits & TimeRangeFieldRootEmits, 'update:modelValue'> {
  'update:modelValue': [value: InputTimeModelValue<R>];
  'change': [event: Event];
  'blur': [event: FocusEvent];
  'focus': [event: FocusEvent];
}

export interface InputTimeSlots {
  leading?(props: { ui: InputTime['ui'] }): Array<VNode>;
  default?(props: { ui: InputTime['ui'] }): Array<VNode>;
  trailing?(props: { ui: InputTime['ui'] }): Array<VNode>;
  separator?(props: { ui: InputTime['ui'] }): Array<VNode>;
}
</script>

<script setup lang="ts" generic="R extends boolean">
import { createReusableTemplate, reactiveOmit } from '@vueuse/core';
import { TimeRangeFieldInput, TimeRangeFieldRoot } from 'akar';
import { TimeField as SingleTimeField } from 'akar/namespaced';
import { computed, onMounted, ref } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentIcons } from '../composables/useComponentIcons';
import { useComponentProps } from '../composables/useComponentProps';
import { useFieldGroup } from '../composables/useFieldGroup';
import { useFormField } from '../composables/useFormField';
import { useForwardProps } from '../composables/useForwardProps';
import { uv } from '../utils/uv';
import PAvatar from './Avatar.vue';
import PIcon from './Icon.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<InputTimeProps<R>>(),
  {
    autofocusDelay: 0,
  },
);
const emits = defineEmits<InputTimeEmits<R>>();
const slots = defineSlots<InputTimeSlots>();

const props = useComponentProps<InputTimeProps<R>>('inputTime', _props);

const appConfig = useAppConfig() as InputTime['AppConfig'];

const rootProps = useForwardProps(reactiveOmit(props, 'id', 'name', 'range', 'modelValue', 'defaultValue', 'color', 'variant', 'size', 'highlight', 'fixed', 'disabled', 'autofocus', 'autofocusDelay', 'icon', 'avatar', 'leading', 'leadingIcon', 'trailing', 'trailingIcon', 'loading', 'loadingIcon', 'separatorIcon', 'class', 'ui'), emits);

const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color, size: formFieldSize, name, highlight, disabled, ariaAttrs } = useFormField<InputTimeProps<R>>(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup<InputTimeProps<R>>(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);

const inputSize = computed(() => fieldGroupSize.value || formFieldSize.value);

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.inputTime || {}) })({
  color: color.value ?? props.color,
  variant: props.variant,
  size: inputSize.value ?? props.size,
  loading: props.loading,
  highlight: highlight.value ?? props.highlight,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
}));

const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate<{
  segments?: Array<{ part: SegmentPart; value: string }>;
  type?: 'start' | 'end';
}>();

const inputsRef = ref<Array<ComponentPublicInstance>>([]);

// FIXME: Move to namespaced when exported in `akar`
const RangeTimeField = { Root: TimeRangeFieldRoot, Input: TimeRangeFieldInput };

const TimeField = computed(() => props.range ? RangeTimeField : SingleTimeField);

function setInputRef(index: number, el: Element | ComponentPublicInstance | null) {
  // @ts-expect-error - ComponentPublicInstance type mismatch in Nuxt module augmentation
  inputsRef.value[index] = el;
}

function onUpdate(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);

  emitFormChange();
  emitFormInput();
}

function onBlur(event: FocusEvent) {
  emitFormBlur();
  emits('blur', event);
}

function onFocus(event: FocusEvent) {
  emitFormFocus();
  emits('focus', event);
}

function autoFocus() {
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus();
  }
}

onMounted(() => {
  setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});

defineExpose({
  inputsRef,
});
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <TimeField.Input
      v-for="(segment, index) in segments"
      :key="`${segment.part}-${index}`"
      :ref="el => setInputRef(index, el)"
      :type="type"
      :part="segment.part"
      data-slot="segment"
      :class="ui.segment({ class: props.ui?.segment })"
      :data-segment="segment.part"
    >
      {{ segment.value.trim() }}
    </TimeField.Input>
  </DefineSegmentsTemplate>

  <TimeField.Root
    :id="id"
    v-slot="{ segments }"
    data-slot="base"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :name="name"
    :disabled="disabled"
    :model-value="(props.modelValue as TimeValue)"
    :default-value="(props.defaultValue as TimeValue)"
    :class="ui.base({ class: [props.ui?.base, props.class] })"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <template v-if="Array.isArray(segments)">
      <ReuseSegmentsTemplate :segments="segments" />
    </template>
    <template v-else>
      <ReuseSegmentsTemplate :segments="segments.start" type="start" />
      <slot name="separator" :ui="ui">
        <PIcon :name="props.separatorIcon || appConfig.ui.icons.minus" data-slot="separatorIcon" :class="ui.separatorIcon({ class: props.ui?.separatorIcon })" />
      </slot>
      <ReuseSegmentsTemplate :segments="segments.end" type="end" />
    </template>

    <slot :ui="ui" />

    <span v-if="isLeading || !!props.avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" :ui="ui">
        <PIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
        <PAvatar v-else-if="!!props.avatar" :size="((props.ui?.leadingAvatarSize || ui.leadingAvatarSize()) as AvatarProps['size'])" v-bind="props.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })" />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
      <slot name="trailing" :ui="ui">
        <PIcon v-if="trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
      </slot>
    </span>
  </TimeField.Root>
</template>
