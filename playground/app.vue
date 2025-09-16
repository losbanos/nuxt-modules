<script setup lang="ts">
import {ref} from 'vue';
import type {Ref} from 'vue';
import {useFetch} from '#app';

// interface QuoteType {
//   dateAdded: string;
//   content: string;
//   author: string;
//   _id: string;
// }

// function refreshQuotes() {

// }
const url: string = 'https://api.onstove.com/store/v1.0/products/search';
const params = {
  q: '',
  currency_code: 'KRW',
  page: 1,
  size: 36,
  direction: 'SCORE',
  'rating.board': 'GRAC',
  tag_aggregation_size: 6,
  genre_aggregation_size: 6,
  on_discount: false
};
const {
  data,
  refresh: _refresh,
  execute: _execute
} = await useFetch<Array<unknown>>(url, {
  params,
  headers: {
    'x-nation': 'kr',
    'x-lang': 'ko'
  },
  onRequestError({error}) {
    console.error(error);
  }
});
const quotes: Ref<Array<unknown>> = ref(data.value || ([] as Array<unknown>));
console.log('quotes = ', quotes.value);
// const sortOrder: Ref<string> = ref('desc');

// const toggleSortOrder = () => {
//   sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc';
// };
// const sortedQuotes: Ref<Array<QuoteType>> = computed(() => {
//   return [...quotes.value].sort((a, b) =>
//     sortOrder.value === 'desc'
//       ? new Date(b.dateAdded).getDate() - new Date(a.dateAdded).getDate()
//       : new Date(a.dateAdded).getDate() - new Date(b.dateAdded).getDate()
//   );
// });
</script>

<template>
  <div class="flex flex-col gap-16 md:gap-20">
    <div class="inds-category-a-type-item">
      <div
        class="relative mr-12 w-68 shrink-0 self-start overflow-hidden rounded-lg md:mr-20 md:w-[12.6rem]"
      >
        <div class="relative w-full pt-[100%]" />
        <img
          loading="lazy"
          src="https://d2x8kymwjom7h7.cloudfront.net/live/application_no/119001/images/3685_LORDS_IND_0.jpg"
          alt=""
          class="inds-category-a-type-img"
        />
        <!---->
      </div>
      <div class="flex h-[inherit] flex-1 items-center">
        <div class="flex-1">
          <!---->
          <p class="inds-category-a-type-subject">로드 앤 빌레인</p>
          <p
            class="mt-4 hidden break-all text-sm leading-md text-on-surface-elevation-3 md:line-clamp-1"
          >
            이 독특한 봉건 시대의 경제 시뮬레이션을 통해 풍족한 정착지를
            꾸리세요. 정착지의 가족들은 물품을 소유하고, 자신의 상점을 운영하며,
            시장에서 다른 주민들과 거래할 것입니다. 당신은 영토를 관리하고, 집을
            짓고, 행사를 조직하고, 세금을 결정하고, 공급과 수요의 균형을 맞추는
            동시에 정치도 벌일 수 있습니다!
          </p>
          <div class="inds-category-a-type-type">
            <span class="inds-category-a-type-type-item"> 전략 </span>
            <span class="inds-category-a-type-type-item"> 시뮬레이션 </span>
          </div>
          <div class="mt-12 hidden items-center md:flex">
            <span
              class="relative inline-flex items-center text-xs font-medium leading-xs text-on-surface-elevation-2 before:mx-8 before:h-[1rem] before:w-[.1rem] before:bg-inverse-elevation-2 first:before:content-none"
            >
              리뷰 18
            </span>
            <span
              class="relative inline-flex items-center text-xs font-medium leading-xs text-on-surface-elevation-2 before:mx-8 before:h-[1rem] before:w-[.1rem] before:bg-inverse-elevation-2 first:before:content-none"
            >
              추천 8
            </span>
          </div>
        </div>
        <div class="inds-category-a-type-price-group md:ml-40">
          <i class="inds-category-a-type-sale"> -75% </i>
          <div>
            <p class="inds-category-a-type-price-original">₩ 27,000</p>
            <p class="inds-category-a-type-price">₩ 6,750</p>
          </div>
        </div>
      </div>
      <a href="/ko/games/3685" class="inds-category-a-type-link" />
    </div>
  </div>
</template>

<style>
.inds-category-a-type-item {
  display: flex;
  position: relative;
}
.inds-page-background-image + .inds-visual-title-component,
.inds-visual-title-component:first-child {
  margin-top: -9.6rem;
}
:lang(ko) a,
:lang(ko) body,
:lang(ko) button,
:lang(ko) input,
:lang(ko) textarea {
  font-family:
    stds-font-kr,
    'system-ui',
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Helvetica,
    Arial,
    'sans-serif',
    Apple Color Emoji,
    Segoe UI Emoji;
}
</style>
