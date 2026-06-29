<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import type { IconProps } from '../Icon.vue';
import theme from '#build/ui/prose/code-collapse';

type ProseCodeCollapse = ComponentConfig<typeof theme, AppConfig, 'codeCollapse', 'ui.prose'>;

export interface ProseCodeCollapseProps {
  /**
   * The icon displayed to toggle the code.
   * @defaultValue appConfig.ui.icons.chevronDown
   */
  icon?: IconProps['name'];
  /**
   * The name displayed in the trigger label.
   * @defaultValue t('prose.codeCollapse.name')
   */
  name?: string;
  /**
   * The text displayed when the code is collapsed.
   * @defaultValue t('prose.codeCollapse.openText')
   */
  openText?: string;
  /**
   * The text displayed when the code is expanded.
   * @defaultValue t('prose.codeCollapse.closeText')
   */
  closeText?: string;
  class?: any;
  ui?: ProseCodeCollapse['slots'];
}

export interface ProseCodeCollapseSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { useLocale } from '../../composables/useLocale';
import { uv } from '../../utils/uv';
import PButton from '../Button.vue';

const _props = defineProps<ProseCodeCollapseProps>();

defineSlots<ProseCodeCollapseSlots>();

const props = useComponentProps('prose.codeCollapse', _props);

const open = defineModel<boolean>('open', { default: false });

const { t } = useLocale();
const appConfig = useAppConfig() as ProseCodeCollapse['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.codeCollapse || {}) })({
  open: open.value,
}));
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot />

    <div :class="ui.footer({ class: props.ui?.footer })">
      <PButton
        :icon="props.icon || appConfig.ui.icons.chevronDown"
        color="neutral"
        variant="outline"
        :data-state="open ? 'open' : 'closed'"
        :label="`${open ? (props.closeText || t('prose.codeCollapse.closeText')) : (props.openText || t('prose.codeCollapse.openText'))} ${props.name || t('prose.codeCollapse.name')}`"
        :class="ui.trigger({ class: props.ui?.trigger })"
        :ui="{ leadingIcon: ui.triggerIcon({ class: props.ui?.triggerIcon }) }"
        @click="open = !open"
      />
    </div>
  </div>
</template>
