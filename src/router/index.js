import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/common",
    name: "Common",
    component: () => import("@/views/Common.vue"),
  },
  {
    path: "/",
    name: "Write off items",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/addtnl-expenses",
    name: "Additional expenses",
    component: () => import("@/views/AdditionalExpenses.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "active",
});
export default router;
