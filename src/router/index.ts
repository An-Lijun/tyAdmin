import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import installRouterGuard from './guard';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/system',
    name: 'System',
    component: () => import('@/views/system/home/index.vue'),
    redirect: { name: 'analysis' },
    children: [
      {
        name: 'analysis',
        path: 'analysis',
        component: () => import('@/views/trade/dashboard/analysis.vue'),
      },
      {
        path: 'workbench',
        component: () => import('@/views/trade/dashboard/workbench.vue'),
      },
    ]
  },
  {
    path: '/map',
    name: 'Map',
    component: () => import('@/views/system/home/index.vue'),
    children: [
      {
        path: 'echarsMap',
        component: () => import('@/views/trade/map/echarsMap.vue'),
      },
      {
        path: 'echarsMapTwo',
        component: () => import('@/views/trade/map/echarsMapTwo.vue'),
      },
    ]
  },
  {
    path: '/trade',
    name: 'Trade',
    component: () => import('@/views/system/home/index.vue'),
    children: [
      {
        path: 'icon',
        component: () => import('@/views/trade/feat/icon.vue'),
      },
      {
        path: 'download',
        component: () => import('@/views/trade/download/index.vue'),
      },

      {
        path: 'inner',
        component: () => import('@/views/trade/website/inner.vue'),
      },
      {
        path: 'out',
        component: () => import('@/views/trade/website/out.vue'),
      },
      {
        path: 'wicket',
        component: () => import('@/views/trade/website/wicket.vue'),
      },
      {
        path: 'outByIframe',
        component: () => import('@/views/trade/website/outByIframe.vue')
      },
      {
        path: 'charts',
        component: () => import('@/views/trade/charts/index.vue')
      },
      {
        path: 'about',
        component: () => import('@/views/trade/about/index.vue')
      },
      {
        path: '/:catchAll(.*)',
        redirect: { name: 'notFound' },
      }
    ],
  },
  {
    path: '/outByIframe',
    name: 'outByIframe',
    component: () => import('@/views/trade/website/outByIframe.vue'),
  },
  {
    path: '/lock',
    name: 'Lock',
    component: () => import('@/views/system/lock/index.vue'),
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/system/404/index.vue'),
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
  }
]
// app router
// 创建一个可以被 Vue 应用程序使用的路由实例
export const router = createRouter({

  // 创建一个 hash 历史记录。
  // import.meta.env.VITE_PUBLIC_PATH
  history: createWebHashHistory(),
  // 应该添加到路由的初始路由列表。
  routes: routes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,

});

// config router
// 配置路由器
export default function installRouter(app: App<Element>) {
  app.use(router);
  //注册路由守卫
  installRouterGuard(router)
}