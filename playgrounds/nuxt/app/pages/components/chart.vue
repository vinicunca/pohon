<script setup lang="ts">
import theme from '#build/ui/chart';

const types = Object.keys(theme.variants.type) as Array<keyof typeof theme.variants.type>;

const type = ref<keyof typeof theme.variants.type>('line');
const curve = ref<'linear' | 'monotone' | 'step'>('linear');
const stacked = ref(false);
const points = ref(false);
const grid = ref(true);
const xAxis = ref(true);
const yAxis = ref(true);
const legend = ref(true);
const thickness = ref(24);

// Each option only shows for the types it applies to
const isCartesian = computed(() => type.value !== 'donut');
const hasCurve = computed(() => type.value === 'line' || type.value === 'area');
const hasStacked = computed(() => type.value === 'area' || type.value === 'bar');

const data = [
  {
    month: 'January',
    desktop: 186,
    mobile: 80,
    tablet: 40,
    revenue: 18600,
  },
  {
    month: 'February',
    desktop: 305,
    mobile: 200,
    tablet: 90,
    revenue: 30500,
  },
  {
    month: 'March',
    desktop: 237,
    mobile: 120,
    tablet: 75,
    revenue: 23700,
  },
  {
    month: 'April',
    desktop: 73,
    mobile: 190,
    tablet: 60,
    revenue: 27300,
  },
  {
    month: 'May',
    desktop: 209,
    mobile: 130,
    tablet: 110,
    revenue: 20900,
  },
  {
    month: 'June',
    desktop: 214,
    mobile: 140,
    tablet: 95,
    revenue: 31400,
  },
];

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' });
</script>

<template>
  <Navbar>
    <PSelect
      v-model="type"
      :items="types"
    />
    <PSelect
      v-if="hasCurve"
      v-model="curve"
      :items="['linear', 'monotone', 'step']"
    />
    <PSwitch
      v-if="hasStacked"
      v-model="stacked"
      label="Stacked"
    />
    <PSwitch
      v-if="type === 'line'"
      v-model="points"
      label="Points"
    />
    <PSwitch
      v-if="isCartesian"
      v-model="grid"
      label="Grid"
    />
    <PSwitch
      v-if="isCartesian"
      v-model="xAxis"
      label="X axis"
    />
    <PSwitch
      v-if="isCartesian"
      v-model="yAxis"
      label="Y axis"
    />
    <PSwitch
      v-model="legend"
      label="Legend"
    />
    <PInputNumber
      v-if="type === 'donut'"
      v-model="thickness"
      :min="4"
      :max="100"
      class="w-28"
    />
  </Navbar>

  <div class="gap-8 grid max-w-3xl w-full">
    <PCard>
      <PChart
        :type="type"
        :curve="curve"
        :stacked="stacked"
        :points="points"
        :grid="grid"
        :x-axis="xAxis"
        :y-axis="yAxis"
        :legend="legend"
        :thickness="thickness"
        :data="data"
        index="month"
        :categories="[{ key: 'desktop', label: 'Desktop' }, { key: 'mobile', label: 'Mobile' }, { key: 'tablet', label: 'Tablet' }]"
        aria-label="Visitors by device"
      />
    </PCard>

    <PCard>
      <PChart
        :type="type"
        :curve="curve"
        :points="points"
        :grid="grid"
        :x-axis="xAxis"
        :y-axis="yAxis"
        :legend="legend"
        :thickness="thickness"
        :data="data"
        index="month"
        :categories="[{ key: 'revenue', label: 'Revenue' }]"
        :colors="isCartesian ? ['success'] : undefined"
        :format="(value) => currency.format(value)"
        aria-label="Revenue"
      />
    </PCard>
  </div>
</template>
