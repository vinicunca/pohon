import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import PricingPlans from '../../src/runtime/components/PricingPlans.vue';
import { renderEach } from '../component-render';

describe('pricingPlans', () => {
  const plans = [
    {
      title: 'Basic',
      price: '$10',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      title: 'Pro',
      price: '$20',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
    {
      title: 'Enterprise',
      price: '$30',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
    },
  ];

  const props = { plans };

  renderEach(PricingPlans, [
    // Props
    ['with one plan', { props: { ...props, plans: [plans[0]!] } }],
    ['with two plans', { props: { ...props, plans: [plans[0]!, plans[1]!] } }],
    ['with three plans', { props }],
    ['with orientation vertical', { props: { ...props, orientation: 'vertical' } }],
    ['with compact', { props: { ...props, compact: true } }],
    ['with scale', { props: { ...props, scale: true } }],
    ['with compact and scale', { props: { ...props, compact: true, scale: true } }],
    ['with as', { props: { ...props, as: 'section' } }],
    ['with class', { props: { ...props, class: 'gap-y-12' } }],
    // Slots
    ['with default slot', { props, slots: { default: () => 'Default slot' } }],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(PricingPlans, {
      props,
    });
    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
