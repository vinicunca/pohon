import type { ModuleOptions } from '../../module';

export default (options: Required<ModuleOptions>) => ({
  base: ['color-primary border-b border-transparent hover:border-primary font-500 rounded-xs outline-primary/25 focus-visible:outline-3 focus-visible:has-[>code]:outline-0 [&>code]:border-dashed [&>code]:outline-primary/25 focus-visible:[&>code]:outline-3 hover:[&>code]:border-primary hover:[&>code]:color-primary focus-visible:[&>code]:border-primary focus-visible:[&>code]:color-primary', options.theme.transitions && 'transition-colors [&>code]:transition-colors'],
});
