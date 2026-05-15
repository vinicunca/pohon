// @unocss-include
import type { PThemeEditorEmojiMenu } from 'pohon-ui';
import { editorSuggestionMenu } from './editor-suggestion-menu';

export const editorEmojiMenu = {
  ...editorSuggestionMenu,
} satisfies PThemeEditorEmojiMenu;
