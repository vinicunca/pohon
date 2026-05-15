<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../../types/uv';
import theme from '#build/ui/prose/field';

type ProseField = ComponentConfig<typeof theme, AppConfig, 'field', 'ui.prose'>;

export interface ProseFieldProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  /**
   * The name of the field.
   */
  name?: string;
  /**
   * Expected type of the field's value
   */
  type?: string;
  /**
   * Description of the field
   */
  description?: string;
  /**
   * Indicate whether the field is required
   */
  required?: boolean;
  class?: any;
  ui?: ProseField['slots'];
}

export interface ProseFieldSlots {
  default(props?: {}): Array<VNode>;
}
</script>

<script setup lang="ts">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../../composables/useComponentProps';
import { uv } from '../../utils/uv';

const _props = defineProps<ProseFieldProps>();
const slots = defineSlots<ProseFieldSlots>();

const props = useComponentProps('prose.field', _props);

const appConfig = useAppConfig() as ProseField['AppConfig'];

const ui = computed(() => uv({ extend: uv(theme), ...(appConfig.ui?.prose?.field || {}) })());
</script>

<template>
  <Primitive :as="props.as" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div :class="ui.container({ class: props.ui?.container })">
      <span v-if="props.name" :class="ui.name({ class: props.ui?.name })">
        {{ props.name }}
      </span>

      <div v-if="props.type || props.required" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <span v-if="props.type" :class="ui.type({ class: props.ui?.type })">
          {{ props.type }}
        </span>

        <span v-if="props.required" :class="ui.required({ class: props.ui?.required })">
          required
        </span>
      </div>
    </div>

    <div v-if="!!slots.default || props.description" :class="ui.description({ class: props.ui?.description })">
      <slot mdc-unwrap="p">
        {{ props.description }}
      </slot>
    </div>
  </Primitive>
</template>
