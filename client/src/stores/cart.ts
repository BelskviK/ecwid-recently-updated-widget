import { reactive, readonly } from "vue";
import type { EcwidProduct } from "@/api/ecwid";

interface CartItem extends EcwidProduct {
  quantity: number;
}

const state = reactive<{ items: CartItem[] }>({
  items: [],
});

function add(prod: EcwidProduct, qty = 1) {
  const hit = state.items.find((i) => i.id === prod.id);
  if (hit) hit.quantity += qty;
  else state.items.push({ ...prod, quantity: qty });
}

function remove(id: number) {
  const idx = state.items.findIndex((i) => i.id === id);
  idx !== -1 && state.items.splice(idx, 1);
}

export function useCart() {
  const subtotal = () =>
    state.items.reduce((s, i) => s + i.price * i.quantity, 0);
  return {
    // ←  Type is:
    items: readonly(state.items), //   { items: Readonly<CartItem[]>,
    add, //     add: …,
    remove, //     remove: …,
    subtotal, //     subtotal: … }
  }; //   }
}
