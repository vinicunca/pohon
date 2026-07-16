import type { ComponentPublicInstance, MaybeRef } from 'vue';
import { useDropZone, useFileDialog } from '@vueuse/core';
import { computed, onMounted, reactive, ref, unref, watch } from 'vue';

export interface UseFileUploadOptions {
  /**
   * Specifies the allowed file types. Provide a comma-separated list of MIME types or file extensions.
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/accept
   * @defaultValue '*'
   */
  accept?: MaybeRef<string>;
  reset?: MaybeRef<boolean>;
  multiple?: MaybeRef<boolean>;
  dropzone?: boolean;
  onUpdate: (files: Array<File>) => void;
}

function parseAcceptToDataTypes(accept: string): Array<string> {
  if (!accept || accept === '*') {
    return [];
  }

  return accept
    .split(',')
    .map((type) => {
      const trimmedType = type.trim();

      if (trimmedType.includes('/') && trimmedType.endsWith('/*')) {
        return trimmedType.split('/')[0] || trimmedType;
      }
      return trimmedType;
    })
    .filter((type) => {
      return !type.startsWith('.');
    });
}

export function useFileUpload(options: UseFileUploadOptions) {
  const {
    accept = '*',
    reset = false,
    multiple = false,
    dropzone = true,
    onUpdate,
  } = options;
  const inputRef = ref<ComponentPublicInstance>();
  const dropzoneRef = ref<HTMLDivElement>();

  const dataTypes = computed<ReadonlyArray<string>>(() => parseAcceptToDataTypes(unref(accept)));

  const onDrop = (files: FileList | Array<File> | null, fromDropZone = false) => {
    if (!files || files.length === 0) {
      return;
    }
    if (files instanceof FileList) {
      files = Array.from(files);
    }
    if (files.length > 1 && !unref(multiple)) {
      files = [files[0]!];
    }

    // Sync dropped files to the input element for proper native validation
    if (fromDropZone && inputRef.value?.$el) {
      try {
        const dt = new DataTransfer();
        files.forEach((file) => {
          dt.items.add(file);
        });
        inputRef.value.$el.files = dt.files;
      } catch (e) {
        console.warn('Could not sync files to input element:', e);
      }
    }

    onUpdate(files);
  };

  const isDragging = ref(false);
  const fileDialog = reactive({
    open: () => {
    },
  });

  function open() {
    fileDialog.open();
  }

  onMounted(() => {
    const { isOverDropZone } = dropzone
      ? useDropZone(dropzoneRef, { dataTypes, onDrop: (files) => onDrop(files, true) })
      : { isOverDropZone: ref(false) };

    watch(isOverDropZone, (value) => {
      isDragging.value = value;
    });

    const { onChange, open } = useFileDialog({
      accept,
      multiple,
      input: computed(() => unref(inputRef)?.$el),
      reset,
    });

    fileDialog.open = open;

    onChange((fileList) => onDrop(fileList, false));
  });

  return {
    isDragging,
    open,
    inputRef,
    dropzoneRef,
  };
}
