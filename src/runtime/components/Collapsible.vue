<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'akar';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/collapsible';

type Collapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible'>;

export interface CollapsibleProps extends Pick<CollapsibleRootProps, 'defaultOpen' | 'open' | 'disabled' | 'unmountOnHide'> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  class?: any;
  ui?: Collapsible['slots'];
}

export interface CollapsibleEmits extends CollapsibleRootEmits {}

export interface CollapsibleSlots {
  default?(props: { open: boolean }): Array<VNode>;
  content?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core';
import { CollapsibleContent, CollapsibleRoot, CollapsibleTrigger } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useForwardProps } from '../composables/useForwardProps';
import { uv } from '../utils/uv';

const _props = withDefaults(
  defineProps<CollapsibleProps>(),
  {
    unmountOnHide: true,
  },
);
const emits = defineEmits<CollapsibleEmits>();
const slots = defineSlots<CollapsibleSlots>();

const props = useComponentProps('collapsible', _props);

const appConfig = useAppConfig() as Collapsible['AppConfig'];

const rootProps = useForwardProps(reactivePick(props, 'as', 'defaultOpen', 'open', 'disabled', 'unmountOnHide'), emits);

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.collapsible || {}) })());
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="rootProps" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <CollapsibleTrigger v-if="!!slots.default" as-child>
      <slot :open="open" />
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <slot name="content" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
