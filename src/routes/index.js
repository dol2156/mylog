import { createRouter } from "vue-router";
import { createWebHashHistory } from "vue-router";
//import { createWebHistory } from "vue-router";

import PageMain from "@/views/PageMain";
import PageLogin from "@/views/PageLogin";
// import PageJoin from "@/views/PageJoin";
import PageAddKey from "@/views/PageAddKey";

const routes = [
  {
    path: "/",
    redirect: "/main",// 리다이렉트 필요시 작성
  },
  {
    path: "/main",
    name: "메인",
    component: PageMain,
  },
  {
    path: "/main/:key",
    name: "메인:key",
    component: PageMain,
  },
  {
    path: "/login",
    name: "로그인",
    component: PageLogin,
  },
  // {
  //   path: "/join",
  //   name: "회원가입",
  //   component: PageJoin,
  // },
  {
    path: "/addKey",
    name: "키추가",
    component: PageAddKey,
  },
  {
    path: "/404",
    name: "PageNotFound",
    component: () => import('@/views/PageNotFound'),// 코드 스플리팅 - SPA 방식에서 오직 한페이지에 필요한 리소스만 필요한 경우 사용
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/404',
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  //history : createWebHistory(),// 해시 제거를 위해 히스토리 모드 사용
  routes,
});

export default router;