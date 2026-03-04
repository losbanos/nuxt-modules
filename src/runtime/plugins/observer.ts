import {defineNuxtPlugin} from '#imports';
      export default defineNuxtPlugin(async (nuxtApp) => {
        const Vue3ObserveVisibility = await import('vue3-observe-visibility').then(m => m.default)
        nuxtApp.vueApp.use(Vue3ObserveVisibility, {})});