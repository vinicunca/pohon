<script setup lang="ts">
import theme from '#build/ui/chip'

const sizes = Object.keys(theme.variants.size)
const positions = Object.keys(theme.variants.position)

const attrs = reactive({
  size: [theme.defaultVariants.size],
  position: [theme.defaultVariants.position]
})

const items = [{
  name: 'messages',
  icon: 'i-lucide-message-circle',
  count: 3
}, {
  name: 'notifications',
  icon: 'i-lucide-bell',
  count: 0
}]
</script>

<template>
  <Navbar>
    <PSelect v-model="attrs.size" :items="sizes" multiple />
    <PSelect v-model="attrs.position" :items="positions" multiple />
  </Navbar>
  <Matrix v-slot="props" :attrs="attrs">
    <PChip color="neutral" v-bind="props">
      <PButton icon="i-lucide-inbox" color="neutral" variant="subtle" />
    </PChip>

    <PChip v-for="{ name, icon, count } in items" :key="name" :text="count" :show="count > 0" v-bind="props">
      <PButton :icon="icon" color="neutral" variant="subtle" />
    </PChip>

    <PChip inset text="1" v-bind="props">
      <PAvatar src="https://github.com/praburangki.png" />
    </PChip>
  </Matrix>
</template>
