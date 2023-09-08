import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../components/dashboard/Dashboard.vue";
import Main from "../components/main/Main.vue";
import Member from "../components/member/Member.vue";
import Fund from "../components/fund/Fund.vue";
import FundDetail from "../components/fund/components/FundDetail.vue";
import Tournament from "../components/tournament/Tournament.vue";
import Profile from "../components/account/Profile.vue";
import Login from "../components/login/Login.vue";
import PaySuccess from "../components/payOS/PaySuccess.vue";
import PayError from "../components/payOS/PayError.vue";
import authService from "../services/auth.service";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
    children: [
      {
        path: "/",
        name: "default",
        component: Dashboard,
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "/member",
        name: "member",
        component: Member,
      },
      {
        path: "/fund",
        name: "fund",
        component: Fund,
      },
      {
        path: "fund/detail",
        name: "funddetail",
        component: FundDetail,
      },
      {
        path: "/tournament",
        name: "tournament",
        component: Tournament,
      },
      {
        path: "/profile/:id",
        name: "profile",
        component: Profile,
      },
      {
        path: "/pay-success",
        name: "pay-success",
        component: PaySuccess,
      },
      {
        path: "/pay-error",
        name: "pay-error",
        component: PayError,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  const isAuthenticated = await authService.isAuthenticated();
  if (!isAuthenticated && to.name !== "login") {
    await authService.logout();
    return { name: "login" };
  }
});

export default router;
