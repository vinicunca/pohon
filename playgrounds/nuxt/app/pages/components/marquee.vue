<script setup lang="ts">
import theme from '#build/ui/marquee'

const orientations = Object.keys(theme.variants.orientation)

const orientation = ref('horizontal' as keyof typeof theme.variants.orientation)
const pauseOnHover = ref(false)
const reverse = ref(false)
const overlay = ref(false)
</script>

<template>
  <Navbar>
    <PSelect v-model="orientation" :items="orientations" />
    <PSwitch v-model="pauseOnHover" label="Pause" />
    <PSwitch v-model="reverse" label="Reverse" />
    <PSwitch v-model="overlay" label="Overlay" />
  </Navbar>

  <PMarquee
    :orientation="orientation"
    :pause-on-hover="pauseOnHover"
    :reverse="reverse"
    :overlay="overlay"
    class="data-[orientation=horizontal]:w-lg"
  >
    <PIcon name="simple-icons:github" class="size-10 shrink-0" />
    <PIcon name="simple-icons:discord" class="size-10 shrink-0" />
    <PIcon name="simple-icons:x" class="size-10 shrink-0" />
    <PIcon name="simple-icons:instagram" class="size-10 shrink-0" />
    <PIcon name="simple-icons:linkedin" class="size-10 shrink-0" />
    <PIcon name="simple-icons:facebook" class="size-10 shrink-0" />
  </PMarquee>
</template>
