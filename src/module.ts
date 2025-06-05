import {defineNuxtModule, addPlugin, createResolver} from '@nuxt/kit';
import type {Nuxt} from 'nuxt/schema';

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 't-optimizer',
    configKey: 'tOptimizer'
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options: ModuleOptions, nuxt: Nuxt) {
    const resolver = createResolver(import.meta.url);

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'));
    const links = [
      {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
      {rel: 'preconnect', href: 'https://fonts.gstatic.com'},
      {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'}
    ];
    nuxt.options.app.head.link?.push(...links);
  }
});
