import { colors } from '@unocss/preset-wind4/colors';
import { useLocalStorage } from '@vueuse/core';
import { cssVariableDefaults } from '../utils/theme';

function readLocalStorage<T>(key: string, fallback: T): T {
  if (!import.meta.client) {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function useTheme() {
  const appConfig = useAppConfig();
  const colorMode = useColorMode();

  const color = computed(() => colorMode.value === 'dark' ? (colors as any)[appConfig.ui.colors.neutral][900] : 'white');

  const cssVariablesData = useState<{ light?: Record<string, string>; dark?: Record<string, string> }>(
    'pohon-ui-css-variables',
    () => readLocalStorage('pohon-ui-css-variables', {}),
  );
  const customColorsData = useState<Record<string, Record<string, string>>>(
    'pohon-ui-custom-colors',
    () => readLocalStorage('pohon-ui-custom-colors', {}),
  );

  const fontLs = useLocalStorage('pohon-ui-font', 'Public Sans');
  const radiusLs = useLocalStorage('pohon-ui-radius', 0.25);
  const iconSetLs = useLocalStorage('pohon-ui-icons', 'lucide');
  const blackAsPrimaryLs = useLocalStorage('pohon-ui-black-as-primary', false);

  const link = computed(() => {
    const name = fontLs.value;
    if (name === 'Public Sans') {
      return [];
    }
    return [
      {
        rel: 'stylesheet' as const,
        href: `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@400;500;600;700&display=swap`,
        id: `font-${name.toLowerCase().replace(/\s+/g, '-')}`,
      },
    ];
  });

  const cssVariablesStyle = computed(() => {
    const data = cssVariablesData.value;
    const parts: Array<string> = [];
    if (Object.keys(data.light || {}).length) {
      const full = { ...cssVariableDefaults.light, ...data.light };
      parts.push(`.light { ${Object.entries(full).map(([k, v]) => `${k}: ${v};`).join(' ')} }`);
    }
    if (Object.keys(data.dark || {}).length) {
      const full = { ...cssVariableDefaults.dark, ...data.dark };
      parts.push(`.dark { ${Object.entries(full).map(([k, v]) => `${k}: ${v};`).join(' ')} }`);
    }
    return parts.join(' ');
  });

  const radiusStyle = computed(() => `:root { --ui-radius: ${radiusLs.value}rem; }`);
  const blackAsPrimaryStyle = computed(() => blackAsPrimaryLs.value ? ':root { --ui-primary: black; } .dark { --ui-primary: white; }' : ':root {}');
  const fontStyle = computed(() => `:root { --font-sans: '${fontLs.value}', sans-serif; }`);
  const customColorsStyle = computed(() => {
    const entries = Object.entries(customColorsData.value);
    if (!entries.length) {
      return '';
    }
    const vars = entries.flatMap(([name, shades]) =>
      Object.entries(shades).map(([shade, hex]) => `--color-${name}-${shade}: ${hex};`),
    );
    return `:root { ${vars.join(' ')} }`;
  });

  const style = [
    { innerHTML: radiusStyle, id: 'pohon-ui-radius', tagPriority: -2 },
    { innerHTML: blackAsPrimaryStyle, id: 'pohon-ui-black-as-primary', tagPriority: -2 },
    { innerHTML: fontStyle, id: 'pohon-ui-font', tagPriority: -2 },
    { innerHTML: customColorsStyle, id: 'chat-custom-colors', tagPriority: -2 },
    { innerHTML: cssVariablesStyle, id: 'chat-css-variables', tagPriority: -2 },
  ];

  return {
    color,
    link,
    style,
  };
}
