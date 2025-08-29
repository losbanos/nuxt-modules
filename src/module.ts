import {defineNuxtModule} from '@nuxt/kit';
import type {Nuxt, NuxtOptions} from 'nuxt/schema';
import type {NitroConfig} from 'nitropack';
import {defu} from 'defu';
import type {ViteConfig} from 'nuxt/schema';

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

    const moduleOptions = defu(
      nuxtOptions.runtimeConfig.public.basicOptimizer || {}, {
      ...options
    });

    nuxtOptions.runtimeConfig.public.basicOptimizer = moduleOptions;
    nuxt.hook('vite:extendConfig', (viteConfig: ViteConfig) => {
      if (moduleOptions.dropConsole) {
        viteConfig.esbuild ||= {};
        viteConfig.esbuild.pure ||= [];
        viteConfig.esbuild.pure.push('console.log');
      }
    });
    nuxt.hook('nitro:config', (nitroConfig: NitroConfig) => {
      nitroConfig.compressPublicAssets = moduleOptions.nitroCompressPublicAssets;
      nitroConfig.minify = moduleOptions.nitroMinify;
    });
    nuxtOptions.experimental.defaults.useAsyncData.deep = !moduleOptions.disableUseAsyncDataDeep;
  }
});
