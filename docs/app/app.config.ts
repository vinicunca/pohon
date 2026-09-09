import { uiTheme } from './designs/design.pohon-theme';

export default defineAppConfig({
  toaster: {
    position: 'bottom-right' as const,
    duration: 5000,
    max: 5,
    expand: true,
  },
  ui: {
    colors: {
      primary: 'green',
      neutral: 'slate',
    },

    ...uiTheme,
  },
});
