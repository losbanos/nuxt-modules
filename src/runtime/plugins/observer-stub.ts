import type {NuxtApp} from 'nuxt/app';
import {defineNuxtPlugin} from '#imports';

export default defineNuxtPlugin((nuxtApp: NuxtApp) => {
  nuxtApp.vueApp.directive('observe-visibility', {});
});
