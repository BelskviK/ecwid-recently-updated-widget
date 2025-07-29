<template>
  <a
    :href="product.url || '#'"
    class="block rounded-xl overflow-hidden border shadow hover:shadow-lg"
  >
    <img
      :src="product.thumbnailUrl || product.imageUrl"
      :alt="product.name"
      class="w-full object-cover aspect-square"
    />
    <div class="p-3">
      <h3 class="text-sm font-medium truncate">{{ product.name }}</h3>
      <p
        v-if="product.defaultDisplayedPriceFormatted"
        class="text-xs text-gray-500"
      >
        {{ product.defaultDisplayedPriceFormatted }}
      </p>
    </div>
  </a>
</template>

<script setup lang="ts">
import type { EcwidProduct } from "@/api/ecwid";
defineProps<{ product: EcwidProduct }>();
</script>
