import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router";
import App from "./App.vue"; // 1-root wrapper, shown below

createApp(App)
  .use(createRouter({ history: createWebHistory(), routes }))
  .mount("#app");
