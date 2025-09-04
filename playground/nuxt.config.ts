export default defineNuxtConfig({
  modules: ['../src/module'],
  imports: {
    autoImport: false
  },
  devtools: {enabled: true},
  basicOptimizer: {
    dropConsole: true,
    nitroCompressPublicAssets: true,
    nitroMinify: true,
    disableUseAsyncDataDeep: true,
    manualChunks: {
      rootComponent: ['nuxt-error-page.vue', 'app.vue']
    }
  }
});
