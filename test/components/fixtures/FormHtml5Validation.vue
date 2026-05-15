<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue';
import { PForm, PFormField, PInput } from '#components';

interface FormState {
  email?: string;
  age?: string;
  username?: string;
}

const state = reactive<FormState>({});
const form = useTemplateRef('form');
</script>

<template>
  <PForm
    ref="form"
    :state="state"
    v-bind="$attrs"
  >
    <PFormField
      id="emailField"
      name="email"
    >
      <PInput
        id="email"
        v-model="state.email"
        type="email"
        required
      />
    </PFormField>
    <PFormField
      id="ageField"
      name="age"
    >
      <PInput
        id="age"
        v-model="state.age"
        type="number"
        min="18"
        max="100"
        required
      />
    </PFormField>
    <PFormField
      id="usernameField"
      name="username"
    >
      <PInput
        id="username"
        v-model="state.username"
        minlength="3"
        maxlength="20"
        required
      />
    </PFormField>
  </PForm>
</template>
