import {useCompression} from 'h3-compression';
import {defineNitroPlugin} from 'nitropack/runtime';
import {getRequestURL} from 'h3';

export default defineNitroPlugin((nitro) => {
  nitro.hooks.hook('render:response', async (response, {event}) => {
    // Skip internal nuxt routes (e.g. error page)
    if (['/_nuxt', '/__nuxt'].some(prefix => getRequestURL(event).pathname.startsWith(prefix)))
      return;

    if (!response.headers?.['content-type']?.startsWith('text/html'))
      return;

    await useCompression(event, response);
  });
});
