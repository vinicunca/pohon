import type { ClassValue, UvCompoundVariants, UvDefaultVariants, UvReturnType, UvVariants } from 'unocss-variants';
import type { SlotClassReplacer } from '../types/uv';
import { uv as createUv } from 'unocss-variants';

// Internal `unocss-variants` helpers that are not re-exported.
type UVSlots = Record<string, ClassValue> | undefined;

/**
 * Widen the slot functions of a `unocss-variants` return type so `class` /
 * `className` also accept the `(defaults) => classes` replacer — `:ui` and the
 * `class` prop flow straight into them. The concrete slot keys (and the
 * extend-readable `slots` / `variants` / … properties) are preserved, so
 * components keep type-checking under `noUncheckedIndexedAccess`.
 */
type WideSlotFn = (slotProps?: Record<string, any>) => string;
type Widen<R> = R extends (props?: infer P) => infer Slots
  ? { (props?: P): Slots extends string ? string : { [K in keyof Slots]: WideSlotFn } } & Omit<R, never>
  : R;

/**
 * Mirrors `unocss-variants`' `UV` call signature (so config inference is
 * unchanged) but returns the {@link Widen}-ed result. Component prop types are
 * derived from `typeof theme` via `ComponentConfig`, not from this type, so the
 * widening only affects the internal `ui.slot(...)` calls.
 */
type WideUV = {
  <
    V extends UvVariants<S, B, EV>,
    CV extends UvCompoundVariants<V, S, B, EV, ES>,
    DV extends UvDefaultVariants<V, S, EV, ES>,
    B extends ClassValue = undefined,
    S extends UVSlots = undefined,
    // @ts-expect-error mirror of tailwind-variants' own circular default
    E extends UvReturnType = UvReturnType<V, S, B, EV extends undefined ? {} : EV, ES extends undefined ? {} : ES>,
    EV extends UvVariants<ES, B, E['variants'], ES> = E['variants'],
    ES extends UVSlots = E['slots'] extends UVSlots ? E['slots'] : undefined,
  >(
    options: {
      extend?: E;
      base?: B;
      slots?: S;
      variants?: V;
      compoundVariants?: CV;
      compoundSlots?: any;
      defaultVariants?: DV;
    },
  ): Widen<UvReturnType<V, S, B, EV, ES, E>>;
};

const baseUv = /* @__PURE__ */ createUv;

/**
 * Wraps `unocss-variants`' `uv` so slot classes can be **replaced** (not just
 * merged) through a function form — `(defaults) => classes` — in `:ui`, the
 * `class` prop and `app.config.ui`. The wrapper is transparent for every other
 * usage: it preserves the `UvReturnType` (so `extend: uv(theme)` keeps working
 * via property reads) and only intercepts the slot functions on invocation.
 */
export const uv = ((componentConfig?: any) => {
  const { config: cleanConfig, directives } = extractDirectives(componentConfig);
  const component = baseUv(cleanConfig);

  return new Proxy(component, {
    apply(target, thisArg, args) {
      const result = Reflect.apply(target, thisArg, args);
      if (result && typeof result === 'object') {
        return wrapSlots(result, directives);
      }

      // Slotless components (only a `base`, no `slots`) return a string. Honor a
      // replacer passed through `class` / `className` or a `base` directive from
      // `app.config.ui`, otherwise return the merged string untouched.
      if (typeof result === 'string') {
        const slotProps = args[0] ?? {};
        const replacer = findReplacer(slotProps.class) ?? findReplacer(slotProps.className) ?? directives?.base;
        if (replacer) {
          return applyReplacer(replacer, slotProps, () => Reflect.apply(target, thisArg, [{ ...slotProps, class: undefined, className: undefined }]));
        }
      }

      return result;
    },
  });
}) as unknown as WideUV;

/**
 * Find a class **replacer** — a function `(defaults) => classes` that replaces a
 * slot's default classes instead of merging onto them. It may sit directly in a
 * slot's `class` value (the `transformUI` scalar path) or inside the array a
 * component forwards (e.g. `[props.ui?.base, props.class]`). Arrays are scanned
 * deeply and the **last** replacer wins, mirroring `twMerge`'s last-in-wins
 * semantics so e.g. `props.class` overrides `props.ui?.base`.
 */
function findReplacer(value: unknown): SlotClassReplacer | undefined {
  if (typeof value === 'function') {
    return value as SlotClassReplacer;
  }
  if (Array.isArray(value)) {
    for (let i = value.length - 1; i >= 0; i--) {
      const replacer = findReplacer(value[i]);
      if (replacer) {
        return replacer;
      }
    }
  }
  return undefined;
}

/**
 * Keep the plain (non-function) classes passed alongside a replacer so they
 * still apply on top of the replacement. Nested arrays are flattened so plain
 * classes are never dropped.
 */
function plainClasses(value: unknown): Array<ClassValue> {
  if (Array.isArray(value)) {
    return value.flatMap((item) => plainClasses(item));
  }
  if (typeof value === 'function') {
    return [];
  }
  return [value as ClassValue];
}

/**
 * Apply a replacer: drop the baked-in default chain and return only the
 * replacement, plus any plain classes passed alongside it. `resolveDefaults`
 * computes the slot's default classes (without any user class) so the replacer
 * can reuse part of them.
 */
function applyReplacer(replacer: SlotClassReplacer, slotProps: Record<string, any>, resolveDefaults: () => string): string {
  return cx(
    replacer(resolveDefaults()),
    ...plainClasses(slotProps.class),
    ...plainClasses(slotProps.className),
  ) ?? '';
}

/**
 * Wrap the slot functions returned by `tv()` so a replacer (from `:ui` / `class`
 * at call time, or from `app.config.ui` at construction time) drops the slot's
 * baked-in default chain and returns only its replacement. Without a replacer the
 * original slot function runs untouched, so the common merge path is unaffected.
 */
function wrapSlots(slots: Record<string, any>, directives?: Record<string, SlotClassReplacer>) {
  return new Proxy(slots, {
    get(target, key: string) {
      const slot = target[key];
      if (typeof slot !== 'function') {
        return slot;
      }

      return (slotProps: Record<string, any> = {}) => {
        const replacer = findReplacer(slotProps.class) ?? findReplacer(slotProps.className) ?? directives?.[key];
        if (!replacer) {
          return slot(slotProps);
        }
        return applyReplacer(replacer, slotProps, () => slot({ ...slotProps, class: undefined, className: undefined }));
      };
    },
  });
}

/**
 * Pull construction-time replacers authored in `app.config.ui.<component>` (under
 * `slots` or the top-level `base`) out of the config so `createTV` only ever
 * receives valid class strings. They are applied at call time in `wrapSlots`,
 * alongside the `:ui` / `class` ones. The incoming config is never mutated.
 */
function extractDirectives(componentConfig: any): { config: any; directives?: Record<string, SlotClassReplacer> } {
  if (!componentConfig || typeof componentConfig !== 'object') {
    return { config: componentConfig };
  }

  let config = componentConfig;
  let directives: Record<string, SlotClassReplacer> | undefined;

  if (typeof componentConfig.base === 'function') {
    directives = { base: componentConfig.base };
    config = { ...config, base: '' };
  }

  const slots = componentConfig.slots;
  if (slots && typeof slots === 'object') {
    const replacers = Object.entries(slots).filter(([, value]) => typeof value === 'function');
    if (replacers.length) {
      directives ??= {};
      const cleaned = { ...slots };
      for (const [slot, replacer] of replacers) {
        directives[slot] = replacer as SlotClassReplacer;
        cleaned[slot] = '';
      }
      config = { ...config, slots: cleaned };
    }
  }

  return { config, directives };
}

function cx(...classnames: Array<ClassValue>) {
  const classList: Array<string> = [];

  // recursively process input
  const buildClassString = (input: ClassValue) => {
    // skip null, undefined, or invalid numbers
    if (!input && input !== 0 && input !== 0n) {
      return;
    }

    if (Array.isArray(input)) {
      // handle array elements
      for (let i = 0, len = input.length; i < len; i++) {
        buildClassString(input[i]);
      }

      return;
    }

    const type = typeof input;

    if (type === 'string' || type === 'number' || type === 'bigint') {
      // skip nan
      // eslint-disable-next-line no-self-compare
      if (type === 'number' && input !== input) {
        return;
      }
      classList.push(String(input)); // add to class list
    } else if (type === 'object') {
      // add keys with truthy values
      const keys = Object.keys(input);

      for (let i = 0, len = keys.length; i < len; i++) {
        const key = keys[i];

        if (key && input[key as keyof typeof input]) {
          classList.push(key);
        }
      }
    }
  };

  // process all args
  for (let i = 0, len = classnames.length; i < len; i++) {
    const c = classnames[i];

    if (c !== null && c !== undefined) {
      buildClassString(c);
    }
  }

  // join classes and remove extra spaces
  return classList.length > 0 ? removeExtraSpaces(classList.join(' ')) : undefined;
}

const SPACE_REGEX = /\s+/g;

function removeExtraSpaces(str: string): string {
  if (typeof str !== 'string' || !str) {
    return str;
  }

  return str.replace(SPACE_REGEX, ' ').trim();
}
