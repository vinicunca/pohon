<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/91ceab67-89ce-4ef4-8678-4402a92baca5">
  <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/51526d6d-e5ec-41b4-aa37-242dec1cdb27">
  <img alt="Pohon UI" width="830" height="436" src="https://github.com/user-attachments/assets/51526d6d-e5ec-41b4-aa37-242dec1cdb27">
</picture>

# Pohon UI

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Pohon UI harnesses the combined strengths of [Akar](https://akar.com/), [UnoCSS](https://unocss.dev/), and [UnoCss Variants](https://vinicunca.dev/unocss-variants) to offer developers an unparalleled set of tools for creating sophisticated, accessible, and highly performant user interfaces.

> [!NOTE]
> You are on the `v4` branch, check out the [v3 branch](https://github.com/vinicunca/pohon/tree/v3) for Pohon UI v3 or [v2 branch](https://github.com/vinicunca/pohon/tree/v2) for Pohon UI v2.

## Documentation

Visit https://pohon.vinicunca.dev to explore the documentation.

## Templates

Kickstart your project with one of our ready-to-use Pohon UI templates or follow the [Installation Guide](https://pohon.vinicunca.dev/getting-started/installation/nuxt). Explore all available templates on the [official templates page](https://pohon.vinicunca.dev/templates).

- [Starter](https://github.com/pohon-ui-templates/starter) — A minimal template to get started with Pohon UI.
- [Landing](https://github.com/pohon-ui-templates/landing) — A modern landing page template powered by Nuxt Content.
- [Docs](https://github.com/pohon-ui-templates/docs) — A documentation template powered by Nuxt Content.
- [SaaS](https://github.com/pohon-ui-templates/saas) — A SaaS template with landing, pricing, docs and blog powered by Nuxt Content.
- [Dashboard](https://github.com/pohon-ui-templates/dashboard) — A dashboard template with multi-column layout.
- [Chat](https://github.com/pohon-ui-templates/chat) — An AI chatbot template with GitHub authentication and persistent chat history powered by Vercel AI SDK.
- [Portfolio](https://github.com/pohon-ui-templates/portfolio) — A sleek portfolio template to showcase your work, skills and blog powered by Nuxt Content.
- [Changelog](https://github.com/pohon-ui-templates/changelog) — A changelog template to display your repository releases notes from GitHub powered by Nuxt MDC.
- [Editor](https://github.com/pohon-ui-templates/editor) — A rich text editor template powered by TipTap with support for markdown, HTML, and JSON content types.

## Installation

```bash [pnpm]
pnpm add pohon-ui tailwindcss
```

```bash [yarn]
yarn add pohon-ui tailwindcss
```

```bash [npm]
npm install pohon-ui tailwindcss
```

```bash [bun]
bun add pohon-ui tailwindcss
```

### Nuxt

1. Add the Pohon UI module in your `nuxt.config.ts`:

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  modules: ['pohon-ui'],
  css: ['~/assets/css/main.css'],
});
```

2. Import UnoCSS and Pohon UI in your CSS:

```css [app/assets/css/main.css]
@import "tailwindcss";
@import "pohon-ui";
```

Learn more in the [installation guide](https://pohon.vinicunca.dev/docs/getting-started/installation/nuxt).

### Vue

1. Add the Pohon UI Vite plugin in your `vite.config.ts`:

```ts [vite.config.ts]
import vue from '@vitejs/plugin-vue';
import ui from 'pohon-ui/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue(), ui()],
});
```

2. Use the Pohon UI Vue plugin in your `main.ts`:

```ts [src/main.ts]
import ui from 'pohon-ui/vue-plugin';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './assets/css/main.css';

const app = createApp(App);

const router = createRouter({
  routes: [],
  history: createWebHistory(),
});

app.use(router);
app.use(ui);

app.mount('#app');
```

3. Import UnoCSS and Pohon UI in your CSS:

```css [src/assets/css/main.css]
@import "tailwindcss";
@import "pohon-ui";
```

Learn more in the [installation guide](https://pohon.vinicunca.dev/docs/getting-started/installation/vue).

## Contribution

Thank you for considering contributing to Pohon UI. Here are a few ways you can get involved:

- Reporting Bugs: If you come across any bugs or issues, please check out the reporting bugs guide to learn how to submit a bug report.
- Suggestions: Have any thoughts to enhance Pohon UI? We'd love to hear them! Check out the [contribution guide](https://pohon.vinicunca.dev/docs/getting-started/contribution) to share your suggestions.

> [!TIP]
> We provide contributing guidelines through [`AGENTS.md`](https://github.com/vinicunca/pohon/blob/main/AGENTS.md) for AI assistants to help you contribute to Pohon UI. It is automatically picked up by all AI coding agents and guides through component structure, theming patterns, testing conventions, and documentation guidelines.

## Local Development

Follow the docs to [set up your local development environment](https://pohon.vinicunca.dev/docs/getting-started/contribution#local-development) and contribute.

## Credits

- [nuxt/nuxt](https://github.com/nuxt/nuxt)
- [nuxt/icon](https://github.com/nuxt/icon)
- [nuxt/fonts](https://github.com/nuxt/fonts)
- [nuxt-modules/color-mode](https://github.com/nuxt-modules/color-mode)
- [unovue/akar](https://github.com/unovue/akar)
- [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss)
- [vueuse/vueuse](https://github.com/vueuse/vueuse)

## License

Licensed under the [MIT license](https://github.com/vinicunca/pohon/blob/main/LICENSE.md).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/pohon-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/pohon-ui
[npm-downloads-src]: https://img.shields.io/npm/dm/pohon-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npm.chart.dev/pohon-ui
[license-src]: https://img.shields.io/github/license/pohon-ui.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://github.com/vinicunca/pohon/blob/main/LICENSE.md
[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt
[nuxt-href]: https://nuxt.com
