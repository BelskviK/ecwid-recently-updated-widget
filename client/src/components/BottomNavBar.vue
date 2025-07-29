<template>
  <nav class="toolbar toolbar--bottom shadow-outer">
    <RouterLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="toolbar-item text-center"
    >
      <span class="svg-icon toolbar-item__icon" v-html="item.icon" />
      <span class="toolbar-item__label">{{ item.label }}</span>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";

const icons = {
  store: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
           <path d="M3 4h14l-1 11H4L3 4zm14-2a2 2 0 012 2l-1 11a2 2 0 01-2 2H4a2 2 0 01-2-2L1 4a2 2 0 012-2h14z"/>
         </svg>`,
  cart: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
           <path d="M6 6h12l-1.5 9H6V6zm0-2a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2l1.5-9A2 2 0 0016 4H6z"/>
         </svg>`,
  settings: `<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
               <path d="M10 4a6 6 0 100 12A6 6 0 0010 4zm0-2a8 8 0 110 16A8 8 0 0110 2z"/>
             </svg>`,
};

const items = [
  { to: "/", label: "Products", icon: icons.store },
  { to: "/cart", label: "Cart", icon: icons.cart },
  { to: "/settings", label: "Settings", icon: icons.settings },
];
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-around;
  padding: 6px 0;
  background: #fff;
  border-top: 1px solid #e1e4ea;
}
.toolbar-item {
  flex: 1 0 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-text);
  font-size: 11px;
  text-decoration: none;
}
.toolbar-item__label {
  margin-top: 2px;
}
</style>
