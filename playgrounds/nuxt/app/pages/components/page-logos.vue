<script setup lang="ts">
const marquee = ref(false)
</script>

<template>
  <Navbar>
    <PSwitch v-model="marquee" label="Marquee" />
  </Navbar>

  <PPageLogos title="Trusted by the best front-end teams" :marquee="marquee" class="w-lg">
    <PIcon name="simple-icons:github" class="size-10 shrink-0" />
    <PIcon name="simple-icons:discord" class="size-10 shrink-0" />
    <PIcon name="simple-icons:x" class="size-10 shrink-0" />
    <PIcon name="simple-icons:instagram" class="size-10 shrink-0" />
    <PIcon name="simple-icons:linkedin" class="size-10 shrink-0" />
    <PIcon name="simple-icons:facebook" class="size-10 shrink-0" />
  </PPageLogos>
</template>
