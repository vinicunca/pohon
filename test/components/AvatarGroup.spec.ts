import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import { axe } from 'vitest-axe';
import { defineComponent } from 'vue';
import theme from '#build/ui/avatar-group';
import Avatar from '../../src/runtime/components/Avatar.vue';
import AvatarGroup from '../../src/runtime/components/AvatarGroup.vue';
import { renderEach } from '../component-render';

const AvatarGroupWrapper = defineComponent({
  components: {
    PAvatar: Avatar,
    PAvatarGroup: AvatarGroup,
  },
  template: `<PAvatarGroup>
  <PAvatar src="https://github.com/praburangki.png" alt="praburangki" />
  <PAvatar src="https://github.com/romhml.png" alt="Romain Hamel" />
  <PAvatar src="https://github.com/noook.png" alt="Neil Richter" />
</PAvatarGroup>`,
});

describe('avatarGroup', () => {
  const sizes = Object.keys(theme.variants.size) as any;
  const colors = Object.keys(theme.variants.color) as any;

  renderEach(AvatarGroupWrapper, [
    // Props
    ['with max', { props: { max: 2 } }],
    ...sizes.map((size: string) => [`with size ${size}`, { props: { size } }]),
    ...colors.map((color: string) => [`with color ${color}`, { props: { color, max: 1 } }]),
    ['with as', { props: { as: 'span' } }],
    ['with class', { props: { class: 'justify-start' } }],
    ['with ui', { props: { ui: { base: 'rounded-lg' } } }],
    // Slots
    ['with default slot', {}],
  ]);

  it('passes accessibility tests', async () => {
    const wrapper = await mountSuspended(AvatarGroupWrapper, {
      props: {
        max: 2,
      },
    });

    expect(await axe(wrapper.element)).toHaveNoViolations();
  });
});
