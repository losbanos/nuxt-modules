import {defineNuxtModule} from '@nuxt/kit';
import type {Nuxt, NuxtOptions} from 'nuxt/schema';

// Module options TypeScript interface definition
export interface ModuleOptions {
  dropConsole: boolean;
  nitroCompressPublicAssets: boolean;
  nitroMinify: boolean;
  disableUseAsyncDataDeep: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-basic-optimizer',
    configKey: 'basicOptimizer'
  },
  // Default configuration options of the Nuxt module
  defaults: {
    dropConsole: true,
    nitroCompressPublicAssets: true,
    nitroMinify: true,
    disableUseAsyncDataDeep: false
  },
  setup(options: ModuleOptions, nuxt: Nuxt) {
    const nuxtOptions: NuxtOptions = nuxt.options;

    if (options.dropConsole) {
      nuxtOptions.vite.esbuild ||= {};
      nuxtOptions.vite.esbuild.pure ||= [];
      nuxtOptions.vite.esbuild.pure.push('console.log');
    }

    nuxtOptions.nitro.compressPublicAssets = options.nitroCompressPublicAssets;
    nuxtOptions.nitro.minify = options.nitroMinify;
    nuxtOptions.experimental.defaults.useAsyncData.deep = options.disableUseAsyncDataDeep;
  }
});
