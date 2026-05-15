<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue';

const form = useTemplateRef('form');
const state = reactive<any>({});
function validate() {
  return [{ name: 'email.1', message: 'Error message' }];
}
</script>

<template>
  <PForm
    ref="form"
    :state="state"
    :validate="validate"
  >
    <PFormField
      id="emailField"
      :error-pattern="/(email)\..*/"
    >
      <PInput
        id="email"
        v-model="state.email"
      />
    </PFormField>
  </PForm>
</template>
