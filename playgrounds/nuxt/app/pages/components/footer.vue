<script setup lang="ts">
const items = [{
  label: 'Figma Kit',
  to: 'https://go.nuxt.com/figma-ui',
  target: '_blank',
}, {
  label: 'Playground',
  to: 'https://stackblitz.com/edit/nuxt-ui',
  target: '_blank',
}, {
  label: 'Releases',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank',
}];

const columns = [{
  label: 'Community',
  children: [{
    label: 'Nuxters',
    to: 'https://nuxters.nuxt.com',
    target: '_blank',
  }, {
    label: 'Video Courses',
    to: 'https://masteringnuxt.com/nuxt3?ref=nuxt',
    target: '_blank',
  }, {
    label: 'Nuxt on GitHub',
    to: 'https://github.com/nuxt',
    target: '_blank',
  }],
}, {
  label: 'Solutions',
  children: [{
    label: 'Nuxt Content',
    to: 'https://content.nuxt.com/',
    target: '_blank',
  }, {
    label: 'Nuxt Image',
    to: 'https://image.nuxt.com/',
    target: '_blank',
  }, {
    label: 'Pohon UI',
    to: 'https://ui.nuxt.com/',
    target: '_blank',
  }],
}];
</script>

<template>
  <Navbar />

  <PFooter class="border-border divide-divide border-t min-h-0 w-full divide-y">
    <template #top>
      <PContainer>
        <PFooterColumns :columns="columns">
          <template #right>
            <PFormField
              name="email"
              label="Subscribe to our newsletter"
              size="lg"
            >
              <PInput
                type="email"
                class="w-full"
              >
                <template #trailing>
                  <PButton
                    type="submit"
                    size="xs"
                    color="neutral"
                    label="Subscribe"
                  />
                </template>
              </PInput>
            </PFormField>
          </template>
        </PFooterColumns>
      </PContainer>
    </template>

    <template #left>
      <p class="color-text-muted text-sm">
        Copyright © {{ new Date().getFullYear() }}
      </p>
    </template>

    <PNavigationMenu
      :items="items"
      variant="link"
    />

    <template #right>
      <PButton
        icon="i-simple-icons-discord"
        color="neutral"
        variant="ghost"
        to="https://go.nuxt.com/discord"
        target="_blank"
        aria-label="Discord"
      />
      <PButton
        icon="i-simple-icons-x"
        color="neutral"
        variant="ghost"
        to="https://go.nuxt.com/x"
        target="_blank"
        aria-label="X"
      />
      <PButton
        icon="i-simple-icons-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/nuxt/nuxt"
        target="_blank"
        aria-label="GitHub"
      />
    </template>
  </PFooter>
</template>
