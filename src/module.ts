import {defineNuxtModule, createResolver, addPlugin} from '@nuxt/kit';
import type {Nuxt, NuxtOptions, ViteConfig} from 'nuxt/schema';
import type {NitroConfig} from 'nitropack';
import {defu} from 'defu';

// Module options TypeScript interface definition
export interface ModuleOptions {
  dropConsole: boolean;
  nitroCompressPublicAssets: boolean;
  nitroMinify: boolean;
  disableUseAsyncDataDeep: boolean;
  manualChunks: {
    [key: string]: Array<string>;
  };
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
    disableUseAsyncDataDeep: false,
    manualChunks: {}
  },
  hooks: {
    'nitro:config': (nitroConfig: NitroConfig) => {
      const {resolve} = createResolver(import.meta.url);
      nitroConfig.publicAssets ||= [];
      nitroConfig.publicAssets.push({
        dir: resolve('./runtime/images'),
        maxAge: 60 * 60 * 24 * 365
      });
      console.log(resolve('./runtime/images'));
    }
  },
  setup(options: ModuleOptions, nuxt: Nuxt) {
    const nuxtOptions: NuxtOptions = nuxt.options;

    const moduleOptions = defu(
      nuxtOptions.runtimeConfig.public.basicOptimizer || {}, {
        ...options
      });

    nuxtOptions.runtimeConfig.public.basicOptimizer = moduleOptions;

    if (moduleOptions.dropConsole) {
      nuxt.hook('vite:extendConfig', (viteConfig, _env) => {
        viteConfig.esbuild ||= {};
        viteConfig.esbuild.pure ||= [];
        viteConfig.esbuild.pure.push('console.log');
      });
    }

    nuxt.hook('vite:extendConfig', (viteConfig: ViteConfig, {isClient}) => {
      if (moduleOptions.dropConsole) {
        viteConfig.esbuild ||= {};
        viteConfig.esbuild.pure ||= [];
        viteConfig.esbuild.pure.push('console.log');
      }

      const chunks = Object.entries(moduleOptions.manualChunks ?? {}) as [string, Array<string>][];
      if (!chunks.length || !isClient || process.env.NODE_ENV !== 'production') return;

      // @ts-expect-error - viteConfig.build.rollupOptions.output is not typed in vite config
      viteConfig.build.rollupOptions.output.manualChunks = (id: string) => {
        for (const [chunkName, chunkIds] of chunks) {
          for (const chunkId of chunkIds) {
            if (id.includes(chunkId)) {
              return chunkName;
            }
          }
        }
      };
    });

    nuxt.hook('nitro:config', (nitroConfig: NitroConfig) => {
      nitroConfig.compressPublicAssets = moduleOptions.nitroCompressPublicAssets;
      nitroConfig.minify = moduleOptions.nitroMinify;
    });
    nuxtOptions.experimental.defaults.useAsyncData.deep = !moduleOptions.disableUseAsyncDataDeep;

    const fontLinks: Array<{rel: string; href: string; crossorigin?: '' | 'anonymous' | 'use-credentials';}> = [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap'
      }
    ];
    fontLinks.forEach((link) => {
      nuxtOptions.app.head.link?.push(link);
    });
    const {resolve} = createResolver(import.meta.url);
    // nuxtOptions.css.push(resolve('./runtime/css/roboto.css'));

    addPlugin({src: resolve('./runtime/plugins/plugin')});
  }
});
