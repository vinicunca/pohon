<!-- eslint-disable vue/block-tag-newline -->
<script lang="ts">
import type { AppConfig } from '@nuxt/schema';
import type { VNode } from 'vue';
import type { ComponentConfig } from '../types/uv';
import type { PricingPlanProps, PricingPlanSlots } from './PricingPlan.vue';
import theme from '#build/ui/pricing-plans';

type PricingPlans = ComponentConfig<typeof theme, AppConfig, 'pricingPlans'>;

export interface PricingPlansProps {
  /**
   * The element or component this component should render as.
   * @defaultValue 'div'
   */
  as?: any;
  plans?: Array<PricingPlanProps>;
  /**
   * The orientation of the pricing plans.
   * @defaultValue 'horizontal'
   */
  orientation?: PricingPlans['variants']['orientation'];
  /**
   * When `true`, the plans will be displayed without gap.
   * @defaultValue false
   */
  compact?: boolean;
  /**
   * When `true`, the plans will be displayed with a larger gap.
   * Useful when one plan is scaled. Doesn't work with `compact`.
   * @defaultValue false
   */
  scale?: boolean;
  class?: any;
  ui?: { base?: any };
}

type ExtendSlotWithPlan<T extends PricingPlanProps, K extends keyof PricingPlanSlots>
  = PricingPlanSlots[K] extends (props: infer P) => Array<VNode>
    ? (props: P & { plan: T }) => Array<VNode>
    : PricingPlanSlots[K];

export type PricingPlansSlots<T extends PricingPlanProps = PricingPlanProps> = {
  [K in keyof PricingPlanSlots]?: ExtendSlotWithPlan<T, K>
} & {
  default?(props?: {}): Array<VNode>;
};

</script>

<script setup lang="ts" generic="T extends PricingPlanProps">
import { Primitive } from 'akar';
import { computed } from 'vue';
import { useAppConfig } from '#imports';
import { useComponentProps } from '../composables/useComponentProps';
import { omit } from '../utils';
import { uv } from '../utils/uv';
import PPricingPlan from './PricingPlan.vue';

const _props = withDefaults(
  defineProps<PricingPlansProps>(),
  {
    orientation: 'horizontal',
    compact: false,
    scale: false,
  },
);
const slots = defineSlots<PricingPlansSlots<T>>();

const props = useComponentProps<PricingPlansProps>('pricingPlans', _props);

const getProxySlots = () => omit(slots, ['default']);

const appConfig = useAppConfig() as PricingPlans['AppConfig'];

const ui = computed(() => uv({ extend: theme, ...(appConfig.ui?.pricingPlans || {}) }));

const count = computed(() => props.plans?.length || slots.default?.()?.flatMap(mapSlot).filter(Boolean)?.length || 3);

function mapSlot(slot: any) {
  if (typeof slot.type === 'symbol') {
    if (slot.children && Array.isArray(slot.children)) {
      return slot.children.map(mapSlot);
    }

    return;
  }

  return slot;
}
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" :class="ui({ class: [props.ui?.base, props.class], compact: props.compact, scale: props.scale, orientation: props.orientation })" :style="{ '--count': count }">
    <slot>
      <PPricingPlan
        v-for="(plan, index) in props.plans"
        :key="index"
        :orientation="props.orientation === 'vertical' ? 'horizontal' : 'vertical'"
        v-bind="plan"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
          <slot :name="name" v-bind="(slotData as any)" :plan="plan" />
        </template>
      </PPricingPlan>
    </slot>
  </Primitive>
</template>
