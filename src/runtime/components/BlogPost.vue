<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { BadgeProps, LinkProps, UserProps } from '../types';
import type { ImgHTMLAttributes } from '../types/html';
import type { ComponentConfig } from '../types/uv';
import theme from '#build/ui/blog-post';

type BlogPost = ComponentConfig<typeof theme, AppConfig, 'blogPost'>;

export interface BlogPostProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'article'
   */
  as?: any;
  title?: string;
  description?: string;
  /** The date of the blog post. Can be a string or a Date object. */
  date?: string | Date;
  /**
   * Display a badge on the blog post.
   * Can be a string or an object.
   * `{ color: 'neutral', variant: 'subtle' }`{lang="ts-type"}
   */
  badge?: string | BadgeProps;
  /** The authors of the blog post. */
  authors?: Array<UserProps>;
  /** The image of the blog post. Can be a string or an object. */
  image?: string | (Partial<ImgHTMLAttributes> & { [key: string]: any });
  /**
   * The orientation of the blog post.
   * @defaultValue 'vertical'
   */
  orientation?: BlogPost['variants']['orientation'];
  /**
   * @defaultValue 'outline'
   */
  variant?: BlogPost['variants']['variant'];
  to?: LinkProps['to'];
  target?: LinkProps['target'];
  onClick?: (event: MouseEvent) => void | Promise<void>;
  class?: any;
  ui?: BlogPost['slots'];
}

export interface BlogPostSlots {
  date?(props?: {}): Array<VNode>;
  badge?(props?: {}): Array<VNode>;
  title?(props?: {}): Array<VNode>;
  description?(props?: {}): Array<VNode>;
  authors?(props: { ui: BlogPost['ui'] }): Array<VNode>;
  header?(props: { ui: BlogPost['ui'] }): Array<VNode>;
  body?(props?: {}): Array<VNode>;
  footer?(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive, useDateFormatter } from 'akar';
import { computed } from 'vue';
import ImageComponent from '#build/ui-image-component';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { useLocale } from '../composables/useLocale';
import { getSlotChildrenText } from '../utils';
import { uv } from '../utils/uv';
import PAvatar from './Avatar.vue';
import PAvatarGroup from './AvatarGroup.vue';
import PBadge from './Badge.vue';
import PLink from './Link.vue';
import PUser from './User.vue';

defineOptions({ inheritAttrs: false });

const _props = withDefaults(
  defineProps<BlogPostProps>(),
  {
    as: 'article',
    orientation: 'vertical',
  },
);
const slots = defineSlots<BlogPostSlots>();

const props = useComponentProps('blogPost', _props);

const { locale } = useLocale();
const appConfig = useAppConfig() as BlogPost['AppConfig'];
const formatter = useDateFormatter(locale.value.code);

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.blogPost || {}) })({
  orientation: props.orientation,
  variant: props.variant,
  image: !!props.image,
  to: !!props.to || !!props.onClick,
}));

const date = computed(() => {
  if (!props.date) {
    return;
  }

  try {
    return formatter.custom(new Date(props.date), { dateStyle: 'medium' });
  } catch {
    return props.date;
  }
});
const datetime = computed(() => {
  if (!props.date) {
    return;
  }

  try {
    return new Date(props.date)?.toISOString();
  } catch {
    return undefined;
  }
});
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || 'Post link').trim();
});
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })" @click="props.onClick">
    <PLink
      v-if="props.to"
      :aria-label="ariaLabel"
      v-bind="{ to: props.to, target: props.target, ...$attrs }"
      class="focus:outline-none absolute inset-0"
      raw
    />

    <div v-if="props.image || !!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" :ui="ui">
        <component
          :is="ImageComponent"
          v-bind="typeof props.image === 'string' ? { src: props.image, alt: props.title } : { alt: props.title, ...props.image }"
          data-slot="image"
          :class="ui.image({ class: props.ui?.image, to: !!props.to })"
        />
      </slot>
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot name="body">
        <div v-if="(date || !!slots.date) || (props.badge || !!slots.badge)" data-slot="meta" :class="ui.meta({ class: props.ui?.meta })">
          <slot name="badge">
            <PBadge
              v-if="props.badge"
              color="neutral"
              variant="subtle"
              v-bind="typeof props.badge === 'string' ? { label: props.badge } : props.badge"
              data-slot="badge"
              :class="ui.badge({ class: props.ui?.badge })"
            />
          </slot>

          <time v-if="date || !!slots.date" :datetime="datetime" data-slot="date" :class="ui.date({ class: props.ui?.date })">
            <slot name="date">
              {{ date }}
            </slot>
          </time>
        </div>

        <h2 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h2>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>

        <div v-if="props.authors?.length || !!slots.authors" data-slot="authors" :class="ui.authors({ class: props.ui?.authors })">
          <slot name="authors" :ui="ui">
            <template v-if="props.authors?.length">
              <PAvatarGroup v-if="props.authors.length > 1">
                <PLink
                  v-for="(author, index) in props.authors"
                  :key="index"
                  :to="author.to"
                  :target="author.target"
                  data-slot="avatar"
                  :class="ui.avatar({ class: props.ui?.avatar, to: !!author.to })"
                  raw
                >
                  <PAvatar v-bind="author.avatar" />
                </PLink>
              </PAvatarGroup>
              <PUser v-else v-bind="props.authors[0]" />
            </template>
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
