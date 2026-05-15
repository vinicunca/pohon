<script setup lang="ts">
import theme from '#build/ui/button';

const colors = Object.keys(theme.variants.color);
const variants = Object.keys(theme.variants.variant);
const sizes = Object.keys(theme.variants.size);

const color = ref<keyof typeof theme.variants.color>('warning');
const variant = ref<keyof typeof theme.variants.variant>('soft');
const size = ref<keyof typeof theme.variants.size>('lg');

const checkbox = ref<boolean>(false);
const radio = ref<string>('1');
const select = ref<string>('');
const input = ref<string>('');
const radioItems = ['1', '2', '3'];
const selectItems = ['Apple', 'Banana', 'Cherry'];
</script>

<template>
  <Navbar>
    <PSelect
      v-model="color"
      :items="colors"
    />
    <PSelect
      v-model="variant"
      :items="variants"
    />
    <PSelect
      v-model="size"
      :items="sizes"
    />
  </Navbar>

  <div class="flex flex-col gap-8">
    <!-- Per-component prop defaults via :props -->
    <div class="flex flex-col gap-2">
      <p class="text-sm color-text-muted font-medium">
        <code>:props={{ `{ button: { color: '${color}', variant: '${variant}', size: '${size}' } }` }}</code>
      </p>

      <PTheme :props="{ button: { color, variant, size } }">
        <div class="flex gap-2 items-center">
          <PButton label="Themed" />
          <PButton
            label="Themed with icon"
            icon="i-lucide-rocket"
          />
          <PButton
            label="Themed square"
            icon="i-lucide-star"
            square
          />
        </div>
      </PTheme>
    </div>

    <!-- Explicit prop overrides theme -->
    <div class="flex flex-col gap-2">
      <p class="text-sm color-text-muted font-medium">
        Explicit props win over <code>:props</code>
      </p>

      <PTheme :props="{ button: { color, variant, size } }">
        <div class="flex gap-2 items-center">
          <PButton label="Theme only" />
          <PButton
            label="color=primary"
            color="primary"
          />
          <PButton
            label="variant=solid"
            variant="solid"
          />
          <PButton
            label="size=xs"
            size="xs"
          />
        </div>
      </PTheme>
    </div>

    <!-- :ui (slot classes) + :props (prop defaults) together -->
    <div class="flex flex-col gap-2">
      <p class="text-sm color-text-muted font-medium">
        <code>:ui</code> slot classes + <code>:props</code> prop defaults together
      </p>

      <PTheme
        :props="{ button: { color, variant } }"
        :ui="{ button: { base: 'font-bold rounded-full' } }"
      >
        <div class="flex gap-2 items-center">
          <PButton label="Styled + themed" />
          <PButton
            label="With icon"
            icon="i-lucide-zap"
          />
        </div>
      </PTheme>
    </div>

    <!-- Nested PTheme: inner overrides bleed in, other components inherit from outer -->
    <div class="flex flex-col gap-2">
      <p class="text-sm color-text-muted font-medium">
        Nested <code>&lt;PTheme&gt;</code>: outer sets tooltip globally, inner only overrides button — both compose
      </p>

      <PTheme :props="{ button: { color, variant, size }, tooltip: { delayDuration: 0, arrow: true } }">
        <div class="flex gap-2 items-center">
          <PTooltip text="Outer tooltip (instant + arrow)">
            <PButton label="Outer" />
          </PTooltip>
          <PTheme :props="{ button: { color: 'success' } }">
            <PTooltip text="Inner tooltip still inherits delay + arrow">
              <PButton label="color=success (inner)" />
            </PTooltip>
          </PTheme>
          <PTooltip text="Outer tooltip again">
            <PButton label="Outer again" />
          </PTooltip>
        </div>
      </PTheme>
    </div>

    <!-- :props on form components (with and without PFormField wrapping) -->
    <div class="flex flex-col gap-2">
      <p class="text-sm color-text-muted font-medium">
        <code>:props</code> flows into every form component (with or without <code>&lt;PFormField&gt;</code>)
      </p>

      <PTheme :props="{ input: { size, color }, pinInput: { size, color }, checkbox: { size, color }, switch: { size, color }, radioGroup: { color, orientation: 'horizontal' }, select: { color, variant: 'subtle' } }">
        <div class="flex flex-col gap-4">
          <div class="flex gap-4 items-center">
            <PInput
              v-model="input"
              placeholder="Bare input"
            />
            <PPinInput :length="3" />
            <PCheckbox
              v-model="checkbox"
              label="Bare checkbox"
            />
            <PSwitch label="Bare switch" />
          </div>
          <div class="flex gap-6 items-center">
            <PRadioGroup
              v-model="radio"
              :items="radioItems"
            />
            <PSelect
              v-model="select"
              :items="selectItems"
              placeholder="Themed select"
            />
          </div>
        </div>
      </PTheme>
    </div>

    <!-- Closer context wins: PFormField/FieldGroup beats :props; error beats both -->
    <div class="flex flex-col gap-2">
      <p class="text-sm color-text-muted font-medium">
        Closer context wins: <code>&lt;PFormField size="xl"&gt;</code> beats <code>:props</code>; validation error forces <code>error</code> color
      </p>

      <PTheme :props="{ input: { size, color } }">
        <div class="flex flex-col gap-3">
          <PFormField label="Bare (theme size applies)">
            <PInput
              v-model="input"
              placeholder="theme size"
            />
          </PFormField>
          <PFormField
            label="FormField size=xl wins"
            size="xl"
          >
            <PInput
              v-model="input"
              placeholder="formfield size"
            />
          </PFormField>
          <PFormField
            label="With error: error color wins"
            error="Required"
          >
            <PInput
              v-model="input"
              placeholder="error color"
            />
          </PFormField>
        </div>
      </PTheme>
    </div>

    <!-- Baseline: bare components must keep Akar primitives' own defaults -->
    <div class="flex flex-col gap-2">
      <p class="text-sm color-text-muted font-medium">
        Without <code>&lt;PTheme&gt;</code> (baseline) — bare Tooltip uses Akar's default delay and has no arrow; bare Checkbox matches unstyled defaults
      </p>

      <div class="flex gap-4 items-center">
        <PButton label="Default" />
        <PButton
          label="Default with icon"
          icon="i-lucide-rocket"
        />
        <PTooltip text="Default delay, no arrow">
          <PButton
            label="Hover (baseline)"
            variant="outline"
          />
        </PTooltip>
        <PCheckbox label="Bare checkbox" />
      </div>
    </div>
  </div>
</template>
