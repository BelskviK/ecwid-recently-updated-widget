<!-- client/src/views/Cart.vue -->
<template>
  <div class="ec-container pb-20">
    <h2 class="text-lg m-t-4 m-b-4">Cart</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- LEFT column – cart items -->
      <div>
        <div
          v-for="it in cart.items"
          :key="it.id"
          class="flex items-center mb-6"
        >
          <img
            :src="it.thumbnailUrl"
            :alt="it.name"
            class="w-20 h-20 rounded-lg object-cover mr-4"
          />

          <div class="flex-grow">
            <h3 class="font-semibold text-lg">{{ it.name }}</h3>
            <div class="flex items-center mt-1">
              <span class="text-gray-500">Qty: {{ it.quantity }}</span>
            </div>
          </div>

          <div class="text-right">
            <p class="font-semibold">
              {{ formatPrice(it.price * it.quantity) }}
            </p>
            <button
              class="text-gray-400 mt-2"
              @click="cart.remove(it.id)"
              title="Remove"
            >
              <span class="material-icons text-base">close</span>
            </button>
          </div>
        </div>

        <!-- totals -->
        <div v-if="cart.items.length" class="border-t pt-6">
          <div class="flex justify-between font-bold text-xl">
            <span>TOTAL</span>
            <span>{{ formatPrice(cart.subtotal()) }}</span>
          </div>
        </div>

        <p v-else class="text-gray-500">Your cart is empty.</p>
      </div>

      <!-- RIGHT column – email / agree / checkout (kept minimal) -->
      <div>
        <input
          v-model="email"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg mb-6"
          type="email"
          placeholder="Email for order updates"
        />

        <div class="flex items-center mb-6">
          <input
            id="terms"
            v-model="agree"
            type="checkbox"
            class="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 text-sm text-gray-600">
            I agree with
            <a href="#" class="text-blue-600 font-semibold"
              >Terms and Conditions</a
            >
          </label>
        </div>

        <button
          class="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg w-full"
          :disabled="!cart.items.length || !agree"
        >
          Checkout
        </button>
      </div>
    </div>

    <!-- widget sits right above the fixed BottomNavBar -->
    <RecentlyUpdatedWidget class="m-t-8" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import RecentlyUpdatedWidget from "@/components/RecentlyUpdatedWidget.vue";
import { useCart } from "@/stores/cart";

/* single reactive object = Volar sees cart.* everywhere */
const cart = useCart();

/* simple local state (unrelated to Volar issue) */
const email = ref("");
const agree = ref(false);

/* helper exposed to the template */
const currency = "USD";
function formatPrice(cents: number) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(cents / 100); // store uses cents
}
</script>
