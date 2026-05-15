<script setup lang="ts">
import { reactive, ref, useTemplateRef } from 'vue';
import { z } from 'zod';

const state = reactive<any>({
  nested: { },
});

const schema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

const showNested = ref(true);
const nestedSchema = z.object({
  field: z.string().min(1),
});

const form = useTemplateRef('form');
</script>

<template>
  <PForm
    ref="form"
    :state="state"
    :schema="schema"
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

    <PForm
      v-if="showNested"
      ref="nestedForm"
      name="nested"
      :schema="nestedSchema"
      nested
    >
      <PFormField
        id="nestedField"
        name="field"
      >
        <PInput
          id="nested"
          v-model="state.nested.field"
        />
      </PFormField>
    </PForm>
  </PForm>
</template>
