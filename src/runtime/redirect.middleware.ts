import {defineNuxtRouteMiddleware, navigateTo} from '#imports';

export default defineNuxtRouteMiddleware((to, _from) => {
  if (to.path.includes('/old-course-page')) {
    return navigateTo(
      '/course/1'
    );
  }
});
