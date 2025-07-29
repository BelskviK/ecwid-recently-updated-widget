import { createRouter, createWebHistory } from "vue-router";
import EcwidInstantSite from "@/views/EcwidInstantSite.vue";
import SettingsPage from "@/views/SettingsPage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: EcwidInstantSite },
    { path: "/settings", component: SettingsPage },
  ],
});
