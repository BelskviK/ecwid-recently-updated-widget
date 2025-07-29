<template>
  <div class="ec-card-stack ec-m-4">
    <!-- description ------------------------------------------------- -->
    <div class="ec-card">
      <div class="ec-card__section">
        <h2 class="ec-text-h3 ec-mb-2">Recently-Updated Products Widget</h2>
        <p>Displays your most recently updated products on the cart page.</p>
      </div>
    </div>

    <!-- on/off toggle ------------------------------------------------ -->
    <div class="ec-card">
      <div class="ec-card__section ec-flex ec-justify-between ec-items-center">
        <label for="toggle">Enable widget for customers</label>
        <ec-switcher id="toggle" v-model="enabled" />
      </div>
    </div>

    <!-- default count ------------------------------------------------ -->
    <div class="ec-card">
      <div class="ec-card__section ec-flex ec-justify-between ec-items-center">
        <label for="count">Default number of products</label>
        <ec-numberinput
          id="count"
          v-model.number="defaultCount"
          min="1"
          max="12"
        />
      </div>
    </div>

    <!-- export table ------------------------------------------------- -->
    <div class="ec-card">
      <div class="ec-card__section">
        <h3 class="ec-text-h4 ec-mb-2">Export catalog</h3>

        <div class="ec-table-responsive">
          <table class="ec-table ec-mb-2">
            <thead>
              <tr>
                <th><input type="checkbox" @change="toggleAll" /></th>
                <th>Name</th>
                <th>Price</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in products" :key="p.id">
                <td>
                  <input type="checkbox" v-model="selectedIds" :value="p.id" />
                </td>
                <td>{{ p.name }}</td>
                <td>{{ formatPrice(p.price, p.currency) }}</td>
                <td>{{ new Date(p.updated).toLocaleDateString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button
          class="ec-btn ec-btn--primary"
          :disabled="selectedIds.length === 0"
          @click="exportSelected"
        >
          Export selected products
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import { unparse } from "papaparse";

interface ProductRow {
  id: number;
  name: string;
  price: number;
  currency: string;
  updated: string;
}

const enabled = ref(true);
const defaultCount = ref(6);
const products = ref<ProductRow[]>([]);
const selectedIds = ref<number[]>([]);

const allSelected = computed(
  () =>
    selectedIds.value.length &&
    selectedIds.value.length === products.value.length
);

function toggleAll(e: Event) {
  const check = (e.target as HTMLInputElement).checked;
  selectedIds.value = check ? products.value.map((p) => p.id) : [];
}

function formatPrice(price: number, currency: string) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
  }).format(price);
}

async function exportSelected() {
  const rows = products.value.filter((p) => selectedIds.value.includes(p.id));
  const csv = unparse(rows, { delimiter: "," });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement("a"), {
    href: url,
    download: "products.csv",
  });
  a.click();
  URL.revokeObjectURL(url);
}

async function loadProducts() {
  let offset = 0,
    fetched: ProductRow[] = [],
    total = 0;
  do {
    const { data } = await axios.get("http://localhost:3000/api/products", {
      params: { limit: 100, offset },
    });
    total = data.total;
    offset += 100;
    fetched = fetched.concat(
      data.items.map((x: any) => ({
        id: x.id,
        name: x.name,
        price: x.price,
        currency: x.currency,
        updated: x.updateTimestamp * 1000,
      }))
    );
  } while (fetched.length < total);
  products.value = fetched;
}

onMounted(() => {
  window.EcwidApp?.init({
    app_id: "recently-updated-widget",
    autoheight: true,
  });

  window.EcwidApp?.getAppStorage("enableWidget,defaultCount", (v: any) => {
    enabled.value = v.enableWidget !== "false";
    defaultCount.value = Number(v.defaultCount) || 6;
  });

  loadProducts();
});

watch(enabled, (v) =>
  window.EcwidApp?.setAppStorage("enableWidget", String(v))
);
watch(defaultCount, (v) =>
  window.EcwidApp?.setAppStorage("defaultCount", String(v))
);
</script>
