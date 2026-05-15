<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue';
import { PForm, PFormField, PInput } from '#components';

const state = reactive<any>({});
const form = useTemplateRef('form');
</script>

<template>
  <PForm
    id="42"
    ref="form"
    :state="state"
  >
    <PFormField
      id="field"
      name="value"
    >
      <PInput
        id="input"
        v-model="state.value"
      />
    </PFormField>
  </PForm>
</template>
