import { usePage } from '@inertiajs/vue3';

export * from './base';

export function useRoute() {
  const page = usePage();

  return {
    get fullPath() {
      return page.url;
    },
  };
}

export function useRouter() {

}
