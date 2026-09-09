---
title: ProseAccordion
description: "Create expandable content sections for better information organization."
category: components
navigation.title: Accordion
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/vinicunca/pohon/blob/v4/src/runtime/components/prose/Accordion.vue
---

## Usage

Use the `accordion` and `accordion-item` components to display an [Accordion](/docs/components/accordion) in your content.

::code-preview{class="[&>div]:*:my-0"}

:::accordion
---

defaultValue:

- '1'

---

::accordion-item{label="Is Pohon free to use?" icon="i-lucide-circle-help"}
Yes! Pohon is completely free and open source under the MIT license. All 125+ components are available to everyone.
::

::accordion-item{label="Can I use Pohon with Vue without Nuxt?" icon="i-lucide-circle-help"}
Yes! While optimized for Nuxt, Pohon works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.
::

::accordion-item{label="Is Pohon production-ready?" icon="i-lucide-circle-help"}
Yes! Pohon is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.
::

:::

#code

```mdc
::accordion
---
defaultValue:
  - '1'
---

::accordion-item{label="Is Pohon free to use?" icon="i-lucide-circle-help"}
Yes! Pohon is completely free and open source under the MIT license. All 125+ components are available to everyone.
::

::accordion-item{label="Can I use Pohon with Vue without Nuxt?" icon="i-lucide-circle-help"}
Yes! While optimized for Nuxt, Pohon works perfectly with standalone Vue projects via our Vite plugin. You can follow the [installation guide](/docs/getting-started/installation/vue) to get started.
::

::accordion-item{label="Is Pohon production-ready?" icon="i-lucide-circle-help"}
Yes! Pohon is used in production by thousands of applications with extensive tests, regular updates, and active maintenance.
::

::
```

::

## API

### Props

:component-props{prose}

### Slots

:component-slots{prose}

## Theme

::component-theme{prose}
---

extra:

- accordionItem

---

::

## Changelog

:component-changelog{prefix="prose"}
