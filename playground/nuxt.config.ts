export default defineNuxtConfig({
  modules: ['../src/module'],
  imports: {
    autoImport: false
  },
  devtools: {enabled: true},
  basicOptimizer: {}
});
