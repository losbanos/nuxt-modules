import Vue3ObserveVisibility from 'vue3-observe-visibility';
import type {NuxtApp} from 'nuxt/app';
import {defineNuxtPlugin} from '#imports';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  console.log('Nuxt plugin added by module');
  nuxtApp.vueApp.use(Vue3ObserveVisibility, {});
});
