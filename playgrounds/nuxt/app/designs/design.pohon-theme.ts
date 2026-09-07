// @unocss-include

import type { AppConfigInput } from 'nuxt/schema';
import { themeAccordion } from './pohon-theme/theme.accordion';
import { themeAlert } from './pohon-theme/theme.alert';
import { themeAuthForm } from './pohon-theme/theme.auth-form';
import { themeAvatar, themeAvatarGroup } from './pohon-theme/theme.avatar';
import { themeBadge } from './pohon-theme/theme.badge';
import { themeBanner } from './pohon-theme/theme.banner';
import { themeBlogPost } from './pohon-theme/theme.blog-post';
import { themeBlogPosts } from './pohon-theme/theme.blog-posts';
import { themeBreadcrumb } from './pohon-theme/theme.breadcrumb';
import { themeButton } from './pohon-theme/theme.button';
import { themeCalendar } from './pohon-theme/theme.calendar';
import { themeCard } from './pohon-theme/theme.card';
import { themeCarousel } from './pohon-theme/theme.carousel';
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
  chip: themeChip,
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
  user: themeUser,
} satisfies AppConfigInput['ui'];
