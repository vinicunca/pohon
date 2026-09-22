<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue';
import { z } from 'zod';

const state = reactive<any>({
  nested: { },
});

const nestedSchema = z.object({
  first: z.string().min(1),
  second: z.string().min(1),
});

const form = useTemplateRef('form');
</script>

<template>
  <PForm
    ref="form"
    :state="state"
  >
    <PForm
      name="nested"
      :schema="nestedSchema"
      nested
    >
      <PFormField
        id="firstField"
        name="first"
      >
        <PInput
          id="first"
          v-model="state.nested.first"
        />
      </PFormField>
      <PFormField
        id="secondField"
        name="second"
      >
        <PInput
          id="second"
          v-model="state.nested.second"
        />
      </PFormField>
    </PForm>
  </PForm>
</template>
