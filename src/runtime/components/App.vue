<script lang="ts">
import type { ConfigProviderProps, TooltipProviderProps } from 'akar';
import type { VNode } from 'vue';
import type { Locale, Messages } from '../types/locale';
import type { ToasterProps } from './Toaster.vue';

export interface AppProps<T extends Messages = Messages> extends Omit<ConfigProviderProps, 'useId' | 'locale' | 'teleportTo'> {
  tooltip?: TooltipProviderProps;
  toaster?: ToasterProps | null;
  locale?: Locale<T>;
  portal?: boolean | string | HTMLElement;
}

export interface AppSlots {
  default?(props?: {}): Array<VNode>;
}

export default {
  name: 'App',
};
</script>

<script setup lang="ts" generic="T extends Messages">
import { reactivePick } from '@vueuse/core';
import { ConfigProvider, TooltipProvider, useForwardProps } from 'akar';
import { provide, toRef, useId } from 'vue';
import { localeContextInjectionKey } from '../composables/useLocale';
import { portalTargetInjectionKey } from '../composables/usePortal';
import en from '../locale/en';
import POverlayProvider from './OverlayProvider.vue';
import PToaster from './Toaster.vue';

const props = withDefaults(
  defineProps<AppProps<T>>(),
  {
    portal: 'body',
  },
);
defineSlots<AppSlots>();

const configProviderProps = useForwardProps(reactivePick(props, 'scrollBody', 'nonce'));
const tooltipProps = toRef(() => props.tooltip);
const toasterProps = toRef(() => props.toaster);

const locale = toRef(() => props.dir ? { ...(props.locale || en), dir: props.dir } : props.locale);
provide(localeContextInjectionKey, locale);

const portal = toRef(() => props.portal);
provide(portalTargetInjectionKey, portal);
</script>

<template>
  <ConfigProvider :use-id="() => (useId() as string)" :dir="props.dir || locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <PToaster v-if="toaster !== null" v-bind="toasterProps">
        <slot />
      </PToaster>
      <slot v-else />

      <POverlayProvider />
    </TooltipProvider>
  </ConfigProvider>
</template>
