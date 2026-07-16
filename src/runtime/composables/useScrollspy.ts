import { onBeforeMount, onBeforeUnmount, ref, watch } from 'vue';

export function useScrollspy() {
  const observer = ref<IntersectionObserver>();
  const visibleHeadings = ref<Array<string>>([]);
  const activeHeadings = ref<Array<string>>([]);

  function observerCallback(entries: Array<IntersectionObserverEntry>) {
    // Batched into a single write so the watcher runs once per callback, not once per entry.
    const headings = new Set(visibleHeadings.value);
    let changed = false;

    for (const entry of entries) {
      const id = entry.target.id;
      if (!id) {
        continue;
      }

      if (entry.isIntersecting) {
        if (!headings.has(id)) {
          headings.add(id);
          changed = true;
        }
      } else if (headings.delete(id)) {
        changed = true;
      }
    }

    if (changed) {
      visibleHeadings.value = [...headings];
    }
  }

  function updateHeadings(headings: Array<Element>) {
    if (!observer.value) {
      return;
    }

    // Drop previously observed targets so repeated calls (e.g. on page navigation) don't accumulate.
    observer.value.disconnect();
    visibleHeadings.value = [];

    headings.forEach((heading) => {
      observer.value!.observe(heading);
    });
  }

  watch(visibleHeadings, (val, oldVal) => {
    if (val.length === 0) {
      activeHeadings.value = oldVal;
    } else {
      activeHeadings.value = val;
    }
  });

  // Create intersection observer
  onBeforeMount(() => {
    observer.value = new IntersectionObserver(observerCallback);
  });

  // Destroy it
  onBeforeUnmount(() => observer.value?.disconnect());

  return {
    visibleHeadings,
    activeHeadings,
    updateHeadings,
  };
}
