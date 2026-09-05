<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from 'pohon-ui'
import FormExampleElements from '../../../../../docs/app/components/content/examples/form/FormExampleElements.vue'
import FormExampleNestedList from '../../../../../docs/app/components/content/examples/form/FormExampleNestedList.vue'
import FormExampleNested from '../../../../../docs/app/components/content/examples/form/FormExampleNested.vue'

const schema = z.object({
  email: z.email(),
  password: z.string('Password is required').min(8),
  tos: z.literal(true)
})

type Schema = z.input<typeof schema>

const state = reactive<Partial<Schema>>({})

function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data)
}

const validateOn = ref(['input', 'change', 'blur'])
const disabled = ref(false)
</script>

<template>
  <Navbar />

  <div class="flex flex-col gap-8 min-h-0 mt-16 pb-8">
    <div class="flex gap-4">
      <PForm
        :state="state"
        :schema="schema"
        class="gap-4 flex flex-col w-60"
        @submit="onSubmit"
      >
        <PFormField label="Email" name="email">
          <PInput v-model="state.email" placeholder="john@lennon.com" />
        </PFormField>

        <PFormField label="Password" name="password">
          <PInput v-model="state.password" type="password" />
        </PFormField>

        <PFormField name="tos">
          <PCheckbox v-model="state.tos" label="I accept the terms and conditions" />
        </PFormField>

        <div>
          <PButton type="submit">
            Submit
          </PButton>
        </div>
      </PForm>
      <FormExampleNested />
      <FormExampleNestedList />
    </div>

    <div class="border border-default rounded-lg">
      <div class="py-2 px-4 flex gap-4 items-center">
        <PFormField label="Validate on" class="flex items-center gap-2">
          <PSelectMenu v-model="validateOn" :items="['input', 'change', 'blur']" multiple class="w-48" />
        </PFormField>
        <PCheckbox v-model="disabled" label="Disabled" />
      </div>

      <FormExampleElements :validate-on="validateOn" :disabled="disabled" class="border-t border-default p-4" />
    </div>
  </div>
</template>
