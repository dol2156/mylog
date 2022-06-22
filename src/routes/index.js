import {createRouter, createWebHashHistory} from "vue-router";

import LoginPage from "@/views/PageLogin";
import MainPage from "@/views/PageMain";

const routes = [
  {
    path : "/",
    redirect : "/login",// 리다이렉트 필요시 작성
  },
  {
    path : "/main",
    name : "메인",
    component : MainPage,
  },
  {
    path : "/login",
    name : "로그인",
    component : LoginPage,
  },
  {
    path : "/404",
    name : "PageNotFound",
    component : () => import('@/views/PageNotFound'),// 코드 스플리팅 - SPA 방식에서 오직 한페이지에 필요한 리소스만 필요한 경우 사용
  },
  {
    path : "/:catchAll(.*)",
    redirect : '/404',
  }
];

const router = createRouter({
  //history : createWebHistory(),// 해시 제거를 위해 히스토리 모드 사용
  // history:createWebHashHistory(),
  history: createWebHashHistory(),
  routes,
});

export default router;