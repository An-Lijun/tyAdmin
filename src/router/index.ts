import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import installRouterGuard from './guard';

export const pageRoute = [
  {
    label: '仪表盘',
    icon: 'ty-dashboard-fill',
    type: 'subMenu',
    path: '/dashboard',
    name: 'Dashboard',
    redirect: { name: 'analysis' },
    children: [
      {
        label: '分析页',
        type: 'menu',
        name: 'analysis',
        path: 'analysis',
        component: () => import('@/views/pages/dashboard/analysis.vue'),
      },
      {
        label: '工作台',
        type: 'menu',
        name: 'workbench',
        path: 'workbench',
        component: () => import('@/views/pages/dashboard/workbench.vue'),
      },
      {
        label: '快速导航',
        type: 'menu',
        name: 'tradeNav',
        path: 'tradeNav',
        component: () => import('@/views/pages/dashboard/tradeNav.vue'),
      },
    ]
  },

  {
    label: '地图',
    icon: 'ty-road-map-fill',
    type: 'subMenu',
    path: '/map',
    name: 'Map',
    children: [
      {
        label: '地图(echars)',
        type: 'menu',
        name: 'echarsMap',
        path: 'echarsMap',
        component: () => import('@/views/pages/map/echarsMap.vue'),
      },
      {
        label: '省地图(echars)',
        type: 'menu',
        name: 'echarsMapTwo',
        path: 'echarsMapTwo',
        component: () => import('@/views/pages/map/echarsMapTwo.vue'),
      },
    ]
  },
  {
    label: '外链/页面',
    icon: 'ty-pages-fill',
    type: 'subMenu',
    path: '/page',
    name: 'Page',
    redirect: { name: 'analysis' },
    children: [
      {
        label: '内嵌外链',
        type: 'menu',
        path: 'inner',
        name: 'inner',
        component: () => import('@/views/pages/website/inner.vue'),
      },
      {
        label: '打开外链',
        type: 'menu',
        path: 'out',
        name: 'out',
        component: () => import('@/views/pages/website/out.vue'),
      },
      {
        label: '内嵌html页面',
        type: 'menu',
        path: 'wicket',
        name: 'wicket',
        component: () => import('@/views/pages/website/wicket.vue'),
      },
      {
        label: '打开内部html页面',
        type: 'menu',
        name: 'openHarfoutByIframe',
        path: 'openHarfoutByIframe',
        component: () => import('@/views/pages/website/outByIframe.vue')

      }
    ]
  },
  {
    label: '编辑器',
    icon: 'ty-plug-2-fill',
    type: 'subMenu',
    path: '/editor',
    name: 'Editor',
    redirect: { name: 'icon' },
    children: [
      {
        label: 'mdEditor',
        type: 'menu',
        path: 'mdEditor',
        name: 'mdEditor',
        component: () => import('@/views/pages/editor/mdEditor.vue'),

      },
    ]
  },
  {
    label: '预览',
    icon: 'ty-plug-2-fill',
    type: 'subMenu',
    path: '/view',
    name: 'View',
    redirect: { name: 'icon' },
    children: [
      {
        label: 'pdf预览',
        type: 'menu',
        path: 'pdfView',
        component: () => import('@/views/pages/pdfView/index.vue')
      },
      {
        label: 'doc预览',
        type: 'menu',
        path: 'docView',
        component: () => import('@/views/pages/docView/index.vue')
      },
      {
        label: 'excel预览',
        type: 'menu',
        path: 'excelView',
        component: () => import('@/views/pages/excelView/index.vue')
      },
      {
        label: '图片预览',
        type: 'menu',
        path: 'previewImg',
        component: () => import('@/views/pages/preview/index.vue')
      },
    ]
  },
  {
    label: '功能',
    icon: 'ty-plug-2-fill',
    type: 'subMenu',
    path: '/fucs',
    name: 'Fucs',
    redirect: { name: 'icon' },
    children: [
      
      {
        label: 'http',
        type: 'menu',
        path: 'http',
        name: 'http',
        component: () => import('@/views/pages/http/index.vue'),

      },
      {
        label: '图标',
        type: 'menu',
        path: 'icon',
        name: 'icon',
        component: () => import('@/views/pages/feat/icon.vue'),

      },
      {
        label: '下载',
        type: 'menu',
        path: 'download',
        name: 'download',
        component: () => import('@/views/pages/download/index.vue'),

      },
      {
        label: '打印',
        type: 'menu',
        path: 'print',
        name: 'print',
        component: () => import('@/views/pages/print/index.vue'),
      },
      {
        label: '编码',
        type: 'menu',
        path: 'encode',
        name: 'encode',
        component: () => import('@/views/pages/encode/index.vue'),
      },
      {
        label: '加密',
        type: 'menu',
        path: 'encrypt',
        name: 'encrypt',
        component: () => import('@/views/pages/encrypt/index.vue'),
      },
      
    ]
  },

  {
    label: '码',
    icon: 'ty-qr-code-fill',
    type: 'subMenu',
    path: '/qr',
    name: 'Qr',
    redirect: { name: 'analysis' },
    children: [
      {
        label: '条形码',
        type: 'menu',
        path: 'barcode',
        name: 'barcode',
        component: () => import('@/views/pages/qrcode/one.vue')
      },
      {
        label: '二维码',
        type: 'menu',
        path: 'qrcode',
        name: 'qrcode',
        component: () => import('@/views/pages/qrcode/two.vue')
      }
    ]
  },
  {
    label: '异常',
    icon: 'ty-file-forbid-line',
    type: 'subMenu',
    path: '/error',
    name: 'Error',
    redirect: { name: 'analysis' },
    children: [
      {
        label: '异常页',
        type: 'menu',
        path: 'errorPage',
        name: 'errorPage',
        component: () => import('@/views/pages/error/index.vue'),
      }
    ]
  },
  {
    label: '交易',
    icon: 'ty-qr-code-fill',
    type: 'subMenu',
    path: '/trade',
    name: 'Trade',
    children: [
      {
        label: '水波纹',
        type: 'menu',
        path: 'waterButton',
        component: () => import('@/views/pages/waterButton/index.vue')
      },
      {
        label: '离开提醒',
        type: 'menu',
        path: 'pageLeaveRem',
        component: () => import('@/views/pages/pageLeaveRem/index.vue')
      },
      {
        label: '图表',
        type: 'menu',
        path: 'charts',
        component: () => import('@/views/pages/charts/index.vue')
      },
      
      {
        label: '签字版',
        type: 'menu',
        path: 'signingBoard',
        component: () => import('@/views/pages/signingboard/index.vue')
      },
      {
        label: '绘制图形',
        type: 'menu',
        path: 'drawImg',
        component: () => import('@/views/pages/drawImg/index.vue')
      },
      {
        label: '动画',
        type: 'menu',
        path: 'animation',
        component: () => import('@/views/pages/animation/clipath.vue')
      },
      {
        label: '马',
        type: 'horse',
        path: 'horse',
        component: () => import('@/views/pages/horse/index.vue')
      },


      {
        label: '魔法图片',
        type: 'magicImg',
        path: 'magicImg',
        component: () => import('@/views/pages/magicImg/index.vue')
      },
    ],
  },
  {
    label: '流程',
    type: 'menu',
    path: '/flow',
    icon: 'ty-markup-fill',
    children: [
      {
        type: 'menu',
        path: '/flow',
        component: () => import('@/views/pages/flow/index.vue')
      },
    ]
  },
  
  {
    label: '关于',
    type: 'menu',
    path: '/about',
    icon: 'ty-markup-fill',
    children: [
      {
        type: 'menu',
        path: '/about',
        component: () => import('@/views/pages/about/index.vue')
      },
    ]
  },
]

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login/Login.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/system/home/index.ts'),
    children:pageRoute
  },
  {
    path: '/outByIframe',
    name: 'outByIframe',
    component: () => import('@/views/pages/website/outByIframe.vue'),
  },
  {
    path: '/lock',
    name: 'Lock',
    component: () => import('@/views/system/lock/index.vue'),
  },
  {
    path: '/403',
    name: 'noaccess',
    component: () => import('@/views/system/403/index.vue'),
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('@/views/system/404/index.vue'),
  },

  // {
  //   path: '/500',
  //   name: 'notFound',
  //   component: () => import('@/views/system/404/index.vue'),
  // },
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