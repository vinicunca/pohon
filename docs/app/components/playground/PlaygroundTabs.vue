<script setup lang="ts">
const studioIcons = useStudioIcons()

const items = [
  {
    label: 'Account',
    icon: studioIcons.user,
    slot: 'account'
  },
  {
    label: 'Password',
    icon: studioIcons.lock,
    slot: 'password'
  }
]

const state = reactive({
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  currentPassword: '',
  newPassword: ''
})
</script>

<template>
  <div class="p-4">
    <UTabs :items="items" class="w-full">
      <template #account>
        <PForm :state="state" class="flex flex-col gap-4">
          <PFormField label="Name" name="name">
            <UInput v-model="state.name" class="w-full" />
          </PFormField>
          <PFormField label="Username" name="username">
            <UInput v-model="state.username" class="w-full" />
          </PFormField>
        </PForm>
      </template>

      <template #password>
        <PForm :state="state" class="flex flex-col gap-4">
          <PFormField label="Current Password" name="current" required>
            <UInput v-model="state.currentPassword" type="password" required class="w-full" />
          </PFormField>
          <PFormField label="New Password" name="new" required>
            <UInput v-model="state.newPassword" type="password" required class="w-full" />
          </PFormField>
        </PForm>
      </template>
    </UTabs>
  </div>
</template>
