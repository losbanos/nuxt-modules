<script setup lang="ts">
import {ref} from 'vue';
import type {Ref} from 'vue';
import type {ApiResponse, Product, Aggregations} from './types';
import {useFetch} from '#app';

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
  refresh,
  execute: _execute
} = await useFetch<ApiResponse>(url, {
  params,
  headers: {
    'x-nation': 'kr',
    'x-lang': 'ko'
  },
  onRequestError({error}) {
    console.error(error);
  }
});

const products: Ref<Array<Product>> = ref(data.value?.value?.contents || []);
const aggregations: Ref<Aggregations | null> = ref(
  data.value?.value?.aggregations || null
);

const handleRefresh = () => {
  refresh();
};

// 방법 1: 타입 가드와 런타임 가드를 사용한 안전한 정렬
const hasValidProductNo = (
  product: Product
): product is Product & {product_no: number} => {
  return (
    typeof product.product_no === 'number' && !Number.isNaN(product.product_no)
  );
};

const _sortByProductNoSafe = () => {
  const originalLength = products.value.length;
  const validProducts = products.value.filter(hasValidProductNo);

  validProducts.sort((a, b) => a.product_no - b.product_no);
  products.value = validProducts;

  if (validProducts.length !== originalLength) {
    console.warn(
      `정렬에서 ${
        originalLength - validProducts.length
      }개의 유효하지 않은 항목이 제외되었습니다.`
    );
  }
};

// 방법 2: 간단한 런타임 가드 (기본값 사용)
const sortByProductNo = () => {
  products.value.sort((a, b) => {
    // 런타임 가드: product_no가 유효하지 않으면 기본값 0 사용
    const aProductNo =
      typeof a.product_no === 'number' && !Number.isNaN(a.product_no)
        ? a.product_no
        : 0;
    const bProductNo =
      typeof b.product_no === 'number' && !Number.isNaN(b.product_no)
        ? b.product_no
        : 0;

    return aProductNo - bProductNo;
  });
};
</script>

<template>
  <div>
    <button class="button border-2 border-solid mr-2" @click="handleRefresh">
      Refresh
    </button>
    <button class="button border-2 border-solid" @click="sortByProductNo()">
      Sort by Product No
    </button>
  </div>
  <div class="flex flex-col gap-16">
    <div
      v-for="content in products"
      :key="content.product_no"
      class="inds-category-a-type-item"
    >
      <div
        class="relative mr-12 w-68 shrink-0 self-start overflow-hidden rounded-lg md:mr-20 md:w-[12.6rem]"
      >
        <div class="relative w-full pt-[10%]" />
        <img
          loading="lazy"
          :src="content.title_image_square"
          :alt="content.product_name"
          class="inds-category-a-type-img"
        />
        <!---->
      </div>
      <div class="flex h-[inherit] flex-1 items-center">
        <div class="flex-1">
          <!---->
          <p class="inds-category-a-type-subject">
            {{ content.product_name }}
          </p>
          <p
            class="mt-4 hidden break-all text-sm leading-md text-on-surface-elevation-3 md:line-clamp-1"
          >
            {{ content.short_piece }}
            꾸리세요. 정착지의 가족들은 물품을 소유하고, 자신의 상점을 운영하며,
            시장에서 다른 주민들과 거래할 것입니다. 당신은 영토를 관리하고, 집을
            짓고, 행사를 조직하고, 세금을 결정하고, 공급과 수요의 균형을 맞추는
            동시에 정치도 벌일 수 있습니다!
          </p>
          <div class="inds-category-a-type-type">
            <span
              v-for="genre in content.genres"
              :key="genre.tag_no"
              class="inds-category-a-type-type-item"
            >
              {{ genre.tag_name }}
            </span>
            <span class="inds-category-a-type-type-item"> 시뮬레이션 </span>
          </div>
          <div class="mt-12 hidden items-center md:flex">
            <span
              class="relative inline-flex items-center text-xs font-medium leading-xs text-on-surface-elevation-2 before:mx-8 before:h-[1rem] before:w-[.1rem] before:bg-inverse-elevation-2 first:before:content-none"
            >
              리뷰 {{ content.review_count }}
            </span>
            <span
              class="relative inline-flex items-center text-xs font-medium leading-xs text-on-surface-elevation-2 before:mx-8 before:h-[1rem] before:w-[.1rem] before:bg-inverse-elevation-2 first:before:content-none"
            >
              추천 {{ content.evaluation.recommend_count }}
            </span>
          </div>
        </div>
        <div class="inds-category-a-type-price-group md:ml-40">
          <i class="inds-category-a-type-sale">
            -{{ content.amount.discount_rate }}%
          </i>
          <div>
            <p class="inds-category-a-type-price-original">
              ₩ {{ content.amount.original_price }}
            </p>
            <p class="inds-category-a-type-price">
              ₩ {{ content.amount.sales_price }}
            </p>
          </div>
        </div>
      </div>
      <a
        :href="`/ko/games/${content.product_no}`"
        class="inds-category-a-type-link"
      />
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
  font-family: stds-font-kr, 'system-ui', -apple-system, BlinkMacSystemFont,
    Segoe UI, Helvetica, Arial, 'sans-serif', Apple Color Emoji, Segoe UI Emoji;
}
</style>
