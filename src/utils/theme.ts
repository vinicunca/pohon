/**
 * Override default variants from module options
 * @param result - The theme result object
 * @param defaultVariants - The default variants from module options
 * @param defaultVariants.color - The default color variant
 * @param defaultVariants.size - The default size variant
 * @returns The theme result with overridden default variants
 */
export function applyDefaultVariants(result: any, defaultVariants?: { color?: string; size?: string }): any {
  if (!result || !defaultVariants) {
    return result;
  }

  if (defaultVariants.color && result.defaultVariants?.color && result.defaultVariants.color === 'primary') {
    result.defaultVariants.color = defaultVariants.color;
  }
  if (defaultVariants.size && result.defaultVariants?.size && result.defaultVariants.size === 'md') {
    result.defaultVariants.size = defaultVariants.size;
  }

  return result;
}

/**
 * Blank every class string in a theme so components render without their
 * default styles, keeping only what the user supplies via `class`, `ui` or
 * `app.config.ui`. All keys are preserved (slots stay callable, `variants` and
 * `defaultVariants` keep their values) so variant props still type-check and
 * validate. Mirrors `tailwind-variants` shapes: a slot value is either a class
 * string/array or, inside `variants`/`compoundVariants`, an object mapping slot
 * names to classes.
 * @param result - The theme result object
 * @param unstyled - Whether to strip the theme classes
 * @returns The theme result with blanked class strings
 */
export function applyUnstyled(result: any, unstyled?: boolean): any {
  if (!result || !unstyled) {
    return result;
  }

  const blank = (value: unknown): unknown => (value && typeof value === 'object' && !Array.isArray(value))
    ? Object.fromEntries(Object.keys(value as Record<string, unknown>).map((slot) => [slot, '']))
    : '';

  if (result.slots) {
    result.slots = Object.fromEntries(Object.keys(result.slots).map((slot) => [slot, '']));
  }

  if (result.variants) {
    result.variants = Object.fromEntries(
      Object.entries(result.variants).map(([name, group]) => [
        name,
        Object.fromEntries(Object.entries(group as Record<string, unknown>).map(([key, value]) => [key, blank(value)])),
      ]),
    );
  }

  if (result.compoundVariants) {
    result.compoundVariants = result.compoundVariants.map((entry: Record<string, unknown>) => {
      const { class: cls, ...selectors } = entry;
      return { ...selectors, class: blank(cls) };
    });
  }

  return result;
}
