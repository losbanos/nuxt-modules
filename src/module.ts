import {defineNuxtModule} from '@nuxt/kit';
import type {Nuxt, NuxtOptions} from 'nuxt/schema';
import {defu} from 'defu';

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
    
    if (moduleOptions.dropConsole) {
      nuxt.hook('vite:extendConfig', (viteConfig, env) => {
        viteConfig.esbuild ||= {};
        viteConfig.esbuild.pure ||= [];
        viteConfig.esbuild.pure.push('console.log');
      });
    }
    nuxt.hook('nitro:config', (nitroConfig) => {
      nitroConfig.compressPublicAssets = moduleOptions.nitroCompressPublicAssets;
      nitroConfig.minify = moduleOptions.nitroMinify;
    });

    nuxtOptions.experimental.defaults.useAsyncData.deep = moduleOptions.disableUseAsyncDataDeep;
  }
});
