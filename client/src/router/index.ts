import type { RouteRecordRaw } from "vue-router";

import Products from "@/views/Products.vue";
import Cart from "@/views/Cart.vue";
import Settings from "@/views/Settings.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Products", component: Products },
  { path: "/cart", name: "Cart", component: Cart },
  { path: "/settings", name: "Settings", component: Settings },
];

export default routes;
