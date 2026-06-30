import type { ComputedRef, VNode } from 'vue';
import { toCamelCase, toKebabCase } from '@vinicunca/perkakas';
import { createContext } from 'akar';
import defu from 'defu';
import { computed, getCurrentInstance } from 'vue';
import { useAppConfig } from '#imports';
import { get } from '../utils';

export type ThemeContext = {
  defaults: ComputedRef<Record<string, Record<string, any> | undefined>>;
};

const [_injectThemeContext, provideThemeContext] = createContext<ThemeContext>('PTheme', 'RootContext');

/**
 * Module-level fallback so components can call `useComponentProps` outside any
 * `<PTheme>` wrapper without crashing.
 */
export const defaultThemeContext: ThemeContext = {
  defaults: computed(() => ({})),
};

export function injectThemeContext(fallback: ThemeContext = defaultThemeContext): ThemeContext {
  return _injectThemeContext(fallback);
}

export { provideThemeContext };

/**
 * Vuetify-style detection for whether a prop was explicitly passed by the parent,
 * distinguishing "user set it" from "got the `withDefaults` fallback".
 * Checks both camelCase and kebab-case names to cover both template conventions.
 */
function propIsDefined(vnode: VNode | null | undefined, prop: string): boolean {
  if (!vnode || !vnode.props) {
    return false;
  }
  return vnode.props[toCamelCase(prop)] !== undefined
    || vnode.props[toKebabCase(prop)] !== undefined;
}

/**
 * Resolve a component's props with the priority chain:
 *   explicit prop > nearest PTheme > withDefaults
 *     > app.config.ui.<name>.defaultVariants
 *
 * The returned proxy transparently reads from `props`, falling through to the
 * injected `ThemeContext` and `app.config.ui.<name>.defaultVariants` for
 * defaults. The component's uv() `defaultVariants` are intentionally left out
 * of the proxy fallback — they continue to drive `uv()`-internal class
 * resolution (the original semantics) without leaking into prop reads. The
 * `ui` prop is deep-merged (explicit slot classes override theme slot classes)
 * instead of being replaced.
 */
export function useComponentProps<T extends object>(name: string, props: T): T {
  const vm = getCurrentInstance();
  const { defaults } = injectThemeContext();
  const appConfig = useAppConfig() as { ui?: Record<string, any> };

  return new Proxy(props, {
    get(target, prop, receiver) {
      // Advertise as a Vue reactive proxy so `toRefs`, `reactiveOmit`,
      // `reactivePick`, and similar utilities don't warn when given the proxy.
      // Reads still flow through to the underlying reactive `props` object
      // returned by `defineProps`, so reactivity tracking works normally.
      if (prop === '__v_isReactive') {
        return true;
      }
      if (prop === '__v_raw') {
        return target;
      }

      const raw = Reflect.get(target, prop, receiver);
      if (typeof prop !== 'string') {
        return raw;
      }

      // Support dotted-path names (e.g. `prose.p`, `prose.code`) so prose
      // components can pull from the same nested `ThemeContext.defaults` shape
      // that `normalizeUi` produces in `<PTheme>`.
      const themeEntry = name.includes('.') ? get(defaults.value, name) : defaults.value[name];

      if (prop === 'ui') {
        const themeUi = themeEntry?.ui;
        if (!raw && !themeUi) {
          return raw;
        }
        return defu(raw ?? {}, themeUi ?? {});
      }

      if (vm && propIsDefined(vm.vnode, prop)) {
        return raw;
      }

      const themeValue = themeEntry?.[prop];
      if (themeValue !== undefined) {
        return themeValue;
      }

      // Only fall back to `raw` when `withDefaults` set an explicit default for
      // this prop. Otherwise Vue's runtime would auto-cast unset Boolean props
      // to `false` (and other typed props to their normalized fallback), which
      // would override defaults baked into the underlying primitive when those
      // props are forwarded downstream.
      const propDef = (vm?.type as any)?.props?.[prop];
      if (propDef && Object.hasOwn(propDef, 'default')) {
        return raw;
      }

      const appConfigEntry = name.includes('.') ? get(appConfig.ui ?? {}, name) : appConfig.ui?.[name];
      return appConfigEntry?.defaultVariants?.[prop];
    },
    // `has`, `ownKeys`, and `getOwnPropertyDescriptor` reflect the underlying
    // `defineProps` schema only — theme defaults are NOT enumerable. As a
    // result, `Object.keys(props)`, `for…in`, and `{ ...props }` see only the
    // declared prop keys, but each value lookup still flows through the proxy.
    // This is the contract our internal `useForwardProps` relies on.
    has: (t, p) => Reflect.has(t, p),
    ownKeys: (t) => Reflect.ownKeys(t),
    getOwnPropertyDescriptor: (t, p) => Reflect.getOwnPropertyDescriptor(t, p),
  });
}
