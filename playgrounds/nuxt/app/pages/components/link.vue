<template>
  <Navbar />

  <div class="flex gap-2 items-center">
    <div class="text-sm flex flex-col gap-2 items-start">
      <PLink raw>
        Button raw
      </PLink>

      <PLink active>
        Button active
      </PLink>
      <PLink
        active
        class="font-500"
        active-class="color-text-highlighted"
      >
        Button active with class
      </PLink>
      <PLink
        active
        disabled
      >
        Button active disabled
      </PLink>

      <PLink>
        Button inactive
      </PLink>
      <PLink
        class="font-500"
        inactive-class="hover:color-primary"
      >
        Button inactive with class
      </PLink>
      <PLink disabled>
        Button inactive disabled
      </PLink>
    </div>

    <div class="text-sm flex flex-col gap-2 items-start">
      <PLink
        to="/components/link"
        raw
      >
        Link raw
      </PLink>

      <PLink to="/components/link">
        Link active
      </PLink>
      <PLink
        to="/components/link"
        class="font-500"
        active-class="color-text-highlighted"
      >
        Link active with class
      </PLink>
      <PLink
        to="/components/link"
        disabled
      >
        Link active disabled
      </PLink>

      <PLink to="/components/button">
        Link inactive
      </PLink>
      <PLink
        to="/components/button"
        class="font-500"
        inactive-class="hover:color-primary"
      >
        Link inactive with class
      </PLink>
      <PLink
        to="/components/button"
        disabled
      >
        Link inactive disabled
      </PLink>
    </div>
  </div>
</template>
