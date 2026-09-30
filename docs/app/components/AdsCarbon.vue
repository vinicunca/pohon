<script setup lang="ts">
const el = ref<HTMLDivElement | null>(null)

onMounted(() => {
  if (!el.value) {
    return
  }

  const script = document.createElement('script')
  script.setAttribute('type', 'text/javascript')
  script.setAttribute('src', 'https://cdn.carbonads.com/carbon.js?serve=CWYIVK3E&placement=uinuxtcom')
  script.setAttribute('id', '_carbonads_js')

  el.value?.appendChild(script)
})
</script>

<template>
  <div ref="el" class="carbon" />
</template>

<style scoped>
.carbon :deep(#carbonads) {
  position: relative;
  width: 100%;
  min-height: 220px;
  padding: 0.5rem;
  border: 1px solid var(--ui-color-border);
  border-radius: 0.375rem;
  transition: background-color 150ms;

  .carbon-img {
    display: flex;
    justify-content: center;
    width: 100%;

    & > img {
      width: 100%;
      max-width: 100% !important;
      border-radius: 0.125rem;
    }
  }

  .carbon-text {
    display: flex;
    padding-top: 0.5rem;
    color: var(--ui-color-text-muted);
    font-size: 0.875rem;
    text-align: center;
    text-wrap: pretty;
    transition: color 150ms;
  }

  .carbon-poweredby {
    display: block;
    padding-top: 0.5rem;
    color: var(--ui-color-text-muted);
    font-size: 0.75rem;
    text-align: center;
  }

  &:hover {
    background-color: color-mix(in oklab, var(--ui-color-bg-elevated) 50%, transparent);

    .carbon-text {
      color: var(--ui-color-text);
    }
  }
}
</style>
