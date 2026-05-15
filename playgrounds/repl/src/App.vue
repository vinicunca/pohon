<!-- eslint-disable no-useless-escape -->
<script setup lang="ts">
import { Repl, useStore, useVueImportMap } from '@vue/repl';
import CodeMirror from '@vue/repl/codemirror-editor';
import { useColorMode } from '@vueuse/core';
import { computed, ref, watchEffect } from 'vue';

const colorMode = useColorMode();
const theme = computed(() => colorMode.value === 'dark' ? 'dark' : 'light');

const {
  importMap: vueImportMap,
  vueVersion,
} = useVueImportMap({
  runtimeDev: 'https://esm.sh/vue@3/dist/vue.esm-browser.js',
  runtimeProd: 'https://esm.sh/vue@3/dist/vue.esm-browser.prod.js',
  serverRenderer: 'https://esm.sh/@vue/server-renderer@3/dist/server-renderer.esm-browser.js',
});

const builtinImportMap = computed(() => ({
  imports: {
    ...vueImportMap.value.imports,
    'pohon-ui': '/pohon-ui.js',
    'zod': 'https://esm.sh/zod@4?external=vue',
    '@vueuse/core': 'https://esm.sh/@vueuse/core?external=vue',
    '@tanstack/vue-table': 'https://esm.sh/@tanstack/vue-table?external=vue',
    '@internationalized/date': 'https://esm.sh/@internationalized/date',
    'scule': 'https://esm.sh/scule',
  },
}));

const store = useStore(
  {
    builtinImportMap,
    vueVersion,
    showOutput: ref(false),
    outputMode: ref('preview'),
  },
  location.hash,
);

const defaultCode = `<script setup lang="ts">
import { z } from 'zod'
import { reactive } from 'vue'

const months = Array.from({ length: 12 }, (_, i) => ({
  label: String(i + 1).padStart(2, '0'),
  value: String(i + 1).padStart(2, '0')
}))

const currentYear = new Date().getFullYear()
const years = Array.from({ length: 10 }, (_, i) => ({
  label: String(currentYear + i),
  value: String(currentYear + i)
}))

const schema = z.object({
  name: z.string({ error: 'Name is required' }).nonempty('Name is required'),
  cardNumber: z
    .string({ error: 'Card number is required' })
    .nonempty('Card number is required')
    .regex(/^[\\d\\s]{16,19}$/, 'Enter a valid 16-digit card number'),
  cvv: z
    .string({ error: 'CVV is required' })
    .nonempty('CVV is required')
    .regex(/^\\d{3,4}$/, 'Enter a valid CVV'),
  month: z.string({ error: 'Month is required' }).nonempty('Select a month'),
  year: z.string({ error: 'Year is required' }).nonempty('Select a year'),
  sameAsShipping: z.boolean().default(true),
  comments: z.string().optional()
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  cardNumber: undefined,
  cvv: undefined,
  month: undefined,
  year: undefined,
  sameAsShipping: true,
  comments: undefined
})
<\/script>

<template>
  <div class="min-h-screen p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
    <PCard class="max-w-md mx-auto" variant="subtle">
      <PForm :schema="schema" :state="state" class="space-y-6">
        <PPageCard title="Payment method" description="All transactions are secure and encrypted" variant="naked" />

        <PFormField name="name" label="Name" required>
          <PInput v-model="state.name" placeholder="John Doe" class="w-full" />
        </PFormField>

        <div class="grid grid-cols-3 gap-4">
          <PFormField name="cardNumber" label="Card number" help="Enter your 16-digit number." required class="col-span-2">
            <PInput v-model="state.cardNumber" placeholder="1234 5678 9012 3456" class="w-full" />
          </PFormField>

          <PFormField name="cvv" label="CVV" required>
            <PInput v-model="state.cvv" placeholder="123" class="w-full" />
          </PFormField>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <PFormField name="month" label="Month" required>
            <PSelect v-model="state.month" :items="months" placeholder="MM" value-key="value" class="w-full" />
          </PFormField>

          <PFormField name="year" label="Year" required>
            <PSelect v-model="state.year" :items="years" placeholder="YYYY" value-key="value" class="w-full" />
          </PFormField>
        </div>

        <PSeparator />

        <PPageCard title="Billing address" description="The billing address associated with your payment method" variant="naked" />

        <PFormField name="sameAsShipping">
          <PCheckbox v-model="state.sameAsShipping" label="Same as shipping address" color="neutral" />
        </PFormField>

        <PSeparator />

        <PFormField name="comments" label="Comments">
          <PTextarea v-model="state.comments" placeholder="Add any additional comments" :rows="3" class="w-full" />
        </PFormField>

        <div class="flex gap-3">
          <PButton type="submit" color="neutral" label="Submit" />
          <PButton type="button" label="Cancel" color="neutral" variant="outline" />
        </div>
      </PForm>
    </PCard>
  </div>
</template>`;

const hasInitialHash = !!location.hash;

if (!hasInitialHash) {
  store.setFiles({
    'src/App.vue': defaultCode,
  }, 'src/App.vue');
}

watchEffect(() => {
  const serialized = store.serialize();
  if (!hasInitialHash && store.getFiles()['App.vue']?.trimEnd() === defaultCode.trimEnd()) {
    if (location.hash) {
      history.replaceState({}, '', location.pathname);
    }
    return;
  }
  history.replaceState({}, '', serialized);
});

const previewOptions = {
  headHTML: [
    '<script>window.__VUE_PROD_DEVTOOLS__=false<\/script>',
    '<link rel="preconnect" href="https://fonts.bunny.net">',
    '<link href="https://fonts.bunny.net/css?family=public-sans:400,500,600,700" rel="stylesheet">',
    '<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"><\/script>',
    '<style type="text/tailwindcss">@theme { --font-sans: \'Public Sans\', sans-serif; }</style>',
    '<style>body { font-family: var(--font-sans); }</style>',
    '<style>#app { isolation: isolate; }</style>',
  ].join(''),
  customCode: {
    importCode: 'import ui, { useToast, useOverlay, defineShortcuts, extractShortcuts } from \'pohon-ui\'\nimport { h } from \'vue\'\nwindow.useToast = useToast\nwindow.useOverlay = useOverlay\nwindow.defineShortcuts = defineShortcuts\nwindow.extractShortcuts = extractShortcuts',
    useCode: 'app.use(ui)\napp.component(\'Placeholder\', { template: \'<div class="relative overflow-hidden rounded-sm border border-dashed border-border-accented opacity-75 px-4 flex items-center justify-center"><svg class="absolute inset-0 size-full stroke-inverted/10" fill="none"><defs><pattern id="placeholder-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" /></pattern></defs><rect stroke="none" fill="url(#placeholder-pattern)" width="100%" height="100%" /></svg><slot /></div>\' })\nconst _Root = app._component\nconst _PApp = app.component(\'PApp\')\nconst _origMount = app.mount\napp.mount = function(el) {\n  const wrapper = _createApp({ render() { return h(_PApp, null, { default: () => h(_Root) }) } })\n  Object.assign(wrapper._context.components, app._context.components)\n  Object.assign(wrapper._context.directives, app._context.directives)\n  Object.assign(wrapper._context.provides, app._context.provides)\n  wrapper.config.errorHandler = e => console.error(e)\n  wrapper.mount(el)\n  window.__app__ = wrapper\n}',
  },
};
</script>

<template>
  <PApp>
    <div class="flex flex-col h-dvh">
      <PHeader
        title="Pohon UI Playground"
        :ui="{ container: 'max-w-none' }"
      >
        <template #left>
          <Logo class="text-highlighted shrink-0 h-6 w-auto" />
        </template>

        <template #right>
          <PColorModeButton />

          <PTooltip text="Open on GitHub">
            <PButton
              color="neutral"
              variant="ghost"
              to="https://github.com/vinicunca/pohon"
              target="_blank"
              icon="i-simple-icons:github"
              aria-label="GitHub"
            />
          </PTooltip>
        </template>
      </PHeader>

      <Repl
        :store="store"
        :editor="CodeMirror"
        :theme="theme"
        preview-theme
        :show-compile-output="false"
        :show-ts-config="false"
        :show-import-map="false"
        :clear-console="false"
        :preview-options="previewOptions"
        class="flex-1"
      />
    </div>
  </PApp>
</template>

<style>
.iframe-container,
.iframe-container iframe {
  background-color: var(--ui-bg) !important;
}

.vue-repl,
.dark .vue-repl {
  --bg: var(--ui-bg);
  --bg-soft: var(--ui-bg-background-muted);
  --border: var(--ui-border);
  --text-light: var(--ui-text-muted);
  --color-branding: var(--ui-primary);
  --color-branding-dark: var(--ui-primary);

  & .file-selector {
    padding-inline: calc(var(--spacing) * 4);

    @media (width >= 40rem) {
      padding-inline: calc(var(--spacing) * 6);
    }

    @media (width >= 64rem) {
      padding-inline: calc(var(--spacing) * 8);
    }
  }

  & .add,
  & .import-map-wrapper,
  & .tab-buttons {
    display: none;
  }

  & .output-container {
    height: 100%;
  }
}

.CodeMirror,
.dark .CodeMirror {
  --base: var(--ui-text);
  --comment: var(--ui-text-dimmed);
  --selected-bg: var(--ui-bg-background-accented);
  --selected-bg-non-focus: var(--ui-bg-background-accented);
}
</style>
