<script setup lang="ts">
const marquee = ref(false);
</script>

<template>
  <Navbar>
    <PSwitch
      v-model="marquee"
      label="Marquee"
    />
  </Navbar>

  <PPageLogos
    title="Trusted by the best front-end teams"
    :marquee="marquee"
    class="w-lg"
  >
    <PIcon
      name="simple-icons:github"
      class="shrink-0 size-10"
    />
    <PIcon
      name="simple-icons:discord"
      class="shrink-0 size-10"
    />
    <PIcon
      name="simple-icons:x"
      class="shrink-0 size-10"
    />
    <PIcon
      name="simple-icons:instagram"
      class="shrink-0 size-10"
    />
    <PIcon
      name="simple-icons:linkedin"
      class="shrink-0 size-10"
    />
    <PIcon
      name="simple-icons:facebook"
      class="shrink-0 size-10"
    />
  </PPageLogos>
</template>
