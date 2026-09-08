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
import { themeInputTags } from './pohon-theme/theme.input-tags';
import { themeInputTime } from './pohon-theme/theme.input-time';
import { themeKbd } from './pohon-theme/theme.kbd';
import { themeLink } from './pohon-theme/theme.link';
import { themeListbox } from './pohon-theme/theme.listbox';
import { themeMarquee } from './pohon-theme/theme.marquee';
import { themeModal } from './pohon-theme/theme.modal';
import { themeNavigationMenu } from './pohon-theme/theme.navigation-menu';
import { themePage } from './pohon-theme/theme.page';
import { themePageAnchors } from './pohon-theme/theme.page-anchors';
import { themePageAside } from './pohon-theme/theme.page-aside';
import { themePageCard } from './pohon-theme/theme.page-card';
import { themePageCta } from './pohon-theme/theme.page-cta';
import { themePageFeature } from './pohon-theme/theme.page-feature';
import { themePageHeader } from './pohon-theme/theme.page-header';
import { themePageHero } from './pohon-theme/theme.page-hero';
import { themePageLinks } from './pohon-theme/theme.page-links';
import { themePageList } from './pohon-theme/theme.page-list';
import { themePageLogos } from './pohon-theme/theme.page-logos';
import { themePageSection } from './pohon-theme/theme.page-section';
import { themePagination } from './pohon-theme/theme.pagination';
import { themePinInput } from './pohon-theme/theme.pin-input';
import { themePopover } from './pohon-theme/theme.popover';
import { themePricingPlan, themePricingPlans } from './pohon-theme/theme.pricing-plans';
import { themePricingTable } from './pohon-theme/theme.pricing-table';
import { themeProgress } from './pohon-theme/theme.progress';
import { themeProgressGroup } from './pohon-theme/theme.progress-group';
import { themeRadioGroup } from './pohon-theme/theme.radio-group';
import { themeScrollArea } from './pohon-theme/theme.scroll-area';
import { themeSelect } from './pohon-theme/theme.select';
import { themeSelectMenu } from './pohon-theme/theme.select-menu';
import { themeSeparator } from './pohon-theme/theme.separator';
import { themeSidebar } from './pohon-theme/theme.sidebar';
import { themeSlideover } from './pohon-theme/theme.slideover';
import { themeSlider } from './pohon-theme/theme.slider';
import { themeSplitter } from './pohon-theme/theme.splitter';
import { themeStepper } from './pohon-theme/theme.stepper';
import { themeSwitch } from './pohon-theme/theme.switch';
import { themeTable } from './pohon-theme/theme.table';
import { themeTabs } from './pohon-theme/theme.tabs';
import { themeTextarea } from './pohon-theme/theme.textarea';
import { themeTimeline } from './pohon-theme/theme.timeline';
import { themeToast } from './pohon-theme/theme.toast';
import { themeToaster } from './pohon-theme/theme.toaster';
import { themeTooltip } from './pohon-theme/theme.tooltip';
import { themeTree } from './pohon-theme/theme.tree';
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
  inputTags: themeInputTags,
  inputTime: themeInputTime,
  kbd: themeKbd,
  link: themeLink,
  listbox: themeListbox,
  marquee: themeMarquee,
  modal: themeModal,
  navigationMenu: themeNavigationMenu,
  page: themePage,
  pageAnchors: themePageAnchors,
  pageAside: themePageAside,
  pageBody: {
    base: 'mt-8 pb-24 space-y-12',
  },
  pageCard: themePageCard,
  pageColumns: {
    base: 'relative columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 *:break-inside-avoid-column *:will-change-transform',
  },
  pageCTA: themePageCta,
  pageFeature: themePageFeature,
  pageGrid: {
    base: 'gap-8 grid grid-cols-1 relative lg:grid-cols-3 sm:grid-cols-2',
  },
  pageHeader: themePageHeader,
  pageHero: themePageHero,
  pageLinks: themePageLinks,
  pageList: themePageList,
  pageLogos: themePageLogos,
  pageSection: themePageSection,
  pagination: themePagination,
  pinInput: themePinInput,
  popover: themePopover,
  pricingPlan: themePricingPlan,
  pricingPlans: themePricingPlans,
  pricingTable: themePricingTable,
  progress: themeProgress,
  progressGroup: themeProgressGroup,
  radioGroup: themeRadioGroup,
  scrollArea: themeScrollArea,
  select: themeSelect,
  selectMenu: themeSelectMenu,
  separator: themeSeparator,
  sidebar: themeSidebar,
  skeleton: {
    base: 'rounded-md bg-background-elevated animate-pulse',
  },
  slideover: themeSlideover,
  slider: themeSlider,
  splitter: themeSplitter,
  stepper: themeStepper,
  switch: themeSwitch,
  table: themeTable,
  tabs: themeTabs,
  textarea: themeTextarea,
  timeline: themeTimeline,
  toast: themeToast,
  toaster: themeToaster,
  tooltip: themeTooltip,
  tree: themeTree,
  user: themeUser,
} satisfies AppConfigInput['ui'];
