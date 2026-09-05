<template>
  <Navbar />

  <div class="flex items-center gap-2">
    <div class="flex flex-col items-start gap-2 text-sm">
      <PLink raw>
        Button raw
      </PLink>

      <PLink active>
        Button active
      </PLink>
      <PLink active class="font-medium" active-class="text-highlighted">
        Button active with class
      </PLink>
      <PLink active disabled>
        Button active disabled
      </PLink>

      <PLink>
        Button inactive
      </PLink>
      <PLink class="font-medium" inactive-class="hover:text-primary">
        Button inactive with class
      </PLink>
      <PLink disabled>
        Button inactive disabled
      </PLink>
    </div>

    <div class="flex flex-col items-start gap-2 text-sm">
      <PLink to="/components/link" raw>
        Link raw
      </PLink>

      <PLink to="/components/link">
        Link active
      </PLink>
      <PLink to="/components/link" class="font-medium" active-class="text-highlighted">
        Link active with class
      </PLink>
      <PLink to="/components/link" disabled>
        Link active disabled
      </PLink>

      <PLink to="/components/button">
        Link inactive
      </PLink>
      <PLink to="/components/button" class="font-medium" inactive-class="hover:text-primary">
        Link inactive with class
      </PLink>
      <PLink to="/components/button" disabled>
        Link inactive disabled
      </PLink>
    </div>
  </div>
</template>
