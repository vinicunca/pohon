// @unocss-include

import type { AppConfigInput } from 'nuxt/schema';
import { themeAccordion } from './pohon-theme/theme.accordion';
import { themeAlert } from './pohon-theme/theme.alert';
import { themeAuthForm } from './pohon-theme/theme.auth-form';
import { themeAvatar, themeAvatarGroup } from './pohon-theme/theme.avatar';
import { themeBadge } from './pohon-theme/theme.badge';
import { themeBanner } from './pohon-theme/theme.banner';
import { themeButton } from './pohon-theme/theme.button';
import { themeCard } from './pohon-theme/theme.card';
import { themeChip } from './pohon-theme/theme.chip';
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

// @keep-sorted
export const uiTheme = {
  accordion: themeAccordion,
  alert: themeAlert,
  authForm: themeAuthForm,
  avatar: themeAvatar,
  avatarGroup: themeAvatarGroup,
  badge: themeBadge,
  banner: themeBanner,
  button: themeButton,
  card: themeCard,
  chip: themeChip,
  container: {
    // base: 'w-full max-w-(--ui-container) mx-auto px-4 sm:px-6 lg:px-8',
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
} satisfies AppConfigInput['ui'];
