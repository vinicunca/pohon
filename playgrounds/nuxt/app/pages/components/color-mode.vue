<template>
  <Navbar to="https://pohon.vinicunca.dev/docs/getting-started/integrations/color-mode" />

  <div class="flex flex-col gap-4 items-center">
    <div class="flex gap-2 items-center">
      <PColorModeSwitch />
      <PColorModeSelect />
      <PColorModeButton />
    </div>

    <div class="flex gap-2 items-center">
      <PColorModeAvatar
        light="https://github.com/vuejs.png"
        dark="https://github.com/nuxt.png"
      />
      <PColorModeImage
        light="https://github.com/vuejs.png"
        dark="https://github.com/nuxt.png"
        class="size-8"
      />
    </div>
  </div>
</template>
