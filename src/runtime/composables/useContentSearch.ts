import type { ContentNavigationItem } from '@nuxt/content';
import type { ContentSearchFile, ContentSearchItem } from '../components/content/ContentSearch.vue';
import { createSharedComposable } from '@vueuse/core';
import { ref } from 'vue';
import { useAppConfig } from '#imports';

function _useContentSearch() {
  const open = ref(false);
  const appConfig = useAppConfig();

  /**
   * Map a file to a ContentSearchItem
   */
  function mapFile(
    file: ContentSearchFile,
    link: ContentNavigationItem,
    parent?: ContentNavigationItem,
  ): ContentSearchItem {
    const prefix = [...new Set([parent?.title, ...file.titles].filter(Boolean))];

    return {
      prefix: prefix?.length ? (`${prefix.join(' > ')} >`) : undefined,
      label: file.id === link.path ? link.title : file.title,
      suffix: file.content.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      to: file.id,
      icon: (link.icon || parent?.icon || (file.level > 1 ? appConfig.ui.icons.hash : appConfig.ui.icons.file)) as string,
      level: file.level,
    };
  }

  /**
   * Map navigation items to ContentSearchItems
   */
  function mapNavigationItems(
    children: Array<ContentNavigationItem>,
    files: Array<ContentSearchFile>,
    parent?: ContentNavigationItem,
  ): Array<ContentSearchItem> {
    // Build a path -> files index once per call to turn the per-leaf
    // `files.filter(...)` scan into an O(1) lookup. Without this, a large
    // navigation tree is O(leaves * files) on every re-map.
    const filesByPath = new Map<string, Array<ContentSearchFile>>();
    for (const file of files || []) {
      const basePath = file.id.split('#')[0] || file.id;
      let bucket = filesByPath.get(basePath);
      if (!bucket) {
        bucket = [];
        filesByPath.set(basePath, bucket);
      }
      bucket.push(file);
    }

    function visit(
      nodes: Array<ContentNavigationItem>,
      nodeParent?: ContentNavigationItem,
    ): Array<ContentSearchItem> {
      return nodes.flatMap((link) => {
        if (link.children?.length) {
          return visit(link.children, link);
        }

        const matched = link.path ? filesByPath.get(link.path) : undefined;
        return matched?.map((file) => mapFile(file, link, nodeParent)) || [];
      });
    }

    return visit(children, parent);
  }

  /**
   * Post-filter function to filter only first level items when no query
   */
  function postFilter(query: string, items: Array<ContentSearchItem>): Array<ContentSearchItem> {
    if (!query) {
      return items?.filter((item) => item.level === 1);
    }
    return items;
  }

  return {
    open,
    mapFile,
    mapNavigationItems,
    postFilter,
  };
}

export const useContentSearch = /* @__PURE__ */ createSharedComposable(_useContentSearch);
