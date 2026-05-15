import { usePage } from '@inertiajs/vue3';

export * from './base';

export function useRoute() {
  const page = usePage();

  return {
    fullPath: page.url,
  };
}

export function useRouter() {

}
