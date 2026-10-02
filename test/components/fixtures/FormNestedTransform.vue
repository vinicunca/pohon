<script setup lang="ts">
import { reactive, useTemplateRef } from 'vue';
import { z } from 'zod';

defineProps<{ nestedName?: string }>();

const state = reactive<any>({ field: 'abc', nested: { field: 'abc' } });
const nestedSchema = z.object({
  field: z.string().transform((value) => value.toUpperCase()),
});

const form = useTemplateRef('form');
</script>

<template>
  <PForm
    ref="form"
    :state="state"
  >
    <PForm
      :name="nestedName"
      :schema="nestedSchema"
      nested
    />
  </PForm>
</template>
