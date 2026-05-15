<script setup lang="ts">
import type { BreadcrumbItem } from 'pohon-ui';
import theme from '#build/ui/breadcrumb';

const colors = Object.keys(theme.variants.color);

const attrs = reactive({
  color: [theme.defaultVariants.color],
});

const items = [
  {
    label: 'Home',
    to: '/',
  },
  {
    slot: 'dropdown' as const,
    icon: 'i-lucide-ellipsis',
    children: [{
      label: 'Documentation',
    }, {
      label: 'Themes',
    }, {
      label: 'GitHub',
    }],
  },
  {
    label: 'Components',
    disabled: true,
  },
  {
    label: 'Breadcrumb',
    to: '/components/breadcrumb',
  },
] satisfies Array<BreadcrumbItem>;
</script>

<template>
  <Navbar>
    <PSelect
      v-model="attrs.color"
      :items="colors"
      multiple
    />
  </Navbar>

  <Matrix
    v-slot="props"
    :attrs="attrs"
    class="flex-col"
  >
    <PBreadcrumb
      :items="items"
      v-bind="props"
    >
      <template #dropdown="{ item }">
        <PDropdownMenu :items="item.children">
          <PButton
            :icon="item.icon"
            color="neutral"
            variant="link"
            class="p-0.5"
          />
        </PDropdownMenu>
      </template>
    </PBreadcrumb>
  </Matrix>
</template>
