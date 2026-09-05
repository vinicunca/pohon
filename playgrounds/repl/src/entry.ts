import type { App } from 'vue';
import basePlugin from 'pohon-ui/vue-plugin';
import './main.css';

const componentModules = import.meta.glob([
  '../../../src/runtime/components/*.vue',
  '!../../../src/runtime/components/Icon.vue',
  '!../../../src/runtime/components/Link.vue',
], { eager: true }) as Record<string, { default: any }>;
const overrideModules = import.meta.glob([
  '../../../src/runtime/vue/components/Icon.vue',
  '../../../src/runtime/vue/overrides/none/Link.vue',
], { eager: true }) as Record<string, { default: any }>;

const components: Record<string, any> = {};
for (const [path, mod] of Object.entries(overrideModules)) {
  const name = `P${path.match(/([^/]+)\.vue$/)?.[1]}`;
  components[name] = mod.default;
}
for (const [path, mod] of Object.entries(componentModules)) {
  const name = `P${path.match(/([^/]+)\.vue$/)?.[1]}`;
  components[name] = mod.default;
}

export function install(app: App) {
  app.use(basePlugin);
  for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
  }
}

export default { install };

export * from '../../../src/runtime/composables';
