<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { BlogPostProps, BlogPostSlots } from '../types';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/blog-posts';

type BlogPosts = ComponentConfig<typeof theme, AppConfig, 'blogPosts'>;

export interface BlogPostsProps<T extends BlogPostProps = BlogPostProps> {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  posts?: Array<T>;
  /**
   * The orientation of the blog posts.
   * @defaultValue 'horizontal'
   */
  orientation?: BlogPosts['variants']['orientation'];
  class?: any;
  ui?: { base?: any };
}

type ExtendSlotWithPost<T extends BlogPostProps, K extends keyof BlogPostSlots>
  = Required<BlogPostSlots>[K] extends (props: infer P) => Array<VNode>
    ? (props: P & { post: T }) => Array<VNode>
    : Required<BlogPostSlots>[K];

export type BlogPostsSlots<T extends BlogPostProps = BlogPostProps> = {
  [K in keyof BlogPostSlots]?: ExtendSlotWithPost<T, K>
} & {
  default?(props?: {}): Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends BlogPostProps">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PBlogPost from './BlogPost.vue';

const _props = withDefaults(
  defineProps<BlogPostsProps>(),
  {
    orientation: 'horizontal',
  },
);
const slots = defineSlots<BlogPostsSlots<T>>();

const props = useComponentProps<BlogPostsProps>('blogPosts', _props);

const getProxySlots = () => omit(slots, ['default']);

const appConfig = useAppConfig() as BlogPosts['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.blogPosts || {}) }));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" :class="ui({ orientation: props.orientation, class: [props.ui?.base, props.class] })">
    <slot>
      <PBlogPost
        v-for="(post, index) in props.posts"
        :key="index"
        :orientation="props.orientation === 'vertical' ? 'horizontal' : 'vertical'"
        v-bind="post"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
          <slot :name="name" v-bind="(slotData as any)" :post="post" />
        </template>
      </PBlogPost>
    </slot>
  </Primitive>
</template>
