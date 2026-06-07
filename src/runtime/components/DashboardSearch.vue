<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { VNode } from 'vue';
import type { ButtonProps, CommandPaletteGroup, CommandPaletteItem, CommandPaletteProps, CommandPaletteSlots, InputProps, LinkPropsKeys, ModalProps } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/dashboard-search';

type DashboardSearch = ComponentConfig<typeof theme, AppConfig, 'dashboardSearch'>;

export interface DashboardSearchProps<T extends CommandPaletteItem = CommandPaletteItem> extends Pick<ModalProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'>, Pick<CommandPaletteProps<CommandPaletteGroup<T>, T>, 'icon' | 'placeholder' | 'autofocus' | 'loading' | 'loadingIcon' | 'closeIcon' | 'groups'> {
  /**
   * @defaultValue 'md'
   */
  size?: DashboardSearch['variants']['size'];
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue true
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  /**
   * Configure the input or hide it with `false`.
   * `{ fixed: true }`{lang="ts-type"}
   * @defaultValue true
   */
  input?: boolean | Omit<InputProps, 'modelValue' | 'defaultValue'>;
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://pohon.vinicunca.dev/docs/composables/define-shortcuts))
   * @defaultValue 'meta_k'
   */
  shortcut?: string;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://ui.nuxt.com/docs/components/command-palette).
   * @defaultValue {
      fuseOptions: {
        ignoreLocation: true,
        useTokenSearch: true,
        threshold: 0.1,
        keys: ['label', 'description', 'suffix']
      },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }
   */
  fuse?: UseFuseOptions<T>;
  /**
   * Delay (in milliseconds) before the search term is passed to Fuse (debounced).
   * Useful for large datasets where running fuzzy search on every keystroke is the bottleneck — the input stays responsive while Fuse only re-runs after typing settles.
   * Set to `0` to disable.
   * @defaultValue 100
   */
  searchDelay?: number;
  /**
   * When `true`, the theme command will be added to the groups.
   * @defaultValue true
   */
  colorMode?: boolean;
  class?: any;
  ui?: DashboardSearch['slots'] & CommandPaletteProps<CommandPaletteGroup<CommandPaletteItem>, CommandPaletteItem>['ui'];
}

export type DashboardSearchSlots = CommandPaletteSlots<CommandPaletteItem> & {
  content?(props: { close: () => void }): Array<VNode>;
};

</script>

<script setup lang="ts">
import { reactivePick } from '@vueuse/core';
import { defu } from 'defu';
import { computed, useTemplateRef } from 'vue';
import { defineShortcuts, useAppConfig, useColorMode, useRuntimeHook } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useForwardProps } from '../composables/useForwardProps';
import { useLocale } from '../composables/useLocale';
import { omit, transformUI } from '../utils';
import { uv } from '../utils/uv';
import PCommandPalette from './CommandPalette.vue';
import PModal from './Modal.vue';

const _props = withDefaults(
  defineProps<DashboardSearchProps>(),
  {
    shortcut: 'meta_k',
    colorMode: true,
    close: true,
    fullscreen: false,
    searchDelay: 100,
  },
);
const slots = defineSlots<DashboardSearchSlots>();

const props = useComponentProps('dashboardSearch', _props);

const open = defineModel<boolean>('open', { default: false });
const searchTerm = defineModel<string>('searchTerm', { default: '' });

useRuntimeHook('dashboard:search:toggle', () => {
  open.value = !open.value;
});

const { t } = useLocale();

const colorMode = useColorMode();
const appConfig = useAppConfig() as DashboardSearch['AppConfig'];

const commandPaletteProps = useForwardProps(reactivePick(props, 'size', 'icon', 'placeholder', 'autofocus', 'loading', 'loadingIcon', 'close', 'closeIcon', 'searchDelay'));
const modalProps = useForwardProps(reactivePick(props, 'overlay', 'transition', 'content', 'dismissible', 'fullscreen', 'modal', 'portal'));

const inputProps = computed(() => {
  if (props.input === false) {
    return false;
  }
  return defu(typeof props.input === 'object' ? props.input : {}, { fixed: true });
});

const getProxySlots = () => omit(slots, ['content']);

const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    useTokenSearch: true,
  },
}));

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.dashboardSearch || {}) })({
  size: props.size,
  fullscreen: props.fullscreen,
}));

const groups = computed(() => {
  const groups = [];

  groups.push(...(props.groups || []));

  if (props.colorMode && !colorMode?.forced) {
    groups.push({
      id: 'theme',
      label: t('dashboardSearch.theme'),
      items: [{
        label: t('colorMode.system'),
        icon: appConfig.ui.icons.system,
        active: colorMode.preference === 'system',
        onSelect: () => {
          colorMode.preference = 'system';
        },
      }, {
        label: t('colorMode.light'),
        icon: appConfig.ui.icons.light,
        active: colorMode.preference === 'light',
        onSelect: () => {
          colorMode.preference = 'light';
        },
      }, {
        label: t('colorMode.dark'),
        icon: appConfig.ui.icons.dark,
        active: colorMode.preference === 'dark',
        onSelect: () => {
          colorMode.preference = 'dark';
        },
      }],
    });
  }

  return groups;
});

const commandPaletteRef = useTemplateRef('commandPaletteRef');

function onSelect(item: CommandPaletteItem) {
  if (item.disabled) {
    return;
  }

  // Close modal on select
  open.value = false;
  // Reset search term on select
  searchTerm.value = '';
}

defineShortcuts({
  [props.shortcut]: {
    usingInput: true,
    handler: () => {
      open.value = !open.value;
    },
  },
});

defineExpose({
  commandPaletteRef,
});
</script>

<template>
  <PModal
    v-model:open="open"
    :title="props.title || t('dashboardSearch.title')"
    :description="props.description || t('dashboardSearch.description')"
    v-bind="modalProps"
    data-slot="modal"
    :class="ui.modal({ class: [props.ui?.modal, props.class] })"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <PCommandPalette
          ref="commandPaletteRef"
          v-model:search-term="searchTerm"
          v-bind="commandPaletteProps"
          :groups="groups"
          :fuse="fuse"
          :input="inputProps"
          :ui="transformUI(omit(ui, ['modal']), props.ui)"
          @update:model-value="onSelect"
          @update:open="open = $event"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </PCommandPalette>
      </slot>
    </template>
  </PModal>
</template>
