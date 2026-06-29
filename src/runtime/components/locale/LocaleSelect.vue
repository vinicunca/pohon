<script lang="ts">
import type { Locale } from '../../types/locale';
import type { SelectMenuProps } from '../SelectMenu.vue';

export interface LocaleSelectProps extends Omit<SelectMenuProps<Array<Locale<any>>, 'code', false>, 'items' | 'modelValue'> {
  locales?: Array<Locale<any>>;
}
</script>

<script setup lang="ts">
import { reactiveOmit } from '@vueuse/core';
import { useForwardProps } from 'akar';
import PSelectMenu from '../SelectMenu.vue';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<LocaleSelectProps>(),
  {
    searchInput: false,
    valueKey: 'code',
    labelKey: 'name',
  },
);

const selectMenuProps = useForwardProps(reactiveOmit(props, 'locales'));

const modelValue = defineModel<string>({ required: true });

function getEmojiFlag(locale: string): string {
  const languageToCountry: Record<string, string> = {
    ar: 'sa', // Arabic -> Saudi Arabia
    bn: 'bd', // Bengali -> Bangladesh
    ca: 'es', // Catalan -> Spain
    ckb: 'iq', // Central Kurdish -> Iraq
    cs: 'cz', // Czech -> Czech Republic (note: modern country code is actually 'cz')
    da: 'dk', // Danish -> Denmark
    el: 'gr', // Greek -> Greece
    en: 'us', // English -> United States (default)
    et: 'ee', // Estonian -> Estonia
    gl: 'es', // Galician -> Spain
    he: 'il', // Hebrew -> Israel
    hi: 'in', // Hindi -> India
    hy: 'am', // Armenian -> Armenia
    ja: 'jp', // Japanese -> Japan
    ka: 'ge', // Georgian -> Georgia
    kk: 'kz', // Kazakh -> Kazakhstan
    km: 'kh', // Khmer -> Cambodia
    ko: 'kr', // Korean -> South Korea
    ky: 'kg', // Kyrgyz -> Kyrgyzstan
    lb: 'lu', // Luxembourgish -> Luxembourg
    ms: 'my', // Malay -> Malaysia
    nb: 'no', // Norwegian Bokmål -> Norway
    sl: 'si', // Slovenian -> Slovenia
    sq: 'al', // Albanian -> Albania
    sv: 'se', // Swedish -> Sweden
    uk: 'ua', // Ukrainian -> Ukraine
    ur: 'pk', // Urdu -> Pakistan
    vi: 'vn', // Vietnamese -> Vietnam
  };

  // If locale has a country code (e.g., en-GB), extract and use it
  if (locale.includes('-')) {
    const countryCode = locale.split('-')[1]?.toLowerCase();
    if (countryCode) {
      return countryCode.toUpperCase()
        .split('')
        .map((char) => String.fromCodePoint(0x1F1A5 + char.charCodeAt(0)))
        .join('');
    }
  }

  // Otherwise, use the language-to-country mapping
  const baseLanguage = locale.split('-')[0]?.toLowerCase() || locale;
  const countryCode = languageToCountry[baseLanguage] || locale.slice(0, 2);

  return countryCode.toUpperCase()
    .split('')
    .map((char) => String.fromCodePoint(0x1F1A5 + char.charCodeAt(0)))
    .join('');
}
</script>

<template>
  <PSelectMenu
    v-model="modelValue"
    v-bind="{ ...selectMenuProps, ...$attrs }"
    :items="locales"
  >
    <template #leading>
      <span v-if="modelValue" class="text-center size-5">
        {{ getEmojiFlag(modelValue) }}
      </span>
    </template>

    <template #item-leading="{ item }">
      <span class="text-center size-5">
        {{ getEmojiFlag(item.code) }}
      </span>
    </template>
  </PSelectMenu>
</template>
