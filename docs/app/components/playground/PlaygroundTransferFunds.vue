<script setup lang="ts">
const toast = useToast()

const accounts = [
  { label: 'Main Checking •8402', value: 'checking' },
  { label: 'High Yield Savings •1192', value: 'savings' }
]

const amount = ref(1200)
const from = ref('checking')
const to = ref('savings')
</script>

<template>
  <div>
    <div class="p-4 space-y-4">
      <div>
        <p class="font-semibold text-highlighted">
          Transfer funds
        </p>
        <p class="text-sm text-muted">
          Move money between your accounts.
        </p>
      </div>

      <PFormField label="Amount">
        <UInputNumber v-model="amount" :format-options="{ style: 'currency', currency: 'USD' }" class="w-full" />
      </PFormField>

      <PFormField label="From">
        <USelect v-model="from" :items="accounts" class="w-full" />
      </PFormField>

      <PFormField label="To">
        <USelect v-model="to" :items="accounts" class="w-full" />
      </PFormField>

      <div class="space-y-1.5 text-sm">
        <div class="flex justify-between">
          <span class="text-muted">Estimated arrival</span>
          <span class="font-medium text-highlighted">Today</span>
        </div>
        <div class="flex justify-between">
          <span class="text-muted">Transaction fee</span>
          <span class="font-medium text-highlighted">$0.00</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end border-t border-border p-3">
      <PButton label="Confirm transfer" @click="toast.add({ title: 'Transfer confirmed' })" />
    </div>
  </div>
</template>
