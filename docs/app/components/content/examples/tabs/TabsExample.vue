<script setup lang="ts">
const items = [
  {
    label: 'Account',
    icon: 'i-lucide-user',
    slot: 'account'
  },
  {
    label: 'Password',
    icon: 'i-lucide-lock',
    slot: 'password'
  }
]

const state = reactive({
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})
</script>

<template>
  <PTabs :items="items">
    <template #account>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Name" name="name">
          <PInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Username" name="username">
          <PInput v-model="state.username" class="w-full" />
        </UFormField>
      </UForm>
    </template>

    <template #password>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Current Password" name="current" required>
          <PInput v-model="state.currentPassword" type="password" required class="w-full" />
        </UFormField>
        <UFormField label="New Password" name="new" required>
          <PInput v-model="state.newPassword" type="password" required class="w-full" />
        </UFormField>
        <UFormField label="Confirm Password" name="confirm" required>
          <PInput v-model="state.confirmPassword" type="password" required class="w-full" />
        </UFormField>
      </UForm>
    </template>
  </PTabs>
</template>
