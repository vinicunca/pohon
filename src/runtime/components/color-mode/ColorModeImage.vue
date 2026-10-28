<script lang="ts">
import type { ImgHTMLAttributes } from '../../types/html';

export interface ColorModeImageProps extends /** @vue-ignore */ Omit<ImgHTMLAttributes, 'src'> {
  dark: string;
  light: string;
}
</script>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import ImageComponent, { useImage } from '#build/ui-image-component';
import { useRuntimeConfig } from '#imports';
import { resolveBaseURL } from '../../utils';

defineOptions({ inheritAttrs: false });

const props = defineProps<ColorModeImageProps>();

const attrs = useAttrs();
const image = useImage?.();

// `@nuxt/image`'s ipx providers already prefix `app.baseURL`
const provider = computed(() => (attrs.provider as string | undefined) || image?.options.provider);
const refinedLight = computed(() => provider.value === 'ipx' || provider.value === 'ipxStatic'
  ? props.light
  : resolveBaseURL(props.light, useRuntimeConfig().app.baseURL));
const refinedDark = computed(() => provider.value === 'ipx' || provider.value === 'ipxStatic'
  ? props.dark
  : resolveBaseURL(props.dark, useRuntimeConfig().app.baseURL));
</script>

<template>
  <component :is="ImageComponent" :src="refinedLight" class="dark:hidden" v-bind="$attrs" />
  <component :is="ImageComponent" :src="refinedDark" class="hidden dark:block" v-bind="$attrs" />
</template>
