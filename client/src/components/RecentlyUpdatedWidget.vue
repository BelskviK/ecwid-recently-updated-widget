<template>
  <div v-if="visible" class="ec-gallery ec-gallery--wide ec-mt-2">
    <!-- header -->
    <div
      class="ec-gallery__header ec-mb-1 ec-flex ec-justify-between ec-items-center"
    >
      <h3 class="ec-text-h4">Recently updated products</h3>

      <!-- dropdown -->
      <select class="ec-select" v-model.number="count">
        <option v-for="n in [3, 6, 9, 12]" :key="n" :value="n">{{ n }}</option>
      </select>
    </div>

    <!-- products -->
    <div class="ec-gallery__list">
      <div
        v-for="product in products"
        :key="product.id"
        class="ec-card ec-gallery__item"
      >
        <img
          :src="product.thumbnailUrl"
          :alt="product.name"
          class="ec-gallery__image"
          @click="openProduct(product)"
        />

        <h4 class="ec-card__title ec-mt-1" @click="openProduct(product)">
          {{ product.name }}
        </h4>

        <p class="ec-card__price ec-mb-1">
          {{ formatPrice(product.price, product.currency) }}
        </p>

        <button
          class="ec-btn ec-btn--primary ec-btn--fluid"
          @click="addToCart(product)"
        >
          Buy now
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* ——— same script section you already have ——— */
import { ref, watch, onMounted } from "vue";
import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  thumbnailUrl: string;
}

const visible = ref(false);
const count = ref<number>(Number(localStorage.getItem("ru-count")) || 6);
const products = ref<Product[]>([]);

watch(count, () => {
  localStorage.setItem("ru-count", String(count.value));
  loadProducts();
});

onMounted(() => {
  if (window.Ecwid?.initialized) {
    ecwidPageListener(window.Ecwid.getCurrentPage());
  }
  document.addEventListener("ec-page-loaded", (e: any) =>
    ecwidPageListener(e.detail)
  );
});

function ecwidPageListener(page: any) {
  visible.value = page.pageType === "CART";
  if (visible.value) loadProducts();
}

function loadProducts() {
  axios
    .get("/api/products", {
      params: { limit: count.value, sortBy: "updateDateDesc" },
    })
    .then((r) => (products.value = r.data.items));
}

function addToCart(product: Product) {
  window.Ecwid?.Cart.addProduct(
    product.id,
    1,
    null,
    [{ name: "recentlyUpdatedAdded", value: "true", hidden: true }],
    () => window.Ecwid.openPage("cart")
  );
}

function openProduct(product: Product) {
  window.Ecwid?.openPage(`product/${product.id}`);
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(price);
}
</script>
