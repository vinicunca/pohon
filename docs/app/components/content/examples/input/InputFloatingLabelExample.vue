<script setup lang="ts">
const value = ref('');
</script>

<template>
  <PInput
    v-model="value"
    placeholder=""
    :ui="{ base: 'peer' }"
  >
    <label class="text-highlighted peer-focus:text-highlighted peer-placeholder-shown:text-dimmed text-xs font-medium px-1.5 pointer-events-none transition-all left-0 absolute peer-focus:text-xs peer-placeholder-shown:text-sm peer-focus:font-medium peer-placeholder-shown:font-normal -top-2.5 peer-placeholder-shown:top-1.5 peer-focus:-top-2.5">
      <span class="bg-default px-1 inline-flex">Email address</span>
    </label>
  </PInput>
</template>
