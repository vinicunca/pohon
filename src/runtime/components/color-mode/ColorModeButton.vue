<script lang="ts">
import type { ButtonProps } from '../Button.vue';
import type { LinkPropsKeys } from '../Link.vue';

export interface ColorModeButtonProps extends Omit<ButtonProps, LinkPropsKeys | 'color' | 'variant'> {
  /**
   * @defaultValue 'neutral'
   */
  color?: ButtonProps['color'];
  /**
   * @defaultValue 'ghost'
   */
  variant?: ButtonProps['variant'];
}
</script>

<script setup lang="ts">
import { reactiveOmit, useMounted } from '@vueuse/core';
import { computed } from 'vue';
import { useAppConfig, useColorMode } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { useForwardProps } from '../../composables/useForwardProps';
import { useLocale } from '../../composables/useLocale';
import PButton from '../Button.vue';
import PIcon from '../Icon.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<ColorModeButtonProps>(),
  {
    color: 'neutral',
    variant: 'ghost',
  },
);

const props = useComponentProps('button', _props);

const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();

const buttonProps = useForwardProps(reactiveOmit(props, 'icon'));

// The resolved color mode is only known on the client, so the label matches the server until mounted.
const mounted = useMounted();

const isDark = computed({
  get() {
    return mounted.value && colorMode.value === 'dark';
  },
  set(_isDark: boolean) {
    colorMode.preference = _isDark ? 'dark' : 'light';
  },
});
</script>

<template>
  <PButton
    v-bind="{
      ...buttonProps,
      'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
      ...$attrs,
    }"
    @click="isDark = !isDark"
  >
    <template #leading="{ ui }">
      <PIcon :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, 'hidden dark:inline-block'] })" :name="appConfig.ui.icons.dark" />
      <PIcon :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, 'dark:hidden'] })" :name="appConfig.ui.icons.light" />
    </template>
  </PButton>
</template>
