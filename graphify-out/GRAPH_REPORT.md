# Graph Report - .  (2026-07-31)

## Corpus Check
- 645 files · ~239,128 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1282 nodes · 2167 edges · 191 communities (167 shown, 24 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Theme Type Exports|Theme Type Exports]]
- [[_COMMUNITY_Locale Definitions|Locale Definitions]]
- [[_COMMUNITY_Unplugin Vite Plugins|Unplugin Vite Plugins]]
- [[_COMMUNITY_Nuxt Module Core|Nuxt Module Core]]
- [[_COMMUNITY_App Avatar Theme|App Avatar Theme]]
- [[_COMMUNITY_App Config Composables|App Config Composables]]
- [[_COMMUNITY_Menu UV Utilities|Menu UV Utilities]]
- [[_COMMUNITY_Alert Chip Modal Tests|Alert Chip Modal Tests]]
- [[_COMMUNITY_Accordion Banner Tests|Accordion Banner Tests]]
- [[_COMMUNITY_Dashboard Layout Suite|Dashboard Layout Suite]]
- [[_COMMUNITY_Form Input Specs|Form Input Specs]]
- [[_COMMUNITY_Utility Type Helpers|Utility Type Helpers]]
- [[_COMMUNITY_Form Field Composable|Form Field Composable]]
- [[_COMMUNITY_Form Type Contracts|Form Type Contracts]]
- [[_COMMUNITY_Shared Runtime Utils|Shared Runtime Utils]]
- [[_COMMUNITY_Content Navigation Search|Content Navigation Search]]
- [[_COMMUNITY_Field Group Themes|Field Group Themes]]
- [[_COMMUNITY_Editor Handler Utils|Editor Handler Utils]]
- [[_COMMUNITY_Select Listbox Specs|Select Listbox Specs]]
- [[_COMMUNITY_Editor Menu Types|Editor Menu Types]]
- [[_COMMUNITY_Overlay Composable|Overlay Composable]]
- [[_COMMUNITY_Select Component|Select Component]]
- [[_COMMUNITY_Keyboard Shortcuts|Keyboard Shortcuts]]
- [[_COMMUNITY_Content Search Utils|Content Search Utils]]
- [[_COMMUNITY_Scrollspy Composable|Scrollspy Composable]]
- [[_COMMUNITY_Form Schema Validation|Form Schema Validation]]
- [[_COMMUNITY_Editor Suggestion Menus|Editor Suggestion Menus]]
- [[_COMMUNITY_Editor Toolbar|Editor Toolbar]]
- [[_COMMUNITY_FormField Component|FormField Component]]
- [[_COMMUNITY_File Upload Composable|File Upload Composable]]
- [[_COMMUNITY_Keyboard Keys Helper|Keyboard Keys Helper]]
- [[_COMMUNITY_HTML Attribute Types|HTML Attribute Types]]
- [[_COMMUNITY_Test Mount Helpers|Test Mount Helpers]]
- [[_COMMUNITY_Component Props Theme|Component Props Theme]]
- [[_COMMUNITY_Toast Composable|Toast Composable]]
- [[_COMMUNITY_DataSlot Spec Meta|DataSlot Spec Meta]]
- [[_COMMUNITY_InputMenu Component|InputMenu Component]]
- [[_COMMUNITY_Pagination Component|Pagination Component]]
- [[_COMMUNITY_Portal IME Composables|Portal IME Composables]]
- [[_COMMUNITY_ThemeDefaults Specs|ThemeDefaults Specs]]
- [[_COMMUNITY_Scroll Shadow Composable|Scroll Shadow Composable]]
- [[_COMMUNITY_Tour Composable|Tour Composable]]
- [[_COMMUNITY_Colors Plugin|Colors Plugin]]
- [[_COMMUNITY_Editor Drag Handle|Editor Drag Handle]]
- [[_COMMUNITY_FileUpload Component|FileUpload Component]]
- [[_COMMUNITY_Listbox Component|Listbox Component]]
- [[_COMMUNITY_Field Group Composable|Field Group Composable]]
- [[_COMMUNITY_AuthForm Component|AuthForm Component]]
- [[_COMMUNITY_ChatPromptSubmit|ChatPromptSubmit]]
- [[_COMMUNITY_InputRating Component|InputRating Component]]
- [[_COMMUNITY_SelectMenu Component|SelectMenu Component]]
- [[_COMMUNITY_Slider Component|Slider Component]]
- [[_COMMUNITY_Textarea Component|Textarea Component]]
- [[_COMMUNITY_Toast Toaster|Toast Toaster]]
- [[_COMMUNITY_Tooltip Component|Tooltip Component]]
- [[_COMMUNITY_Content Navigation Map|Content Navigation Map]]
- [[_COMMUNITY_Carousel Component|Carousel Component]]
- [[_COMMUNITY_Popover Component|Popover Component]]
- [[_COMMUNITY_Nuxt Vitest Setup|Nuxt Vitest Setup]]
- [[_COMMUNITY_Calendar Theme Sizes|Calendar Theme Sizes]]
- [[_COMMUNITY_Overlay Pointer Utils|Overlay Pointer Utils]]
- [[_COMMUNITY_Vue Router Link|Vue Router Link]]
- [[_COMMUNITY_Inertia Link|Inertia Link]]
- [[_COMMUNITY_Prose Card|Prose Card]]

## God Nodes (most connected - your core abstractions)
1. `renderEach()` - 117 edges
2. `ModuleOptions` - 76 edges
3. `defineLocale()` - 65 edges
4. `Messages` - 64 edges
5. `renderForm()` - 33 edges
6. `FormInputEvents` - 17 edges
7. `createHandlers()` - 12 edges
8. `get()` - 10 edges
9. `PohonUiOptions` - 10 edges
10. `mountSuspended()` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Context` --references--> `FormFieldInjectedOptions`  [EXTRACTED]
  test/composables/useFormField.spec.ts → src/runtime/types/form.ts
- `renderFormField()` --calls--> `mountSuspended()`  [INFERRED]
  test/components/FormField.spec.ts → test/utils/mount.ts
- `mountSpy()` --calls--> `mountSuspended()`  [INFERRED]
  test/composables/useScrollspy.spec.ts → test/utils/mount.ts
- `useComponentIcons()` --calls--> `useAppConfig()`  [INFERRED]
  src/runtime/composables/useComponentIcons.ts → src/runtime/vue/composables/useAppConfig.ts
- `useComponentProps()` --calls--> `useAppConfig()`  [INFERRED]
  src/runtime/composables/useComponentProps.ts → src/runtime/vue/composables/useAppConfig.ts

## Import Cycles
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/progress.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/user.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/stepper.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/carousel.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/radio-group.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/prose/index.ts -> src/theme/prose/code-tree.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/chat-prompt.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/chat-reasoning.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/prose/index.ts -> src/theme/prose/code-group.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/changelog-version.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/content/index.ts -> src/theme/content/content-navigation.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/content/index.ts -> src/theme/content/content-surround.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/content/index.ts -> src/theme/content/content-toc.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/alert.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/avatar-group.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/avatar.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/badge.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/banner.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/blog-post.ts -> src/module.ts`
- 4-file cycle: `src/module.ts -> src/templates.ts -> src/theme/index.ts -> src/theme/breadcrumb.ts -> src/module.ts`

## Communities (191 total, 24 thin omitted)

### Community 0 - "Theme Type Exports"
Cohesion: 0.02
Nodes (123): PThemeAccordion, PThemeAlert, PThemeAuthForm, PThemeAvatar, PThemeAvatarGroup, PThemeBadge, PThemeBanner, PThemeBlogPost (+115 more)

### Community 1 - "Locale Definitions"
Cohesion: 0.12
Nodes (8): defineLocale(), DefineLocaleOptions, extendLocale(), baseOptions, TestMessages, Direction, Locale, Messages

### Community 2 - "Unplugin Vite Plugins"
Cohesion: 0.07
Nodes (31): AppConfigPlugin(), AutoImportPlugin(), ComponentImportPlugin(), ComponentSource, createComponentSource(), IconsPlugin(), parseUserIcon(), NuxtEnvironmentPlugin() (+23 more)

### Community 3 - "Nuxt Module Core"
Cohesion: 0.07
Nodes (3): Color, ModuleOptions, RuntimeNuxtHooks

### Community 5 - "App Avatar Theme"
Cohesion: 0.04
Nodes (19): locale, portal, toasterProps, children, hiddenCount, AvatarGroupWrapper, visibleAvatars, iconProps (+11 more)

### Community 6 - "App Config Composables"
Cohesion: 0.06
Nodes (20): _appConfig, useAppConfig(), useComponentIcons(), localeContextInjectionKey, _useLocale(), useResizable(), UseResizableProps, UseResizableReturn (+12 more)

### Community 7 - "Menu UV Utilities"
Cohesion: 0.06
Nodes (27): ContextMenuType, ContextMenuWrapper, DropdownMenuType, NavigationMenuType, ComponentAppConfig, ComponentConfig, ComponentSlots, ComponentUI (+19 more)

### Community 10 - "Accordion Banner Tests"
Cohesion: 0.06
Nodes (5): ui, ExtractRestArgs, MountSuspendedOptions, RenderEachFn, RenderEachRest

### Community 11 - "Dashboard Layout Suite"
Cohesion: 0.09
Nodes (7): DashboardWrapper, DashboardWrapper, DashboardWrapper, DashboardWrapper, DashboardWrapper, DashboardWrapper, DashboardWrapper

### Community 13 - "Form Input Specs"
Cohesion: 0.16
Nodes (9): createForm(), createForm(), createForm(), createForm(), createForm(), createForm(), createForm(), FormInputEvents (+1 more)

### Community 14 - "Utility Type Helpers"
Cohesion: 0.10
Nodes (20): AcceptableValue, AllKeys, ArrayOrNested, DeepPartial, DeepRequired, DotPathKeys, DotPathValue, DynamicSlots (+12 more)

### Community 15 - "Form Field Composable"
Cohesion: 0.15
Nodes (18): formBusInjectionKey, formErrorsInjectionKey, formFieldInjectionKey, formInputsInjectionKey, formLoadingInjectionKey, formOptionsInjectionKey, formStateInjectionKey, inputIdInjectionKey (+10 more)

### Community 16 - "Form Type Contracts"
Cohesion: 0.12
Nodes (16): Form, FormChildAttachEvent, FormChildDetachEvent, FormData, FormError, FormErrorEvent, FormErrorWithId, FormEventType (+8 more)

### Community 17 - "Shared Runtime Utils"
Cohesion: 0.15
Nodes (9): GetItemKeys, compare(), get(), getDisplayValue(), isEmpty(), translate(), getEstimateSize(), getSize() (+1 more)

### Community 18 - "Content Navigation Search"
Cohesion: 0.12
Nodes (5): defaultValue, disabled, rootProps, route, ui

### Community 20 - "Editor Handler Utils"
Cohesion: 0.21
Nodes (13): createHandlers(), createHeadingHandler(), createImageHandler(), createLinkHandler(), createListHandler(), createMarkHandler(), createMoveHandler(), createSetHandler() (+5 more)

### Community 21 - "Select Listbox Specs"
Cohesion: 0.21
Nodes (7): createForm(), createForm(), createForm(), Ctx, Events, expectEmitPayloadType(), Slots

### Community 22 - "Editor Menu Types"
Cohesion: 0.22
Nodes (10): EditorMenuOptions, useEditorMenu(), useFilter(), Size, EditorCustomHandlers, EditorHandler, EditorHandlers, EditorItem (+2 more)

### Community 23 - "Overlay Composable"
Cohesion: 0.17
Nodes (9): CloseEventArgType, CloseEventArgTypeComplex, CloseEventArgTypeSimple, ManagedOverlayOptionsPrivate, OpenedOverlay, Overlay, OverlayInstance, OverlayOptions (+1 more)

### Community 24 - "Select Component"
Cohesion: 0.17
Nodes (10): arrowProps, contentProps, isItemAligned, { isLeading, isTrailing, leadingIconName, trailingIconName }, items, portalProps, position, rootProps (+2 more)

### Community 25 - "Keyboard Shortcuts"
Cohesion: 0.21
Nodes (7): defineShortcuts(), Handler, shiftableKeys, Shortcut, ShortcutConfig, ShortcutsConfig, ShortcutsOptions

### Community 27 - "Content Search Utils"
Cohesion: 0.29
Nodes (6): _useContentSearch(), escapeHTML(), htmlEscapes, isAlreadyEscaped(), sanitize(), sanitizeSnippet()

### Community 28 - "Scrollspy Composable"
Cohesion: 0.20
Nodes (3): MockIntersectionObserver, mountSpy(), useScrollspy()

### Community 29 - "Form Schema Validation"
Cohesion: 0.31
Nodes (8): ValidateReturnSchema, getAtPath(), isStandardSchema(), isSuperStructSchema(), setAtPath(), validateSchema(), validateStandardSchema(), validateSuperstructSchema()

### Community 30 - "Editor Suggestion Menus"
Cohesion: 0.25
Nodes (4): createEditor(), createOptions(), ExpectedType, { suggestionMock }

### Community 31 - "Editor Toolbar"
Cohesion: 0.31
Nodes (5): getActiveChildItem(), getButtonProps(), isDisabled(), mapDropdownItem(), onClick()

### Community 32 - "FormField Component"
Cohesion: 0.25
Nodes (6): error, formInputs, id, FormFieldWrapper, inputComponents, renderFormField()

### Community 33 - "File Upload Composable"
Cohesion: 0.36
Nodes (4): mountUpload(), vueuse, useFileUpload(), UseFileUploadOptions

### Community 34 - "Keyboard Keys Helper"
Cohesion: 0.29
Nodes (5): KbdKey, kbdKeysMap, KbdKeySpecific, KbdKeysSpecificMap, _useKbd()

### Community 35 - "HTML Attribute Types"
Cohesion: 0.25
Nodes (7): AnchorHTMLAttributes, ButtonHTMLAttributes, FormHTMLAttributes, ImgHTMLAttributes, InputHTMLAttributes, TableHTMLAttributes, TextareaHTMLAttributes

### Community 36 - "Test Mount Helpers"
Cohesion: 0.29
Nodes (6): registerShortcuts(), mountKbd(), mountWithMax(), head, mountSuspended(), router

### Community 37 - "Component Props Theme"
Cohesion: 0.33
Nodes (5): defaultThemeContext, injectThemeContext(), [_injectThemeContext, provideThemeContext], ThemeContext, useComponentProps()

### Community 38 - "Toast Composable"
Cohesion: 0.48
Nodes (5): Toast, toastMaxInjectionKey, useToast(), useState(), EmitsToProps

### Community 39 - "DataSlot Spec Meta"
Cohesion: 0.33
Nodes (5): entries, ImportMeta, modules, options, skip

### Community 41 - "InputMenu Component"
Cohesion: 0.33
Nodes (5): [DefineCreateItemTemplate, ReuseCreateItemTemplate], inputSize, { isLeading, isTrailing, leadingIconName, trailingIconName }, items, ui

### Community 42 - "Pagination Component"
Cohesion: 0.33
Nodes (4): lastIcon, nextIcon, prevIcon, ui

### Community 45 - "ThemeDefaults Specs"
Cohesion: 0.33
Nodes (5): Expected, ExtraInThemeDefaults, MissingFromThemeDefaults, NonProxyComponents, ThemeDefaults

### Community 46 - "Scroll Shadow Composable"
Cohesion: 0.40
Nodes (3): { arrivedState }, useScrollShadow(), UseScrollShadowOptions

### Community 47 - "Tour Composable"
Cohesion: 0.40
Nodes (4): TourStep, useTour(), UseTourOptions, UseTourReturn

### Community 54 - "Field Group Composable"
Cohesion: 0.40
Nodes (3): fieldGroupInjectionKey, FieldGroupReset, Props

## Knowledge Gaps
- **332 isolated node(s):** `Color`, `RuntimeNuxtHooks`, `ComponentSource`, `toasterProps`, `locale` (+327 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **24 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `renderEach()` connect `Alert Chip Modal Tests` to `App Avatar Theme`, `Menu UV Utilities`, `Color Mode Components`, `Accordion Banner Tests`, `Dashboard Layout Suite`, `Table Component API`, `Form Input Specs`, `Content Navigation Search`, `Select Listbox Specs`, `Editor Toolbar`, `FormField Component`, `Form Component`, `Pagination Component`, `ScrollArea Component`, `Editor Drag Handle`, `FileUpload Component`, `AuthForm Component`, `ChatPrompt Component`, `ChatPromptSubmit`, `SelectMenu Component`, `Slider Component`, `Textarea Component`, `Toast Toaster`, `Tooltip Component`, `Carousel Component`, `ChatMessages Component`, `ChatReasoning Component`, `ColorPicker Component`, `Popover Component`, `PricingPlans Component`, `Slideover Component`, `Stepper Component`, `Timeline Component`, `Breadcrumb Component`, `Calendar`, `Changelog Versions`, `Chat Message`, `Container`, `Header`, `Input Tags`, `Page`, `Page Anchors`, `Page Body`, `Page Card`, `Page C T A`, `Page Grid`, `Page Header`, `Separator`, `User`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `mountSuspended()` connect `Test Mount Helpers` to `FormField Component`, `File Upload Composable`, `Form Input Specs`, `Form Field Composable`, `InputRating Component`, `Scrollspy Composable`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `componentRender()` connect `InputRating Component` to `Accordion Banner Tests`, `Test Mount Helpers`, `App Avatar Theme`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `Color`, `RuntimeNuxtHooks`, `ComponentSource` to the rest of the system?**
  _332 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Theme Type Exports` be split into smaller, more focused modules?**
  _Cohesion score 0.016129032258064516 - nodes in this community are weakly interconnected._
- **Should `Locale Definitions` be split into smaller, more focused modules?**
  _Cohesion score 0.12069603850425768 - nodes in this community are weakly interconnected._
- **Should `Unplugin Vite Plugins` be split into smaller, more focused modules?**
  _Cohesion score 0.06641604010025062 - nodes in this community are weakly interconnected._