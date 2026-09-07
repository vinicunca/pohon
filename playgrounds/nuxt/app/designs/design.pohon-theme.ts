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
import { themeInput } from './pohon-theme/theme.input';
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
  container: {
    base: 'container',
  },
  dashboardGroup: themeDashboardGroup,
  dashboardNavbar: themeDashboardNavbar,
  dashboardPanel: themeDashboardPanel,
  dashboardResizeHandle: themeDashboardResizeHandle,
  dashboardSearch: themeDashboardSearch,
  dashboardSearchButton: themeDashboardSearchButton,
  dashboardSidebar: themeDashboardSidebar,
  dashboardToolbar: themeDashboardToolbar,
  input: themeInput,
  select: themeSelect,
  switch: themeSwitch,
  user: themeUser,
} satisfies AppConfigInput['ui'];
