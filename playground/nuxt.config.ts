export default defineNuxtConfig({
  modules: ['../src/module', '@nuxtjs/tailwindcss'],
  imports: {
    autoImport: false
  },
  devtools: {enabled: true},
  compatibilityDate: '2025-09-11',
  basicOptimizer: {
    dropConsole: false,
    nitroCompressPublicAssets: true,
    nitroMinify: true,
    disableUseAsyncDataDeep: true,
    manualChunks: {
      rootComponent: ['nuxt-error-page.vue', 'app.vue']
    },
    activateObserver: true,
    compressHtml: true
  }
});
