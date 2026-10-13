import type { Component } from 'vue';
import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';
import BlogPost from '../../src/runtime/components/BlogPost.vue';
import ChangelogVersion from '../../src/runtime/components/ChangelogVersion.vue';
import DashboardNavbar from '../../src/runtime/components/DashboardNavbar.vue';
import Empty from '../../src/runtime/components/Empty.vue';
import Error from '../../src/runtime/components/Error.vue';
import FooterColumns from '../../src/runtime/components/FooterColumns.vue';
import PageCTA from '../../src/runtime/components/PageCTA.vue';
import PageHeader from '../../src/runtime/components/PageHeader.vue';
import PageHero from '../../src/runtime/components/PageHero.vue';
import PageLogos from '../../src/runtime/components/PageLogos.vue';
import PageSection from '../../src/runtime/components/PageSection.vue';

const components: Array<[string, Component, string, string, Record<string, unknown>]> = [
  ['BlogPost', BlogPost, 'title', 'H2', { title: 'Heading' }],
  ['ChangelogVersion', ChangelogVersion, 'title', 'H2', { title: 'Heading' }],
  ['DashboardNavbar', DashboardNavbar, 'title', 'H1', { title: 'Heading' }],
  ['Empty', Empty, 'title', 'H2', { title: 'Heading' }],
  ['Error', Error, 'statusMessage', 'H1', { error: { statusCode: 404, statusMessage: 'Missing' } }],
  ['FooterColumns', FooterColumns, 'label', 'H3', { columns: [{ label: 'Links', children: [] }] }],
  ['PageCTA', PageCTA, 'title', 'H2', { title: 'Heading' }],
  ['PageHeader', PageHeader, 'title', 'H1', { title: 'Heading' }],
  ['PageHero', PageHero, 'title', 'H1', { title: 'Heading' }],
  ['PageLogos', PageLogos, 'title', 'H2', { title: 'Heading' }],
  ['PageSection', PageSection, 'title', 'H2', { title: 'Heading' }],
];

describe('heading elements', () => {
  it.each(components)('%s keeps its heading default and reacts to element overrides', async (_name, component, slot, defaultHeading, props) => {
    const wrapper = await mountSuspended(component, { props });
    const heading = () => wrapper.get(`[data-slot="${slot}"]`).element.tagName;
    expect(heading()).toBe(defaultHeading);

    await wrapper.setProps({ as: { root: 'section', [slot]: 'h4' } });
    expect(wrapper.get('[data-slot="root"]').element.tagName).toBe('SECTION');
    expect(heading()).toBe('H4');

    await wrapper.setProps({ as: 'aside' });
    expect(wrapper.get('[data-slot="root"]').element.tagName).toBe('ASIDE');
    expect(heading()).toBe(defaultHeading);
    wrapper.unmount();
  });
});
