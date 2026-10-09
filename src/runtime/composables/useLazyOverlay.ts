import type { MaybeRefOrGetter } from 'vue';
import { onBeforeUnmount, onMounted, ref, toValue, watch } from 'vue';
import { cancelIdleCallback, requestIdleCallback } from '../utils/prefetch';

/**
 * `false` until `open` is first truthy, then `true` for good. Preloads the overlay once idle after mount.
 */
export function useLazyOverlay(open: MaybeRefOrGetter<boolean | undefined>, preload: () => Promise<unknown>) {
  const rendered = ref(!!toValue(open));

  watch(() => toValue(open), (value) => {
    if (value) {
      rendered.value = true;
    }
  });

  let idleId: ReturnType<typeof requestIdleCallback>;

  onMounted(() => {
    idleId = requestIdleCallback(() => {
      preload().catch(() => {});
    });
  });

  onBeforeUnmount(() => {
    cancelIdleCallback(idleId);
  });

  return rendered;
}
