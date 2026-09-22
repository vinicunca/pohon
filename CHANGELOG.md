# Changelog

## [2.0.0-rc7.9](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.8...v2.0.0-rc7.9) (2026-09-22)

### Bug Fixes

* **components:** allow partial ui overrides on items ([80288fd](https://github.com/vinicunca/pohon/commit/80288fdb5936914d7beffa7bf76fbb1c98174d90))
* **Form:** clear only the targeted field inside a nested form ([e289733](https://github.com/vinicunca/pohon/commit/e2897331adf6b4e8c6c599d6d4bac61eb0af8d49))
* **InputDate/InputTime:** emit focus and blur when focus enters or leaves the field ([01a70e4](https://github.com/vinicunca/pohon/commit/01a70e4d6cde45a33474ccff23693a3c0c0371fc))
* **InputMenu:** prevent tags input from adding the search term on enter ([9432309](https://github.com/vinicunca/pohon/commit/94323091a75fb42702d6bb08a3b75f7e75a9ad72))
* **Link:** propagate click handler errors to Vue error handling ([9232976](https://github.com/vinicunca/pohon/commit/923297684e876063661bcd8b0f10335e07faa356))
* **SelectMenu/InputMenu:** ignore clear button when disabled ([de4068f](https://github.com/vinicunca/pohon/commit/de4068fd3c316907438370b3f8312db92ea4bdb5))
* **SelectMenu:** remove the inherited "Show popup" aria-label ([7aba573](https://github.com/vinicunca/pohon/commit/7aba573c98da2d21498f3d4feb5376a9cec9549d))
* **Table:** emit aria-sort on sortable th elements ([902805a](https://github.com/vinicunca/pohon/commit/902805a6d74398edff1f94a2b1ea8f5415837332))
* **Table:** inset row focus outline ([c69a52d](https://github.com/vinicunca/pohon/commit/c69a52de60332c4549f099e803d2316678c391cd))
* **test:** focus in and out ([2ebc4d5](https://github.com/vinicunca/pohon/commit/2ebc4d53c572821f8f5244ee13327a6e9914cd9b))
* **Toaster:** prevent onClick from being called twice ([b29e111](https://github.com/vinicunca/pohon/commit/b29e1116471f1a810e7f2f774967376050cfd556))
* **vue:** resolve explicit component imports to their Vue overrides ([15df259](https://github.com/vinicunca/pohon/commit/15df259a602b75c91f1f1db8f6d1452c8be007c3))

## [2.0.0-rc7.8](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.7...v2.0.0-rc7.8) (2026-09-09)

### Features

* **CheckboxGroup/RadioGroup:** support icon in items ([c348bae](https://github.com/vinicunca/pohon/commit/c348bae2632c1365b1503bce907b3fb12e232327))
* **ProgressGroup:** new component ([7f91721](https://github.com/vinicunca/pohon/commit/7f9172184925a585814ec50c2b5a50720b693456))
* **Splitter:** new component ([6a46779](https://github.com/vinicunca/pohon/commit/6a4677910bc99db3004d2f90e155de3d9f61ce54))

### Bug Fixes

* **ChatMessages:** add missing color to user and assistant props ([755fc76](https://github.com/vinicunca/pohon/commit/755fc760f560c24b0371787beb7af188adf7475b))
* **Checkbox/RadioGroup:** add flex-wrap on list and card variants ([e1a999a](https://github.com/vinicunca/pohon/commit/e1a999a3986d1b53461b0d5271300d9c9257ac1f))
* **components:** resolve theme props consistently in form controls ([76e7ce7](https://github.com/vinicunca/pohon/commit/76e7ce7eb505e06bf5f09e1161793963802afbe4))
* **Form:** omit method attribute on nested forms ([36a70d2](https://github.com/vinicunca/pohon/commit/36a70d249bfe35976084f328e4d147920065f349))
* **Icon:** render bundled icons during SSR in Vue ([9c6f29b](https://github.com/vinicunca/pohon/commit/9c6f29bcf1847b5d312df7e857669274985c626d))
* **InputNumber:** work uncontrolled with only a default value ([02eeed3](https://github.com/vinicunca/pohon/commit/02eeed3ce0913d5709264957c49ab3f64730ee9e))
* **Link:** restore prefetching with Nuxt 4.5 custom slot ([4fe91cb](https://github.com/vinicunca/pohon/commit/4fe91cb6fff601a0277a7bf1b1a7b4f9902a04d0))
* **NavigationMenu:** avoid duplicate accordion trigger on items without to ([066bceb](https://github.com/vinicunca/pohon/commit/066bcebf7312ef862d5fabe83fdd503aa561b907))
* **ProseCodeTree:** invoke default slot from render ([c04b527](https://github.com/vinicunca/pohon/commit/c04b52719eaa762f51d23d6ad380b0a5993acda9))
* **SelectMenu:** prevent search input focus on open with autofocus: false ([fc4326f](https://github.com/vinicunca/pohon/commit/fc4326f0a220de8fff7274e0bd60f91193f3117f))
* **Slider:** bind form aria attributes on thumbs instead of root ([2328e04](https://github.com/vinicunca/pohon/commit/2328e040a68538d0579c28542ed3432aaa55dd08))
* **Slider:** forward aria attributes to the thumb ([2a20064](https://github.com/vinicunca/pohon/commit/2a20064b603ead414f6463b2f1100039c9a00308))
* test snapshot ([6801a25](https://github.com/vinicunca/pohon/commit/6801a25c7ecd4b151f617b1e4d9b8c43f44fca43))

## [2.0.0-rc7.7](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.6...v2.0.0-rc7.7) (2026-08-13)

### Features

* remove plugin from vite ([8552e10](https://github.com/vinicunca/pohon/commit/8552e1048ff611d8010d94ae31679c44b18d7b30))

## [2.0.0-rc7.6](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.5...v2.0.0-rc7.6) (2026-08-12)

### Features

* **locale:** validate locales against CLDR in CLI and tests ([e145608](https://github.com/vinicunca/pohon/commit/e145608f7bbe57b3ac262dce984940cfde66993a))
* **prose:** configurable heading anchors and copy button ([b17f468](https://github.com/vinicunca/pohon/commit/b17f4687332e099e772a92fac15c31013dc1c944))

### Bug Fixes

* **AuthForm:** type submit payload with the schema output ([942d361](https://github.com/vinicunca/pohon/commit/942d361410e4726d5177a5c9a5ba8720df34991e))
* **CommandPalette:** always escape search highlight to prevent XSS ([0fbe800](https://github.com/vinicunca/pohon/commit/0fbe800e7b61243498046b7d7a6924c16465eae4))
* **ContentToc:** prevent list from collapsing ([cf6c7a5](https://github.com/vinicunca/pohon/commit/cf6c7a5986962e29b1f6b902cf08169dd0d2c206))
* **Editor:** ignore updates without document changes ([5a5649b](https://github.com/vinicunca/pohon/commit/5a5649b55135b1b0170c1922114363e84086f40b))
* **Modal:** emit transition events from overlay when scrollable ([9f867d2](https://github.com/vinicunca/pohon/commit/9f867d208b6af2b16c386d4e9fd365e2f90b7601))
* test suite and locales ([30e8acd](https://github.com/vinicunca/pohon/commit/30e8acdf8727e2edbbe0f3737cd53068c6c87ee9))
* **theme:** blank top-level base in applyUnstyled ([32de0c1](https://github.com/vinicunca/pohon/commit/32de0c1a1170d2673a8dae510786f5f2db8f13b6))

### Performance Improvements

* **Button/Select/SelectMenu/InputMenu:** narrow reactive dependencies ([da52521](https://github.com/vinicunca/pohon/commit/da5252124aa26ddd50dfdec01c5e84f4b202c721))
* **components:** memoize tv slot invocations with simple args ([3675ecd](https://github.com/vinicunca/pohon/commit/3675ecd16b2dac9d090d1275cca8f95ab0221677))

## [2.0.0-rc7.5](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.4...v2.0.0-rc7.5) (2026-07-31)

### Features

* upgrade unocss-variants ([d970887](https://github.com/vinicunca/pohon/commit/d9708878ef007b9b2ed01c2b05d7903cd80736b8))

## [2.0.0-rc7.4](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.3...v2.0.0-rc7.4) (2026-07-30)

### Features

* disable colors plugin ([6758bb8](https://github.com/vinicunca/pohon/commit/6758bb8160816bafad0a6de26d8e6993069aa401))

## [2.0.0-rc7.3](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.2...v2.0.0-rc7.3) (2026-07-16)

### Features

* **ChatPrompt:** add body slot and focus highlight ([1874ed4](https://github.com/vinicunca/pohon/commit/1874ed43a546c115bae152bd36d537756cf40dce))
* **ChatTool:** add actions prop for tool approval ([487ced7](https://github.com/vinicunca/pohon/commit/487ced77fdd759620347f2d0026f51aa41e6d10e))
* **ContentToc:** scroll list independently and center active link ([7fc7c25](https://github.com/vinicunca/pohon/commit/7fc7c25d52a392599c16644cc6220885e5a306ae))
* **Editor:** allow disabling starter kit for plain text ([8b512d4](https://github.com/vinicunca/pohon/commit/8b512d475d50f3e039a2fdbc8b8b1ef67bdfef2a))
* **Empty:** add loading and loadingIcon props ([72ea0dc](https://github.com/vinicunca/pohon/commit/72ea0dc568a3e4bd5d43adfa94da4d138a56c2ea))
* **Prompt:** add claude action ([1c676ba](https://github.com/vinicunca/pohon/commit/1c676ba9a10af38b92f504c6bd18e188b4c19bed))

### Bug Fixes

* **BlogPost/ChangelogVersion:** format date in UTC to prevent hydration mismatch ([5c76655](https://github.com/vinicunca/pohon/commit/5c76655a00b1113504ee8f34164b6c359ead2b0b))
* **Carousel:** prevent reset when plugin props use inline objects ([0937f6a](https://github.com/vinicunca/pohon/commit/0937f6a24197d657b15dbaab2a09101aa1c12cb1))
* **defineShortcuts:** add missing arrowdown to shiftable keys ([d590159](https://github.com/vinicunca/pohon/commit/d590159fa2001e009288772cad846d284a220c1b))
* **defineShortcuts:** defer standalone shortcuts that prefix a chain ([c571578](https://github.com/vinicunca/pohon/commit/c5715782cd6c347e79e758bd9a75bbc6f8feb962))
* **Editor:** prevent suggestion menu blinking on keystroke ([9545306](https://github.com/vinicunca/pohon/commit/95453065274a31f35c414fccd2104eef3796ebca))
* **inertia:** make useRoute().fullPath reactive across navigation ([e52e156](https://github.com/vinicunca/pohon/commit/e52e1566b38edbcdd49581615acc1ff0bf3ac6b1))
* **types:** type prose components in app config ([46a87eb](https://github.com/vinicunca/pohon/commit/46a87eb28fbdca4ddef73ddaf4dfa6fe106a8ab6))
* **useFileUpload:** keep dropzone type filter reactive to accept ([8e12070](https://github.com/vinicunca/pohon/commit/8e12070dcbca04ce66795e24f4c4062761458055))
* **useResizable:** share resize logic between mouse and touch ([1149533](https://github.com/vinicunca/pohon/commit/114953377bb3b1e5ef5cbf733b5e4b7fa0fe6e70))
* **useScrollspy:** unobserve previous headings on update ([e993910](https://github.com/vinicunca/pohon/commit/e9939104261811c249a85eafdb73cbde7276a564))
* **useToast:** dedupe duplicate ids and handle max of 0 ([d314334](https://github.com/vinicunca/pohon/commit/d314334c7217e24ee335d00ba29ee90f5b9cb289))

### Performance Improvements

* **vue:** skip rewriting unchanged templates ([9c1090c](https://github.com/vinicunca/pohon/commit/9c1090cdb0f741909d517378687e9231eb1435c2))

## [2.0.0-rc7.2](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.1...v2.0.0-rc7.2) (2026-07-08)

## [2.0.0-rc7.1](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7.0...v2.0.0-rc7.1) (2026-07-08)

### Features

* **Drawer:** add close and closeIcon props ([ecf766f](https://github.com/vinicunca/pohon/commit/ecf766f74df0a2a43c92f450b3713058a407c628))
* **module:** pre-bundle used icons into @nuxt/icon client bundle ([a3b0285](https://github.com/vinicunca/pohon/commit/a3b0285ee73ef3b6cab406a20348e265b56a518c))
* **Table:** add getScrollElement virtualize option ([b9076a1](https://github.com/vinicunca/pohon/commit/b9076a10d203d4b3818627d1c95f76c24f2ee0ec))
* **unplugin:** pre-bundle used icons into the Vue/Vite build ([e2ec6ef](https://github.com/vinicunca/pohon/commit/e2ec6ef0333da5cc2b21af2697d844efcf07ae60))

### Bug Fixes

* **Button:** allow inline event handlers with non-void return types ([c4ac3de](https://github.com/vinicunca/pohon/commit/c4ac3ded147d79c79ae04c84ae769e183c7d7d21))
* **ChatMessages:** re-evaluate streaming indicator on each render ([be848bb](https://github.com/vinicunca/pohon/commit/be848bb320dc4abd220ea4fb69d902404427c5db))
* **components:** forward data-slot to component root ([6e58664](https://github.com/vinicunca/pohon/commit/6e5866447bdb966f8f9a908b6d643ff19767b174))
* **Link:** apply rel prop to internal links ([2aa891f](https://github.com/vinicunca/pohon/commit/2aa891fe0f3c60782fa80ce8e3e9b888921e23a1))
* **module:** avoid unhead v2-only hookOnce in colors plugin ([6da28a1](https://github.com/vinicunca/pohon/commit/6da28a12c557abcc40cf956c7e90be4f0f17eb2d))
* **useComponentProps:** let app config defaultVariants override withDefaults ([a2fe14d](https://github.com/vinicunca/pohon/commit/a2fe14de09bf013a61517c05152fe0a9017b6b9f))

## [2.0.0-rc7.0](https://github.com/vinicunca/pohon/compare/v2.0.0-rc7...v2.0.0-rc7.0) (2026-06-30)

### Features

* **Modal/Slideover:** add leave and enter events ([3927e51](https://github.com/vinicunca/pohon/commit/3927e5188c1b92103a6a77f20dd77aa3bb52b1cb))

### Bug Fixes

* **Separator:** forward fall-through attributes to root ([e4aade5](https://github.com/vinicunca/pohon/commit/e4aade56aedcd3abade10092e54accf6f7aee90c))

### Performance Improvements

* **components:** drop the redundant inner  in component extend ([09fcce1](https://github.com/vinicunca/pohon/commit/09fcce1cb064e004cf92296a3cdfbbe6178d7b82))
* **types:** decouple useComponentProps from the component-types barrel ([715ce04](https://github.com/vinicunca/pohon/commit/715ce0407383079b10cd8cecdd6fc69b5db20cdc))

## [2.0.0-rc7](https://github.com/vinicunca/pohon/compare/v2.0.0-rc6...v2.0.0-rc7) (2026-06-13)

### Features

* bring back theme definitions ([4e4e206](https://github.com/vinicunca/pohon/commit/4e4e2060a20aa7f714660d87c0a448e17f13f44f))

## [2.0.0-rc6](https://github.com/vinicunca/pohon/compare/v2.0.0-rc5...v2.0.0-rc6) (2026-06-09)

## [2.0.0-rc5](https://github.com/vinicunca/pohon/compare/v2.0.0-rc4...v2.0.0-rc5) (2026-06-08)

### Features

* **ContentSearch/DashboardSearch:** forward input config to command palette ([9d61343](https://github.com/vinicunca/pohon/commit/9d61343d80977781d1c8cb1007f144795f7cc3a0))
* **FileUpload:** expose removeFile in slots ([4c88cfd](https://github.com/vinicunca/pohon/commit/4c88cfd6943818f0fc343f24cb4f4c606bca4c55))
* **useTour:** new composable ([59943c8](https://github.com/vinicunca/pohon/commit/59943c8dd7cb591376bb2f4c6791a7522f4240bf))

### Bug Fixes

* **InputNumber/InputDate/InputTime/Calendar:** restore locale prop ([b04f27a](https://github.com/vinicunca/pohon/commit/b04f27ad5886fc87b2799804e7db76189e5f594c))

## [2.0.0-rc4](https://github.com/vinicunca/pohon/compare/v2.0.0-rc3...v2.0.0-rc4) (2026-06-01)

## [2.0.0-rc3](https://github.com/vinicunca/pohon/compare/v2.0.0-rc2...v2.0.0-rc3) (2026-06-01)

### Bug Fixes

* expose typings ([7c9eb57](https://github.com/vinicunca/pohon/commit/7c9eb577869bfb1d5582386c291a18042c57fcc0))

## [2.0.0-rc2](https://github.com/vinicunca/pohon/compare/v2.0.0...v2.0.0-rc2) (2026-05-25)

### ⚠ BREAKING CHANGES

* **InputMenu:** rename autocomplete prop to mode to free up HTML attribute

### Features

* **ContentSearch:** add async search support via useSearchCollection ([6c61b99](https://github.com/vinicunca/pohon/commit/6c61b999f0e7d4cb1fb52e9ae01901c8cf6025ab))

### Bug Fixes

* **ContentSearch:** preserve intermediate ancestors in breadcrumb prefix ([ead79ff](https://github.com/vinicunca/pohon/commit/ead79ff981b5b922134843f2da6eb8345089ac7f))
* **InputMenu/Select/SelectMenu:** respect trailing: false over default trailingIcon ([c6f8fa6](https://github.com/vinicunca/pohon/commit/c6f8fa6568615037d0af423dc8dd900751854a23))
* **InputMenu:** rename autocomplete prop to mode to free up HTML attribute ([bcff154](https://github.com/vinicunca/pohon/commit/bcff154fb2756ae7009c9a9cda46e6d47ebaff79))

## [2.0.0](https://github.com/vinicunca/pohon/compare/v2.0.0-rc1.2...v2.0.0) (2026-05-15)

### Bug Fixes

* remove cli in bin ([ad518bb](https://github.com/vinicunca/pohon/commit/ad518bb4c02bb118e61b5d6448df0db9a0df204a))

## [2.0.0-rc1.2](https://github.com/vinicunca/pohon/compare/v2.0.0-rc1.1...v2.0.0-rc1.2) (2026-05-15)

## [2.0.0-rc1.1](https://github.com/vinicunca/pohon/compare/v2.0.0-rc1.0...v2.0.0-rc1.1) (2026-05-15)

### Bug Fixes

* typings ([74a727b](https://github.com/vinicunca/pohon/commit/74a727bd767b1a6007bc6a97eb4403089937763d))

## [2.0.0-rc1.0](https://github.com/vinicunca/pohon/compare/v2.0.0-rc1...v2.0.0-rc1.0) (2026-05-15)

## 2.0.0-rc1 (2026-05-15)
