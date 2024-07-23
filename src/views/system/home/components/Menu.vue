<template>
  <!-- v-model=""  -->
  <TyMenu :isFold="appStore.isFold" style="width: unset" v-model="menuStore.activeMenu" :option="option">
    <template #header>
      <div style="
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        ">
        <svgIcon icon="logo" />
      </div>
    </template>
  </TyMenu>
</template>
<script setup>
import svgIcon from '@/components/svgIcon.vue'
import {ref} from 'vue'
import useAppStore from '@/store/modules/app'
import useMenuStore from '@/store/modules/menu'

const menuStore = useMenuStore()
const appStore = useAppStore()

const option = [
  {
    label: '仪表盘',
    key: 'dashboard',
    icon: 'ty-dashboard-fill',
    type: 'subMenu',
    children: [
      {
        label: '分析页',
        key: 'analysis',
        type: 'menu',
        path: '/system/analysis',
      },
      {
        label: '工作台',
        key: 'workbench',
        type: 'menu',
        path: '/system/workbench',
      }
    ],
  },
  {
    label: '嵌入页面',
    key: 'dashboard',
    icon: 'ty-pages-fill',
    type: 'subMenu',
    children: [
      {
        label: '内嵌外部页面',
        key: 'inner',
        type: 'menu',
        path: '/trade/inner',
      },
      {
        label: '打开外部页面',
        key: 'out',
        type: 'menu',
        path: '/trade/out',
      },
      {
        label: '内嵌html页面',
        key: 'outByIframeHTML',
        type: 'menu',
        path: '/trade/outByIframe',
      },
      {
        label: '打开内部html页面',
        key: 'outByIframe',
        type: 'menu',
        path: '/outByIframe',
      }
    ],
  },
  {
    label: '功能',
    key: 'dashboard',
    icon: 'ty-plug-2-fill',
    type: 'subMenu',
    children: [
      {
        label: '图标',
        key: 'icon',
        type: 'menu',
        path: '/trade/icon',
      },
      {
        label: '下载',
        key: 'download',
        type: 'menu',
        path: '/trade/download',
      },
      {
        label: '打印',
        key: 'print',
        type: 'menu',
        path: '/trade/print',
      }
    ],
  },
  {
    label: '地图',
    key: 'map',
    icon: 'ty-road-map-fill',
    type: 'subMenu',
    children: [
      {
        label: '地图(echars)',
        key: 'echarsMap',
        type: 'menu',
        path: '/map/echarsMap',
      },
      {
        label: '省地图(echars)',
        key: 'echarsMapTwo',
        type: 'menu',
        path: '/map/echarsMapTwo',
      }
    ],
  },
  {
    label: '码',
    key: 'code',
    icon: 'ty-qr-code-fill ',
    type: 'subMenu',
    children: [
      {
        label: '条形码',
        key: 'barcode',
        type: 'menu',
        path: '/trade/barcode',
      },
      {
        label: '二维码',
        key: 'qrcode',
        type: 'menu',
        path: '/trade/qrcode',
      },
    ],
  },
  {
    icon: 'ty-pie-chart-fill',
    label: '图表',
    key: 'chars',
    type: 'menu',
    path: '/trade/charts',
  },
  {
    icon: 'ty-file-image-fill',
    label: '预览',
    key: 'previewImg',
    type: 'menu',
    path: '/trade/previewImg',
  },
  {
    icon: 'ty-pen-nib-fill',
    label: '签字版',
    key: 'signingBoard',
    type: 'menu',
    path: '/trade/signingBoard',
  },
  {
    icon: 'ty-pen-nib-fill',
    label: '绘制图形',
    key: 'drawImg',
    type: 'menu',
    path: '/trade/drawImg',
  },
  {
    icon: 'ty-pen-nib-fill',
    label: '动画',
    key: 'animation',
    type: 'menu',
    path: '/trade/animation',
  },
  {
    icon: 'ty-markup-fill',
    label: '关于',
    key: 'about',
    type: 'menu',
    path: '/trade/about',
  }
]
</script>
<style lang="scss" scoped>
// html[toyar-theme='light'] {
//   .ty-menu {
//     --color-bg-2: #001529;
//     --text-2: rgba(255, 255, 255, 0.6);

//     .ty-sub-menu,
//     .ty-menu-item {
//       background-color: unset;
//     }

//     .ty-menu-item:hover {
//       color: #fff;
//     }
//   }
// }


// html[toyar-theme='dark'] {
//   .ty-menu {
//     --color-bg-2: #001529;
//   }
// }

</style>
