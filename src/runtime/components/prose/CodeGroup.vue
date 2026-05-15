<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/code-group';

type ProseCodeGroup = ComponentConfig<typeof theme, AppConfig, 'codeGroup', 'ui.prose'>;

export interface ProseCodeGroupProps {
  /**
   * The default tab to select.
   * @example '1'
   */
  defaultValue?: string;
  /**
   * Sync the selected tab with a local storage key.
   */
  sync?: string;
  class?: any;
  ui?: ProseCodeGroup['slots'];
}

export interface ProseCodeGroupSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { TabsContent, TabsIndicator, TabsList, TabsRoot, TabsTrigger } from 'akar';
import { computed, onBeforeUpdate, onMounted, ref, watch } from 'vue';
import { useAppConfig, useState } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PCodeIcon from './CodeIcon.vue';

const _props = withDefaults(
  defineProps<ProseCodeGroupProps>(),
  {
    defaultValue: '0',
  },
);
const slots = defineSlots<ProseCodeGroupSlots>();

const props = useComponentProps('prose.codeGroup', _props);

const model = defineModel<string>();

const appConfig = useAppConfig() as ProseCodeGroup['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.codeGroup || {}) })());

const rerenderCount = ref(1);

const items = computed<Array<{
  index: number;
  label: string;
  icon: string;
  component: any;
}>>(() => {
  // eslint-disable-next-line ts/no-unused-expressions
  rerenderCount.value;
  return slots.default?.()?.flatMap(transformSlot).filter(Boolean) || [];
});

function transformSlot(slot: any, index: number) {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot);
  }

  return {
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot,
  };
}

onMounted(() => {
  if (props.sync) {
    const syncKey = `code-group-${props.sync}`;
    const syncValue = useState<string>(syncKey, () => localStorage.getItem(syncKey) as string);

    watch(syncValue, () => {
      if (!syncValue.value) {
        return;
      }

      model.value = syncValue.value;
    }, { immediate: true });

    watch(model, () => {
      if (!model.value) {
        return;
      }

      syncValue.value = model.value;
      localStorage.setItem(syncKey, model.value);
    });
  }
});

onBeforeUpdate(() => rerenderCount.value++);
</script>

<template>
  <TabsRoot v-model="model" :default-value="props.defaultValue" :unmount-on-hide="false" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <TabsList :class="ui.list({ class: props.ui?.list })">
      <TabsIndicator :class="ui.indicator({ class: props.ui?.indicator })" />

      <TabsTrigger v-for="(item, index) of items" :key="index" :value="String(index)" :class="ui.trigger({ class: props.ui?.trigger })">
        <PCodeIcon :icon="item.icon" :filename="item.label" :class="ui.triggerIcon({ class: props.ui?.triggerIcon })" />

        <span :class="ui.triggerLabel({ class: props.ui?.triggerLabel })">{{ item.label }}</span>
      </TabsTrigger>
    </TabsList>

    <TabsContent v-for="(item, index) of items" :key="index" :value="String(index)" as-child>
      <component :is="item.component" hide-header tabindex="-1" />
    </TabsContent>
  </TabsRoot>
</template>
