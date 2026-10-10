// @unocss-include
import type { PThemeEditorDragHandle } from 'pohon-ui';

export const themeEditorDragHandle = {
  slots: {
    root: 'hidden transition-[top,left]-200 ease-out items-center justify-center sm:flex motion-reduce:transition-none',
    handle: 'px-1 cursor-grab',
  },
} satisfies PThemeEditorDragHandle;
