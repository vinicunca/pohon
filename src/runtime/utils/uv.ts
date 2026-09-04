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
 * usage: it preserves the `UvReturnType` (so `extend: theme` keeps working
 * via property reads) and only intercepts the slot functions on invocation.
 */
export const uv = ((componentConfig?: any) => {
  const component = baseUv(resolveReplacers(componentConfig));

  return new Proxy(component, {
    apply(target, thisArg, args) {
      const result = Reflect.apply(target, thisArg, args);
      if (result && typeof result === 'object') {
        return wrapSlots(result);
      }

      // Slotless components (only a `base`, no `slots`) return a string. Honor a
      // replacer passed through `class` / `className`, otherwise return the
      // merged string untouched.
      if (typeof result === 'string') {
        const slotProps = args[0] ?? {};
        const replacer = findReplacer(slotProps.class) ?? findReplacer(slotProps.className);
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
 * Apply a call-time replacer: drop the resolved class chain (base + variants +
 * compound variants) and return only the replacement, plus any plain classes
 * passed alongside it. `resolveDefaults` computes that chain without any user
 * class so the replacer can reuse part of it.
 */
function applyReplacer(replacer: SlotClassReplacer, slotProps: Record<string, any>, resolveDefaults: () => string): string {
  return cx(
    replacer(resolveDefaults()),
    ...plainClasses(slotProps.class),
    ...plainClasses(slotProps.className),
  ) ?? '';
}

/**
 * A slot invocation is memoizable only when its output is fully determined by a
 * serializable key: primitives and arrays of primitives. Objects (clsx-style
 * class maps) and functions (replacers) bail to the uncached path.
 */
function isMemoizable(value: unknown, depth = 0): boolean {
  if (value === undefined || value === null) {
    return true;
  }
  const type = typeof value;
  if (type === 'string' || type === 'boolean') {
    return true;
  }
  // `JSON.stringify` turns NaN/Infinity into `null`, colliding with real `null`
  // keys that tv resolves differently (default variant vs `key || "false"` lookup).
  if (type === 'number') {
    return Number.isFinite(value);
  }
  if (Array.isArray(value)) {
    // Stop a few levels down rather than recurse without bound: a cyclic array
    // reaching a variant would blow the stack, where tv itself resolves it. The
    // arrays components pass (`[props.ui?.td, ...]`) are one or two deep.
    if (depth >= 4) {
      return false;
    }
    for (const item of value) {
      if (!isMemoizable(item, depth + 1)) {
        return false;
      }
    }
    return true;
  }
  return false;
}

function memoKey(slotProps: Record<string, any>): string | undefined {
  // Only plain objects: an exotic prototype could carry inherited enumerable
  // props that tv would read but `JSON.stringify` would drop from the key,
  // making two different inputs share one cache entry.
  const proto = Object.getPrototypeOf(slotProps);
  if (proto !== Object.prototype && proto !== null) {
    return undefined;
  }

  // `Object.keys` matches exactly what `JSON.stringify` serializes (own
  // enumerable keys), so everything the key omits is also never inspected here.
  for (const key of Object.keys(slotProps)) {
    if (!isMemoizable(slotProps[key])) {
      return undefined;
    }
  }
  // `JSON.stringify` drops `undefined`-valued keys, matching tv's semantics
  // (an undefined variant is the same as an absent one).
  return JSON.stringify(slotProps);
}

/**
 * Wrap the slot functions returned by `uv()` so a replacer passed at call time
 * (`:ui` / `class`, which includes what `<PTheme>` injects) drops the slot's
 * resolved class chain and returns only its replacement. Without a replacer the
 * original slot function runs untouched, so the common merge path is unaffected.
 *
 * Repeated invocations with identical simple args (re-renders, table cells) are
 * memoized per slot: variant resolution + twMerge only run once per distinct
 * input. The cache lives on the invocation result, so a factory rebuild (e.g.
 * `app.config.ui` change) or variant-prop recompute starts fresh.
 */
function wrapSlots(slots: Record<string, any>) {
  // `undefined` is a real slot result: `tv` returns it (not `''`) for a slot
  // whose chain resolves to no classes, so it can't double as a miss sentinel.
  const memo = new Map<string, Map<string, string | undefined>>();

  return new Proxy(slots, {
    get(target, key: string) {
      const slot = target[key];
      if (typeof slot !== 'function') {
        return slot;
      }

      return (slotProps: Record<string, any> = {}) => {
        const replacer = findReplacer(slotProps.class) ?? findReplacer(slotProps.className);
        if (!replacer) {
          const cacheKey = memoKey(slotProps);
          if (cacheKey === undefined) {
            return slot(slotProps);
          }

          let cache = memo.get(key);
          if (!cache) {
            cache = new Map();
            memo.set(key, cache);
          }

          let result = cache.get(cacheKey);
          // The extra `has` only runs for the rare slot that resolves to no
          // classes, so the hot path stays a single lookup.
          if (result === undefined && !cache.has(cacheKey)) {
            if (cache.size >= 500) {
              // Pathological dynamic inputs (e.g. per-row generated classes):
              // reset rather than grow unbounded.
              cache.clear();
            }
            result = slot(slotProps) as string;
            cache.set(cacheKey, result);
          }
          return result;
        }
        return applyReplacer(replacer, slotProps, () => slot({ ...slotProps, class: undefined, className: undefined }));
      };
    },
  });
}

/**
 * Flatten a raw theme class value (string, array, nested array with falsy holes)
 * into the string a replacer receives as its `defaults` argument.
 */
function defaultClasses(value: unknown): string {
  return cx(value as ClassValue) ?? '';
}

/**
 * Resolve construction-time replacers authored in `app.config.ui.<component>`
 * (under `slots` or the top-level `base`) so `createUv` only ever receives valid
 * class strings. The replacer takes the place of the slot's own classes from the
 * extended theme, which means `variants` and `compoundVariants` still merge on
 * top of the result — the same as when a plain string is used.
 *
 * Blanking the entry on the `extend` side is what makes it a replacement: `uv`
 * only ever concatenates the extended theme into the component's own classes, it
 * has no way to remove them. Call-time replacers (`:ui` / `class`) run after
 * variant resolution instead and are handled in {@link wrapSlots}. The incoming
 * config is never mutated.
 */
function resolveReplacers(componentConfig: any): any {
  if (!componentConfig || typeof componentConfig !== 'object') {
    return componentConfig;
  }

  const slots = componentConfig.slots;
  const replacers = slots && typeof slots === 'object'
    ? Object.entries(slots).filter((entry): entry is [string, SlotClassReplacer] => typeof entry[1] === 'function')
    : [];
  const baseReplacer = typeof componentConfig.base === 'function' ? componentConfig.base as SlotClassReplacer : undefined;

  if (!replacers.length && !baseReplacer) {
    return componentConfig;
  }

  const extend = componentConfig.extend;
  const resolved = { ...componentConfig };
  let extendSlots: Record<string, any> | undefined;
  let blankExtendBase = false;

  if (baseReplacer) {
    // A slotted component keeps its base under `slots.base`, a slotless one under
    // the top-level `base`, so read whichever the extended theme actually has.
    resolved.base = baseReplacer(defaultClasses(extend?.slots?.base ?? extend?.base));
    if (extend?.slots?.base) {
      extendSlots = { ...extend.slots, base: '' };
    }
    if (extend?.base) {
      blankExtendBase = true;
    }
  }

  if (replacers.length) {
    const cleaned = { ...slots };
    for (const [slot, replacer] of replacers) {
      cleaned[slot] = replacer(defaultClasses(extend?.slots?.[slot]));
      if (extend?.slots?.[slot]) {
        extendSlots = { ...(extendSlots ?? extend.slots), [slot]: '' };
      }
    }
    resolved.slots = cleaned;
  }

  if (extendSlots || blankExtendBase) {
    const cleanedExtend = { ...extend };
    if (extendSlots) {
      cleanedExtend.slots = extendSlots;
    }
    if (blankExtendBase) {
      cleanedExtend.base = '';
    }
    resolved.extend = cleanedExtend;
  }

  return resolved;
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
