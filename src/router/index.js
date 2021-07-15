import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Store from "../views/Store.vue";
import StoreScss from "../views/StoreScss.vue";
import Cart from "../views/Cart.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/store",
    name: "store",
    component: Store,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/cart",
    name: "cart",
    component: Cart,
  },
  {
    path: "/storescss",
    name: "storescss",
    component: StoreScss,
  },
  {
    path: "/about",
    name: "About",

    component: () =>
      import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
