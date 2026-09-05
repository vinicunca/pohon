<template>
  <Navbar />

  <div class="flex flex-col gap-2">
    <PTooltip text="Top" :kbds="['meta', 'T']" :content="{ side: 'top' }" arrow>
      <PButton label="Top" color="neutral" variant="outline" block />
    </PTooltip>

    <div class="grid grid-cols-2 gap-2">
      <PTooltip text="Left" :kbds="['meta', 'L']" :content="{ side: 'left' }" arrow>
        <PButton label="Left" color="neutral" variant="outline" block />
      </PTooltip>

      <PTooltip text="Right" :kbds="['meta', 'R']" :content="{ side: 'right' }" arrow>
        <PButton label="Right" color="neutral" variant="outline" block />
      </PTooltip>
    </div>

    <PTooltip text="Bottom" :kbds="['meta', 'B']" arrow>
      <PButton label="Bottom" color="neutral" variant="outline" block />
    </PTooltip>
  </div>
</template>
