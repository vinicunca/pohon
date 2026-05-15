<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue';

const state = reactive<any>({});
const form = useTemplateRef('form');
</script>

<template>
  <PForm
    ref="form"
    :state
  >
    <PFormField name="field1">
      <PInput />
    </PFormField>
    <PFormField name="field2" />
    <PFormField />
  </PForm>
</template>
