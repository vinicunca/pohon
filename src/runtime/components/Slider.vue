<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { SliderRootProps } from 'akar';
import type { ComponentConfig } from '../types/uv';
import type { TooltipProps } from './Tooltip.vue';
import theme from '#build/ui/slider';

type Slider = ComponentConfig<typeof theme, AppConfig, 'slider'>;

export interface SliderProps extends Pick<SliderRootProps, 'name' | 'disabled' | 'inverted' | 'min' | 'max' | 'step' | 'minStepsBetweenThumbs'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * @defaultValue 'md'
   */
  size?: Slider['variants']['size'];
  /**
   * @defaultValue 'primary'
   */
  color?: Slider['variants']['color'];
  /**
   * The orientation of the slider.
   * @defaultValue 'horizontal'
   */
  orientation?: Slider['variants']['orientation'];
  /**
   * Display a tooltip around the slider thumbs with the current value.
   * `{ disableClosingTrigger: true }`{lang="ts-type"}
   * @defaultValue false
   */
  tooltip?: boolean | TooltipProps;
  /** The value of the slider when initially rendered. Use when you do not need to control the state of the slider. */
  defaultValue?: number | Array<number>;
  class?: any;
  ui?: Slider['slots'];
}

export interface SliderEmits {
  change: [event: Event];
}
</script>

<script setup lang="ts" generic="T extends number | number[]">
import { reactivePick } from '@vueuse/core';
import { SliderRange, SliderRoot, SliderThumb, SliderTrack } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useFormField } from '../composables/useFormField';
import { useForwardProps } from '../composables/useForwardProps';
import { omit, pick } from '../utils';
import { uv } from '../utils/uv';
import PTooltip from './Tooltip.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<SliderProps>(),
  {
    min: 0,
    max: 100,
    step: 1,
    orientation: 'horizontal',
  },
);
const emits = defineEmits<SliderEmits>();

const props = useComponentProps<SliderProps>('slider', _props);

const modelValue = defineModel<T>();

const appConfig = useAppConfig() as Slider['AppConfig'];

const rootProps = useForwardProps(reactivePick(props, 'as', 'orientation', 'min', 'max', 'step', 'minStepsBetweenThumbs', 'inverted'));

const {
  id,
  emitFormChange,
  emitFormInput,
  size: formFieldSize,
  color: formFieldColor,
  name,
  disabled: formFieldDisabled,
  ariaAttrs,
} = useFormField<SliderProps>(_props);

const color = computed(() => formFieldColor.value ?? props.color);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);

const defaultSliderValue = computed(() => {
  if (typeof props.defaultValue === 'number') {
    return [props.defaultValue];
  }
  return props.defaultValue;
});

const sliderValue = computed({
  get() {
    if (typeof modelValue.value === 'number') {
      return [modelValue.value];
    }
    return (modelValue.value as Array<number>) ?? defaultSliderValue.value;
  },
  set(value) {
    modelValue.value = (value?.length !== 1 ? value : value[0]) as T;
  },
});

const thumbs = computed(() => sliderValue.value?.length ?? 1);

// The thumb is the element with `role="slider"`, so these describe it rather than the root.
// Multiple thumbs keep Akar's positional names and the caller's label groups them on the root.
const thumbAttrs = ['aria-label', 'aria-labelledby', 'aria-describedby', 'aria-valuetext', 'aria-invalid', 'aria-errormessage'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.slider || {}) })({
  disabled: disabled.value,
  size: size.value,
  color: color.value,
  orientation: props.orientation,
}));

function onChange(value: any) {
  // @ts-expect-error - 'target' does not exist in type 'EventInit'
  const event = new Event('change', { target: { value } });
  emits('change', event);
  emitFormChange();
}
</script>

<template>
  <SliderRoot
    :id="id"
    v-model="sliderValue"
    data-slot="root"
    :role="thumbs > 1 && ($attrs['aria-label'] || $attrs['aria-labelledby']) ? 'group' : undefined"
    v-bind="{ ...rootProps, ...(thumbs > 1 ? $attrs : omit($attrs, thumbAttrs)) }"
    :name="name"
    :disabled="disabled"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :default-value="defaultSliderValue"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack data-slot="track" :class="ui.track({ class: props.ui?.track })">
      <SliderRange data-slot="range" :class="ui.range({ class: props.ui?.range })" />
    </SliderTrack>

    <template v-for="thumb in thumbs" :key="thumb">
      <PTooltip
        v-if="!!props.tooltip"
        :text="thumbs > 1 ? String(sliderValue?.[thumb - 1]) : String(sliderValue)"
        disable-closing-trigger
        v-bind="(typeof props.tooltip === 'object' ? props.tooltip : {})"
      >
        <SliderThumb data-slot="thumb" :class="ui.thumb({ class: props.ui?.thumb })" v-bind="{ ...(thumbs === 1 ? pick($attrs, thumbAttrs) : {}), ...ariaAttrs }" :aria-label="thumbs > 1 || $attrs['aria-labelledby'] ? undefined : ($attrs['aria-label'] ?? 'Thumb')" />
      </PTooltip>
      <SliderThumb v-else data-slot="thumb" :class="ui.thumb({ class: props.ui?.thumb })" v-bind="{ ...(thumbs === 1 ? pick($attrs, thumbAttrs) : {}), ...ariaAttrs }" :aria-label="thumbs > 1 || $attrs['aria-labelledby'] ? undefined : ($attrs['aria-label'] ?? 'Thumb')" />
    </template>
  </SliderRoot>
</template>
