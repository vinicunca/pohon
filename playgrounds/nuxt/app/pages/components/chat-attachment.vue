<script setup lang="ts">
const image = 'https://picsum.photos/id/1015/200';
</script>

<template>
  <Navbar />

  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2 items-center">
      <PChatAttachment
        name="quarterly-report.pdf"
        type="application/pdf"
      />
      <PChatAttachment
        name="quarterly-report.pdf"
        type="application/pdf"
        removable
      />
      <PChatAttachment
        name="quarterly-report.pdf"
        type="application/pdf"
        status="uploading"
      />
      <PChatAttachment
        name="quarterly-report.pdf"
        type="application/pdf"
        status="error"
        removable
      />
    </div>

    <div class="flex flex-wrap gap-2 items-center">
      <PChatAttachment
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
      />
      <PChatAttachment
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
        removable
      />
      <PChatAttachment
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
        status="uploading"
      />
      <PChatAttachment
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
        status="error"
        removable
      />
    </div>

    <div class="flex flex-wrap gap-2 items-center">
      <PChatAttachment
        orientation="vertical"
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
      />
      <PChatAttachment
        orientation="vertical"
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
        removable
      />
      <PChatAttachment
        orientation="vertical"
        name="quarterly-report.pdf"
        type="application/pdf"
        status="uploading"
      />
    </div>

    <div class="flex flex-wrap gap-3 items-center">
      <PChatAttachment
        variant="thumbnail"
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
        removable
      />
      <PChatAttachment
        variant="thumbnail"
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
        status="uploading"
        removable
      />
      <PChatAttachment
        variant="thumbnail"
        name="landscape.jpg"
        type="image/jpeg"
        :url="image"
        status="error"
        removable
      />
      <PChatAttachment
        variant="thumbnail"
        name="quarterly-report.pdf"
        type="application/pdf"
        removable
      />
    </div>
  </div>
</template>
