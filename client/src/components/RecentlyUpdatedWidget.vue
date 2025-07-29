<template>
  <section class="a-card a-card--normal m-t-4">
    <div class="a-card__paddings">
      <div class="d-flex jc-space-between ai-center m-b-2">
        <h3 class="text-lg">Recently updated products</h3>

        <select class="select select--small" v-model.number="count">
          <option v-for="n in [3, 6, 9, 12]" :key="n" :value="n">
            {{ n }}
          </option>
        </select>
      </div>

      <div class="gallery gallery--wide">
        <div
          v-for="p in products"
          :key="p.id"
          class="gallery__item a-card a-card--hover"
        >
          <img
            :src="p.thumbnailUrl"
            :alt="p.name"
            class="gallery__image"
            @click="openProduct(p)"
          />

          <div class="a-card__content p-2">
            <h4 class="text-base m-b-1" @click="openProduct(p)">
              {{ p.name }}
            </h4>
            <p class="text-bold m-b-1">
              {{ formatPrice(p.price, p.currency) }}
            </p>
            <button
              class="btn btn-small btn-primary w-full"
              @click="addToCart(p)"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      <p v-if="loading" class="text-center m-t-2">Loading…</p>
      <p v-if="error" class="text-center text-danger m-t-2">{{ error }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { fetchRecentlyUpdated, EcwidProduct } from "@/api/ecwid";
import { useCart } from "@/stores/cart";
const count = ref(Number(localStorage.getItem("ru-count")) || 6);
const products = ref<EcwidProduct[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

watch(count, () => {
  localStorage.setItem("ru-count", String(count.value));
  load();
});

onMounted(load);

async function load() {
  loading.value = true;
  error.value = null;
  try {
    products.value = await fetchRecentlyUpdated(count.value);
  } catch {
    error.value = "Unable to load products right now.";
  } finally {
    loading.value = false;
  }
}

function addToCart(p: EcwidProduct) {
  // if Ecwid JS is available, use it, otherwise fallback to local store
  if (window.Ecwid?.Cart) {
    window.Ecwid.Cart.addProduct(
      p.id,
      1,
      null,
      [{ name: "FROM_RUP", value: "1", hidden: true }],
      () => window.Ecwid.openPage("cart")
    );
  } else {
    useCart().add(p);
  }
}
const openProduct = (p: EcwidProduct) =>
  window.Ecwid?.openPage(`product/${p.id}`);

/** Safe formatter: if currency missing, just show raw price */
const formatPrice = (price: number, currency?: string) =>
  currency
    ? new Intl.NumberFormat(undefined, { style: "currency", currency }).format(
        price
      )
    : price.toFixed(2);
</script>
