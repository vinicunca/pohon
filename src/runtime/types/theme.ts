import type * as ui from '#build/ui';
import type * as prose from '#build/ui/prose';
import type * as ComponentTypes from './index';
import type { SlotClass, UvConfig } from './uv';

type ThemeSlotOverrides<T> = T extends { slots: infer S extends Record<string, any> }
  ? { [K in keyof S]?: SlotClass }
  : { [K in keyof T]?: T[K] extends Array<any> ? SlotClass : T[K] extends Record<string, any> ? ThemeSlotOverrides<T[K]> : SlotClass };

/**
 * Flat slot-class override shape: `{ button: { base: '...' }, modal: {...} }`.
 * Powers the `:ui` prop on `<PTheme>`, which remains the recommended way to
 * scope class overrides without touching component prop defaults.
 */
export type ThemeUI = {
  [K in keyof typeof ui]?: ThemeSlotOverrides<(typeof ui)[K]>
};

/**
 * Strict per-component defaults shape used by `<PTheme :props>`. Authored as
 * a flat interface with literal keys (rather than a mapped type) so editors —
 * Volar in particular — surface key completions inside template inline
 * objects (`:props="{ button: { … } }"`). Volar reliably iterates interface
 * members but not mapped-type members in this position.
 *
 * Keys mirror the theme registry exposed by `#build/ui` (see
 * `src/templates.ts`): every themable component gets one camelCase entry
 * whose value is a `Partial` of that component's `<PascalCase>Props`.
 */
export interface ThemeDefaults {
  accordion?: Partial<ComponentTypes.AccordionProps>;
  alert?: Partial<ComponentTypes.AlertProps>;
  authForm?: Partial<ComponentTypes.AuthFormProps>;
  avatar?: Partial<ComponentTypes.AvatarProps>;
  avatarGroup?: Partial<ComponentTypes.AvatarGroupProps>;
  badge?: Partial<ComponentTypes.BadgeProps>;
  banner?: Partial<ComponentTypes.BannerProps>;
  blogPost?: Partial<ComponentTypes.BlogPostProps>;
  blogPosts?: Partial<ComponentTypes.BlogPostsProps>;
  breadcrumb?: Partial<ComponentTypes.BreadcrumbProps>;
  button?: Partial<ComponentTypes.ButtonProps>;
  calendar?: Partial<ComponentTypes.CalendarProps>;
  card?: Partial<ComponentTypes.CardProps>;
  carousel?: Partial<ComponentTypes.CarouselProps>;
  changelogVersion?: Partial<ComponentTypes.ChangelogVersionProps>;
  changelogVersions?: Partial<ComponentTypes.ChangelogVersionsProps>;
  chatMessage?: Partial<ComponentTypes.ChatMessageProps>;
  chatMessages?: Partial<ComponentTypes.ChatMessagesProps>;
  chatPalette?: Partial<ComponentTypes.ChatPaletteProps>;
  chatPrompt?: Partial<ComponentTypes.ChatPromptProps>;
  chatPromptSubmit?: Partial<ComponentTypes.ChatPromptSubmitProps>;
  chatReasoning?: Partial<ComponentTypes.ChatReasoningProps>;
  chatShimmer?: Partial<ComponentTypes.ChatShimmerProps>;
  chatTool?: Partial<ComponentTypes.ChatToolProps>;
  checkbox?: Partial<ComponentTypes.CheckboxProps>;
  checkboxGroup?: Partial<ComponentTypes.CheckboxGroupProps>;
  chip?: Partial<ComponentTypes.ChipProps>;
  collapsible?: Partial<ComponentTypes.CollapsibleProps>;
  colorPicker?: Partial<ComponentTypes.ColorPickerProps>;
  commandPalette?: Partial<ComponentTypes.CommandPaletteProps>;
  container?: Partial<ComponentTypes.ContainerProps>;
  contentNavigation?: Partial<ComponentTypes.ContentNavigationProps>;
  contentSearch?: Partial<ComponentTypes.ContentSearchProps>;
  contentSearchButton?: Partial<ComponentTypes.ContentSearchButtonProps>;
  contentSurround?: Partial<ComponentTypes.ContentSurroundProps>;
  contentToc?: Partial<ComponentTypes.ContentTocProps>;
  contextMenu?: Partial<ComponentTypes.ContextMenuProps>;
  dashboardGroup?: Partial<ComponentTypes.DashboardGroupProps>;
  dashboardNavbar?: Partial<ComponentTypes.DashboardNavbarProps>;
  dashboardPanel?: Partial<ComponentTypes.DashboardPanelProps>;
  dashboardResizeHandle?: Partial<ComponentTypes.DashboardResizeHandleProps>;
  dashboardSearch?: Partial<ComponentTypes.DashboardSearchProps>;
  dashboardSearchButton?: Partial<ComponentTypes.DashboardSearchButtonProps>;
  dashboardSidebar?: Partial<ComponentTypes.DashboardSidebarProps>;
  dashboardSidebarCollapse?: Partial<ComponentTypes.DashboardSidebarCollapseProps>;
  dashboardSidebarToggle?: Partial<ComponentTypes.DashboardSidebarToggleProps>;
  dashboardToolbar?: Partial<ComponentTypes.DashboardToolbarProps>;
  drawer?: Partial<ComponentTypes.DrawerProps>;
  dropdownMenu?: Partial<ComponentTypes.DropdownMenuProps>;
  editor?: Partial<ComponentTypes.EditorProps>;
  editorDragHandle?: Partial<ComponentTypes.EditorDragHandleProps>;
  editorToolbar?: Partial<ComponentTypes.EditorToolbarProps>;
  empty?: Partial<ComponentTypes.EmptyProps>;
  error?: Partial<ComponentTypes.ErrorProps>;
  fieldGroup?: Partial<ComponentTypes.FieldGroupProps>;
  fileUpload?: Partial<ComponentTypes.FileUploadProps>;
  footer?: Partial<ComponentTypes.FooterProps>;
  footerColumns?: Partial<ComponentTypes.FooterColumnsProps>;
  // TODO: `FormProps` carries three generics for state, schema, and fields —
  // none of which are themable defaults. Loosened to `any` so this entry stays
  // assignable from any concrete `Form` instance.
  form?: Partial<ComponentTypes.FormProps<any, any, any>>;
  formField?: Partial<ComponentTypes.FormFieldProps>;
  header?: Partial<ComponentTypes.HeaderProps>;
  input?: Partial<ComponentTypes.InputProps>;
  inputDate?: Partial<ComponentTypes.InputDateProps>;
  inputMenu?: Partial<ComponentTypes.InputMenuProps>;
  inputNumber?: Partial<ComponentTypes.InputNumberProps>;
  inputRating?: Partial<ComponentTypes.InputRatingProps>;
  inputTags?: Partial<ComponentTypes.InputTagsProps>;
  inputTime?: Partial<ComponentTypes.InputTimeProps>;
  kbd?: Partial<ComponentTypes.KbdProps>;
  listbox?: Partial<ComponentTypes.ListboxProps>;
  main?: Partial<ComponentTypes.MainProps>;
  marquee?: Partial<ComponentTypes.MarqueeProps>;
  modal?: Partial<ComponentTypes.ModalProps>;
  navigationMenu?: Partial<ComponentTypes.NavigationMenuProps>;
  page?: Partial<ComponentTypes.PageProps>;
  pageAnchors?: Partial<ComponentTypes.PageAnchorsProps>;
  pageAside?: Partial<ComponentTypes.PageAsideProps>;
  pageBody?: Partial<ComponentTypes.PageBodyProps>;
  pageCTA?: Partial<ComponentTypes.PageCTAProps>;
  pageCard?: Partial<ComponentTypes.PageCardProps>;
  pageColumns?: Partial<ComponentTypes.PageColumnsProps>;
  pageFeature?: Partial<ComponentTypes.PageFeatureProps>;
  pageGrid?: Partial<ComponentTypes.PageGridProps>;
  pageHeader?: Partial<ComponentTypes.PageHeaderProps>;
  pageHero?: Partial<ComponentTypes.PageHeroProps>;
  pageLinks?: Partial<ComponentTypes.PageLinksProps>;
  pageList?: Partial<ComponentTypes.PageListProps>;
  pageLogos?: Partial<ComponentTypes.PageLogosProps>;
  pageSection?: Partial<ComponentTypes.PageSectionProps>;
  pagination?: Partial<ComponentTypes.PaginationProps>;
  pinInput?: Partial<ComponentTypes.PinInputProps>;
  popover?: Partial<ComponentTypes.PopoverProps>;
  pricingPlan?: Partial<ComponentTypes.PricingPlanProps>;
  pricingPlans?: Partial<ComponentTypes.PricingPlansProps>;
  pricingTable?: Partial<ComponentTypes.PricingTableProps>;
  progress?: Partial<ComponentTypes.ProgressProps>;
  progressGroup?: Partial<ComponentTypes.ProgressGroupProps>;
  /**
   * Prose components that expose overridable props, under a `prose` namespace
   * (mirrors `app.config.ui.prose` and `useComponentProps('prose.<tag>', …)`).
   * Set prop defaults per element to scope behavior for a subtree, e.g.
   * `{ prose: { h2: { anchor: true }, img: { zoom: false } } }`. Class-only
   * elements (`p`, `li`, `table`, `em`, …) are omitted — restyle them via `:ui`.
   */
  prose?: {
    a?: Partial<ComponentTypes.ProseAProps>;
    accordion?: Partial<ComponentTypes.ProseAccordionProps>;
    callout?: Partial<ComponentTypes.ProseCalloutProps>;
    card?: Partial<ComponentTypes.ProseCardProps>;
    code?: Partial<ComponentTypes.ProseCodeProps>;
    codeCollapse?: Partial<ComponentTypes.ProseCodeCollapseProps>;
    codeGroup?: Partial<ComponentTypes.ProseCodeGroupProps>;
    codeTree?: Partial<ComponentTypes.ProseCodeTreeProps>;
    collapsible?: Partial<ComponentTypes.ProseCollapsibleProps>;
    field?: Partial<ComponentTypes.ProseFieldProps>;
    fieldGroup?: Partial<ComponentTypes.ProseFieldGroupProps>;
    h1?: Partial<ComponentTypes.ProseH1Props>;
    h2?: Partial<ComponentTypes.ProseH2Props>;
    h3?: Partial<ComponentTypes.ProseH3Props>;
    h4?: Partial<ComponentTypes.ProseH4Props>;
    img?: Partial<ComponentTypes.ProseImgProps>;
    pre?: Partial<ComponentTypes.ProsePreProps>;
    prompt?: Partial<ComponentTypes.ProsePromptProps>;
    steps?: Partial<ComponentTypes.ProseStepsProps>;
    tabs?: Partial<ComponentTypes.ProseTabsProps>;
    td?: Partial<ComponentTypes.ProseTdProps>;
    th?: Partial<ComponentTypes.ProseThProps>;
  };
  radioGroup?: Partial<ComponentTypes.RadioGroupProps>;
  scrollArea?: Partial<ComponentTypes.ScrollAreaProps>;
  select?: Partial<ComponentTypes.SelectProps>;
  selectMenu?: Partial<ComponentTypes.SelectMenuProps>;
  separator?: Partial<ComponentTypes.SeparatorProps>;
  sidebar?: Partial<ComponentTypes.SidebarProps>;
  skeleton?: Partial<ComponentTypes.SkeletonProps>;
  slideover?: Partial<ComponentTypes.SlideoverProps>;
  slider?: Partial<ComponentTypes.SliderProps>;
  splitter?: Partial<ComponentTypes.SplitterProps>;
  stepper?: Partial<ComponentTypes.StepperProps>;
  switch?: Partial<ComponentTypes.SwitchProps>;
  table?: Partial<ComponentTypes.TableProps>;
  tabs?: Partial<ComponentTypes.TabsProps>;
  textarea?: Partial<ComponentTypes.TextareaProps>;
  timeline?: Partial<ComponentTypes.TimelineProps>;
  toast?: Partial<ComponentTypes.ToastProps>;
  toaster?: Partial<ComponentTypes.ToasterProps>;
  tooltip?: Partial<ComponentTypes.TooltipProps>;
  tree?: Partial<ComponentTypes.TreeProps>;
  user?: Partial<ComponentTypes.UserProps>;
}

/**
 * Loose internal shape stored on the injected `ThemeContext`. Allows the
 * `prose` namespace (lifted by `normalizeUi`) and any unknown keys to flow
 * through without polluting the user-facing `ThemeDefaults` type.
 */
export type ThemeContextDefaults = ThemeDefaults & {
  [name: string]: Record<string, any> | undefined;
};

export type PThemeContentNavigation = UvConfig<typeof ui>['contentNavigation'];
export type PThemeContentSearchButton = UvConfig<typeof ui>['contentSearchButton'];
export type PThemeContentSearch = UvConfig<typeof ui>['contentSearch'];
export type PThemeContentSurround = UvConfig<typeof ui>['contentSurround'];
export type PThemeContentToc = UvConfig<typeof ui>['contentToc'];
export type PThemeProse = UvConfig<typeof prose>;

// Components
export type PThemeAccordion = UvConfig<typeof ui>['accordion'];
export type PThemeAlert = UvConfig<typeof ui>['alert'];
export type PThemeAuthForm = UvConfig<typeof ui>['authForm'];
export type PThemeAvatarGroup = UvConfig<typeof ui>['avatarGroup'];
export type PThemeAvatar = UvConfig<typeof ui>['avatar'];
export type PThemeBadge = UvConfig<typeof ui>['badge'];
export type PThemeBanner = UvConfig<typeof ui>['banner'];
export type PThemeBlogPost = UvConfig<typeof ui>['blogPost'];
export type PThemeBlogPosts = UvConfig<typeof ui>['blogPosts'];
export type PThemeBreadcrumb = UvConfig<typeof ui>['breadcrumb'];
export type PThemeButton = UvConfig<typeof ui>['button'];
export type PThemeCalendar = UvConfig<typeof ui>['calendar'];
export type PThemeCard = UvConfig<typeof ui>['card'];
export type PThemeCarousel = UvConfig<typeof ui>['carousel'];
export type PThemeChangelogVersion = UvConfig<typeof ui>['changelogVersion'];
export type PThemeChangelogVersions = UvConfig<typeof ui>['changelogVersions'];
export type PThemeChatMessage = UvConfig<typeof ui>['chatMessage'];
export type PThemeChatMessages = UvConfig<typeof ui>['chatMessages'];
export type PThemeChatPalette = UvConfig<typeof ui>['chatPalette'];
export type PThemeChatPromptSubmit = UvConfig<typeof ui>['chatPromptSubmit'];
export type PThemeChatPrompt = UvConfig<typeof ui>['chatPrompt'];
export type PThemeChatReasoning = UvConfig<typeof ui>['chatReasoning'];
export type PThemeChatShimmer = UvConfig<typeof ui>['chatShimmer'];
export type PThemeChatTool = UvConfig<typeof ui>['chatTool'];
export type PThemeCheckboxGroup = UvConfig<typeof ui>['checkboxGroup'];
export type PThemeCheckbox = UvConfig<typeof ui>['checkbox'];
export type PThemeChip = UvConfig<typeof ui>['chip'];
export type PThemeCollapsible = UvConfig<typeof ui>['collapsible'];
export type PThemeColorPicker = UvConfig<typeof ui>['colorPicker'];
export type PThemeCommandPalette = UvConfig<typeof ui>['commandPalette'];
export type PThemeContainer = UvConfig<typeof ui>['container'];
export type PThemeContextMenu = UvConfig<typeof ui>['contextMenu'];
export type PThemeDashboardGroup = UvConfig<typeof ui>['dashboardGroup'];
export type PThemeDashboardNavbar = UvConfig<typeof ui>['dashboardNavbar'];
export type PThemeDashboardPanel = UvConfig<typeof ui>['dashboardPanel'];
export type PThemeDashboardResizeHandle = UvConfig<typeof ui>['dashboardResizeHandle'];
export type PThemeDashboardSearchButton = UvConfig<typeof ui>['dashboardSearchButton'];
export type PThemeDashboardSearch = UvConfig<typeof ui>['dashboardSearch'];
export type PThemeDashboardSidebarCollapse = UvConfig<typeof ui>['dashboardSidebarCollapse'];
export type PThemeDashboardSidebarToggle = UvConfig<typeof ui>['dashboardSidebarToggle'];
export type PThemeDashboardSidebar = UvConfig<typeof ui>['dashboardSidebar'];
export type PThemeDashboardToolbar = UvConfig<typeof ui>['dashboardToolbar'];
export type PThemeDrawer = UvConfig<typeof ui>['drawer'];
export type PThemeDropdownMenu = UvConfig<typeof ui>['dropdownMenu'];
export type PThemeEditorDragHandle = UvConfig<typeof ui>['editorDragHandle'];
export type PThemeEditorEmojiMenu = UvConfig<typeof ui>['editorEmojiMenu'];
export type PThemeEditorMentionMenu = UvConfig<typeof ui>['editorMentionMenu'];
export type PThemeEditorSuggestionMenu = UvConfig<typeof ui>['editorSuggestionMenu'];
export type PThemeEditorToolbar = UvConfig<typeof ui>['editorToolbar'];
export type PThemeEditor = UvConfig<typeof ui>['editor'];
export type PThemeEmpty = UvConfig<typeof ui>['empty'];
export type PThemeError = UvConfig<typeof ui>['error'];
export type PThemeFieldGroup = UvConfig<typeof ui>['fieldGroup'];
export type PThemeFileUpload = UvConfig<typeof ui>['fileUpload'];
export type PThemeFooterColumns = UvConfig<typeof ui>['footerColumns'];
export type PThemeFooter = UvConfig<typeof ui>['footer'];
export type PThemeFormField = UvConfig<typeof ui>['formField'];
export type PThemeForm = UvConfig<typeof ui>['form'];
export type PThemeHeader = UvConfig<typeof ui>['header'];
export type PThemeInputDate = UvConfig<typeof ui>['inputDate'];
export type PThemeInputMenu = UvConfig<typeof ui>['inputMenu'];
export type PThemeInputNumber = UvConfig<typeof ui>['inputNumber'];
export type PThemeInputRating = UvConfig<typeof ui>['inputRating'];
export type PThemeInputTags = UvConfig<typeof ui>['inputTags'];
export type PThemeInputTime = UvConfig<typeof ui>['inputTime'];
export type PThemeInput = UvConfig<typeof ui>['input'];
export type PThemeKbd = UvConfig<typeof ui>['kbd'];
export type PThemeLink = UvConfig<typeof ui>['link'];
export type PThemeListbox = UvConfig<typeof ui>['listbox'];
export type PThemeMain = UvConfig<typeof ui>['main'];
export type PThemeMarquee = UvConfig<typeof ui>['marquee'];
export type PThemeModal = UvConfig<typeof ui>['modal'];
export type PThemeNavigationMenu = UvConfig<typeof ui>['navigationMenu'];
export type PThemePageAnchors = UvConfig<typeof ui>['pageAnchors'];
export type PThemePageAside = UvConfig<typeof ui>['pageAside'];
export type PThemePageBody = UvConfig<typeof ui>['pageBody'];
export type PThemePageCard = UvConfig<typeof ui>['pageCard'];
export type PThemePageColumns = UvConfig<typeof ui>['pageColumns'];
export type PThemePageCta = UvConfig<typeof ui>['pageCTA'];
export type PThemePageFeature = UvConfig<typeof ui>['pageFeature'];
export type PThemePageGrid = UvConfig<typeof ui>['pageGrid'];
export type PThemePageHeader = UvConfig<typeof ui>['pageHeader'];
export type PThemePageHero = UvConfig<typeof ui>['pageHero'];
export type PThemePageLinks = UvConfig<typeof ui>['pageLinks'];
export type PThemePageList = UvConfig<typeof ui>['pageList'];
export type PThemePageLogos = UvConfig<typeof ui>['pageLogos'];
export type PThemePageSection = UvConfig<typeof ui>['pageSection'];
export type PThemePage = UvConfig<typeof ui>['page'];
export type PThemePagination = UvConfig<typeof ui>['pagination'];
export type PThemePinInput = UvConfig<typeof ui>['pinInput'];
export type PThemePopover = UvConfig<typeof ui>['popover'];
export type PThemePricingPlan = UvConfig<typeof ui>['pricingPlan'];
export type PThemePricingPlans = UvConfig<typeof ui>['pricingPlans'];
export type PThemePricingTable = UvConfig<typeof ui>['pricingTable'];
export type PThemeProgress = UvConfig<typeof ui>['progress'];
export type PThemeProgressGroup = UvConfig<typeof ui>['progressGroup'];
export type PThemeRadioGroup = UvConfig<typeof ui>['radioGroup'];
export type PThemeScrollArea = UvConfig<typeof ui>['scrollArea'];
export type PThemeSelectMenu = UvConfig<typeof ui>['selectMenu'];
export type PThemeSelect = UvConfig<typeof ui>['select'];
export type PThemeSeparator = UvConfig<typeof ui>['separator'];
export type PThemeSidebar = UvConfig<typeof ui>['sidebar'];
export type PThemeSkeleton = UvConfig<typeof ui>['skeleton'];
export type PThemeSlideover = UvConfig<typeof ui>['slideover'];
export type PThemeSlider = UvConfig<typeof ui>['slider'];
export type PThemeSplitter = UvConfig<typeof ui>['splitter'];
export type PThemeStepper = UvConfig<typeof ui>['stepper'];
export type PThemeSwitch = UvConfig<typeof ui>['switch'];
export type PThemeTable = UvConfig<typeof ui>['table'];
export type PThemeTabs = UvConfig<typeof ui>['tabs'];
export type PThemeTextarea = UvConfig<typeof ui>['textarea'];
export type PThemeTimeline = UvConfig<typeof ui>['timeline'];
export type PThemeToast = UvConfig<typeof ui>['toast'];
export type PThemeToaster = UvConfig<typeof ui>['toaster'];
export type PThemeTooltip = UvConfig<typeof ui>['tooltip'];
export type PThemeTree = UvConfig<typeof ui>['tree'];
export type PThemeUser = UvConfig<typeof ui>['user'];
