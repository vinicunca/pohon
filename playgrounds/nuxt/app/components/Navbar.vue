<script setup lang="ts">
import { useRoute, useRouter } from '#imports';
import { upperName } from '../utils';

defineProps<{
  to?: string;
}>();
const route = useRoute();
const router = useRouter();

const name = computed(() => route.path.split('/').pop() as string);
const title = computed(() => upperName(name.value));

const components = inject<Array<{ to: string; label: string }>>('components');

const index = computed(() => components?.findIndex((component) => component.to === route.path) ?? -1);

function navigate(index: number) {
  router.push(components?.[index]?.to as string);
}

defineShortcuts({
  j: () => navigate(index.value + 1),
  k: () => navigate(index.value - 1),
});
</script>

<template>
  <PDashboardNavbar
    :title="title"
    :ui="{
      left: 'shrink-0',
      right: 'shrink overflow-x-auto py-2',
    }"
    class="bg-background inset-x-0 top-0 absolute z-5"
  >
    <template #toggle>
      <PDashboardSidebarToggle
        size="sm"
        variant="outline"
        class="ring-ring"
      />
      <PDashboardSidebarCollapse
        size="sm"
        variant="outline"
        class="ring-ring"
      />
    </template>

    <template #leading>
      <PFieldGroup size="sm">
        <PButton
          icon="i-lucide-chevron-left"
          color="neutral"
          variant="outline"
          :disabled="index === 0"
          class="ring-ring"
          aria-label="Previous component"
          @click="navigate(index - 1)"
        />
        <PButton
          icon="i-lucide-chevron-right"
          color="neutral"
          variant="outline"
          :disabled="index === (components?.length ?? 0) - 1"
          class="ring-ring"
          aria-label="Next component"
          @click="navigate(index + 1)"
        />
      </PFieldGroup>
    </template>

    <template #trailing>
      <slot name="trailing">
        <PButton
          icon="i-lucide-external-link"
          :to="to || `https://pohon.vinicunca.dev/docs/components/${name}`"
          color="neutral"
          variant="ghost"
          size="xs"
          aria-label="Open component in docs"
        />
      </slot>
    </template>

    <template #right>
      <slot />
    </template>
  </PDashboardNavbar>
</template>
