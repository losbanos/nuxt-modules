<script setup lang="ts">
import {onMounted, ref, computed} from 'vue';
import type {Ref} from 'vue';
import {useFetch, useRuntimeConfig} from '#app';

interface QuoteType {
  dateAdded: string;
  content: string;
  author: string;
  _id: string;
}
const loadMoreQuotes: Ref<boolean> = ref(false);

function refreshQuotes() {

}

const {data, refresh, execute} = await useFetch<Array<QuoteType>>(
  'https://api.quotable.io/quotes/random?limit=10',
  {
    deep: false,
    onRequestError({error}) {
      console.error(error);
    }
  }
);
const quotes: Ref<Array<QuoteType>> = ref(data.value || []);
const sortOrder: Ref<string> = ref('desc');

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc';
};

const sortedQuotes: Ref<Array<QuoteType>> = computed(() => {
  return [...quotes.value].sort((a, b) =>
    sortOrder.value === 'desc'
      ? new Date(b.dateAdded).getDate() - new Date(a.dateAdded).getDate()
      : new Date(a.dateAdded).getDate() - new Date(b.dateAdded).getDate()
  );
});
</script>

<template>
  <div class="container">
    <figure>
      <img
        src="/vueschool-logo.png"
        alt="VueSchool Logo"
      >
    </figure>
    <h1>Random Wise Quotes</h1>

    <button @click="toggleSortOrder">
      Sort By Date ({{ sortOrder.toUpperCase() }})
    </button>
    <button
      :disabled="!quotes.length"
      @click="refreshQuotes"
    >
      Refresh Quotes
    </button>

    <TransitionGroup
      name="list"
      tag="ul"
    >
      <li v-for="quote in sortedQuotes" :key="quote._id" >
        <span>{{ quote.dateAdded }}</span>
        <blockquote>
          <p>{{ quote.content }}</p>
          <cite>- {{ quote.author }}</cite>
        </blockquote>
      </li>
    </TransitionGroup>
  </div>

  <div
    v-observe-visibility="loadMoreQuotes"
    class="footer"
  >
    <p>May the force be with you</p>
  </div>
</template>
