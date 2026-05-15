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
      id="emailField"
      name="email"
    >
      <PInput
        id="email"
        v-model="state.email"
      />
    </PFormField>
    <PFormField
      id="passwordField"
      name="password"
    >
      <PInput
        id="password"
        v-model="state.password"
      />
    </PFormField>
  </PForm>
</template>
