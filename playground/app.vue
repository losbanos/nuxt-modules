<script setup lang="ts">
import {onMounted} from 'vue';
import {useRuntimeConfig} from '#app';

onMounted(() => {
  console.log('This is console.log MOUNTED');
  console.log('Run time config = ', useRuntimeConfig().public.basicOptimizer);
});
</script>

<template>
  <div>
    Nuxt module playground!
  </div>
</template>
