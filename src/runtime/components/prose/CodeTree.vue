<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/code-tree';

type ProseCodeTree = ComponentConfig<typeof theme, AppConfig, 'codeTree', 'ui.prose'>;

type TreeNode = {
  label: string;
  path: string;
  children?: Array<TreeNode>;
};

type TreeItem = {
  label: string;
  icon?: string;
  component: any;
};

export interface ProseCodeTreeProps {
  items?: Array<TreeItem>;
  /**
   * The selected path.
   * @example 'package.json'
   */
  modelValue?: string;
  /**
   * The default path to select.
   * @example 'package.json'
   */
  defaultValue?: string;
  /**
   * Expand all directories by default.
   * @defaultValue false
   */
  expandAll?: boolean;
  class?: any;
  ui?: ProseCodeTree['slots'];
}

export interface ProseCodeTreeEmits {
  'update:modelValue': [value: string | undefined];
}

export interface ProseCodeTreeSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { createReusableTemplate } from '@vueuse/core';
import { TreeItem as AkarTreeItem, TreeRoot } from 'akar';
import { computed, onBeforeUpdate, ref, watch } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';
import PIcon from '../Icon.vue';
import PCodeIcon from './CodeIcon.vue';

defineOptions({ inheritAttrs: false });

const _props = defineProps<ProseCodeTreeProps>();
const emits = defineEmits<ProseCodeTreeEmits>();
const slots = defineSlots<ProseCodeTreeSlots>();

const props = useComponentProps('prose.codeTree', _props);

const appConfig = useAppConfig() as ProseCodeTree['AppConfig'];

const [DefineTreeTemplate, ReuseTreeTemplate] = createReusableTemplate<{ items: Array<TreeNode>; level: number }>();

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.codeTree || {}) })());

const initialPath = props.modelValue ?? props.defaultValue;
const model = ref(initialPath ? { path: initialPath } : undefined);
const lastSelectedItem = ref();

watch(model, (value) => {
  if (value?.path !== props.modelValue) {
    emits('update:modelValue', value?.path);
  }
});
watch(() => props.modelValue, (value) => {
  if (value === model.value?.path) {
    return;
  }

  model.value = value ? { path: value } : undefined;
  // Expand the tree to show the selected item
  const pathsToExpand = getExpandedPaths(value);
  for (const path of pathsToExpand) {
    if (!expanded.value.includes(path)) {
      expanded.value.push(path);
    }
  }
});
const rerenderCount = ref(1);

const flatItems = computed<Array<TreeItem>>(() => {
  // eslint-disable-next-line ts/no-unused-expressions
  rerenderCount.value;
  return props.items || slots.default?.()?.flatMap(transformSlot).filter(Boolean) || [];
});

const items = computed(() => buildTree(flatItems.value));

function buildTree(items: Array<{ label: string }>): Array<TreeNode> {
  const map = new Map<string, TreeNode>();
  const root: Array<TreeNode> = [];

  items.forEach((item) => {
    const parts = item.label.split('/');
    let path = '';

    parts.forEach((part, i) => {
      path = path ? `${path}/${part}` : part;

      if (!map.has(path)) {
        const node = { label: part, path, ...(i < parts.length - 1 && { children: [] }) };
        map.set(path, node);

        if (i === 0) {
          root.push(node);
        } else {
          map.get(parts.slice(0, i).join('/'))?.children?.push(node);
        }
      }
    });
  });

  const sort = (nodes: Array<TreeNode>): Array<TreeNode> =>
    nodes.sort((a, b) =>
      !!a.children === !!b.children ? a.label.localeCompare(b.label) : b.children ? 1 : -1,
    ).map((n) => ({ ...n, children: n.children && sort(n.children) }));

  return sort(root);
}

function transformSlot(slot: any, index: number): TreeItem {
  if (typeof slot.type === 'symbol') {
    return slot.children?.map(transformSlot);
  }

  return {
    label: slot.props?.filename || slot.props?.label || `${index}`,
    icon: slot.props?.icon,
    component: slot,
  };
}

function getExpandedPaths(path?: string) {
  if (props.expandAll) {
    const allPaths = new Set<string>();
    flatItems.value.forEach((item) => {
      const parts = item.label.split('/');
      for (let i = 1; i < parts.length; i++) {
        allPaths.add(parts.slice(0, i).join('/'));
      }
    });
    return Array.from(allPaths);
  }

  if (!path) {
    return [];
  }

  const parts = path.split('/');
  return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join('/'));
}

const expanded = ref(getExpandedPaths(model.value?.path));

// Re-expand all when flatItems actually change and expandAll is true
watch(flatItems, (newItems, oldItems) => {
  if (!props.expandAll) {
    return;
  }

  // Compare labels to detect actual changes (not just re-renders from rerenderCount)
  const newLabels = newItems.map((i) => i.label).join('\n');
  const oldLabels = oldItems?.map((i) => i.label).join('\n') ?? '';

  if (newLabels !== oldLabels) {
    expanded.value = getExpandedPaths();
  }
});

watch(model, (value) => {
  const item = flatItems.value.find((item) => value?.path === item.label);
  if (item?.component) {
    lastSelectedItem.value = item;
  }
}, { immediate: true });

onBeforeUpdate(() => rerenderCount.value++);
</script>

<!-- eslint-disable vue/no-template-shadow -->
<template>
  <DefineTreeTemplate v-slot="{ items, level }">
    <li
      v-for="(item, index) in items"
      :key="`${level}-${index}`"
      role="presentation"
      :class="level > 1 ? ui.itemWithChildren({ class: props.ui?.itemWithChildren }) : ui.item({ class: props.ui?.item })"
    >
      <AkarTreeItem
        v-slot="{ isExpanded, isSelected }"
        :level="level"
        :value="item"
        as-child
      >
        <button
          type="button"
          :class="ui.link({ class: props.ui?.link, active: isSelected })"
        >
          <PIcon
            v-if="item.children?.length"
            :name="isExpanded ? appConfig.ui.icons.folderOpen : appConfig.ui.icons.folder"
            :class="ui.linkLeadingIcon({ class: props.ui?.linkLeadingIcon })"
          />
          <PCodeIcon
            v-else
            :filename="item.label"
            :class="ui.linkLeadingIcon({ class: props.ui?.linkLeadingIcon })"
          />

          <span :class="ui.linkLabel({ class: props.ui?.linkLabel })">
            {{ item.label }}
          </span>

          <span v-if="item.children?.length" :class="ui.linkTrailing({ class: props.ui?.linkTrailing })">
            <PIcon
              :name="appConfig.ui.icons.chevronDown"
              :class="ui.linkTrailingIcon({ class: props.ui?.linkTrailingIcon })"
            />
          </span>
        </button>

        <ul
          v-if="item.children?.length && isExpanded"
          role="group"
          :class="ui.listWithChildren({ class: props.ui?.listWithChildren })"
        >
          <ReuseTreeTemplate :items="item.children" :level="level + 1" />
        </ul>
      </AkarTreeItem>
    </li>
  </DefineTreeTemplate>

  <div v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <TreeRoot
      v-model="model"
      v-model:expanded="expanded"
      :class="ui.list({ class: props.ui?.list })"
      :items="items"
      :get-key="(item) => item.path"
    >
      <ReuseTreeTemplate :items="items" :level="1" />
    </TreeRoot>

    <div :class="ui.content({ class: props.ui?.content })">
      <component :is="lastSelectedItem?.component" />
    </div>
  </div>
</template>
