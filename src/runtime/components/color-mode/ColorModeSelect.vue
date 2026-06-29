<script lang="ts">
import type { SelectMenuItem, SelectMenuProps } from '../SelectMenu.vue';

export interface ColorModeSelectProps extends Omit<SelectMenuProps<Array<SelectMenuItem>>, 'icon' | 'items' | 'modelValue'> {
}
</script>

<script setup lang="ts">
import { useForwardProps } from 'akar';
import { computed } from 'vue';
import { useAppConfig, useColorMode } from '#imports';
import { useLocale } from '../../composables/useLocale';
import PSelectMenu from '../SelectMenu.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<ColorModeSelectProps>(),
  {
    searchInput: false,
  },
);

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const selectMenuProps = useForwardProps(props);

const items = computed(() => [
  { label: t('colorMode.system'), value: 'system', icon: appConfig.ui.icons.system },
  { label: t('colorMode.light'), value: 'light', icon: appConfig.ui.icons.light },
  { label: t('colorMode.dark'), value: 'dark', icon: appConfig.ui.icons.dark },
]);

const preference = computed({
  get() {
    return items.value.find((option) => option.value === colorMode.preference) || items.value[0]!;
  },
  set(option) {
    colorMode.preference = option!.value;
  },
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <PSelectMenu
      v-model="preference"
      :icon="preference?.icon"
      v-bind="{ ...(selectMenuProps as any), ...$attrs }"
      :items="items"
    />

    <template #fallback>
      <PSelectMenu
        :icon="items[0]?.icon"
        :model-value="items[0]"
        v-bind="{ ...(selectMenuProps as any), ...$attrs }"
        :items="items"
        disabled
      />
    </template>
  </ClientOnly>
</template>
