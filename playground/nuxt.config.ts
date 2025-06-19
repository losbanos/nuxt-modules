export default defineNuxtConfig({
  modules: ['../src/module'],
  imports: {
    autoImport: false
  },
  devtools: {enabled: true},
  runtimeConfig: {
    public: {
      basicOptimizer: {
        dropConsole: true,
        nitroCompressPublicAssets: true,
        nitroMinify: true,
        disableUseAsyncDataDeep: true
      }
    }
  }
});
