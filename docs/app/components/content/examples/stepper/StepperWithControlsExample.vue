<script setup lang="ts">
import type { StepperItem } from 'pohon-ui'

const items: StepperItem[] = [
  {
    title: 'Address',
    description: 'Add your address here',
    icon: 'i-lucide-house'
  }, {
    title: 'Shipping',
    description: 'Set your preferred shipping method',
    icon: 'i-lucide-truck'
  }, {
    title: 'Checkout',
    description: 'Confirm your order'
  }
]

const stepper = useTemplateRef('stepper')
</script>

<template>
  <div class="w-full">
    <UStepper ref="stepper" :items="items">
      <template #content="{ item }">
        <Placeholder class="aspect-video">
          {{ item.title }}
        </Placeholder>
      </template>
    </UStepper>

    <div class="flex gap-2 justify-between mt-4">
      <PButton
        leading-icon="i-lucide-arrow-left"
        :disabled="!stepper?.hasPrev"
        @click="stepper?.prev()"
      >
        Prev
      </PButton>

      <PButton
        trailing-icon="i-lucide-arrow-right"
        :disabled="!stepper?.hasNext"
        @click="stepper?.next()"
      >
        Next
      </PButton>
    </div>
  </div>
</template>
