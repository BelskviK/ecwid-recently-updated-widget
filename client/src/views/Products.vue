<template>
  <!--     wrapper element avoids “extraneous non-props” warning      -->
  <div class="ec-container">
    <h2 class="text-lg m-t-4 m-b-2">All products</h2>

    <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>

    <p v-if="loading" class="text-center m-t-4">Loading…</p>
    <p v-if="error" class="text-center text-danger m-t-4">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchAllProducts, EcwidProduct } from "@/api/ecwid";
import ProductCard from "@/components/ProductCard.vue";

const products = ref<EcwidProduct[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

onMounted(async () => {
  loading.value = true;
  try {
    products.value = await fetchAllProducts();
  } catch {
    error.value = "Failed to load products";
  } finally {
    loading.value = false;
  }
});
</script>
