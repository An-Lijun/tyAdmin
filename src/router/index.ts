import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';
import generateRoutes from './generateRoutes'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import installRouterGuard from './guard';
// 约定式路由源于系统
import systemRouter from '~pages';

export const pageRoute = [
  {
    label: '仪表盘',
    icon: 'ty-dashboard-fill',
    type: 'subMenu',
    path: '/dashboard',
    name: 'dashboard',
    redirect: { name: 'analysis' },
    children: [
      {
        label: '分析页',
        type: 'menu',
        name: 'analysis',
        path: 'analysis',
        component: () => import('@/views/dashboard/analysis.vue'),
      },
      {
        label: '工作台',
        type: 'menu',
        name: 'workbench',
        path: 'workbench',
        component: () => import('@/views/dashboard/workbench.vue'),
      },
      {
        label: '快速导航',
        type: 'menu',
        name: 'tradeNav',
        path: 'tradeNav',
        component: () => import('@/views/dashboard/tradeNav.vue'),
      },
    ]
  },
  {
    label: '系统管理',
    icon: 'ty-road-map-fill',
    type: 'subMenu',
    path: '/sysManage',
    name: 'sysManage',
    children: [
      {
        label: '菜单管理',
        type: 'menu',
        name: 'menuManage',
        path: 'menuManage',
        component: () => import('@/views/sysManage/menuManage.vue'),
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
        component: () => import('@/views/map/echarsMap.vue'),
      },
      {
        label: '省地图(echars)',
        type: 'menu',
        name: 'echarsMapTwo',
        path: 'echarsMapTwo',
        component: () => import('@/views/map/echarsMapTwo.vue'),
      },
    ]
  },
  {
    label: '外链/页面',
    icon: 'ty-links-line',
    type: 'subMenu',
    path: '/website',
    name: 'website',
    redirect: { name: 'analysis' },
    children: [
      {
        label: '内嵌外链',
        type: 'menu',
        path: 'inner',
        name: 'inner',
        component: () => import('@/views/website/inner.vue'),
      },
      {
        label: '打开外链',
        type: 'menu',
        path: 'out',
        name: 'out',
        component: () => import('@/views/website/out.vue'),
      },
      {
        label: '内嵌html页面',
        type: 'menu',
        path: 'wicket',
        name: 'wicket',
        component: () => import('@/views/website/wicket.vue'),
      },
      {
        label: '打开内部html页面',
        type: 'menu',
        name: 'outByIframe',
        path: 'outByIframe',
        component: () => import('@/views/website/outByIframe.vue')
      }
    ]
  },
  {
    label: '编辑器',
    icon: 'ty-pencil-line',
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
    icon: 'ty-bar-chart-grouped-line',
    type: 'subMenu',
    path: '/viewer',
    name: 'viewer',
    redirect: { name: 'icon' },
    children: [
      {
        label: 'pdf预览',
        type: 'menu',
        path: 'pdfViewIndex',
        component: () => import('@/views/viewer/pdfView/index.vue')
      },
      {
        label: 'doc预览',
        type: 'menu',
        path: 'docViewIndex',
        component: () => import('@/views/viewer/docView/index.vue')
      },
      {
        label: 'excel预览',
        type: 'menu',
        path: 'excelViewIndex',
        component: () => import('@/views/viewer/excelView/index.vue')
      },
      {
        label: '图片预览',
        type: 'menu',
        path: 'previewImgIndex',
        component: () => import('@/views/viewer/previewImg/index.vue')
      },
      {
        label: '代码预览',
        type: 'code',
        path: 'codeViewIndex',
        component: () => import('@/views/viewer/codeView/index.vue')
      },
      {
        label: '图表',
        type: 'menu',
        path: 'chartsIndex',
        component: () => import('@/views/viewer/charts/index.vue')
      },
      {
        label: '图表(放大)',
        type: 'menu',
        path: 'chartsZoomIndex',
        component: () => import('@/views/viewer/chartsZoom/index.vue')
      },
      {
        label: 'shardCard',
        type: 'menu',
        path: 'shardCardIndex',
        component: () => import('@/views/viewer/shardCard/index.vue')
      },
      {
        label: 'tree',
        type: 'menu',
        path: 'treeIndex',
        component: () => import('@/views/viewer/tree/index.vue')
      },
      {
        label: 'soulBall',
        type: 'menu',
        path: 'soulBallIndex',
        component: () => import('@/views/viewer/soulBall/index.vue')
      },
      {
        label: '条形码',
        type: 'menu',
        path: 'barcodeIndex',
        name: 'barcode',
        component: () => import('@/views/viewer/barcode/index.vue')
      },
      {
        label: '二维码',
        type: 'menu',
        path: 'qrcodeIndex',
        name: 'qrcode',
        component: () => import('@/views/viewer/qrcode/index.vue')
      },
      
      {
        label: 'scrollPage',
        type: 'menu',
        path: 'scrollPageIndex',
        component: () => import('@/views/viewer/scrollPage/index.vue')
      },

      {
        label: '进度条',
        type: 'menu',
        path: 'progressIndex',
        component: () => import('@/views/viewer/progress/index.vue')
      },
      {
        label: '动画',
        type: 'menu',
        path: 'animationIndex',
        component: () => import('@/views/viewer/animation/index.vue')
      },
      {
        label: '马',
        type: 'horse',
        path: 'horseIndex',
        component: () => import('@/views/viewer/horse/index.vue')
      },


      {
        label: '魔法图片',
        type: 'magicImg',
        path: 'magicImgIndex',
        component: () => import('@/views/viewer/magicImg/index.vue')
      },
    ]
  },
  {
    label: '功能',
    icon: 'ty-plug-2-fill',
    type: 'subMenu',
    path: '/operation',
    name: 'operation',
    redirect: { name: 'icon' },
    children: [
      {
        label: 'mock',
        type: 'menu',
        path: 'mockIndex',
        name: 'mockIndex',
        component: () => import('@/views/operation/mock/index.vue'),

      },
      {
        label: 'http',
        type: 'menu',
        path: 'httpIndex',
        name: 'httpIndex',
        component: () => import('@/views/operation/http/index.vue'),

      },
      {
        label: '图标',
        type: 'menu',
        path: 'iconIndex',
        name: 'iconIndex',
        component: () => import('@/views/operation/icon/index.vue'),

      },
      {
        label: '下载',
        type: 'menu',
        path: 'downloadIndex',
        name: 'downloadIndex',
        component: () => import('@/views/operation/download/index.vue'),

      },
      {
        label: '打印',
        type: 'menu',
        path: 'printIndex',
        name: 'printIndex',
        component: () => import('@/views/operation/print/index.vue'),
      },
      {
        label: '编码',
        type: 'menu',
        path: 'encodeIndex',
        name: 'encodeIndex',
        component: () => import('@/views/operation/encode/index.vue'),
      },
      {
        label: '加密',
        type: 'menu',
        path: 'encryptIndex',
        name: 'encryptIndex',
        component: () => import('@/views/operation/encrypt/index.vue'),
      },
      {
        label: 'excel操作',
        type: 'menu',
        path: 'excelIndex',
        name: 'excelIndex',
        component: () => import('@/views/operation/excel/index.vue'),
      },
      {
        label: 'full操作',
        type: 'menu',
        path: 'fullIndex',
        name: 'fullIndex',
        component: () => import('@/views/operation/full/index.vue'),
      },
      {
        label: '离开提醒',
        type: 'menu',
        path: 'pageLeaveRemIndex',
        component: () => import('@/views/operation/pageLeaveRem/index.vue')
      },
      {
        label: '水波纹',
        type: 'menu',
        path: 'waterButtonIndex',
        component: () => import('@/views/operation/waterButton/index.vue')
      },
      {
        label: '签字版',
        type: 'menu',
        path: 'signingBoardIndex',
        component: () => import('@/views/operation/signingboard/index.vue')
      },
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
        path: 'errorIndex',
        name: 'errorIndex',
        component: () => import('@/views/pages/error/index.vue'),
      }
    ]
  },
  {
    label: '交易',
    icon: 'ty-code-box-line',
    type: 'subMenu',
    path: '/trade',
    name: 'Trade',
    children: [
      {
        label: '点阵画板',
        type: 'menu',
        path: 'pixel',
        component: () => import('@/views/pages/pixel/index.vue')
      },
      {
        label: '绘制图形',
        type: 'menu',
        path: 'drawImg',
        component: () => import('@/views/pages/drawImg/index.vue')
      },

    ],
  },
  {
    label: '流程',
    type: 'menu',
    path: '/flow',
    icon: 'ty-flow-chart',
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
        component: () => import('@/views/about/index.vue')
      },
    ]
  },
]

// 创建路由实例
export const router = createRouter({
  history: createWebHashHistory(),   // 创建一个 hash 历史记录。
  routes: systemRouter as unknown as RouteRecordRaw[], // 添加到路由的初始路由列表。
  strict: true, // 是否应该禁止尾部斜杠。默认为假

});
const dyRoutes = localStorage.getItem('dynamicRoutes');

  if(dyRoutes){
    generateRoutes(JSON.parse(dyRoutes)) 
  }

// config router
// 配置路由器
export default function installRouter(app: App<Element>) {
  app.use(router);
  //注册路由守卫
  installRouterGuard(router)
}