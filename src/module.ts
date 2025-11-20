import {
  defineNuxtModule,
  createResolver,
  addPlugin,
  addPluginTemplate,
  addComponent,
  addComponentsDir
} from '@nuxt/kit';
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
  activateObserver: boolean;
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
    manualChunks: {},
    activateObserver: false
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
      nuxtOptions.runtimeConfig.public.basicOptimizer || {},
      {
        ...options
      }
    );

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

      const chunks = Object.entries(moduleOptions.manualChunks ?? {}) as [
        string,
        Array<string>
      ][];
      if (!chunks.length || !isClient || process.env.NODE_ENV !== 'production')
        return;

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
      nitroConfig.compressPublicAssets
        = moduleOptions.nitroCompressPublicAssets;
      nitroConfig.minify = moduleOptions.nitroMinify;
    });
    nuxtOptions.experimental.defaults.useAsyncData.deep
      = !moduleOptions.disableUseAsyncDataDeep;

    const fontLinks: Array<{
      rel: string;
      href: string;
      crossorigin?: '' | 'anonymous' | 'use-credentials';
    }> = [
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
    const clientPlugin = moduleOptions.activateObserver
      ? `import {defineNuxtPlugin} from '#imports';
      export default defineNuxtPlugin(async (nuxtApp) => {
        const Vue3ObserveVisibility = await import('vue3-observe-visibility').then(m => m.default)
        nuxtApp.vueApp.use(Vue3ObserveVisibility, {})`
      : `import {defineNuxtPlugin} from '#imports';
      export default defineNuxtPlugin((nuxtApp) => {
      nuxtApp.vueApp.directive('observe-visibility', {});});`;

    const {resolve} = createResolver(import.meta.url);

    addPluginTemplate({
      getContents: () => clientPlugin,
      mode: 'client',
      filename: 'observer.mjs',
      options: {
        activate: moduleOptions.activateObserver
      },
      dst: resolve('./runtime/plugins/observer.ts'),
      write: true
    });
    addPlugin({
      src: resolve('./runtime/plugins/observer-stub'),
      mode: 'server'
    });
    addComponent({
      filePath: resolve('runtime/components/CardColored.vue'),
      name: 'CardColored',
      export: 'default'
    });
    // addComponentsDir({
    //   path: resolve('runtime/components'),
    //   prefix: 'Card'
    // });
  }
});
