<script setup lang="ts">
import { CalendarDate } from '@internationalized/date';
import theme from '#build/ui/calendar';

const singleValue = shallowRef(new CalendarDate(2022, 1, 10));
const multipleValue = shallowRef([new CalendarDate(2022, 1, 10), new CalendarDate(2022, 1, 20)]);
const rangeValue = shallowRef({
  start: new CalendarDate(2022, 1, 10),
  end: new CalendarDate(2022, 1, 20),
});

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);
const sizes = Object.keys(theme.variants.size);

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size],
});

const multiple = ref(false);
const range = ref(false);
</script>

<template>
  <Navbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
    <PSelect
      v-model="attrs.variant"
      :items="variants"
      multiple
    />
    <PSelect
      v-model="attrs.size"
      :items="sizes"
      multiple
    />
    <PSwitch
      v-model="multiple"
      label="Multiple"
    />
    <PSwitch
      v-model="range"
      label="Range"
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
  >
    <PCalendar
      v-if="range"
      v-model="rangeValue"
      range
      v-bind="props"
    />
    <PCalendar
      v-else-if="multiple"
      v-model="multipleValue"
      multiple
      v-bind="props"
    />
    <PCalendar
      v-else
      v-model="singleValue"
      v-bind="props"
    />
  </Matrix>
</template>
