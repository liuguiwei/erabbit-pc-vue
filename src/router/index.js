import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
const TopCategory = () => import("@/views/category/top-category");
const SubCategory = () => import("@/views/category/sub-category");
const Goods = () => import("@/views/goods");
const Login = () => import("@/views/login");
const LoginCallback = () => import("@/views/login/callBack");
const Cart = () => import("@/views/cart");
const Checkout = () => import("@/views/member/pay/checkout.vue");
const PayIndex = () => import("@/views/member/pay/index");
const PayResult = () => import("@/views/member/pay/payResult");
const MemberLayout = () => import("@/views/member/layout");
const MemberHome = () => import("@/views/member/home");
const Order = () => import("@/views/member/order");

Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    component: () => import("@/views/Layout"),
    children: [
      {
        path: "/",
        component: () => import("@/views/home"),
      },
      {
        path: "/category/:id",
        component: TopCategory,
        props: true,
      },
      {
        path: "/category/sub/:id",
        component: SubCategory,
        props: true,
      },
      {
        path: "/product/:id",
        component: Goods,
      },
      {
        path: "/cart",
        component: Cart,
      },
      {
        path: "/member/checkout",
        component: Checkout,
      },
      {
        path: "/member/pay",
        component: PayIndex,
      },
      {
        path: "/member",
        component: MemberLayout,
        children: [
          {
            path: "/member",
            component: MemberHome,
          },
          {
            path: "/member/order",
            component: Order,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/login/callback",
    component: LoginCallback,
  },
  {
    path: "/pay/callback",
    component: PayResult,
  },
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savePosition) {
    return {
      x: 0,
      y: 0,
    };
  },
});
router.beforeEach((to, from, next) => {
  if (!store.state.user.profile.token && to.path.startsWith("/member")) {
    next("/login?redirectUrl=" + encodeURIComponent(to.fullPath));
  }
  next();
});
export default router;
