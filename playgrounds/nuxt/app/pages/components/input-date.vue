<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'
import theme from '#build/ui/input-date'

const colors = Object.keys(theme.variants.color)
const variants = Object.keys(theme.variants.variant)
const sizes = Object.keys(theme.variants.size)

const attrs = reactive({
  color: [theme.defaultVariants.color],
  variant: [theme.defaultVariants.variant],
  size: [theme.defaultVariants.size]
})

const value = shallowRef(new CalendarDate(2022, 1, 10))
const range = shallowRef({
  start: new CalendarDate(2022, 1, 10),
  end: new CalendarDate(2022, 1, 20)
})
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.color" :items="colors" multiple />
    <PSelect v-model="attrs.variant" :items="variants" multiple />
    <PSelect v-model="attrs.size" :items="sizes" multiple />
  </Navbar>

  <Matrix v-slot="props" :attrs="attrs">
    <PInputDate v-model="value" autofocus v-bind="props" />
    <PInputDate :default-value="new CalendarDate(2022, 1, 10)" v-bind="props" />
    <PInputDate v-model="range" range v-bind="props" />
    <PInputDate :default-value="{ start: new CalendarDate(2022, 1, 10), end: new CalendarDate(2022, 1, 20) }" range v-bind="props" />
    <PInputDate highlight v-bind="props" />
    <PInputDate disabled v-bind="props" />
    <PInputDate required v-bind="props" />
    <PInputDate icon="i-lucide-clock" v-bind="props" />
    <PInputDate icon="i-lucide-clock" trailing v-bind="props" />
    <PInputDate :avatar="{ src: 'https://github.com/praburangki.png' }" icon="i-lucide-clock" trailing v-bind="props" />
    <PInputDate loading v-bind="props" />
    <PInputDate loading trailing v-bind="props" />
    <PInputDate loading icon="i-lucide-clock" trailing-icon="i-lucide-chevron-down" v-bind="props" />
  </Matrix>
</template>
