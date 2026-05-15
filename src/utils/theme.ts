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
