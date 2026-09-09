<script setup lang="ts">
const appConfig = useAppConfig()
const studioIcons = useStudioIcons()

const email = ref('')
</script>

<template>
  <div class="flex flex-col gap-4 p-4">
    <PFormField label="Your email" description="We won't share your email." required>
      <UInput v-model="email" type="email" placeholder="john@example.com" :icon="studioIcons.mail" class="w-full" />
    </PFormField>

    <PFormField label="Search">
      <UInput placeholder="Search documentation…" :icon="appConfig.ui.icons.search" :ui="{ trailing: 'gap-px' }" class="w-full">
        <template #trailing>
          <UKbd value="meta" />
          <UKbd value="K" />
        </template>
      </UInput>
    </PFormField>
  </div>
</template>
