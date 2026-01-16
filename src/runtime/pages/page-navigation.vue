<template>
  <div>This is dynamic created {{ pages }}</div>
</template>

<script setup>
import {useRoute, ref} from '#imports';

const pages = ref(useRoute().params.page);
</script>
