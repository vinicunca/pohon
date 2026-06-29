<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import type { CollapsibleProps } from '../Collapsible.vue';
import type { IconProps } from '../Icon.vue';
import theme from '#build/ui/prose/collapsible';

type ProseCollapsible = ComponentConfig<typeof theme, AppConfig, 'collapsible', 'ui.prose'>;

export interface ProseCollapsibleProps {
  /**
   * The icon displayed to toggle the collapsible.
   * @defaultValue appConfig.ui.icons.chevronDown
   */
  icon?: IconProps['name'];
  /**
   * The name displayed in the trigger label.
   * @defaultValue t('prose.collapsible.name')
   */
  name?: string;
  /**
   * The text displayed when the collapsible is open.
   * @defaultValue t('prose.collapsible.openText')
   */
  openText?: string;
  /**
   * The text displayed when the collapsible is closed.
   * @defaultValue t('prose.collapsible.closeText')
   */
  closeText?: string;
  class?: any;
  ui?: ProseCollapsible['slots'] & CollapsibleProps['ui'];
}

export interface ProseCollapsibleSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { useLocale } from '../../composables/useLocale';
import { transformUI } from '../../utils';
import { uv } from '../../utils/uv';
import PCollapsible from '../Collapsible.vue';
import PIcon from '../Icon.vue';

const _props = defineProps<ProseCollapsibleProps>();

defineSlots<ProseCollapsibleSlots>();

const props = useComponentProps('prose.collapsible', _props);

const { t } = useLocale();
const appConfig = useAppConfig() as ProseCollapsible['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.collapsible || {}) })());
</script>

<template>
  <PCollapsible :unmount-on-hide="false" :class="props.class" :ui="transformUI(ui, props.ui)">
    <template #default="{ open }">
      <button :class="ui.trigger({ class: props.ui?.trigger })">
        <PIcon :name="props.icon || appConfig.ui.icons.chevronDown" :class="ui.triggerIcon({ class: props.ui?.triggerIcon })" />

        <span :class="ui.triggerLabel({ class: props.ui?.triggerLabel })">
          {{ open ? (props.closeText || t('prose.collapsible.closeText')) : (props.openText || t('prose.collapsible.openText')) }} {{ props.name || t('prose.collapsible.name') }}
        </span>
      </button>
    </template>

    <template #content>
      <slot />
    </template>
  </PCollapsible>
</template>
