<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import type { AppConfig } from '@nuxt/schema';
import type { UseFuseOptions } from '@vueuse/integrations/useFuse';
import type { VNode } from 'vue';
import type { ButtonProps, CommandPaletteGroup, CommandPaletteItem, CommandPaletteProps, CommandPaletteSlots, IconProps, LinkProps, LinkPropsKeys, ModalProps } from '../../types';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/content/content-search';

type ContentSearch = ComponentConfig<typeof theme, AppConfig, 'contentSearch'>;

export interface ContentSearchLink extends Omit<LinkProps, 'custom'> {
  label?: string;
  description?: string;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
  children?: Array<ContentSearchLink>;
}

export interface ContentSearchFile {
  id: string;
  title: string;
  titles: Array<string>;
  level: number;
  content: string;
}

export interface ContentSearchItem extends Omit<LinkProps, 'custom'>, CommandPaletteItem {
  level?: number;
  /**
   * @IconifyIcon
   */
  icon?: IconProps['name'];
}

export interface ContentSearchProps<T extends ContentSearchLink = ContentSearchLink> extends Pick<ModalProps, 'title' | 'description' | 'overlay' | 'transition' | 'content' | 'dismissible' | 'fullscreen' | 'modal' | 'portal'>, Pick<CommandPaletteProps<CommandPaletteGroup<ContentSearchItem>, ContentSearchItem>, 'icon' | 'placeholder' | 'autofocus' | 'loading' | 'loadingIcon' | 'closeIcon' | 'groups'> {
  /**
   * @defaultValue 'md'
   */
  size?: ContentSearch['variants']['size'];
  /**
   * Display a close button in the input (useful when inside a Modal for example).
   * `{ size: 'md', color: 'neutral', variant: 'ghost' }`{lang="ts-type"}
   * @emits 'update:open'
   * @defaultValue true
   */
  close?: boolean | Omit<ButtonProps, LinkPropsKeys>;
  /**
   * Keyboard shortcut to open the search (used by [`defineShortcuts`](https://pohon.vinicunca.dev/docs/composables/define-shortcuts))
   * @defaultValue 'meta_k'
   */
  shortcut?: string;
  /** Links group displayed as the first group in the command palette. */
  links?: Array<T>;
  navigation?: Array<ContentNavigationItem>;
  files?: Array<ContentSearchFile>;
  /**
   * Options for [useFuse](https://vueuse.org/integrations/useFuse) passed to the [CommandPalette](https://pohon.vinicunca.dev/docs/components/command-palette).
   * @defaultValue {
      fuseOptions: {
        ignoreLocation: true,
        includeMatches: true,
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
   * Useful for large doc sets where running fuzzy search on every keystroke is the bottleneck — the input stays responsive while Fuse only re-runs after typing settles.
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
  ui?: ContentSearch['slots'] & CommandPaletteProps<CommandPaletteGroup<ContentSearchItem>, ContentSearchItem>['ui'];
}

export type ContentSearchSlots = CommandPaletteSlots<ContentSearchItem> & {
  content?(props: { close: () => void }): Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends ContentSearchLink">
import { reactivePick } from '@vueuse/core';
import { defu } from 'defu';
import { computed, useTemplateRef } from 'vue';
import { defineShortcuts, useAppConfig, useColorMode } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { useContentSearch } from '../../composables/useContentSearch';
import { useForwardProps } from '../../composables/useForwardProps';
import { useLocale } from '../../composables/useLocale';
import { omit, transformUI } from '../../utils';
import { uv } from '../../utils/uv';
import PCommandPalette from '../CommandPalette.vue';
import PModal from '../Modal.vue';

const _props = withDefaults(
  defineProps<ContentSearchProps<T>>(),
  {
    shortcut: 'meta_k',
    colorMode: true,
    close: true,
    fullscreen: false,
    searchDelay: 100,
  },
);
const slots = defineSlots<ContentSearchSlots>();

const props = useComponentProps<ContentSearchProps<T>>('contentSearch', _props);

const searchTerm = defineModel<string>('searchTerm', { default: '' });

const { t } = useLocale();
const { open, mapNavigationItems, postFilter } = useContentSearch();

const colorMode = useColorMode();
const appConfig = useAppConfig() as ContentSearch['AppConfig'];

const commandPaletteProps = useForwardProps(reactivePick(props, 'size', 'icon', 'placeholder', 'autofocus', 'loading', 'loadingIcon', 'close', 'closeIcon', 'searchDelay'));
const modalProps = useForwardProps(reactivePick(props, 'overlay', 'transition', 'content', 'dismissible', 'fullscreen', 'modal', 'portal'));

const getProxySlots = () => omit(slots, ['content']);

const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    includeMatches: true,
    useTokenSearch: true,
  },
} as UseFuseOptions<T>));

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.contentSearch || {}) })({
  size: props.size,
  fullscreen: props.fullscreen,
}));

const commandPaletteRef = useTemplateRef('commandPaletteRef');

const mappedLinksItems = computed(() => {
  if (!props.links?.length) {
    return [];
  }

  return props.links.flatMap((link) => [{
    ...link,
    suffix: link.description,
    description: undefined,
    icon: link.icon || appConfig.ui.icons.file,
    children: undefined,
  }, ...(link.children?.map((child) => ({
    ...child,
    prefix: `${link.label} >`,
    suffix: child.description,
    description: undefined,
    icon: child.icon || link.icon || appConfig.ui.icons.file,
  })) || [])]);
});

const mappedNavigationGroups = computed(() => {
  if (!props.navigation?.length) {
    return [];
  }

  if (props.navigation.some((link) => !!link.children?.length)) {
    return props.navigation.map((group) => ({
      id: group.path,
      label: group.title,
      items: mapNavigationItems(group.children || [], props.files || []),
      postFilter,
    }));
  } else {
    return [{ id: 'docs', items: mapNavigationItems(props.navigation, props.files || []), postFilter }];
  }
});

const themeGroup = computed(() => {
  if (!props.colorMode || colorMode?.forced) {
    return null;
  }

  return {
    id: 'theme',
    label: t('contentSearch.theme'),
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
  };
});

const groups = computed(() => {
  const groups = [];

  if (mappedLinksItems.value.length) {
    groups.push({ id: 'links', label: t('contentSearch.links'), items: mappedLinksItems.value });
  }

  groups.push(...mappedNavigationGroups.value);

  groups.push(...(props.groups || []));

  if (themeGroup.value) {
    groups.push(themeGroup.value);
  }

  return groups;
});

function onSelect(item: ContentSearchItem) {
  if (item.disabled) {
    return;
  }

  // Close modal on select
  open.value = false;
  // Reset search term on select
  searchTerm.value = '';
}

defineShortcuts({
  [props.shortcut!]: {
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
    :title="props.title || t('contentSearch.title')"
    :description="props.description || t('contentSearch.description')"
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
          :input="{ fixed: true }"
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
