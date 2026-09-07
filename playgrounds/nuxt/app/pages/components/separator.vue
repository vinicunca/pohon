<template>
  <Navbar />

  <div class="flex flex-col gap-4 min-h-0">
    <div>
      <p class="font-600 text-highlighted">
        Pohon UI
      </p>
      <p>An open-source UI component library.</p>
    </div>

    <PSeparator icon="i-simple-icons-nuxtdotjs" type="dashed" />

    <div class="h-24 flex gap-4 items-center">
      <div class="flex-1 text-center">
        Blog
      </div>

      <PSeparator
        :avatar="{ src: 'https://github.com/benjamincanac.png' }"
        decorative
        orientation="vertical"
      />

      <div class="flex-1 text-center">
        Docs
      </div>

      <PSeparator decorative orientation="vertical">
        <PAvatar size="2xs" src="https://github.com/sandros94.png" />
      </PSeparator>

      <div class="flex-1 text-center">
        Source
      </div>
    </div>

    <PSeparator label="As simple as it gets" type="dotted" size="lg" color="primary" />

    <PSeparator label="Start" position="start" />

    <PSeparator label="End" position="end" />

    <div class="h-24 flex gap-4 items-center">
      <div class="flex-1 text-center">
        Start
      </div>

      <PSeparator
        :avatar="{ src: 'https://github.com/benjamincanac.png' }"
        decorative
        orientation="vertical"
        position="start"
      />

      <PSeparator decorative orientation="vertical" position="end">
        <PAvatar size="2xs" src="https://github.com/sandros94.png" />
      </PSeparator>

      <div class="flex-1 text-center">
        End
      </div>
    </div>
  </div>
</template>
