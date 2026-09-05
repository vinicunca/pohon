<script setup lang="ts">
import type { NavigationMenuItem } from 'pohon-ui'

const items: NavigationMenuItem[] = [{
  label: 'Home',
  icon: 'i-lucide-house',
  active: true
}, {
  label: 'Inbox',
  icon: 'i-lucide-inbox'
}, {
  label: 'Contacts',
  icon: 'i-lucide-users'
}]
</script>

<template>
  <UDashboardGroup>
    <UDashboardSidebar
      open
      :toggle="{
        color: 'primary',
        variant: 'subtle',
        class: 'rounded-full'
      }"
    >
      <template #header>
        <Logo class="h-5 w-auto" />
      </template>

      <PNavigationMenu
        :items="items"
        orientation="vertical"
      />
    </UDashboardSidebar>

    <PDashboardPanel>
      <template #header>
        <UDashboardNavbar title="Dashboard" />
      </template>
    </PDashboardPanel>
  </UDashboardGroup>
</template>
