<template>
  <!-- v-model=""  -->
  <TyMenu :isFold="appStore.isFold" style="width: unset" v-model="menuStore.activeMenu"
    :option="routerTransMenu(pageRoute, '')">
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
import { ref } from 'vue'
import useAppStore from '@/store/modules/app'
import useMenuStore from '@/store/modules/menu'
import { pageRoute } from '@/router/index'
const menuStore = useMenuStore()
const appStore = useAppStore()
function routerTransMenu(menuLs, pPath) {
  const getMenuPath = (pPath, path) => {
    if (!pPath) {
      return path
    }
    return pPath + '/' + path
  }
  const getMenuItem = (item) => {

    let obj = {
      label: item.label,
      type: item.type,
      path: getMenuPath(pPath, item.path),
      key: pPath + item.path,
    }

    if (item.icon) {
      obj.icon = item.icon
    }
    if (item.children?.length && item.type === 'subMenu') {
      obj.children = routerTransMenu(item.children, item.path);
    }
    return obj;
  }

  // 对于没有type 的视为非菜单路由
  return menuLs.map(item => {
    return getMenuItem(item);
  });
}
console.log(routerTransMenu(pageRoute, ''));
 
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
// }</style>
