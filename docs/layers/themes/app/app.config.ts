import * as themes from './theme';

export default defineAppConfig({
  ui: {
    // ...themes,
    // ...themesContent,
    // prose: themesProse,
    header: themes.header,
    navigationMenu: themes.navigationMenu,
    popover: themes.popover,
  },
});
