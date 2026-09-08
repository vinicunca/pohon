// @unocss-include

import type { AppConfigInput } from 'nuxt/schema';
import { themeAccordion } from './pohon-theme/theme.accordion';
import { themeAlert } from './pohon-theme/theme.alert';
import { themeAuthForm } from './pohon-theme/theme.auth-form';
import { themeAvatar, themeAvatarGroup } from './pohon-theme/theme.avatar';
import { themeBadge } from './pohon-theme/theme.badge';
import { themeBanner } from './pohon-theme/theme.banner';
import { themeBlogPost, themeBlogPosts } from './pohon-theme/theme.blog';
import { themeBreadcrumb } from './pohon-theme/theme.breadcrumb';
import { themeButton } from './pohon-theme/theme.button';
import { themeCalendar } from './pohon-theme/theme.calendar';
import { themeCard } from './pohon-theme/theme.card';
import { themeCarousel } from './pohon-theme/theme.carousel';
import { themeChangelogVersion, themeChangelogVersions } from './pohon-theme/theme.changelog-versions';
import {
  themeChatMessage,
  themeChatMessages,
  themeChatPalette,
  themeChatPrompt,
  themeChatReasoning,
  themeChatShimmer,
  themeChatTool,
} from './pohon-theme/theme.chats';
import { themeCheckbox } from './pohon-theme/theme.checkbox';
import { themeCheckboxGroup } from './pohon-theme/theme.checkbox-group';
import { themeChip } from './pohon-theme/theme.chip';
import { themeCollapsible } from './pohon-theme/theme.collapsible';
import { themeColorPicker } from './pohon-theme/theme.color-picker';
import { themeCommandPalette } from './pohon-theme/theme.command-palette';
import { themeContextMenu } from './pohon-theme/theme.context-menu';
import {
  themeDashboardGroup,
  themeDashboardNavbar,
  themeDashboardPanel,
  themeDashboardResizeHandle,
  themeDashboardSearch,
  themeDashboardSearchButton,
  themeDashboardSidebar,
  themeDashboardToolbar,
} from './pohon-theme/theme.dashboard';
import { themeDrawer } from './pohon-theme/theme.drawer';
import { themeDropdownMenu } from './pohon-theme/theme.dropdown-menu';
import { themeEmpty } from './pohon-theme/theme.empty';
import { themeError } from './pohon-theme/theme.error';
import { themeFieldGroup } from './pohon-theme/theme.field-group';
import { themeFileUpload } from './pohon-theme/theme.file-upload';
import { themeFooter, themeFooterColumns } from './pohon-theme/theme.footer';
import { themeFormField } from './pohon-theme/theme.form-field';
import { themeHeader } from './pohon-theme/theme.header';
import { themeInput } from './pohon-theme/theme.input';
import { themeInputDate } from './pohon-theme/theme.input-date';
import { themeInputMenu } from './pohon-theme/theme.input-menu';
import { themeInputNumber } from './pohon-theme/theme.input-number';
import { themeInputRating } from './pohon-theme/theme.input-rating';
import { themeKbd } from './pohon-theme/theme.kbd';
import { themeNavigationMenu } from './pohon-theme/theme.navigation-menu';
import { themeSelect } from './pohon-theme/theme.select';
import { themeSwitch } from './pohon-theme/theme.switch';
import { themeUser } from './pohon-theme/theme.user';

// @keep-sorted
export const uiTheme = {
  accordion: themeAccordion,
  alert: themeAlert,
  authForm: themeAuthForm,
  avatar: themeAvatar,
  avatarGroup: themeAvatarGroup,
  badge: themeBadge,
  banner: themeBanner,
  blogPost: themeBlogPost,
  blogPosts: themeBlogPosts,
  breadcrumb: themeBreadcrumb,
  button: themeButton,
  calendar: themeCalendar,
  card: themeCard,
  carousel: themeCarousel,
  changelogVersion: themeChangelogVersion,
  changelogVersions: themeChangelogVersions,
  chatMessage: themeChatMessage,
  chatMessages: themeChatMessages,
  chatPalette: themeChatPalette,
  chatPrompt: themeChatPrompt,
  chatReasoning: themeChatReasoning,
  chatShimmer: themeChatShimmer,
  chatTool: themeChatTool,
  checkbox: themeCheckbox,
  checkboxGroup: themeCheckboxGroup,
  chip: themeChip,
  collapsible: themeCollapsible,
  colorPicker: themeColorPicker,
  commandPalette: themeCommandPalette,
  container: {
    base: 'container',
  },
  contextMenu: themeContextMenu,
  dashboardGroup: themeDashboardGroup,
  dashboardNavbar: themeDashboardNavbar,
  dashboardPanel: themeDashboardPanel,
  dashboardResizeHandle: themeDashboardResizeHandle,
  dashboardSearch: themeDashboardSearch,
  dashboardSearchButton: themeDashboardSearchButton,
  dashboardSidebar: themeDashboardSidebar,
  dashboardToolbar: themeDashboardToolbar,
  drawer: themeDrawer,
  dropdownMenu: themeDropdownMenu,
  empty: themeEmpty,
  error: themeError,
  fieldGroup: themeFieldGroup,
  fileUpload: themeFileUpload,
  footer: themeFooter,
  footerColumns: themeFooterColumns,
  formField: themeFormField,
  header: themeHeader,
  input: themeInput,
  inputDate: themeInputDate,
  inputMenu: themeInputMenu,
  inputNumber: themeInputNumber,
  inputRating: themeInputRating,
  kbd: themeKbd,
  navigationMenu: themeNavigationMenu,
  select: themeSelect,
  switch: themeSwitch,
  user: themeUser,
} satisfies AppConfigInput['ui'];
