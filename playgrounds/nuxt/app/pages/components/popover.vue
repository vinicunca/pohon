<script setup lang="ts">
const open = ref(false);
const openCustomAnchor = ref(false);
const loading = ref(false);

function send() {
  loading.value = true;

  setTimeout(() => {
    loading.value = false;
    open.value = false;
  }, 1000);
}
</script>

<template>
  <Navbar />

  <div class="text-center min-h-0">
    <div>
      <PPopover
        arrow
        :content="{ side: 'top' }"
      >
        <PButton
          label="Click me top"
          color="neutral"
          variant="outline"
        />

        <template #content="{ close }">
          <div class="p-4 flex gap-2 w-48 justify-center">
            <PButton
              label="Close"
              color="neutral"
              @click="close"
            />
          </div>
        </template>
      </PPopover>

      <div class="my-2 flex gap-2 items-center">
        <PPopover
          arrow
          :content="{ side: 'left' }"
        >
          <PButton
            label="Click me left"
            color="neutral"
            variant="outline"
          />

          <template #content>
            <div class="h-16 w-48" />
          </template>
        </PPopover>

        <PPopover
          arrow
          :content="{ side: 'right' }"
        >
          <PButton
            label="Click me right"
            color="neutral"
            variant="outline"
          />

          <template #content>
            <div class="h-16 w-48" />
          </template>
        </PPopover>
      </div>

      <PPopover
        v-model:open="open"
        arrow
      >
        <PButton
          label="Click me bottom"
          color="neutral"
          variant="outline"
        />

        <template #content>
          <div class="p-4 flex gap-2 w-48 justify-center">
            <PButton
              label="Close"
              color="neutral"
              @click="open = false"
            />
            <PButton
              label="Send"
              color="neutral"
              trailing-icon="i-lucide-send-horizontal"
              :loading="loading"
              @click="send"
            />
          </div>
        </template>
      </PPopover>

      <div class="mt-8 relative">
        <PPopover
          v-model:open="openCustomAnchor"
          :dismissible="false"
        >
          <template #anchor>
            <PInput
              placeholder="Search"
              class="w-56"
              @focus="openCustomAnchor = true"
            />
          </template>

          <template #content>
            <Placeholder class="m-4 inline-flex size-48" />
          </template>
        </PPopover>
      </div>
    </div>

    <div class="mt-24">
      <PPopover
        mode="hover"
        arrow
        :content="{ side: 'top' }"
      >
        <PButton
          label="Hover me top"
          color="neutral"
          variant="outline"
        />

        <template #content>
          <div class="h-16 w-48" />
        </template>
      </PPopover>

      <div class="my-2 flex gap-2 items-center">
        <PPopover
          mode="hover"
          arrow
          :content="{ side: 'left' }"
        >
          <PButton
            label="Hover me left"
            color="neutral"
            variant="outline"
          />

          <template #content>
            <div class="h-16 w-48" />
          </template>
        </PPopover>

        <PPopover
          mode="hover"
          arrow
          :content="{ side: 'right' }"
        >
          <PButton
            label="Hover me right"
            color="neutral"
            variant="outline"
          />

          <template #content>
            <div class="h-16 w-48" />
          </template>
        </PPopover>
      </div>

      <PPopover
        mode="hover"
        arrow
      >
        <PButton
          label="Hover me bottom"
          color="neutral"
          variant="outline"
        />

        <template #content>
          <div class="h-16 w-48" />
        </template>
      </PPopover>
    </div>
  </div>
</template>
