<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import type { IconProps } from '../Icon.vue';
import theme from '#build/ui/prose/pre';

type ProsePre = ComponentConfig<typeof theme, AppConfig, 'pre', 'ui.prose'>;

export interface ProsePreProps {
  icon?: IconProps['name'];
  code?: string;
  language?: string;
  filename?: string;
  highlights?: Array<number>;
  hideHeader?: boolean;
  meta?: string;
  class?: any;
  ui?: ProsePre['slots'];
}

export interface ProsePreSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { computed, useTemplateRef } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { useLocale } from '../../composables/useLocale';
import { uv } from '../../utils/uv';
import PButton from '../Button.vue';
import PCodeIcon from './CodeIcon.vue';

const _props = defineProps<ProsePreProps>();

defineSlots<ProsePreSlots>();

const props = useComponentProps('prose.pre', _props);

const { t } = useLocale();
const { copy, copied } = useClipboard();
const appConfig = useAppConfig() as ProsePre['AppConfig'];

const baseRef = useTemplateRef('baseRef');

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.prose?.pre || {}) })());

function copyCode() {
  const code = props.code ?? baseRef.value?.textContent ?? '';

  copy(code);
}
</script>

<template>
  <div :class="ui.root({ class: [props.ui?.root], filename: !!props.filename })">
    <div v-if="props.filename && !props.hideHeader" :class="ui.header({ class: props.ui?.header })">
      <PCodeIcon :icon="props.icon" :filename="props.filename" :class="ui.icon({ class: props.ui?.icon })" />

      <span :class="ui.filename({ class: props.ui?.filename })">{{ props.filename }}</span>
    </div>

    <PButton
      :icon="copied ? appConfig.ui.icons.copyCheck : appConfig.ui.icons.copy"
      color="neutral"
      variant="outline"
      size="sm"
      :aria-label="t('prose.pre.copy')"
      :class="ui.copy({ class: props.ui?.copy })"
      tabindex="-1"
      @click="copyCode"
    />

    <pre ref="baseRef" :class="ui.base({ class: [props.ui?.base, props.class] })" v-bind="$attrs"><slot /></pre>
  </div>
</template>
