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
    label: '仪表盘',
    icon: 'ty-dashboard-fill',
    type: 'subMenu',
    path: '/system',
    name: 'System',
    component: () => import('@/views/system/home/index.ts'),
    redirect: { name: 'analysis' },
    children: [
      {
        label: '分析页',
        type: 'menu',
        name: 'analysis',
        path: 'analysis',
        component: () => import('@/views/trade/dashboard/analysis.vue'),
      },
      {
        label: '工作台',
        type: 'menu',
        name: 'workbench',
        path: 'workbench',
        component: () => import('@/views/trade/dashboard/workbench.vue'),
      },
      {
        label: '快速导航',
        type: 'menu',
        name: 'tradeNav',
        path: 'tradeNav',
        component: () => import('@/views/trade/dashboard/tradeNav.vue'),
      },
    ]
  },

  {
    label: '地图',
    icon: 'ty-road-map-fill',
    type: 'subMenu',
    path: '/map',
    name: 'Map',
    component: () => import('@/views/system/home/index.ts'),
    children: [
      {
        label: '地图(echars)',
        type: 'menu',
        name: 'echarsMap',
        path: 'echarsMap',
        component: () => import('@/views/trade/map/echarsMap.vue'),
      },
      {
        label: '省地图(echars)',
        type: 'menu',
        name: 'echarsMapTwo',
        path: 'echarsMapTwo',
        component: () => import('@/views/trade/map/echarsMapTwo.vue'),
      },
    ]
  },

  {
    label: '嵌入页面',
    icon: 'ty-pages-fill',
    type: 'subMenu',
    path: '/page',
    name: 'Page',
    component: () => import('@/views/system/home/index.ts'),
    redirect: { name: 'analysis' },
    children: [
      {
        label: '内嵌外部页面',
        type: 'menu',
        path: 'inner',
        name: 'inner',
        component: () => import('@/views/trade/website/inner.vue'),
      },
      {
        label: '打开外部页面',
        type: 'menu',
        path: 'out',
        name: 'out',
        component: () => import('@/views/trade/website/out.vue'),
      },
      {
        label: '内嵌html页面',
        type: 'menu',
        path: 'outByIframe',
        name: 'outByIframe',
        component: () => import('@/views/trade/website/wicket.vue'),
      },
      {
        label: '打开内部html页面',
        type: 'menu',
        name: 'outByIframe',
        path: 'outByIframe',
        component: () => import('@/views/trade/website/outByIframe.vue')

      }
    ]
  },

  {
    label: '功能',
    icon: 'ty-plug-2-fill',
    type: 'subMenu',
    path: '/fucs',
    name: 'Fucs',
    component: () => import('@/views/system/home/index.ts'),
    redirect: { name: 'icon' },
    children: [
      {
        label: '图标',
        type: 'menu',
        path: 'icon',
        name: 'icon',
        component: () => import('@/views/trade/feat/icon.vue'),

      },
      {
        label: '下载',
        type: 'menu',
        path: 'download',
        name: 'download',
        component: () => import('@/views/trade/download/index.vue'),

      },
      {
        label: '打印',
        type: 'menu',
        path: 'print',
        name: 'print',
        component: () => import('@/views/trade/print/index.vue'),
      }
    ]
  },


  {
    label: '码',
    icon: 'ty-qr-code-fill',
    type: 'subMenu',
    path: '/qr',
    name: 'Qr',
    component: () => import('@/views/system/home/index.ts'),
    redirect: { name: 'analysis' },
    children: [
      {
        label: '条形码',
        type: 'menu',
        path: 'barcode',
        name: 'barcode',
        component: () => import('@/views/trade/qrcode/one.vue')
      },
      {
        label: '二维码',
        type: 'menu',
        path: 'qrcode',
        name: 'qrcode',
        component: () => import('@/views/trade/qrcode/two.vue')
      }
    ]
  },
  {
    label: '交易',
    icon: 'ty-qr-code-fill',
    type: 'subMenu',
    path: '/trade',
    name: 'Trade',
    component: () => import('@/views/system/home/index.ts'),
    children: [
      {
        label: '图表',
        type: 'menu',
        path: 'charts',
        component: () => import('@/views/trade/charts/index.vue')
      },
      {
        label: '二维码',
        type: 'menu',
        path: 'previewImg',
        component: () => import('@/views/trade/preview/index.vue')
      },
      {
        label: '签字版',
        type: 'menu',
        path: 'signingBoard',
        component: () => import('@/views/trade/signingboard/index.vue')
      },
      {
        label: '绘制图形',
        type: 'menu',
        path: 'drawImg',
        component: () => import('@/views/trade/drawImg/index.vue')
      },
      {
        label: '动画',
        type: 'menu',
        path: 'animation',
        component: () => import('@/views/trade/animation/clipath.vue')
      },

      {
        path: '/:catchAll(.*)',
        redirect: { name: 'notFound' },
      }
    ],
  },



  {
    label: '关于',
    type: 'menu',
    path: '/about',
    icon:'ty-markup-fill',
    component: () => import('@/views/system/home/index.ts'),
    children: [
      {
        type: 'menu',
        path: '/about',
        component: () => import('@/views/trade/about/index.vue')
      },
    ]
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

export const getRouters = routes
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